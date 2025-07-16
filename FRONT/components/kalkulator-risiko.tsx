"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Bug, Calculator, Camera, Upload, Trash2, Calendar } from "lucide-react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"

// Combined interface for all data passed up
interface PerhitunganDanInspeksi {
  // Property fields
  luasRumah: number;
  umurBangunan: number;
  lokasiRumah: string;
  materialBangunan: string;
  riwayatRayap: string;
  tingkatKelembaban: number;
  jumlahPerabotKayu: number;
  adaDanauSebelumnya: string;
  jenisTanah: string;
  // Calculated fields from API
  skorRisiko: number;
  kategoriRisiko: string;
  estimasiKerugian: number;
  rekomendasiLayanan: string;
  // Cost fields
  biayaPerbaikan: number;
  biayaLayanan: number;
  penghematan: number;
  // Inspection fields
  inspectionData: InspectionData;
}

interface InspectionImage {
  url: string
  description: string
}

interface InspectionData {
  dateTime: string;
  images: { url: string; description: string }[];
  summary: string;
  recommendation: string;
  method: string;
  status: string;
}

interface KalkulatorRisikoProps {
  onHasilPerhitungan: (hasil: PerhitunganDanInspeksi) => void;
}

const laravelLoader = ({ src }: { src: string }) => {
  return `http://localhost:8000${src}`;
};


