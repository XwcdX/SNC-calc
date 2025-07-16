"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, X, Plus, Save, Trash2, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface UploadedImage {
  id: string
  file: File
  preview: string
  description: string
}

export default function UploadImagesPage() {
  const [clientName, setClientName] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        description: "",
      }))

      setImages((prev) => [...prev, ...newImages])
    }
  }

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      return filtered
    })
  }

  const handleDescriptionChange = (id: string, description: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, description } : img)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 border-l-4 border-black pl-4 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 -ml-1.5"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-black headline">Upload Gambar Inspeksi</h1>
            <p className="text-black/80 mt-2">Upload hasil inspeksi rayap untuk ditampilkan kepada klien</p>
          </header>

          <Card className="p-6 bg-black/90 border-l-4 border-green-500 text-white shadow-lg">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-green-500/20 p-4 rounded-full mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold headline text-green-400 mb-4">
                Hasil Inspeksi Berhasil Disimpan!
              </h2>
              <p className="text-white/80 max-w-md mb-8">
                Data inspeksi rayap telah berhasil disimpan dan siap ditampilkan kepada klien. Terima kasih telah
                mengupload hasil inspeksi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  onClick={() => setIsSubmitted(false)}
                >
                  Upload Hasil Inspeksi Lainnya
                </Button>
                <Link href="/admin">
                  <Button variant="outline" className="border-amber-600 text-amber-500">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali ke Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-500 to-amber-600">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 border-l-4 border-black pl-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 -ml-1.5"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-black headline">Upload Gambar Inspeksi</h1>
          <p className="text-black/80 mt-2">Upload hasil inspeksi rayap untuk ditampilkan kepada klien</p>
        </header>

        <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl md:text-2xl font-bold headline">UPLOAD HASIL INSPEKSI RAYAP</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="client-name" className="text-white">
                    Nama Klien
                  </Label>
                  <Input
                    id="client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Masukkan nama klien"
                    required
                    className="mt-1 bg-black/50 border-amber-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="date-time" className="text-white">
                    Jam/Tanggal
                  </Label>
                  <Input
                    id="date-time"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    placeholder="Contoh: 10.00, 20 Januari 2025"
                    required
                    className="mt-1 bg-black/50 border-amber-600 text-white"
                  />
                </div>
              </div>

              <div className="bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
                <h3 className="font-bold text-amber-400 headline mb-2">Petunjuk Upload</h3>
                <ul className="list-disc list-inside space-y-1 text-white/90 text-sm">
                  <li>Upload foto hasil inspeksi rayap dengan Termatrax</li>
                  <li>Tambahkan deskripsi untuk setiap foto</li>
                  <li>Pastikan foto memiliki resolusi yang baik</li>
                  <li>Format yang didukung: JPG, PNG, WEBP</li>
                  <li>Ukuran maksimal per file: 5MB</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-amber-800/30 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-amber-400 headline">Foto Hasil Inspeksi</h3>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 w-full cursor-pointer"
                    aria-label="Upload foto"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-amber-600 text-amber-500 hover:bg-amber-500 hover:text-black"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Foto
                  </Button>
                </div>
              </div>

              {images.length === 0 ? (
                <div className="border-2 border-dashed border-amber-800/30 rounded-md p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Camera className="h-12 w-12 text-amber-500/50 mb-4" />
                    <h4 className="text-lg font-bold text-amber-400 mb-2">Belum Ada Foto</h4>
                    <p className="text-white/70 mb-4">Klik tombol Upload Foto untuk menambahkan foto hasil inspeksi</p>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 w-full cursor-pointer"
                        aria-label="Upload foto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-amber-600 text-amber-500 hover:bg-amber-500 hover:text-black"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Foto
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-black/50 rounded-md p-4 border border-amber-800/30"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                            <Image
                              src={image.preview || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2"
                              onClick={() => handleRemoveImage(image.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex-1">
                            <div className="mb-2">
                              <Label htmlFor={`image-${image.id}`} className="text-white">
                                Deskripsi Foto {index + 1}
                              </Label>
                              <Textarea
                                id={`image-${image.id}`}
                                value={image.description}
                                onChange={(e) => handleDescriptionChange(image.id, e.target.value)}
                                placeholder="Masukkan deskripsi foto"
                                required
                                className="mt-1 bg-black/50 border-amber-600 text-white h-32"
                              />
                            </div>
                            <div className="text-xs text-white/60">
                              {image.file.name} ({(image.file.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="flex justify-between">
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 w-full cursor-pointer"
                        aria-label="Upload foto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-amber-600 text-amber-500 hover:bg-amber-500 hover:text-black"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Foto
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-600 text-red-500 hover:bg-red-500 hover:text-black"
                      onClick={() => setImages([])}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus Semua
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-amber-800/30 pt-6 flex justify-end">
              <div className="flex gap-3">
                <Link href="/admin">
                  <Button variant="outline" className="border-amber-600 text-amber-500">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  disabled={isSubmitting || images.length === 0 || !clientName || !dateTime}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Menyimpan..." : "Simpan Hasil Inspeksi"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </main>
  )
}
