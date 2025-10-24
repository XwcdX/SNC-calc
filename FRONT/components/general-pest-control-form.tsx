"use client"

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnifiedResultData, ClientData } from "./flow-controller";
import { Session } from "next-auth";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bug, Calculator, Camera, Upload, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

// This interface should be defined once, perhaps in a types file, but is here for component self-containment
interface InspectionImage {
  url: string;
  description: string;
}

// Props for the component
interface GeneralPestControlFormProps {
  client: ClientData | null;
  session: Session | null;
  onFormSubmit: (hasil: UnifiedResultData) => void;
}

// Image loader for images served from your Laravel backend
const laravelLoader = ({ src }: { src: string }) => {
  const laravelUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8000';
  return `${laravelUrl}${src}`;
};

export default function GeneralPestControlForm({ client, session, onFormSubmit }: GeneralPestControlFormProps) {
  const accessToken = session?.accessToken;

  // --- STATE FOR PROPERTY DETAILS ---
  const [luasTanah, setLuasTanah] = useState<number>(100);
  const [lokasiRumah, setLokasiRumah] = useState<string>("");

  // --- STATE FOR OPERATIONAL & COST DETAILS ---
  const [transport, setTransport] = useState<'mobil' | 'motor'>('mobil');
  const [jarakTempuh, setJarakTempuh] = useState<number>(10);
  const [jumlahLantai, setJumlahLantai] = useState<number>(1);
  const [monitoringPerBulan, setMonitoringPerBulan] = useState<number>(1);

  // --- STATE FOR INSPECTION DATA ---
  const [images, setImages] = useState<InspectionImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [summary, setSummary] = useState("Ditemukan aktivitas hama target di area yang telah diidentifikasi.");
  const [recommendation, setRecommendation] = useState("Lakukan treatment sesuai dengan SOP untuk hama target dan lakukan monitoring berkala.");
  
  // --- GPC SPECIFIC STATE ---
  const [treatment, setTreatment] = useState("Pengendalian Kecoa");
  const [areaAplikasi, setAreaAplikasi] = useState("Area Dapur dan Gudang");
  const [bahanAktifKimia, setBahanAktifKimia] = useState("Fipronil 5%");
  const [status, setStatus] = useState("Terdeteksi Hama");

  // --- CAMERA MODAL STATE ---
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isCameraOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isCameraOpen]);


  // --- IMAGE HANDLING LOGIC ---

  const uploadImage = async (file: File) => {
    if (!accessToken) {
      alert("Sesi berakhir, silakan login kembali.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/upload-inspection-image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' },
        body: formData,
      });
      if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
      const result = await response.json();
      const newImage: InspectionImage = { url: result.url, description: "" };
      setImages(prev => [...prev, newImage]);
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Gagal mengunggah gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadImage(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const updateImageDescription = (index: number, description: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, description } : img));
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
      setStream(mediaStream);
    } catch (err) {
      console.log("Could not get environment camera, trying user camera...", err);
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
      } catch (fallbackErr) {
        alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.");
        setIsCameraOpen(false);
      }
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    canvas.toBlob(async (blob) => {
      if (blob) {
        const capturedFile = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        await uploadImage(capturedFile);
      }
    }, 'image/jpeg');
    closeCamera();
  };

  // --- FORM SUBMISSION ---

  const handleSubmit = () => {
    if (!lokasiRumah.trim()) {
      alert("Alamat properti tidak boleh kosong.");
      return;
    }

    const finalResult: UnifiedResultData = {
      serviceType: 'GPC', // General Pest Control
      client: client,
      agentName: session?.user?.name ?? 'N/A',
      inspection: {
        dateTime: new Date().toLocaleString('id-ID'),
        images: images,
        summary: summary,
        recommendation: recommendation,
        treatment: treatment, // The selected treatment
        status: status,
      },
      details: {
        // Property Details
        lokasiRumah: lokasiRumah,
        luasTanah: luasTanah,
        // Operational Details
        transport: transport,
        jarakTempuh: jarakTempuh,
        jumlahLantai: jumlahLantai,
        monitoringPerBulan: monitoringPerBulan,
        // GPC specific details
        targetHama: [treatment], // Using treatment as the main target
        areaAplikasi: areaAplikasi,
        bahanAktifKimia: bahanAktifKimia,
      }
    };

    onFormSubmit(finalResult);
  }

  return (
    <>
      {isClient && isCameraOpen && createPortal(
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
          <video ref={videoRef} autoPlay playsInline className="max-w-full max-h-[70vh] rounded-lg" />
          <div className="flex items-center gap-4 mt-4">
            <Button onClick={handleCapture} className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-full p-4 h-16 w-16">
              <Camera className="h-8 w-8" />
            </Button>
            <Button variant="ghost" onClick={closeCamera} className="text-white rounded-full p-2 absolute top-4 right-4">
              <XCircle className="h-8 w-8" />
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>,
        document.body
      )}
      <Card className="p-6 bg-black/90 border-l-4 border-green-500 text-white space-y-8">
        {/* --- FORM HEADER --- */}
        <div className="flex items-center gap-2">
          <Bug className="h-6 w-6 text-green-500" />
          <h2 className="text-xl font-bold headline">Formulir General Pest Control (GPC)</h2>
        </div>

        {/* --- PROPERTY DETAILS SECTION --- */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="lokasi-rumah">Alamat Properti</Label>
            <Input
              id="lokasi-rumah"
              value={lokasiRumah}
              onChange={(e) => setLokasiRumah(e.target.value)}
              className="mt-2 w-full bg-black/50 border-green-600 text-white"
              placeholder="Contoh: Jl. Sudirman No. 1, Jakarta"
            />
          </div>
          <div>
            <Label htmlFor="luas-tanah">Luas Area Treatment (m²)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider id="luas-tanah" min={20} max={1000} step={10} value={[luasTanah]} onValueChange={(v) => setLuasTanah(v[0])} />
              <Input type="number" value={luasTanah} onChange={(e) => setLuasTanah(Number(e.target.value))} className="w-24 bg-black/50 border-green-600" />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-green-800/50 my-8"></div>

        {/* --- OPERATIONAL DETAILS SECTION --- */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold headline">Detail Operasional</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="transport">Transportasi</Label>
              <Select value={transport} onValueChange={(value) => setTransport(value as 'mobil' | 'motor')}>
                <SelectTrigger id="transport" className="mt-2 bg-black/50 border-green-600 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-black text-white border-green-600">
                  <SelectItem value="mobil">Mobil</SelectItem>
                  <SelectItem value="motor">Motor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="jarak-tempuh">Jarak Tempuh (km)</Label>
              <Input type="number" id="jarak-tempuh" value={jarakTempuh} onChange={(e) => setJarakTempuh(Number(e.target.value))} className="mt-2 w-full bg-black/50 border-green-600" />
            </div>
            <div>
              <Label htmlFor="jumlah-lantai">Jumlah Lantai</Label>
              <Input type="number" id="jumlah-lantai" value={jumlahLantai} onChange={(e) => setJumlahLantai(Number(e.target.value))} className="mt-2 w-full bg-black/50 border-green-600" />
            </div>
            <div>
              <Label htmlFor="monitoring-per-bulan">Durasi Monitoring (Bulan)</Label>
              <Input type="number" id="monitoring-per-bulan" value={monitoringPerBulan} onChange={(e) => setMonitoringPerBulan(Number(e.target.value))} className="mt-2 w-full bg-black/50 border-green-600" />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-green-800/50 my-8"></div>

        {/* --- INSPECTION DATA SECTION --- */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Camera className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold headline">Input Data Inspeksi</h2>
          </div>
          <div className="space-y-6">
            {/* --- GPC SPECIFIC INPUTS --- */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="gpc-treatment">Jenis Treatment</Label>
                    <Select value={treatment} onValueChange={setTreatment}>
                        <SelectTrigger id="gpc-treatment" className="mt-2 bg-black/50 border-green-600"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-black text-white border-green-600">
                            <SelectItem value="Pengendalian Kecoa">Pengendalian Kecoa</SelectItem>
                            <SelectItem value="Fogging Nyamuk">Fogging Nyamuk</SelectItem>
                            <SelectItem value="Pengendalian Biawak">Pengendalian Biawak</SelectItem>
                            <SelectItem value="Pengendalian Musang">Pengendalian Musang</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="inspection-status">Status Temuan</Label>
                    <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="inspection-status" className="mt-2 bg-black/50 border-green-600"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-black text-white border-green-600">
                        <SelectItem value="Aman">Aman</SelectItem>
                        <SelectItem value="Terdeteksi Hama">Terdeteksi Hama</SelectItem>
                        <SelectItem value="Butuh Pencegahan">Butuh Pencegahan</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>
             <div>
                <Label htmlFor="area-aplikasi">Area Aplikasi</Label>
                <Input id="area-aplikasi" value={areaAplikasi} onChange={(e) => setAreaAplikasi(e.target.value)} className="mt-2 bg-black/50 border-green-600" placeholder="Contoh: Seluruh area indoor dan outdoor"/>
            </div>
             <div>
                <Label htmlFor="bahan-aktif">Bahan Aktif (jika ada)</Label>
                <Input id="bahan-aktif" value={bahanAktifKimia} onChange={(e) => setBahanAktifKimia(e.target.value)} className="mt-2 bg-black/50 border-green-600" placeholder="Contoh: Cypermethrin, Deltamethrin, etc."/>
            </div>

            {/* --- Image Upload --- */}
            <div>
              <Label>Foto Temuan (Opsional)</Label>
              <div className="mt-2 p-4 border-2 border-dashed border-green-800/50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative group w-full h-32">
                        <Image loader={laravelLoader} src={image.url} alt={`Inspection ${index + 1}`} fill className="object-cover rounded-md" />
                        <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <Textarea
                        placeholder="Deskripsi singkat..."
                        value={image.description}
                        onChange={(e) => updateImageDescription(index, e.target.value)}
                        className="bg-gray-900 border-gray-700 text-xs"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
                <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" disabled={isUploading} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Mengunggah..." : "Unggah Foto"}
                  </Button>
                  <Button onClick={openCamera} disabled={isUploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    <Camera className="h-4 w-4 mr-2" />
                    Ambil Foto
                  </Button>
                </div>
              </div>
            </div>
            {/* --- Summary and Recommendation --- */}
            <div>
              <Label htmlFor="summary">Kesimpulan</Label>
              <Textarea id="summary" value={summary} onChange={e => setSummary(e.target.value)} className="mt-2 bg-black/50 border-green-600" rows={3} />
            </div>
            <div>
              <Label htmlFor="recommendation">Rekomendasi Penanganan</Label>
              <Textarea id="recommendation" value={recommendation} onChange={e => setRecommendation(e.target.value)} className="mt-2 bg-black/50 border-green-600" rows={3} />
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-6">
          Lanjutkan
        </Button>
      </Card>
    </>
  )
}