"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Bug, ChevronDown, ChevronUp, Shield, Clock, Banknote, Home, CheckCircle, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FAQItemProps {
  question: string
  answer: React.ReactNode
  icon: React.ReactNode
  defaultOpen?: boolean
}

const FAQItem = ({ question, answer, icon, defaultOpen = false }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        "border border-amber-800/30 rounded-md overflow-hidden transition-all duration-300",
        isOpen ? "bg-amber-950/30" : "bg-black/40",
      )}
    >
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="text-amber-500 flex-shrink-0">{icon}</div>
          <h3 className="font-bold text-white">{question}</h3>
        </div>
        <div className="text-amber-500">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>
      {isOpen && <div className="px-4 pb-4 pt-1 text-white/80 border-t border-amber-800/30">{answer}</div>}
    </div>
  )
}

export default function FAQSection() {
  const faqItems: FAQItemProps[] = [
    {
      question: "Apa itu layanan anti-rayap?",
      answer: (
        <div className="space-y-2">
          <p>
            Layanan anti-rayap adalah solusi profesional untuk mencegah, mendeteksi, dan mengatasi serangan rayap pada
            bangunan. Layanan ini meliputi:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Inspeksi menyeluruh untuk mendeteksi keberadaan rayap</li>
            <li>Pemasangan sistem penghalang kimia di sekitar dan di bawah bangunan</li>
            <li>Pemasangan umpan rayap di area strategis</li>
            <li>Penanganan langsung pada koloni rayap yang ditemukan</li>
            <li>Pemantauan berkala untuk memastikan efektivitas perlindungan</li>
          </ul>
        </div>
      ),
      icon: <Shield className="h-5 w-5" />,
      defaultOpen: true,
    },
    {
      question: "Berapa lama perlindungan anti-rayap bertahan?",
      answer: (
        <div className="space-y-2">
          <p>Durasi perlindungan anti-rayap tergantung pada jenis treatment yang digunakan:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-semibold">Penghalang kimia tanah:</span> Bertahan 3-5 tahun tergantung jenis bahan
              kimia dan kondisi tanah
            </li>
            <li>
              <span className="font-semibold">Sistem umpan rayap:</span> Perlu pemantauan dan penggantian umpan secara
              berkala (biasanya setiap 3-6 bulan)
            </li>
            <li>
              <span className="font-semibold">Penghalang fisik:</span> Dapat bertahan 10+ tahun jika dipasang dengan
              benar
            </li>
          </ul>
          <p className="text-amber-300 text-sm mt-2">
            SNC menawarkan garansi layanan selama 5 tahun dengan pemeriksaan berkala untuk memastikan perlindungan
            optimal.
          </p>
        </div>
      ),
      icon: <Clock className="h-5 w-5" />,
    },
    {
      question: "Berapa biaya layanan anti-rayap?",
      answer: (
        <div className="space-y-2">
          <p>Biaya layanan anti-rayap bervariasi tergantung pada beberapa faktor:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ukuran dan luas bangunan</li>
            <li>Tingkat infestasi rayap (jika sudah ada)</li>
            <li>Jenis konstruksi dan material bangunan</li>
            <li>Jenis treatment yang dipilih</li>
            <li>Lokasi dan aksesibilitas properti</li>
          </ul>
          <p>
            Untuk rumah tinggal standar, biaya berkisar antara Rp 1,5 juta hingga Rp 5 juta, tergantung faktor-faktor di
            atas.
          </p>
          <p className="text-amber-300 text-sm mt-2">
            Gunakan kalkulator risiko rayap kami untuk mendapatkan estimasi biaya yang lebih akurat sesuai dengan
            kondisi properti Anda.
          </p>
        </div>
      ),
      icon: <Banknote className="h-5 w-5" />,
    },
    {
      question: "Apakah bahan kimia anti-rayap berbahaya bagi manusia dan hewan peliharaan?",
      answer: (
        <div className="space-y-2">
          <p>Bahan kimia anti-rayap modern dirancang dengan mempertimbangkan keamanan manusia dan hewan peliharaan:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bahan aktif ditargetkan khusus untuk serangga dan memiliki toksisitas rendah bagi mamalia</li>
            <li>Aplikasi dilakukan oleh teknisi terlatih dengan peralatan khusus untuk meminimalkan paparan</li>
            <li>Setelah aplikasi dan pengeringan, area yang ditreatment aman untuk dihuni kembali</li>
          </ul>
          <p>
            SNC menggunakan produk anti-rayap yang telah tersertifikasi dan disetujui oleh badan regulasi terkait,
            dengan fokus pada keamanan dan efektivitas.
          </p>
          <p className="text-amber-300 text-sm mt-2">
            Kami juga menawarkan opsi treatment ramah lingkungan untuk keluarga dengan anak kecil, hewan peliharaan,
            atau mereka yang memiliki kepedulian lingkungan.
          </p>
        </div>
      ),
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      question: "Bagaimana cara mengetahui rumah saya terserang rayap?",
      answer: (
        <div className="space-y-2">
          <p>Berikut adalah tanda-tanda umum serangan rayap yang perlu diwaspadai:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Lorong-lorong tanah (mud tubes) di dinding, pondasi, atau area lembab</li>
            <li>Kayu yang terdengar kosong ketika diketuk</li>
            <li>Pintu atau jendela yang sulit dibuka/ditutup</li>
            <li>Kerusakan pada kayu yang terlihat seperti terowongan</li>
            <li>Sayap rayap yang ditanggalkan (biasanya terlihat setelah musim hujan)</li>
            <li>Kotoran rayap yang menyerupai butiran kecil</li>
            <li>Kayu yang melengkung atau lantai yang melesak</li>
          </ul>
          <p className="text-amber-300 text-sm mt-2">
            Jika Anda melihat tanda-tanda ini, segera hubungi SNC untuk inspeksi profesional. Penanganan dini dapat
            mencegah kerusakan yang lebih parah.
          </p>
        </div>
      ),
      icon: <Bug className="h-5 w-5" />,
    },
    {
      question: "Apakah layanan anti-rayap diperlukan untuk bangunan baru?",
      answer: (
        <div className="space-y-2">
          <p>Ya, sangat direkomendasikan untuk menerapkan perlindungan anti-rayap pada bangunan baru karena:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pencegahan lebih efektif dan ekonomis dibandingkan penanganan setelah serangan terjadi</li>
            <li>Bangunan baru menarik rayap karena gangguan pada habitat alami mereka selama konstruksi</li>
            <li>Perlindungan pre-konstruksi dapat diintegrasikan dengan proses pembangunan untuk hasil optimal</li>
            <li>Beberapa jenis rayap dapat menyerang bangunan baru dalam waktu singkat setelah konstruksi selesai</li>
          </ul>
          <p>
            Di banyak negara maju, perlindungan anti-rayap pre-konstruksi bahkan menjadi persyaratan dalam kode
            bangunan.
          </p>
          <p className="text-amber-300 text-sm mt-2">
            SNC menawarkan layanan konsultasi dan perlindungan pre-konstruksi untuk memastikan bangunan baru Anda
            terlindungi sejak awal.
          </p>
        </div>
      ),
      icon: <Home className="h-5 w-5" />,
    },
    {
      question: "Mengapa memilih SNC untuk layanan anti-rayap?",
      answer: (
        <div className="space-y-2">
          <p>SNC SAFE & CARE PEST CONTROL menawarkan keunggulan dalam layanan anti-rayap:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tim teknisi bersertifikasi dengan pengalaman lebih dari 10 tahun</li>
            <li>Menggunakan produk dan teknologi terkini yang efektif dan ramah lingkungan</li>
            <li>Garansi layanan hingga 5 tahun dengan pemeriksaan berkala</li>
            <li>Pendekatan komprehensif: inspeksi, penanganan, pencegahan, dan pemantauan</li>
            <li>Pelayanan pelanggan 24/7 untuk keadaan darurat</li>
            <li>Harga transparan tanpa biaya tersembunyi</li>
            <li>Dipercaya oleh klien-klien besar seperti Vasa Hotel, Pakuwon City Mall, dan Tunjungan Plaza</li>
          </ul>
          <p className="text-amber-300 text-sm mt-2">
            Kami tidak hanya menangani masalah rayap, tetapi juga memberikan edukasi dan solusi jangka panjang untuk
            melindungi investasi properti Anda.
          </p>
        </div>
      ),
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ]

  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg mt-8">
      <div className="flex items-center gap-2 mb-6 animate-slide-left">
        <Bug className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl md:text-2xl font-bold headline">PERTANYAAN YANG SERING DIAJUKAN</h2>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
            defaultOpen={item.defaultOpen}
          />
        ))}
      </div>
    </Card>
  )
}
