"use client"

import { Card } from "@/components/ui/card"
import { ShieldCheck, AlertTriangle, TrendingDown, Banknote } from "lucide-react"
import AnimatedCounter from "./animated-counter"
import AnimatedProgressBar from "./animated-progress-bar"
import { useState, useEffect } from "react"

interface PerbandinganHargaProps {
  biayaPerbaikan: number
  biayaLayanan: number
  penghematan: number
  formatRupiah: (angka: number) => string
}

export default function PerbandinganHarga({
  biayaPerbaikan,
  biayaLayanan,
  penghematan,
  formatRupiah,
}: PerbandinganHargaProps) {
  const persentasePenghematan = Math.round((penghematan / biayaPerbaikan) * 100)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true)
  }, [])

  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg mt-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6 animate-slide-left">
        <Banknote className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl font-bold headline">PERBANDINGAN BIAYA</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`relative ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse-slow">
            RISIKO TINGGI
          </div>
          <div className="bg-red-900/30 p-4 rounded-md border border-red-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:border-red-600">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="font-bold text-red-300 headline">TANPA PERLINDUNGAN</h3>
            </div>
            <div className="text-center py-3 bg-black/30 rounded-md mb-3 relative overflow-hidden">
              <span className="text-xs text-white/60 block mb-1">Estimasi Biaya Perbaikan</span>
              <p className="text-2xl font-bold text-red-300 headline">
                {isVisible ? (
                  <AnimatedCounter end={biayaPerbaikan} formatFn={formatRupiah} duration={1500} />
                ) : (
                  formatRupiah(0)
                )}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5">
                <div className="animate-shimmer w-full h-full"></div>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {["Kerusakan struktural bangunan", "Penurunan nilai properti", "Biaya renovasi tinggi"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <TrendingDown className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className={`relative ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse-slow">
            REKOMENDASI
          </div>
          <div className="bg-green-900/30 p-4 rounded-md border border-green-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:border-green-600">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <h3 className="font-bold text-green-300 headline">DENGAN LAYANAN KAMI</h3>
            </div>
            <div className="text-center py-3 bg-black/30 rounded-md mb-3 relative overflow-hidden">
              <span className="text-xs text-white/60 block mb-1">Biaya Layanan Anti-Rayap</span>
              <p className="text-2xl font-bold text-green-300 headline">
                {isVisible ? (
                  <AnimatedCounter end={biayaLayanan} formatFn={formatRupiah} duration={1500} />
                ) : (
                  formatRupiah(0)
                )}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5">
                <div className="animate-shimmer w-full h-full"></div>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {["Perlindungan jangka panjang", "Garansi layanan 5 tahun", "Pemeriksaan berkala gratis"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <ShieldCheck className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 bg-amber-500/30 p-4 rounded-md border border-amber-600 ${isVisible ? "animate-scale-in delay-300" : "opacity-0"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Banknote className="h-6 w-6 text-amber-400" />
            <h3 className="font-bold text-amber-300 headline">POTENSI PENGHEMATAN:</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-2xl text-white headline">
              {isVisible ? (
                <AnimatedCounter
                  end={penghematan}
                  formatFn={formatRupiah}
                  duration={2000}
                  className="animate-pulse-slow"
                />
              ) : (
                formatRupiah(0)
              )}
            </span>
            <span className="bg-amber-500 text-black px-2 py-1 rounded-md font-bold headline text-sm animate-pulse-slow">
              HEMAT {isVisible ? <AnimatedCounter end={persentasePenghematan} suffix="%" duration={1500} /> : "0%"}
            </span>
          </div>
        </div>

        <div className="mt-3 mb-4">
          <div className="text-xs text-white/70 mb-1 flex justify-between">
            <span>Biaya Layanan</span>
            <span>Biaya Perbaikan</span>
          </div>
          {isVisible && (
            <AnimatedProgressBar
              percentage={(biayaLayanan / biayaPerbaikan) * 100}
              color="bg-gradient-to-r from-green-500 to-amber-500"
              height="h-3"
              className="rounded-md"
            />
          )}
        </div>

        <p className="text-sm text-white/80 mt-3 bg-black/20 p-3 rounded-md transform transition-all duration-300 hover:scale-[1.01]">
          Dengan menggunakan layanan anti-rayap kami, Anda tidak hanya menghemat uang tetapi juga mendapatkan ketenangan
          pikiran. Investasi kecil hari ini dapat mencegah kerugian besar di masa depan!
        </p>
      </div>
    </Card>
  )
}
