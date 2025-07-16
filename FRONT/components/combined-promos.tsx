"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, CheckCircle, AlertTriangle, Calendar, PartyPopper, Sparkles, CloudRain, Sun, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ShareResultsButton from "./share-results-button"
import { motion } from "framer-motion"
import TotalCalculation from "./total-calculation" // Import komponen baru

interface CombinedPromosProps {
  riskLevel: "tinggi" | "sedang" | "rendah"
  kecamatanName: string
  biayaPerbaikan?: number
  biayaLayanan?: number
  penghematan?: number
  formatRupiah?: (angka: number) => string
}

export default function CombinedPromos({
  riskLevel,
  kecamatanName,
  biayaPerbaikan,
  biayaLayanan,
  penghematan,
  formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`,
}: CombinedPromosProps) {
  // Determine if it's rainy or dry season based on current month in Indonesia
  const currentMonth = new Date().getMonth() + 1 // 1-12
  const isRainySeason = currentMonth >= 10 || currentMonth <= 4 // October to April is rainy season
  const seasonalIcon = isRainySeason ? (
    <CloudRain className="h-6 w-6 text-blue-400" />
  ) : (
    <Sun className="h-6 w-6 text-yellow-400" />
  )
  const seasonalText = isRainySeason ? "Musim Hujan" : "Musim Panas"

  // Get area discount based on risk level
  const getAreaDiscount = () => {
    switch (riskLevel) {
      case "tinggi":
        return {
          percentage: "20%",
          title: "PROMO KHUSUS AREA RISIKO TINGGI",
          subtitle: "Perlindungan Premium untuk Area Berisiko Tinggi",
          features: [
            "Pemeriksaan menyeluruh GRATIS",
            "Pemasangan sistem anti-rayap premium",
            "Garansi 5 tahun",
            "Pemeriksaan rutin setiap 3 bulan",
            "Penanganan darurat 24/7",
          ],
          description:
            "Area Anda memiliki risiko rayap yang tinggi! Dapatkan perlindungan premium dengan diskon khusus 20% untuk semua layanan anti-rayap kami. Lindungi investasi properti Anda sekarang juga!",
          color: "red",
        }
      case "sedang":
        return {
          percentage: "15%",
          title: "PROMO KHUSUS AREA RISIKO SEDANG",
          subtitle: "Perlindungan Optimal untuk Area Berisiko Sedang",
          features: [
            "Pemeriksaan menyeluruh GRATIS",
            "Pemasangan sistem anti-rayap standar",
            "Garansi 3 tahun",
            "Pemeriksaan rutin setiap 6 bulan",
            "Dukungan pelanggan prioritas",
          ],
          description:
            "Area Anda memiliki risiko rayap sedang. Dapatkan perlindungan optimal dengan diskon khusus 15% untuk semua layanan anti-rayap kami. Cegah kerusakan sebelum terlambat!",
          color: "yellow",
        }
      case "rendah":
        return {
          percentage: "10%",
          title: "PROMO KHUSUS AREA RISIKO RENDAH",
          subtitle: "Perlindungan Dasar untuk Area Berisiko Rendah",
          features: [
            "Pemeriksaan dasar GRATIS",
            "Pemasangan sistem anti-rayap dasar",
            "Garansi 2 tahun",
            "Pemeriksaan tahunan",
            "Konsultasi pencegahan",
          ],
          description:
            "Area Anda memiliki risiko rayap yang rendah, namun tetap perlu waspada! Dapatkan perlindungan dasar dengan diskon khusus 10% untuk semua layanan anti-rayap kami. Pencegahan lebih baik daripada pengobatan!",
          color: "green",
        }
    }
  }

  // Get seasonal bonus based on season and risk level
  const getSeasonalBonus = () => {
    if (isRainySeason) {
      // Higher discounts during rainy season as risk is higher
      switch (riskLevel) {
        case "tinggi":
          return "10%"
        case "sedang":
          return "8%"
        case "rendah":
          return "5%"
        default:
          return "5%"
      }
    } else {
      // Lower discounts during dry season
      switch (riskLevel) {
        case "tinggi":
          return "7%"
        case "sedang":
          return "5%"
        case "rendah":
          return "3%"
        default:
          return "3%"
      }
    }
  }

  // Calculate total discount
  const areaDiscount = Number.parseInt(getAreaDiscount().percentage)
  const seasonalBonus = Number.parseInt(getSeasonalBonus())
  const birthdayDiscount = 6 // Fixed 6% for birthday
  const totalDiscount = areaDiscount + seasonalBonus + birthdayDiscount

  const areaPromo = getAreaDiscount()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Gunakan komponen TotalCalculation baru */}
      <TotalCalculation
        riskLevel={riskLevel}
        biayaLayanan={biayaLayanan}
        biayaPerbaikan={biayaPerbaikan}
        totalDiscount={totalDiscount}
        areaDiscount={areaDiscount}
        seasonalBonus={seasonalBonus}
        birthdayDiscount={birthdayDiscount}
        formatRupiah={formatRupiah}
        isRainySeason={isRainySeason}
      />

      {/* Header with total discount */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-black/90 border-l-4 border-amber-500 text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute inset-0">
              <pattern
                id="discount-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <path d="M10,10 L20,20 M30,30 L40,40" stroke="white" strokeWidth="1" strokeDasharray="2,8" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#discount-pattern)" />
            </svg>
          </div>

          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl md:text-2xl font-bold headline">PROMO SPESIAL UNTUK ANDA</h2>
            </div>
            <ShareResultsButton
              riskLevel={riskLevel}
              kecamatanName={kecamatanName}
              biayaPerbaikan={biayaPerbaikan}
              biayaLayanan={biayaLayanan}
              penghematan={penghematan}
              formatRupiah={formatRupiah}
            />
          </div>

          <div className="bg-gradient-to-r from-amber-900/30 to-amber-900/10 p-4 rounded-md border border-amber-800/30 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-amber-400" />
                <h3 className="font-bold text-amber-300 headline">TOTAL DISKON HARI INI:</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-3xl text-white headline animate-pulse-slow">{totalDiscount}%</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>0%</span>
                <span>50%</span>
              </div>
              <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full"
                  style={{ width: `${Math.min(totalDiscount * 2, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
              <div className="bg-black/30 p-2 rounded-md">
                <div className="font-bold text-amber-400">{areaPromo.percentage}</div>
                <div className="text-white/70 text-xs">Diskon Area</div>
              </div>
              <div className="bg-black/30 p-2 rounded-md">
                <div className="font-bold text-amber-400">{getSeasonalBonus()}</div>
                <div className="text-white/70 text-xs">Bonus {seasonalText}</div>
              </div>
              <div className="bg-black/30 p-2 rounded-md">
                <div className="font-bold text-amber-400">6%</div>
                <div className="text-white/70 text-xs">Diskon Ulang Tahun</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/80 bg-black/20 p-3 rounded-md">
            Dapatkan total diskon <span className="font-bold text-amber-400">{totalDiscount}%</span> untuk pemesanan
            hari ini! Kombinasikan diskon area, bonus musiman, dan diskon ulang tahun untuk penghematan maksimal.
            Penawaran terbatas, segera klaim sekarang!
          </p>
        </Card>
      </motion.div>

      {/* Bento box layout for promos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Area-based promo */}
        <motion.div variants={itemVariants}>
          <Card
            className={cn(
              "h-full p-6 bg-black/90 border-l-4 text-white shadow-lg relative overflow-hidden",
              riskLevel === "tinggi"
                ? "border-red-500"
                : riskLevel === "sedang"
                  ? "border-yellow-500"
                  : "border-green-500",
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
              DISKON {areaPromo.percentage}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-bold headline">{areaPromo.title}</h2>
            </div>

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
                    riskLevel === "tinggi"
                      ? "text-red-500"
                      : riskLevel === "sedang"
                        ? "text-yellow-500"
                        : "text-green-500",
                  )}
                />
                <h3 className="font-bold headline">
                  Kecamatan {kecamatanName}: Area Risiko {riskLevel.toUpperCase()}
                </h3>
              </div>
            </div>

            <h3 className="text-lg font-bold text-amber-400 mb-2 headline">{areaPromo.subtitle}</h3>
            <p className="text-white/80 mb-4">{areaPromo.description}</p>

            <div
              className={cn(
                "p-3 rounded-md border mb-4",
                riskLevel === "tinggi"
                  ? "bg-red-900/20 border-red-900/50"
                  : riskLevel === "sedang"
                    ? "bg-yellow-900/20 border-yellow-900/50"
                    : "bg-green-900/20 border-green-900/50",
              )}
            >
              <h4 className="font-bold text-center mb-3 headline">Fitur Paket Perlindungan</h4>
              <ul className="space-y-2">
                {areaPromo.features.map((feature, index) => (
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

            <Button
              className={cn(
                "w-full font-bold py-3 text-black",
                riskLevel === "tinggi"
                  ? "bg-red-500 hover:bg-red-600"
                  : riskLevel === "sedang"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600",
              )}
            >
              <Gift className="mr-2 h-5 w-5" />
              Klaim Promo Area
            </Button>
          </Card>
        </motion.div>

        {/* Seasonal promo */}
        <motion.div variants={itemVariants}>
          <Card
            className={cn(
              "h-full p-6 bg-black/90 border-l-4 text-white shadow-lg relative overflow-hidden",
              isRainySeason ? "border-blue-500" : "border-yellow-500",
            )}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                <pattern
                  id="seasonal-pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  {isRainySeason ? (
                    <path d="M10,10 L15,15 M25,25 L30,30" stroke="white" strokeWidth="1" strokeDasharray="1,5" />
                  ) : (
                    <circle cx="20" cy="20" r="3" fill="white" fillOpacity="0.2" />
                  )}
                </pattern>
                <rect width="100%" height="100%" fill="url(#seasonal-pattern)" />
              </svg>
            </div>

            {/* Promo badge */}
            <div
              className={cn(
                "absolute -top-2 -right-2 transform rotate-12 px-4 py-2 font-bold text-black rounded-md shadow-lg animate-pulse-slow",
                isRainySeason ? "bg-blue-500" : "bg-yellow-500",
              )}
            >
              BONUS {getSeasonalBonus()}
            </div>

            <div className="flex items-center gap-2 mb-4">
              {seasonalIcon}
              <h2 className="text-xl font-bold headline">
                BONUS KHUSUS {isRainySeason ? "MUSIM HUJAN" : "MUSIM PANAS"}
              </h2>
            </div>

            <div
              className={cn(
                "p-4 rounded-md mb-4",
                isRainySeason
                  ? "bg-blue-900/30 border border-blue-900/50"
                  : "bg-yellow-900/30 border border-yellow-900/50",
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar className={cn("h-5 w-5", isRainySeason ? "text-blue-400" : "text-yellow-400")} />
                <h3 className="font-bold headline">
                  {isRainySeason ? "Oktober - April 2024" : "Mei - September 2024"}
                </h3>
              </div>
            </div>

            <h3 className="text-lg font-bold text-amber-400 mb-2 headline">
              {isRainySeason ? "Perlindungan Ekstra di Musim Hujan" : "Persiapan Terbaik Sebelum Musim Hujan"}
            </h3>
            <p className="text-white/80 mb-4">
              {isRainySeason
                ? `Musim hujan meningkatkan risiko serangan rayap hingga 70%! Kelembaban tinggi menciptakan kondisi ideal bagi rayap untuk berkembang biak dan menyerang struktur bangunan Anda. Dapatkan bonus khusus musim hujan ${getSeasonalBonus()} untuk perlindungan ekstra.`
                : `Musim panas adalah waktu terbaik untuk mempersiapkan rumah Anda menghadapi serangan rayap di musim hujan mendatang. Manfaatkan bonus khusus musim panas ${getSeasonalBonus()} untuk tindakan pencegahan yang efektif.`}
            </p>

            <div
              className={cn(
                "p-3 rounded-md border mb-4",
                isRainySeason ? "bg-blue-900/20 border-blue-900/50" : "bg-yellow-900/20 border-yellow-900/50",
              )}
            >
              <h4 className="font-bold text-center mb-3 headline">
                {isRainySeason ? "Mengapa Penting di Musim Hujan?" : "Persiapan Musim Panas"}
              </h4>
              <ul className="space-y-2">
                {(isRainySeason
                  ? [
                      "Kelembaban tinggi meningkatkan aktivitas rayap",
                      "Risiko kerusakan struktural meningkat 3x lipat",
                      "Koloni rayap berkembang lebih cepat",
                      "Penyebaran rayap ke area baru lebih tinggi",
                      "Kerusakan dapat terjadi dalam waktu singkat",
                    ]
                  : [
                      "Kondisi kering ideal untuk pemasangan penghalang",
                      "Deteksi lebih mudah saat aktivitas rayap menurun",
                      "Waktu terbaik untuk perbaikan struktural",
                      "Persiapan sebelum peningkatan risiko di musim hujan",
                      "Efektivitas bahan anti-rayap lebih tinggi",
                    ]
                ).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className={cn(
                        "h-5 w-5 mt-0.5 flex-shrink-0",
                        isRainySeason ? "text-blue-400" : "text-yellow-400",
                      )}
                    />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              className={cn(
                "w-full font-bold py-3 text-black",
                isRainySeason ? "bg-blue-500 hover:bg-blue-600" : "bg-yellow-500 hover:bg-yellow-600",
              )}
            >
              {seasonalIcon}
              <span className="ml-2">Klaim Bonus {seasonalText}</span>
            </Button>
          </Card>
        </motion.div>

        {/* Birthday promo */}
        <motion.div variants={itemVariants} className="md:col-span-2">
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

            <div className="flex items-center gap-2 mb-4">
              <PartyPopper className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl md:text-2xl font-bold headline">PROMO SPESIAL ULANG TAHUN</h2>
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl md:text-4xl font-bold headline text-amber-400 mb-2">
                6 TAHUN SnC PEST CONTROL
              </div>
              <div className="text-xl text-white/90 mb-4">Diskon 6% untuk Semua Layanan!</div>
              <p className="text-white/80">
                Rayakan ulang tahun ke-6 SnC Pest Control bersama kami! Dapatkan diskon spesial 6% untuk semua layanan
                anti-rayap dan pest control lainnya. Terima kasih atas kepercayaan Anda selama 6 tahun ini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
                <div className="flex items-start gap-2 mb-3">
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
              </div>

              <div className="bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <div className="font-bold text-amber-400 mb-1">Merchandise Eksklusif</div>
                  <p className="text-sm text-white/80">
                    Dapatkan merchandise SnC Pest Control edisi terbatas untuk setiap pemesanan
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <div className="font-bold text-amber-400 mb-1">Pemeriksaan Bonus</div>
                  <p className="text-sm text-white/80">Dapatkan 1x pemeriksaan tambahan gratis dalam 1 tahun pertama</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="font-bold text-amber-400 mb-2 headline">Berlaku untuk semua layanan:</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Layanan anti-rayap",
                    "Pengendalian kecoa",
                    "Pengendalian tikus",
                    "Pengendalian nyamuk",
                    "Fumigasi",
                    "Sanitasi",
                  ].map((service, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="text-white/90 text-sm">{service}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 p-4 rounded-md border border-amber-800/50 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24">
                  <Sparkles className="h-8 w-8 text-amber-500/50 animate-pulse" />
                </div>
                <h3 className="font-bold text-amber-400 mb-2 headline">Kombinasikan dengan promo lainnya!</h3>
                <p className="text-sm text-white/80">
                  Promo ulang tahun dapat digabungkan dengan promo area dan bonus musiman untuk total diskon hingga{" "}
                  <span className="font-bold text-amber-300">{totalDiscount}%</span>!
                </p>
              </div>
            </div>

            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 text-lg">
              <PartyPopper className="mr-2 h-5 w-5" />
              Klaim Promo Ulang Tahun
            </Button>

            <p className="text-xs text-white/60 mt-4 text-center">
              *Promo ulang tahun berlaku hingga 30 Juni 2024. Syarat dan ketentuan berlaku.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Call to action */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-r from-amber-900/50 to-black/90 border-l-4 border-amber-500 text-white shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold headline text-amber-400 mb-2">KLAIM SEMUA PROMO HARI INI!</h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Jangan lewatkan kesempatan untuk mendapatkan total diskon{" "}
              <span className="font-bold text-amber-300">{totalDiscount}%</span> dengan mengkombinasikan semua promo
              spesial kami. Hubungi kami sekarang untuk konsultasi gratis dan penawaran khusus!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg">
              <Share2 className="mr-2 h-5 w-5" />
              Bagikan ke WhatsApp
            </Button>
            <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 text-lg">
              <Gift className="mr-2 h-5 w-5" />
              Klaim Semua Promo
            </Button>
          </div>

          <p className="text-xs text-white/60 mt-4 text-center">
            *Total diskon {totalDiscount}% berlaku untuk pemesanan hari ini. Penawaran terbatas.
          </p>
        </Card>
      </motion.div>
    </motion.div>
  )
}
