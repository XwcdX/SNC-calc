"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Settings, BarChart, Calendar, Upload, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-500 to-amber-600">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 border-l-4 border-black pl-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 -ml-1.5"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-black headline">Admin Panel</h1>
          <p className="text-black/80 mt-2">Kelola data inspeksi rayap dan informasi klien</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Gambar Inspeksi */}
          <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-500/20 p-3 rounded-full">
                  <Upload className="h-6 w-6 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold headline">Upload Gambar Inspeksi</h2>
              </div>

              <div className="flex-grow">
                <p className="text-white/80 mb-4">
                  Upload hasil inspeksi rayap untuk ditampilkan kepada klien. Tambahkan foto dan deskripsi detail untuk
                  setiap temuan.
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="aspect-square bg-amber-900/30 rounded-md overflow-hidden relative">
                    <Image
                      src="/images/inspection-1.png"
                      alt="Thermal camera inspection"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="aspect-square bg-amber-900/30 rounded-md overflow-hidden relative">
                    <Image
                      src="/images/inspection-2.png"
                      alt="Wood damage inspection"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="aspect-square bg-amber-900/30 rounded-md overflow-hidden relative">
                    <Image
                      src="/images/inspection-3.png"
                      alt="Termite frass inspection"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                </div>
              </div>

              <Link href="/admin/upload" className="mt-auto">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                  Upload Gambar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Kelola Data Klien */}
          <Card className="p-6 bg-black/90 border-l-4 border-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold headline">Kelola Data Klien</h2>
              </div>

              <div className="flex-grow">
                <p className="text-white/80 mb-4">
                  Lihat dan kelola data klien, riwayat inspeksi, dan jadwal perawatan. Tambahkan klien baru atau
                  perbarui informasi yang ada.
                </p>

                <div className="bg-black/50 p-3 rounded-md border border-blue-900/30 mb-4">
                  <div className="text-sm text-white/70">Klien Terbaru:</div>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span>Selwyn Hoo</span>
                      <span className="text-blue-400">20 Jan 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Budi Santoso</span>
                      <span className="text-blue-400">18 Jan 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Anita Wijaya</span>
                      <span className="text-blue-400">15 Jan 2025</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold mt-auto">
                Kelola Klien
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Laporan & Analisis */}
          <Card className="p-6 bg-black/90 border-l-4 border-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <BarChart className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-xl font-bold headline">Laporan & Analisis</h2>
              </div>

              <div className="flex-grow">
                <p className="text-white/80 mb-4">
                  Lihat laporan statistik tentang inspeksi rayap, area dengan risiko tinggi, dan tren serangan rayap di
                  berbagai kecamatan.
                </p>

                <div className="bg-black/50 p-3 rounded-md border border-green-900/30 mb-4">
                  <div className="text-sm text-white/70 mb-2">Statistik Bulan Ini:</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-900/20 p-2 rounded-md text-center">
                      <div className="text-xl font-bold text-green-400">42</div>
                      <div className="text-xs text-white/70">Inspeksi</div>
                    </div>
                    <div className="bg-red-900/20 p-2 rounded-md text-center">
                      <div className="text-xl font-bold text-red-400">28</div>
                      <div className="text-xs text-white/70">Positif Rayap</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold mt-auto">
                Lihat Laporan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Jadwal Inspeksi */}
          <Card className="p-6 bg-black/90 border-l-4 border-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-xl font-bold headline">Jadwal Inspeksi</h2>
              </div>

              <div className="flex-grow">
                <p className="text-white/80 mb-4">
                  Kelola jadwal inspeksi rayap, atur tim teknisi, dan pantau status inspeksi yang sedang berlangsung.
                </p>

                <div className="bg-black/50 p-3 rounded-md border border-purple-900/30 mb-4">
                  <div className="text-sm text-white/70 mb-2">Jadwal Hari Ini:</div>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Jl. Mawar No. 10</span>
                      <span className="text-purple-400">09:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Perumahan Indah Blok A5</span>
                      <span className="text-purple-400">13:30</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Apartemen Skyline Lt.15</span>
                      <span className="text-purple-400">16:00</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold mt-auto">
                Kelola Jadwal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Dokumentasi */}
          <Card className="p-6 bg-black/90 border-l-4 border-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500/20 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold headline">Dokumentasi</h2>
              </div>

              <div className="flex-grow">
                <p className="text-white/80 mb-4">
                  Akses panduan, prosedur standar, dan dokumentasi teknis untuk inspeksi rayap dan metode penanganan.
                </p>

                <div className="bg-black/50 p-3 rounded-md border border-orange-900/30 mb-4">
                  <div className="text-sm text-white/70 mb-2">Dokumen Populer:</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-400" />
                      <span>Panduan Inspeksi Termatrax</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-400" />
                      <span>SOP Penanganan Rayap Kayu Kering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-400" />
                      <span>Katalog Produk Anti-Rayap</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold mt-auto">
                Buka Dokumentasi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Pengaturan */}
          <Card className="p-6 bg-black/90 border-l-4 border-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-500/20 p-3 rounded-full">
                  <Settings className="h-6 w-6 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold headline">Pengaturan</h2>
              </div>

              <div className="flex-grow">
                <p className="text-white/80 mb-4">
                  Kelola pengaturan aplikasi, akun pengguna, dan preferensi sistem. Atur notifikasi dan keamanan.
                </p>

                <div className="bg-black/50 p-3 rounded-md border border-gray-700/30 mb-4">
                  <div className="text-sm text-white/70 mb-2">Pengaturan Cepat:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Notifikasi Email</span>
                      <div className="w-10 h-5 bg-green-900/50 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Backup Otomatis</span>
                      <div className="w-10 h-5 bg-green-900/50 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mode Gelap</span>
                      <div className="w-10 h-5 bg-gray-700 rounded-full relative">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold mt-auto">
                Buka Pengaturan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="outline" className="border-black/60 text-black/80 hover:bg-black/10 hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
