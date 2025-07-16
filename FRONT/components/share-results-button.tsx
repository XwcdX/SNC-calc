"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Copy, Check, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareResultsButtonProps {
  riskLevel: "tinggi" | "sedang" | "rendah"
  kecamatanName: string
  biayaPerbaikan?: number
  biayaLayanan?: number
  penghematan?: number
  formatRupiah?: (angka: number) => string
}

export default function ShareResultsButton({
  riskLevel,
  kecamatanName,
  biayaPerbaikan,
  biayaLayanan,
  penghematan,
  formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`,
}: ShareResultsButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Determine discount percentages based on risk level
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

  // Determine if it's rainy or dry season based on current month in Indonesia
  const currentMonth = new Date().getMonth() + 1 // 1-12
  const isRainySeason = currentMonth >= 10 || currentMonth <= 4 // October to April is rainy season
  const seasonalText = isRainySeason ? "Musim Hujan" : "Musim Panas"

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

  // Create the message to be shared
  const createShareMessage = () => {
    let message = `*HASIL ANALISIS RISIKO RAYAP SNC PEST CONTROL*\n\n`
    message += `🏠 *Lokasi:* Kecamatan ${kecamatanName}\n`
    message += `⚠️ *Tingkat Risiko:* ${riskLevel.toUpperCase()}\n\n`

    if (biayaPerbaikan && biayaLayanan && penghematan) {
      message += `💰 *Estimasi Biaya Perbaikan Tanpa Perlindungan:* ${formatRupiah(biayaPerbaikan)}\n`
      message += `🛡️ *Biaya Layanan Anti-Rayap:* ${formatRupiah(biayaLayanan)}\n`
      message += `💯 *Potensi Penghematan:* ${formatRupiah(penghematan)}\n\n`
    }

    message += `*PROMO SPESIAL HARI INI! TOTAL DISKON ${totalDiscount}%*\n\n`
    message += `1️⃣ Diskon Area ${riskLevel.toUpperCase()}: ${getAreaDiscount()}\n`
    message += `2️⃣ Bonus ${seasonalText}: ${getSeasonalBonus()}\n`
    message += `3️⃣ Diskon Ulang Tahun SNC: 6%\n\n`

    message += `🔥 *Klaim Sekarang!* 🔥\n`
    message += `Hubungi kami di 0812-3456-7890 dan sebutkan kode: *SNC-${kecamatanName.substring(0, 3).toUpperCase()}${
      riskLevel.charAt(0).toUpperCase() + new Date().getDate()
    }*\n\n`

    message += `Promo berlaku hingga hari ini pukul 23:59 WIB.\n`
    message += `SNC SAFE & CARE PEST CONTROL - Solusi Terpercaya untuk Masalah Rayap Anda!`

    return message
  }

  const shareMessage = createShareMessage()

  // Create WhatsApp share link
  const whatsappShareLink = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Share directly to WhatsApp
  const shareToWhatsApp = () => {
    window.open(whatsappShareLink, "_blank")
  }

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold"
          size="lg"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Bagikan Hasil
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute right-0 mt-2 w-72 bg-black/95 border border-green-600/50 rounded-lg shadow-xl z-10"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-white">Bagikan Hasil</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={shareToWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Bagikan ke WhatsApp
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={copyToClipboard}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center gap-2"
                    disabled={isCopied}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-5 w-5" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5" />
                        Salin Teks
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>

              <div className="mt-3 text-xs text-white/60 text-center">
                Bagikan hasil analisis dan promo spesial dengan keluarga atau teman Anda!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