export default function KalkulatorRisiko({ onHasilPerhitungan }: KalkulatorRisikoProps) {
  // State untuk data properti
  const [luasRumah, setLuasRumah] = useState<number>(100)
  const [umurBangunan, setUmurBangunan] = useState<number>(5)
  const [lokasiRumah, setLokasiRumah] = useState<string>("perkotaan")
  const [materialBangunan, setMaterialBangunan] = useState<string>("kayu-sedang")
  const [riwayatRayap, setRiwayatRayap] = useState<string>("tidak")
  const [tingkatKelembaban, setTingkatKelembaban] = useState<number>(50)
  const [jumlahPerabotKayu, setJumlahPerabotKayu] = useState<number>(5)
  const [adaDanauSebelumnya, setAdaDanauSebelumnya] = useState<string>("tidak")
  const [jenisTanah, setJenisTanah] = useState<string>("liat")

  // State untuk data inspeksi
  const [inspectionDate, setInspectionDate] = useState<Date | undefined>(new Date());
  const [images, setImages] = useState<{ url: string; description: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [method, setMethod] = useState('Termatrax');
  const [status, setStatus] = useState('Aman');
  const [summary, setSummary] = useState('Berdasarkan hasil inspeksi, tidak ditemukan aktivitas rayap yang signifikan.');
  const [recommendationDetail, setRecommendationDetail] = useState('Tidak ada tindakan lanjutan yang diperlukan saat ini. Disarankan melakukan pengecekan rutin tahunan.');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload-inspection-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      setImages(prev => [...prev, { url: result.url, description: '' }]);

    } catch (error) {
      console.error("Image upload error:", error);
      alert("Gagal mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const updateImageDescription = (index: number, description: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, description } : img));
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };


  const hitungRisiko = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          luasRumah, umurBangunan, lokasiRumah, materialBangunan, riwayatRayap,
          tingkatKelembaban, jumlahPerabotKayu, adaDanauSebelumnya, jenisTanah,
        }),
      });

      if (!response.ok) throw new Error("Gagal menghitung risiko dari server.");

      const data = await response.json();

      type KategoriRisiko = 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
      const biayaLayananBase: Record<KategoriRisiko, number> = {
        Rendah: 1500000, Sedang: 2500000, Tinggi: 3500000, "Sangat Tinggi": 5000000,
      };
      const kategori: KategoriRisiko = data.kategoriRisiko;
      const biayaLayanan = biayaLayananBase[kategori] + (luasRumah > 100 ? (luasRumah - 100) * 10000 : 0);
      const biayaPerbaikan = data.estimasiKerugian * 0.7;
      const penghematan = biayaPerbaikan - biayaLayanan;

      const formattedDate = inspectionDate
        ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(inspectionDate)
        : new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(new Date());


      onHasilPerhitungan({
        // Data properti
        luasRumah, umurBangunan, lokasiRumah, materialBangunan, riwayatRayap,
        tingkatKelembaban, jumlahPerabotKayu, adaDanauSebelumnya, jenisTanah,
        // Hasil kalkulasi
        skorRisiko: data.skorRisiko,
        kategoriRisiko: data.kategoriRisiko,
        estimasiKerugian: data.estimasiKerugian,
        rekomendasiLayanan: data.rekomendasiLayanan,
        biayaPerbaikan, biayaLayanan, penghematan,
        // Data inspeksi
        inspectionData: {
          dateTime: format(inspectionDate || new Date(), "EEEE, dd MMMM yyyy 'pukul' HH.mm", { locale: id }),
          images,
          method,
          status,
          summary,
          recommendation: recommendationDetail,
        }
      });

    } catch (error) {
      console.error("FETCH ERROR:", error);
      alert("Terjadi kesalahan saat menghitung risiko.");
    }
  };

  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg space-y-8">
      {/* Property Input Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Bug className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl font-bold headline">Input Data Properti</h2>
        </div>
        <div className="space-y-6">
          {/* All property input fields remain the same... e.g., Luas Rumah, Umur Bangunan etc. */}
          {/* For brevity, I'll just show one, the rest are unchanged */}
          <div>
            <Label htmlFor="luas-rumah" className="text-white">Luas Rumah (m²)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider id="luas-rumah" min={30} max={500} step={10} value={[luasRumah]} onValueChange={(v) => setLuasRumah(v[0])} />
              <Input type="number" value={luasRumah} onChange={(e) => setLuasRumah(Number(e.target.value))} className="w-20 bg-black/50 border-amber-600" />
            </div>
          </div>
          {/* ... other property fields ... */}
          <div>
            <Label htmlFor="umur-bangunan" className="text-white">
              Umur Bangunan (tahun)
            </Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                id="umur-bangunan"
                min={0}
                max={50}
                step={1}
                value={[umurBangunan]}
                onValueChange={(value) => setUmurBangunan(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={umurBangunan}
                onChange={(e) => setUmurBangunan(Number(e.target.value))}
                className="w-20 bg-black/50 border-amber-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="lokasi-rumah" className="text-white">
              Lokasi Rumah
            </Label>
            <Select value={lokasiRumah} onValueChange={setLokasiRumah}>
              <SelectTrigger id="lokasi-rumah" className="mt-2 bg-black/50 border-amber-600 text-white">
                <SelectValue placeholder="Pilih lokasi rumah" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-amber-600">
                <SelectItem value="dekat-air">Dekat Sungai/Danau/Rawa</SelectItem>
                <SelectItem value="pinggiran-kota">Pinggiran Kota</SelectItem>
                <SelectItem value="perkotaan">Perkotaan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="material-bangunan" className="text-white">
              Material Bangunan
            </Label>
            <Select value={materialBangunan} onValueChange={setMaterialBangunan}>
              <SelectTrigger id="material-bangunan" className="mt-2 bg-black/50 border-amber-600 text-white">
                <SelectValue placeholder="Pilih material bangunan" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-amber-600">
                <SelectItem value="kayu-dominan">Dominan Kayu</SelectItem>
                <SelectItem value="kayu-sedang">Sebagian Kayu</SelectItem>
                <SelectItem value="beton-dominan">Dominan Beton/Bata</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="riwayat-rayap" className="text-white">
              Pernah Ada Rayap Sebelumnya?
            </Label>
            <Select value={riwayatRayap} onValueChange={setRiwayatRayap}>
              <SelectTrigger id="riwayat-rayap" className="mt-2 bg-black/50 border-amber-600 text-white">
                <SelectValue placeholder="Pilih riwayat rayap" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-amber-600">
                <SelectItem value="ya">Ya</SelectItem>
                <SelectItem value="tidak">Tidak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="jumlah-perabot" className="text-white">
              Jumlah Perabot Kayu
            </Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                id="jumlah-perabot"
                min={0}
                max={30}
                step={1}
                value={[jumlahPerabotKayu]}
                onValueChange={(value) => setJumlahPerabotKayu(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={jumlahPerabotKayu}
                onChange={(e) => setJumlahPerabotKayu(Number(e.target.value))}
                className="w-20 bg-black/50 border-amber-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ada-danau" className="text-white">
              Ada Danau, Sungai, atau Rawa Sebelumnya?
            </Label>
            <Select value={adaDanauSebelumnya} onValueChange={setAdaDanauSebelumnya}>
              <SelectTrigger id="ada-danau" className="mt-2 bg-black/50 border-amber-600 text-white">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-amber-600">
                <SelectItem value="ya">Ya</SelectItem>
                <SelectItem value="tidak">Tidak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="jenis-tanah" className="text-white">
              Jenis Tanah di Bawah Rumah
            </Label>
            <Select value={jenisTanah} onValueChange={setJenisTanah}>
              <SelectTrigger id="jenis-tanah" className="mt-2 bg-black/50 border-amber-600 text-white">
                <SelectValue placeholder="Pilih jenis tanah" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-amber-600">
                <SelectItem value="gambut">Tanah Gambut (Organik)</SelectItem>
                <SelectItem value="berpasir">Tanah Berpasir</SelectItem>
                <SelectItem value="liat">Tanah Liat</SelectItem>
                <SelectItem value="berbatu">Tanah Berbatu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between">
              <Label htmlFor="tingkat-kelembaban" className="text-white">
                Tingkat Kelembaban Area (%)
              </Label>
              <span className="text-xs text-amber-400 italic">*Wajib diisi untuk hasil akurat</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                id="tingkat-kelembaban"
                min={20}
                max={100}
                step={5}
                value={[tingkatKelembaban]}
                onValueChange={(value) => setTingkatKelembaban(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{tingkatKelembaban}%</span>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Kelembaban tinggi ({">"}70%) sangat meningkatkan risiko serangan rayap
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-amber-800/50 my-8"></div>

      {/* Inspection Input Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Camera className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl font-bold headline">Input Data Inspeksi</h2>
        </div>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inspection-method">Metode Inspeksi</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger id="inspection-method" className="mt-2 bg-black/50 border-amber-600"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-black text-white border-amber-600">
                  <SelectItem value="Termatrax">Termatrax</SelectItem>
                  <SelectItem value="Inspeksi Visual">Inspeksi Visual</SelectItem>
                  <SelectItem value="Sistem Umpan (Baiting)">Sistem Umpan (Baiting)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="inspection-status">Status Temuan</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="inspection-status" className="mt-2 bg-black/50 border-amber-600"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-black text-white border-amber-600">
                  <SelectItem value="Aman">Aman</SelectItem>
                  <SelectItem value="Terdeteksi Rayap">Terdeteksi Rayap</SelectItem>
                  <SelectItem value="Butuh Pengecekan Lanjut">Butuh Pengecekan Lanjut</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Tanggal & Waktu Inspeksi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-2 bg-black/50 border-amber-600 text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  {inspectionDate ? format(inspectionDate, "PPP p", { locale: id }) : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black text-white border-amber-600" align="start">
                <CalendarComponent
                  mode="single"
                  selected={inspectionDate}
                  onSelect={setInspectionDate}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Foto Temuan (Opsional)</Label>
            <div className="mt-2 p-4 border-2 border-dashed border-amber-800/50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image loader={laravelLoader} src={image.url} alt={`Inspection image ${index + 1}`} width={150} height={150} className="object-cover rounded-md w-full h-32" />
                    <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <Textarea
                      placeholder="Deskripsi singkat..."
                      value={image.description}
                      onChange={(e) => updateImageDescription(index, e.target.value)}
                      className="mt-1 bg-gray-900 border-gray-700 text-xs"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" disabled={isUploading} />
              <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold">
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Mengunggah..." : "Tambah Foto"}
              </Button>
            </div>
          </div>

            <div>
              <Label htmlFor="summary">Kesimpulan</Label>
              <Textarea id="summary" placeholder="Tuliskan kesimpulan umum dari inspeksi di sini..." value={summary} onChange={(e) => setSummary(e.target.value)} className="mt-2 bg-black/50 border-amber-600" rows={4} />
            </div>

            <div>
              <Label htmlFor="recommendation-detail">Opsi Penanganan Lanjutan</Label>
              <Textarea id="recommendation-detail" placeholder="Jelaskan secara detail opsi penanganan yang direkomendasikan..." value={recommendationDetail} onChange={(e) => setRecommendationDetail(e.target.value)} className="mt-2 bg-black/50 border-amber-600" rows={4} />
            </div>
        </div>
      </div>

      <Button onClick={hitungRisiko} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
        <Calculator className="mr-2 h-4 w-4" />
        Hitung Risiko & Lanjutkan
      </Button>
    </Card>
  )
}