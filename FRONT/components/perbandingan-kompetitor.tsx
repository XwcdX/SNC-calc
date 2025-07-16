"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, Trophy, AlertTriangle, Info } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function PerbandinganKompetitor() {
  const [showInfo, setShowInfo] = useState<string | null>(null)

  const fiturList = [
    {
      name: "Pemeriksaan Gratis Selama 1 Tahun",
      description:
        "Layanan pemeriksaan berkala tanpa biaya tambahan selama 1 tahun penuh setelah pemasangan sistem anti-rayap.",
      companies: {
        "SnC Pest Control": true,
        Fumida: false,
        Insekta: false,
        Rentokil: false,
        "PCO Pest Control": false,
      },
    },
    {
      name: "Garansi Hasil",
      description:
        "Jaminan kepuasan dengan garansi pengembalian dana atau penanganan ulang jika masalah rayap muncul kembali.",
      companies: {
        "SnC Pest Control": true,
        Fumida: true,
        Insekta: true,
        Rentokil: true,
        "PCO Pest Control": false,
      },
    },
    {
      name: "Teknisi Bersertifikasi",
      description: "Tim teknisi yang telah mendapatkan sertifikasi resmi dan pelatihan khusus penanganan rayap.",
      companies: {
        "SnC Pest Control": true,
        Fumida: true,
        Insekta: true,
        Rentokil: true,
        "PCO Pest Control": true,
      },
    },
    {
      name: "Bahan Ramah Lingkungan",
      description: "Menggunakan bahan kimia yang aman bagi lingkungan dan memiliki dampak minimal pada ekosistem.",
      companies: {
        "SnC Pest Control": true,
        Fumida: false,
        Insekta: true,
        Rentokil: true,
        "PCO Pest Control": false,
      },
    },
    {
      name: "Layanan 24/7",
      description: "Dukungan pelanggan dan layanan darurat tersedia 24 jam sehari, 7 hari seminggu.",
      companies: {
        "SnC Pest Control": true,
        Fumida: false,
        Insekta: false,
        Rentokil: true,
        "PCO Pest Control": false,
      },
    },
    {
      name: "Pemetaan Risiko Digital",
      description:
        "Teknologi pemetaan digital untuk mengidentifikasi area berisiko tinggi dan memantau aktivitas rayap.",
      companies: {
        "SnC Pest Control": true,
        Fumida: false,
        Insekta: false,
        Rentokil: true,
        "PCO Pest Control": false,
      },
    },
    {
      name: "Sistem Umpan Terpadu",
      description: "Sistem umpan rayap terpadu yang menghancurkan koloni rayap dari sumbernya.",
      companies: {
        "SnC Pest Control": true,
        Fumida: true,
        Insekta: true,
        Rentokil: true,
        "PCO Pest Control": true,
      },
    },
    {
      name: "Laporan Inspeksi Terperinci",
      description: "Laporan detail setelah setiap inspeksi dengan foto, temuan, dan rekomendasi.",
      companies: {
        "SnC Pest Control": true,
        Fumida: false,
        Insekta: true,
        Rentokil: true,
        "PCO Pest Control": false,
      },
    },
    {
      name: "Harga Transparan",
      description: "Struktur harga yang jelas tanpa biaya tersembunyi atau tambahan yang tidak diinformasikan.",
      companies: {
        "SnC Pest Control": true,
        Fumida: true,
        Insekta: false,
        Rentokil: false,
        "PCO Pest Control": true,
      },
    },
    {
      name: "Konsultasi Gratis",
      description: "Konsultasi awal gratis untuk mengevaluasi kebutuhan dan memberikan rekomendasi.",
      companies: {
        "SnC Pest Control": true,
        Fumida: true,
        Insekta: true,
        Rentokil: false,
        "PCO Pest Control": true,
      },
    },
  ]

  const companies = ["SnC Pest Control", "Fumida", "Insekta", "Rentokil", "PCO Pest Control"]

  // Hitung skor untuk setiap perusahaan
  const scores = companies.reduce(
    (acc, company) => {
      acc[company] = fiturList.filter((fitur) => fitur.companies[company]).length
      return acc
    },
    {} as Record<string, number>,
  )

  // Urutkan perusahaan berdasarkan skor
  const sortedCompanies = [...companies].sort((a, b) => scores[b] - scores[a])

  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl md:text-2xl font-bold headline">PERBANDINGAN LAYANAN ANTI-RAYAP</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left border-b border-amber-800/30 min-w-[200px]">Fitur Layanan</th>
              {companies.map((company) => (
                <th
                  key={company}
                  className={cn(
                    "p-3 text-center border-b border-amber-800/30 min-w-[120px]",
                    company === "SnC Pest Control" ? "bg-amber-900/30" : "",
                  )}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "font-bold",
                        company === "SnC Pest Control" ? "text-amber-400 headline" : "text-white/90",
                      )}
                    >
                      {company}
                    </span>
                    {company === "SnC Pest Control" && (
                      <span className="text-xs mt-1 bg-amber-500 text-black px-2 py-0.5 rounded-full headline">
                        REKOMENDASI
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fiturList.map((fitur, index) => (
              <tr
                key={index}
                className={cn(
                  "border-b border-amber-800/20 hover:bg-amber-950/30 transition-colors",
                  index === 0 ? "bg-amber-950/40" : "",
                )}
              >
                <td className="p-3 relative">
                  <div className="flex items-center gap-2">
                    <span>{fitur.name}</span>
                    <button
                      className="text-amber-500/70 hover:text-amber-400 transition-colors"
                      onClick={() => setShowInfo(showInfo === fitur.name ? null : fitur.name)}
                      aria-label="Tampilkan informasi"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                  {showInfo === fitur.name && (
                    <div className="absolute left-0 top-full mt-1 z-10 bg-black/95 border border-amber-800/50 p-3 rounded-md shadow-lg w-64">
                      <p className="text-sm text-white/80">{fitur.description}</p>
                    </div>
                  )}
                  {index === 0 && <div className="absolute -left-1 top-0 bottom-0 w-1 bg-amber-500"></div>}
                </td>
                {companies.map((company) => (
                  <td
                    key={`${company}-${index}`}
                    className={cn(
                      "p-3 text-center",
                      company === "SnC Pest Control" ? "bg-amber-900/30" : "",
                      index === 0 && company === "SnC Pest Control" ? "bg-amber-900/50" : "",
                    )}
                  >
                    {fitur.companies[company] ? (
                      <CheckCircle
                        className={cn(
                          "h-6 w-6 mx-auto",
                          company === "SnC Pest Control" ? "text-amber-500" : "text-green-500",
                          index === 0 && company === "SnC Pest Control" ? "animate-pulse-slow" : "",
                        )}
                      />
                    ) : (
                      <XCircle className="h-6 w-6 mx-auto text-red-500/70" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-amber-950/30 font-bold">
              <td className="p-3">Total Fitur</td>
              {companies.map((company) => (
                <td
                  key={`${company}-total`}
                  className={cn(
                    "p-3 text-center",
                    company === "SnC Pest Control" ? "bg-amber-900/50 text-amber-300 headline" : "",
                  )}
                >
                  {scores[company]}/{fiturList.length}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-400 headline">Mengapa Memilih SnC Pest Control?</h3>
            <p className="mt-2 text-white/80 text-sm">
              SnC Pest Control adalah satu-satunya penyedia layanan anti-rayap yang menawarkan{" "}
              <span className="text-amber-300 font-bold">pemeriksaan gratis selama 1 tahun penuh</span>. Dengan total{" "}
              <span className="text-amber-300 font-bold">{scores["SnC Pest Control"]} fitur</span> yang didukung oleh
              tim profesional bersertifikasi, kami memberikan perlindungan terbaik untuk properti Anda dengan harga
              transparan dan layanan pelanggan 24/7.
            </p>
            <p className="mt-2 text-amber-400/80 text-xs">
              *Syarat dan ketentuan berlaku. Pemeriksaan gratis mencakup 4 kali kunjungan dalam 1 tahun.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
