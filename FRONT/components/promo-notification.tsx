"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Sparkles, CloudRain, Sun, PartyPopper, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PromoNotificationProps {
  riskLevel: "tinggi" | "sedang" | "rendah"
  kecamatanName: string
  onClose: () => void
}

export default function PromoNotification({ riskLevel, kecamatanName, onClose }: PromoNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay showing the notification for a better UX
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Determine if it's rainy or dry season based on current month in Indonesia
  const currentMonth = new Date().getMonth() + 1 // 1-12
  const isRainySeason = currentMonth >= 10 || currentMonth <= 4 // October to April is rainy season
  const seasonalIcon = isRainySeason ? <CloudRain className="h-6 w-6" /> : <Sun className="h-6 w-6" />
  const seasonalText = isRainySeason ? "Musim Hujan" : "Musim Panas"

  // Get discount percentages based on risk level
  const getAreaDiscount = () => {
    switch (riskLevel) {
      case "tinggi":
        return "20%"
      case "sedang":
        return "15%"
      case "rendah":
        return "10%"
      default:
        return "10%"
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
  const areaDiscount = Number.parseInt(getAreaDiscount())
  const seasonalBonus = Number.parseInt(getSeasonalBonus())
  const birthdayDiscount = 6 // Fixed 6% for birthday
  const totalDiscount = areaDiscount + seasonalBonus + birthdayDiscount

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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

  const shimmerVariants = {
    hidden: { backgroundPosition: "200% 0" },
    visible: {
      backgroundPosition: "-200% 0",
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
        ease: "linear",
      },
    },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg bg-black/95 border-l-4 border-yellow-500 rounded-lg shadow-2xl p-6 mx-4"
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              className="absolute -top-5 -right-5 w-32 h-32 overflow-hidden"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-amber-500 text-black font-bold text-center py-1 px-4 shadow-lg transform rotate-45 translate-y-10 translate-x-2">
                HARI INI
              </div>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
              <motion.div
                variants={shimmerVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mb-4 bg-gradient-to-r from-amber-500/0 via-amber-500/80 to-amber-500/0 bg-[length:200%_100%] p-1 rounded-md"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-2 bg-black/80 px-4 py-2 rounded"
                >
                  <Sparkles className="h-6 w-6 text-amber-500" />
                  <h2 className="text-xl font-bold text-amber-400 headline">
                    ADA 3 PROMO SPESIAL UNTUK ANDA KHUSUS HARI INI
                  </h2>
                  <Sparkles className="h-6 w-6 text-amber-500" />
                </motion.div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-white mb-6">
                Jika Anda ambil hari ini, maka Anda akan mendapatkan:
              </motion.p>

              <div className="space-y-4 mb-6">
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-red-900/30 to-amber-900/30 p-4 rounded-md border border-amber-800/30 flex items-start gap-3"
                >
                  <Gift className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-bold text-amber-400">1. Diskon Khusus Area {riskLevel.toUpperCase()}</h3>
                    <p className="text-white/80 text-sm">
                      Diskon {getAreaDiscount()} untuk semua layanan anti-rayap di Kecamatan {kecamatanName}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-blue-900/30 to-amber-900/30 p-4 rounded-md border border-amber-800/30 flex items-start gap-3"
                >
                  {seasonalIcon}
                  <div className="text-left">
                    <h3 className="font-bold text-amber-400">2. Bonus Khusus {seasonalText}</h3>
                    <p className="text-white/80 text-sm">
                      Tambahan diskon {getSeasonalBonus()} untuk pemesanan di {seasonalText.toLowerCase()}
                      {isRainySeason
                        ? " - saat risiko rayap meningkat karena kelembaban tinggi!"
                        : " - waktu terbaik untuk pencegahan sebelum musim hujan tiba!"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 p-4 rounded-md border border-amber-800/30 flex items-start gap-3"
                >
                  <PartyPopper className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-bold text-amber-400">3. Diskon Khusus Ulang Tahun SnC!</h3>
                    <p className="text-white/80 text-sm">
                      Tambahan diskon 6% untuk merayakan 6 tahun SnC Pest Control melayani Anda!
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="bg-black/70 p-4 rounded-md border border-amber-500/50 mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="font-bold text-xl text-amber-400 headline">TOTAL DISKON: {totalDiscount}%</h3>
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>
                <p className="text-white/80 text-sm">
                  Hemat hingga {totalDiscount}% untuk pemesanan hari ini! Penawaran terbatas, jangan lewatkan kesempatan
                  ini.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  onClick={onClose}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 text-lg"
                >
                  Lihat Detail Promo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
