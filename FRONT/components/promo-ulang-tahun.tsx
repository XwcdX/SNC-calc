"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PartyPopper, Gift, Calendar, Clock, CheckCircle, Sparkles } from "lucide-react"
import ShareResultsButton from "./share-results-button" // Import the new component

interface PromoUlangTahunProps {
  riskLevel?: "tinggi" | "sedang" | "rendah"
  kecamatanName?: string
  biayaPerbaikan?: number
  biayaLayanan?: number
  penghematan?: number
  formatRupiah?: (angka: number) => string
}

export default function PromoUlangTahun({
  riskLevel = "sedang",
  kecamatanName = "Tidak Diketahui",
  biayaPerbaikan,
  biayaLayanan,
  penghematan,
  formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`,
}: PromoUlangTahunProps) {
  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg relative overflow-hidden">
      {/* Background confetti pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern
            id="confetti-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle cx="10" cy="10" r="2" fill="white" />
            <rect x="25" y="25" width="4" height="4" fill="white" />
            <path d="M35,15 L40,20 L35,25 L30,20 Z" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#confetti-pattern)" />
        </svg>
      </div>

      {/* Anniversary badge */}
      <div className="absolute -top-5 -right-5 w-32 h-32 overflow-hidden">
        <div className="bg-amber-500 text-black font-bold text-center py-1 px-4 shadow-lg transform rotate-45 translate-y-10 translate-x-2">
          6 TAHUN
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <PartyPopper className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl md:text-2xl font-bold headline">PROMO SPESIAL ULANG TAHUN</h2>
        </div>
        {/* Add the share button here */}
        <ShareResultsButton
          riskLevel={riskLevel}
          kecamatanName={kecamatanName}
          biayaPerbaikan={biayaPerbaikan}
          biayaLayanan={biayaLayanan}
          penghematan={penghematan}
          formatRupiah={formatRupiah}
        />
      </div>

      <div className="text-center mb-8">
        <div className="text-3xl md:text-4xl font-bold headline text-amber-400 mb-2">6 TAHUN SnC PEST CONTROL</div>
        <div className="text-xl text-white/90 mb-4">Diskon 6% untuk Semua Layanan!</div>
        <p className="text-white/80">
          Rayakan ulang tahun ke-6 SnC Pest Control bersama kami! Dapatkan diskon spesial 6% untuk semua layanan
          anti-rayap dan pest control lainnya. Terima kasih atas kepercayaan Anda selama 6 tahun ini.
        </p>
      </div>

      <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 p-6 rounded-lg border border-amber-800/50 mb-8 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24">
          <Sparkles className="h-12 w-12 text-amber-500/50 animate-pulse" />
        </div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24">
          <Sparkles className="h-12 w-12 text-amber-500/50 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold headline text-amber-400 mb-4 text-center">DETAIL PROMO ULANG TAHUN</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Gift className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Diskon</div>
                <div className="text-white/90">6% untuk semua layanan</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Periode Promo</div>
                <div className="text-white/90">1 - 30 Juni 2024</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Jadwal Layanan</div>
                <div className="text-white/90">Berlaku untuk jadwal layanan hingga 31 Desember 2024</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-amber-400 mb-2">Berlaku untuk:</div>
            {[
              "Layanan anti-rayap",
              "Pengendalian kecoa",
              "Pengendalian tikus",
              "Pengendalian nyamuk",
              "Fumigasi",
              "Sanitasi",
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-white/90">{service}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-lg font-bold headline text-white mb-2">BONUS SPESIAL ULANG TAHUN</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-amber-900/20 p-3 rounded-md border border-amber-800/30">
            <PartyPopper className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <div className="font-bold text-amber-400">Konsultasi Gratis</div>
            <p className="text-sm text-white/80 mt-1">Konsultasi dengan ahli pest control kami tanpa biaya</p>
          </div>
          <div className="bg-amber-900/20 p-3 rounded-md border border-amber-800/30">
            <Gift className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <div className="font-bold text-amber-400">Pemeriksaan Bonus</div>
            <p className="text-sm text-white/80 mt-1">Pemeriksaan tambahan gratis dalam 1 tahun pertama</p>
          </div>
          <div className="bg-amber-900/20 p-3 rounded-md border border-amber-800/30">
            <Sparkles className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <div className="font-bold text-amber-400">Merchandise Eksklusif</div>
            <p className="text-sm text-white/80 mt-1">Dapatkan merchandise SnC Pest Control edisi terbatas</p>
          </div>
        </div>
      </div>

      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 text-lg">
        <PartyPopper className="mr-2 h-5 w-5" />
        Klaim Promo Ulang Tahun
      </Button>

      <p className="text-xs text-white/60 mt-4 text-center">
        *Promo ulang tahun dapat digabungkan dengan promo area. Total diskon maksimal 26%.
      </p>
    </Card>
  )
}
