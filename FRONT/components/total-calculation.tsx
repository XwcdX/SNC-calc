"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import {
  Calculator,
  CheckCircle,
  MapPin,
  CloudRain,
  Sun,
  PartyPopper,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Percent,
  DollarSign,
  Zap,
} from "lucide-react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"

interface TotalCalculationProps {
  riskLevel: "tinggi" | "sedang" | "rendah"
  biayaLayanan?: number
  biayaPerbaikan?: number
  totalDiscount: number
  areaDiscount: number
  seasonalBonus: number
  birthdayDiscount: number
  formatRupiah: (angka: number) => string
  isRainySeason: boolean
}

export default function TotalCalculation({
  riskLevel,
  biayaLayanan = 0,
  biayaPerbaikan = 0,
  totalDiscount,
  areaDiscount,
  seasonalBonus,
  birthdayDiscount,
  formatRupiah,
  isRainySeason,
}: TotalCalculationProps) {
  // Hitung nominal diskon dan harga akhir
  const diskonArea = Math.round((biayaLayanan * areaDiscount) / 100)
  const diskonSeasonal = Math.round((biayaLayanan * seasonalBonus) / 100)
  const diskonUlangTahun = Math.round((biayaLayanan * birthdayDiscount) / 100)
  const totalNilaiDiskon = diskonArea + diskonSeasonal + diskonUlangTahun
  const biayaAkhir = biayaLayanan - totalNilaiDiskon

  // Hitung total penghematan (dari biaya perbaikan + dari diskon)
  const totalPenghematan = biayaPerbaikan - biayaAkhir
  const persentasePenghematan = biayaPerbaikan ? Math.round((totalPenghematan / biayaPerbaikan) * 100) : 0

  // State untuk animasi
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Refs untuk intersection observer
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const controls = useAnimation()

  // Trigger animasi saat komponen terlihat
  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)

      // Trigger animasi expand setelah delay
      const timer = setTimeout(() => {
        setIsExpanded(true)
      }, 1000)

      // Trigger show details setelah expand
      const detailsTimer = setTimeout(() => {
        setShowDetails(true)
      }, 2000)

      // Tandai animasi selesai
      const completeTimer = setTimeout(() => {
        setAnimationComplete(true)
      }, 3500)

      return () => {
        clearTimeout(timer)
        clearTimeout(detailsTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isInView, controls, hasAnimated])

  // Animasi variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.8,
        times: [0, 0.5, 1],
      },
    },
  }

  const pulseVariants = {
    hidden: { opacity: 0.7, scale: 1 },
    visible: {
      opacity: 1,
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  const expandVariants = {
    collapsed: { height: "auto", opacity: 1 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Animasi counter untuk angka
  const Counter = ({ value, prefix = "", suffix = "", className = "" }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!animationComplete) return

      const startValue = 0
      const duration = 1500
      const startTime = Date.now()

      const updateValue = () => {
        const now = Date.now()
        const elapsedTime = now - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(easeOutQuart * value)

        if (currentValue !== displayValue) {
          setDisplayValue(currentValue)
        }

        if (progress < 1) {
          requestAnimationFrame(updateValue)
        } else {
          setDisplayValue(value)
        }
      }

      requestAnimationFrame(updateValue)
    }, [value, animationComplete])

    return (
      <span className={className}>
        {prefix}
        {displayValue.toLocaleString("id-ID")}
        {suffix}
      </span>
    )
  }

  return (
    <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="mb-6">
      <Card className="p-6 bg-gradient-to-r from-black/90 to-amber-900/50 border-l-4 border-amber-500 text-white shadow-lg relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern
              id="calculation-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path d="M10,10 L20,20 M30,30 L40,40" stroke="white" strokeWidth="1" strokeDasharray="2,8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#calculation-pattern)" />
          </svg>
        </div>

        {/* Animated particles */}
        <AnimatePresence>
          {animationComplete && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    opacity: 0,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    scale: [0, 0.5, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-amber-500"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <motion.div variants={pulseVariants} animate="visible" className="bg-amber-500/20 p-2 rounded-full">
            <Calculator className="h-6 w-6 text-amber-500" />
          </motion.div>
          <h2 className="text-xl md:text-2xl font-bold headline">PERHITUNGAN TOTAL</h2>

          {/* Animated badge */}
          <motion.div
            variants={highlightVariants}
            className="ml-auto bg-gradient-to-r from-amber-500 to-amber-600 text-black px-3 py-1 rounded-full font-bold text-sm shadow-lg"
          >
            HEMAT {persentasePenghematan}%
          </motion.div>
        </motion.div>

        {/* Main content */}
        <motion.div
          variants={expandVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left column */}
          <div className="space-y-4">
            {/* Highlight box */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-black/60 to-amber-900/30 p-5 rounded-md border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)] transform transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:border-amber-500/70"
            >
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate={showDetails ? "visible" : "hidden"}
                className="text-center"
              >
                <h3 className="text-lg font-bold text-amber-400 mb-3 headline">Yang Harus Anda Bayar</h3>
                <motion.div
                  variants={highlightVariants}
                  className="text-3xl md:text-4xl font-bold text-green-400 headline mb-2"
                >
                  {animationComplete ? (
                    <Counter value={biayaAkhir} prefix={formatRupiah(0).replace("0", "")} />
                  ) : (
                    formatRupiah(0)
                  )}
                </motion.div>

                <div className="flex justify-center items-center gap-2 mt-3">
                  <motion.div
                    variants={pulseVariants}
                    animate="visible"
                    className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full"
                  >
                    <Percent className="h-3 w-3 text-amber-500" />
                    <span className="text-amber-400 text-xs font-bold">DISKON {totalDiscount}%</span>
                  </motion.div>

                  <motion.div
                    variants={pulseVariants}
                    animate="visible"
                    className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full"
                  >
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-400 text-xs font-bold">HEMAT {persentasePenghematan}%</span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
                  className="h-px bg-amber-500/30 my-3 mx-auto"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 px-6 rounded-md shadow-lg flex items-center justify-center gap-2 w-full"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Biaya & Penghematan */}
            <motion.div variants={itemVariants} className="bg-black/40 p-4 rounded-md border border-amber-800/30">
              <motion.div variants={fadeInVariants} initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-amber-400 headline">Biaya & Penghematan</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center group">
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      Estimasi Biaya Perbaikan:
                    </span>
                    <motion.span
                      variants={numberVariants}
                      className="font-bold text-white group-hover:text-amber-300 transition-colors"
                    >
                      {animationComplete ? (
                        <Counter value={biayaPerbaikan} prefix={formatRupiah(0).replace("0", "")} />
                      ) : (
                        formatRupiah(0)
                      )}
                    </motion.span>
                  </div>

                  <div className="flex justify-between items-center group">
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      Biaya Layanan (Sebelum Diskon):
                    </span>
                    <motion.span
                      variants={numberVariants}
                      className="font-bold text-white group-hover:text-amber-300 transition-colors"
                    >
                      {animationComplete ? (
                        <Counter value={biayaLayanan} prefix={formatRupiah(0).replace("0", "")} />
                      ) : (
                        formatRupiah(0)
                      )}
                    </motion.span>
                  </div>

                  <div className="flex justify-between items-center group">
                    <span className="text-green-400 group-hover:text-green-300 transition-colors">
                      Biaya Layanan (Setelah Diskon):
                    </span>
                    <motion.span
                      variants={highlightVariants}
                      className="font-bold text-green-400 group-hover:text-green-300 transition-colors"
                    >
                      {animationComplete ? (
                        <Counter value={biayaAkhir} prefix={formatRupiah(0).replace("0", "")} />
                      ) : (
                        formatRupiah(0)
                      )}
                    </motion.span>
                  </div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
                    className="h-px bg-amber-800/30 my-2"
                  />

                  <div className="flex justify-between items-center group">
                    <span className="text-amber-300 group-hover:text-amber-200 transition-colors">
                      Total Penghematan:
                    </span>
                    <motion.span
                      variants={highlightVariants}
                      className="font-bold text-amber-300 group-hover:text-amber-200 transition-colors"
                    >
                      {animationComplete ? (
                        <Counter value={totalPenghematan} prefix={formatRupiah(0).replace("0", "")} />
                      ) : (
                        formatRupiah(0)
                      )}
                    </motion.span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="text-xs text-white/70 flex justify-between mb-1">
                    <span>Biaya Layanan</span>
                    <span>Biaya Perbaikan</span>
                  </div>
                  <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(biayaAkhir / biayaPerbaikan) * 100}%` }}
                      transition={{ delay: 2.8, duration: 1.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-green-500 to-amber-500 h-full rounded-full relative"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          x: ["0%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1,
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Rincian Diskon */}
            <motion.div variants={itemVariants} className="bg-black/40 p-4 rounded-md border border-amber-800/30">
              <motion.div variants={fadeInVariants} initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                <div className="flex items-center gap-2 mb-3">
                  <Percent className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-amber-400 headline">Rincian Diskon</h3>
                </div>

                <div className="space-y-3">
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-between items-center group bg-gradient-to-r from-red-900/10 to-transparent p-2 rounded-md hover:from-red-900/20 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-400" />
                      <span className="text-white/80 group-hover:text-white transition-colors">
                        Diskon Area {riskLevel.toUpperCase()}:
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80">{areaDiscount}%</span>
                      <motion.span variants={numberVariants} className="text-red-400 font-bold">
                        (-
                        {animationComplete ? (
                          <Counter value={diskonArea} prefix={formatRupiah(0).replace("0", "")} />
                        ) : (
                          formatRupiah(0)
                        )}
                        )
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex justify-between items-center group bg-gradient-to-r from-blue-900/10 to-transparent p-2 rounded-md hover:from-blue-900/20 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      {isRainySeason ? (
                        <CloudRain className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Sun className="h-4 w-4 text-yellow-400" />
                      )}
                      <span className="text-white/80 group-hover:text-white transition-colors">
                        Bonus {isRainySeason ? "Musim Hujan" : "Musim Panas"}:
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80">{seasonalBonus}%</span>
                      <motion.span variants={numberVariants} className="text-blue-400 font-bold">
                        (-
                        {animationComplete ? (
                          <Counter value={diskonSeasonal} prefix={formatRupiah(0).replace("0", "")} />
                        ) : (
                          formatRupiah(0)
                        )}
                        )
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex justify-between items-center group bg-gradient-to-r from-amber-900/10 to-transparent p-2 rounded-md hover:from-amber-900/20 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <PartyPopper className="h-4 w-4 text-amber-400" />
                      <span className="text-white/80 group-hover:text-white transition-colors">
                        Diskon Ulang Tahun:
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80">{birthdayDiscount}%</span>
                      <motion.span variants={numberVariants} className="text-amber-400 font-bold">
                        (-
                        {animationComplete ? (
                          <Counter value={diskonUlangTahun} prefix={formatRupiah(0).replace("0", "")} />
                        ) : (
                          formatRupiah(0)
                        )}
                        )
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
                    className="h-px bg-amber-800/30 my-2"
                  />

                  <motion.div
                    variants={highlightVariants}
                    className="flex justify-between items-center bg-gradient-to-r from-green-900/20 to-transparent p-3 rounded-md"
                  >
                    <span className="font-bold text-white">Total Diskon:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{totalDiscount}%</span>
                      <span className="font-bold text-green-400">
                        (-
                        {animationComplete ? (
                          <Counter value={totalNilaiDiskon} prefix={formatRupiah(0).replace("0", "")} />
                        ) : (
                          formatRupiah(0)
                        )}
                        )
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Keuntungan Tambahan */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-amber-900/30 to-amber-900/10 p-4 rounded-md border border-amber-800/30"
            >
              <motion.div variants={fadeInVariants} initial="hidden" animate={showDetails ? "visible" : "hidden"}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <h3 className="font-bold text-amber-400 headline">Keuntungan Tambahan</h3>
                </div>

                <ul className="space-y-3">
                  {[
                    "Garansi layanan hingga 5 tahun",
                    "Pemeriksaan berkala gratis",
                    "Merchandise eksklusif SnC",
                    "Dukungan pelanggan 24/7",
                    "Teknisi bersertifikasi",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      custom={index}
                      className="flex items-start gap-2 group"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 2.5 + index * 0.2,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-400 group-hover:text-green-300 transition-colors" />
                        </motion.div>
                      </div>
                      <span className="text-white/80 group-hover:text-white transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 0.5 }}
                  className="mt-4 bg-black/30 p-3 rounded-md border border-amber-800/20"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <p className="text-sm text-amber-300 font-bold">Berlaku untuk pemesanan hari ini!</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
