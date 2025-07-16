import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneCall, Calendar, MessageSquare } from "lucide-react"

export default function CTAKonsultasi() {
  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-500 headline mb-3">KONSULTASI GRATIS</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Dapatkan konsultasi gratis dari tim ahli kami untuk mengatasi masalah rayap di properti Anda. Kami siap
          memberikan solusi terbaik sesuai dengan kebutuhan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-6 flex flex-col gap-2 h-auto">
          <PhoneCall className="h-6 w-6" />
          <span className="headline">Telepon Sekarang</span>
        </Button>

        <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-6 flex flex-col gap-2 h-auto">
          <Calendar className="h-6 w-6" />
          <span className="headline">Jadwalkan Kunjungan</span>
        </Button>

        <Button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-6 flex flex-col gap-2 h-auto">
          <MessageSquare className="h-6 w-6" />
          <span className="headline">Chat WhatsApp</span>
        </Button>
      </div>

      <p className="text-center text-white/60 text-sm mt-6">
        *Konsultasi gratis berlaku untuk area Jabodetabek, Surabaya, dan Bandung
      </p>
    </Card>
  )
}
