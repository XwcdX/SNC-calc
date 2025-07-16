import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimoniProps {
  nama: string
  logo: string
  teks: string
  rating: number
}

const Testimoni = ({ nama, logo, teks, rating }: TestimoniProps) => {
  return (
    <Card className="p-5 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-36 relative">
          <Image src={logo || "/placeholder.svg"} alt={`Logo ${nama}`} fill className="object-contain" />
        </div>
        <div className="flex">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
          ))}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3 headline text-amber-400">{nama}</h3>

      <p className="text-white/80 text-sm italic flex-grow">"{teks}"</p>
    </Card>
  )
}

export default function TestimoniPelanggan() {
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

  return (
    <div className="mt-8">
      <div className="bg-black py-4 px-6 mb-6 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-500 headline text-center">
          PENDAPAT KLIEN TENTANG KAMI
        </h2>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimoni.map((item, index) => (
          <Testimoni key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
