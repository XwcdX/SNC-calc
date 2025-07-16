"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface TestimoniProps {
  nama: string
  logo: string
  teks: string
  rating: number
}

const testimoni = [
  {
    nama: "VASA HOTEL",
    logo: "/images/logo-vasa-hotel.png",
    teks: "Efisiensi, kejelian dan agresifitas tim SNC sangat membantu perbaikan dan perbaikan di semua area. Thanks and regards.",
    rating: 5,
  },
  {
    nama: "PAKUWON CITY MALL",
    logo: "/images/logo-pakuwon-city-mall.png",
    teks: "Penanganan hama dari tim SNC sangat bagus dan tepat sasaran. Teknisi komunikatif, disiplin menjalankan jadwal, dan aktif memberikan in-house training setiap bulan. Kedisiplinan dan kejujuran mereka jadi alasan utama kami memilih SNC.",
    rating: 5,
  },
  {
    nama: "TUNJUNGAN PLAZA",
    logo: "/images/logo-tunjungan-plaza.png",
    teks: "Terima kasih tim SNC Pest Control selalu memberikan support yang luar biasa, dari management, teknisi, peralatan dan chemical. Tim yang solid dan juga lengkap menunjukan kesungguhan dalam menangani Hama di Tunjungan Plaza.",
    rating: 5,
  },
]

export default function TestimoniCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  const nextSlide = () => {
    setActiveIndex((current) => (current === testimoni.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? testimoni.length - 1 : current - 1))
  }

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay, activeIndex])

  return (
    <div className="mt-8 lg:mt-12">
      <div className="bg-black py-4 px-6 mb-6 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-500 headline text-center">
          PENDAPAT KLIEN TENTANG KAMI
        </h2>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
      </div>

      <div className="relative">
        <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-16 w-40 relative">
              <Image
                src={testimoni[activeIndex].logo || "/placeholder.svg"}
                alt={`Logo ${testimoni[activeIndex].nama}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex">
              {Array.from({ length: testimoni[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 headline text-amber-400">{testimoni[activeIndex].nama}</h3>

          <p className="text-white/90 text-base italic mb-6">"{testimoni[activeIndex].teks}"</p>

          <div className="flex justify-center items-center gap-2 mt-4">
            {testimoni.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setIsAutoplay(false)
                }}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-amber-500" : "bg-gray-600"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Card>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 border-amber-500 text-amber-500 hover:bg-black hover:text-amber-400"
          onClick={() => {
            prevSlide()
            setIsAutoplay(false)
          }}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 border-amber-500 text-amber-500 hover:bg-black hover:text-amber-400"
          onClick={() => {
            nextSlide()
            setIsAutoplay(false)
          }}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
