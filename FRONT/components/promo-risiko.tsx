"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Shield, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import ShareResultsButton from "./share-results-button" // Import the new component

interface PromoRisikoProps {
  riskLevel: "tinggi" | "sedang" | "rendah"
  kecamatanName: string
  biayaPerbaikan?: number
  biayaLayanan?: number
  penghematan?: number
  formatRupiah?: (angka: number) => string
}

export default function PromoRisiko({
  riskLevel,
  kecamatanName,
  biayaPerbaikan,
  biayaLayanan,
  penghematan,
  formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`,
}: PromoRisikoProps) {
  // Tentukan promo berdasarkan tingkat risiko
  const getPromoDetails = () => {
    switch (riskLevel) {
      case "tinggi":
        return {
          title: "PROMO KHUSUS AREA RISIKO TINGGI",
          subtitle: "Perlindungan Premium untuk Area Berisiko Tinggi",
          discount: "20%",
          color: "red",
          features: [
            "Pemeriksaan menyeluruh GRATIS",
            "Pemasangan sistem anti-rayap premium",
            "Garansi 5 tahun",
            "Pemeriksaan rutin setiap 3 bulan",
            "Penanganan darurat 24/7",
          ],
          description:
            "Area Anda memiliki risiko rayap yang tinggi! Dapatkan perlindungan premium dengan diskon khusus 20% untuk semua layanan anti-rayap kami. Lindungi investasi properti Anda sekarang juga!",
          expiry: "31 Mei 2024",
        }
      case "sedang":
        return {
          title: "PROMO KHUSUS AREA RISIKO SEDANG",
          subtitle: "Perlindungan Optimal untuk Area Berisiko Sedang",
          discount: "15%",
          color: "yellow",
          features: [
            "Pemeriksaan menyeluruh GRATIS",
            "Pemasangan sistem anti-rayap standar",
            "Garansi 3 tahun",
            "Pemeriksaan rutin setiap 6 bulan",
            "Dukungan pelanggan prioritas",
          ],
          description:
            "Area Anda memiliki risiko rayap sedang. Dapatkan perlindungan optimal dengan diskon khusus 15% untuk semua layanan anti-rayap kami. Cegah kerusakan sebelum terlambat!",
          expiry: "31 Mei 2024",
        }
      case "rendah":
        return {
          title: "PROMO KHUSUS AREA RISIKO RENDAH",
          subtitle: "Perlindungan Dasar untuk Area Berisiko Rendah",
          discount: "10%",
          color: "green",
          features: [
            "Pemeriksaan dasar GRATIS",
            "Pemasangan sistem anti-rayap dasar",
            "Garansi 2 tahun",
            "Pemeriksaan tahunan",
            "Konsultasi pencegahan",
          ],
          description:
            "Area Anda memiliki risiko rayap yang rendah, namun tetap perlu waspada! Dapatkan perlindungan dasar dengan diskon khusus 10% untuk semua layanan anti-rayap kami. Pencegahan lebih baik daripada pengobatan!",
          expiry: "31 Mei 2024",
        }
    }
  }

  const promo = getPromoDetails()

  return (
    <Card
      className={cn(
        "p-6 bg-black/90 border-l-4 text-white shadow-lg relative overflow-hidden",
        riskLevel === "tinggi" ? "border-red-500" : riskLevel === "sedang" ? "border-yellow-500" : "border-green-500",
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern
            id="shield-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path d="M10,10 L20,20 M30,30 L40,40" stroke="white" strokeWidth="1" strokeDasharray="2,8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#shield-pattern)" />
        </svg>
      </div>

      {/* Promo badge */}
      <div
        className={cn(
          "absolute -top-2 -right-2 transform rotate-12 px-4 py-2 font-bold text-black rounded-md shadow-lg animate-pulse-slow",
          riskLevel === "tinggi" ? "bg-red-500" : riskLevel === "sedang" ? "bg-yellow-500" : "bg-green-500",
        )}
      >
        DISKON {promo.discount}
      </div>

      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl md:text-2xl font-bold headline">{promo.title}</h2>
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

      <div className="mb-6">
        <div
          className={cn(
            "p-4 rounded-md mb-4",
            riskLevel === "tinggi"
              ? "bg-red-900/30 border border-red-900/50"
              : riskLevel === "sedang"
                ? "bg-yellow-900/30 border border-yellow-900/50"
                : "bg-green-900/30 border border-green-900/50",
          )}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={cn(
                "h-5 w-5",
                riskLevel === "tinggi" ? "text-red-500" : riskLevel === "sedang" ? "text-yellow-500" : "text-green-500",
              )}
            />
            <h3 className="font-bold headline">
              Kecamatan {kecamatanName}: Area Risiko {riskLevel.toUpperCase()}
            </h3>
          </div>
        </div>

        <h3 className="text-lg font-bold text-amber-400 mb-2 headline">{promo.subtitle}</h3>
        <p className="text-white/80">{promo.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          className={cn(
            "p-4 rounded-md border",
            riskLevel === "tinggi"
              ? "bg-red-900/20 border-red-900/50"
              : riskLevel === "sedang"
                ? "bg-yellow-900/20 border-yellow-900/50"
                : "bg-green-900/20 border-green-900/50",
          )}
        >
          <h4 className="font-bold text-center mb-4 headline">Fitur Paket Perlindungan</h4>
          <ul className="space-y-2">
            {promo.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle
                  className={cn(
                    "h-5 w-5 mt-0.5 flex-shrink-0",
                    riskLevel === "tinggi"
                      ? "text-red-500"
                      : riskLevel === "sedang"
                        ? "text-yellow-500"
                        : "text-green-500",
                  )}
                />
                <span className="text-white/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
          <h4 className="font-bold text-center mb-4 headline">Detail Promo</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Gift className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Diskon</div>
                <div className="text-white/90">{promo.discount} untuk semua layanan anti-rayap</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Garansi</div>
                <div className="text-white/90">
                  {riskLevel === "tinggi" ? "5 tahun" : riskLevel === "sedang" ? "3 tahun" : "2 tahun"} perlindungan
                  penuh
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Pemeriksaan Rutin</div>
                <div className="text-white/90">
                  Setiap {riskLevel === "tinggi" ? "3 bulan" : riskLevel === "sedang" ? "6 bulan" : "tahun"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-400">Berlaku Hingga</div>
                <div className="text-white/90">{promo.expiry}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 text-lg">
        <Gift className="mr-2 h-5 w-5" />
        Klaim Promo Sekarang
      </Button>

      <p className="text-xs text-white/60 mt-4 text-center">
        *Syarat dan ketentuan berlaku. Promo tidak dapat digabungkan dengan promo lainnya.
      </p>
    </Card>
  )
}
