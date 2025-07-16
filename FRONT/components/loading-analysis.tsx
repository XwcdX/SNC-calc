"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Bug, Search, Cpu, Calculator, Database, Braces, BarChart, Microscope, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface LoadingAnalysisProps {
  onComplete: () => void
}

export default function LoadingAnalysis({ onComplete }: LoadingAnalysisProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const analysisSteps = [
    {
      message: "Mengumpulkan data properti Anda...",
      icon: <Database className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Mendeteksi faktor risiko rayap...",
      icon: <Search className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Menganalisis pola kelembaban tanah...",
      icon: <BarChart className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Memeriksa database serangan rayap di area Anda...",
      icon: <Bug className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "AI kami sedang menghitung estimasi probabilitas...",
      icon: <Cpu className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Mengkalkulasi potensi kerusakan struktural...",
      icon: <Calculator className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Mengoptimalkan rekomendasi perlindungan...",
      icon: <Braces className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Menyelesaikan analisis risiko...",
      icon: <Microscope className="h-6 w-6 text-amber-500" />,
    },
    {
      message: "Menyiapkan hasil akhir...",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1

        // Update current step based on progress
        const stepIndex = Math.min(Math.floor((newProgress / 100) * analysisSteps.length), analysisSteps.length - 1)
        setCurrentStep(stepIndex)

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 500) // Small delay after reaching 100%
          return 100
        }
        return newProgress
      })
    }, 100) // 10 seconds total (100 * 100ms)

    return () => clearInterval(interval)
  }, [onComplete])

  // Animated termite path
  const termitePath = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 30 },
    { x: 70, y: 50 },
    { x: 90, y: 20 },
    { x: 70, y: 10 },
    { x: 50, y: 40 },
    { x: 30, y: 20 },
    { x: 10, y: 30 },
  ]

  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern
            id="termite-pattern"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path
              d="M10,10 L20,20 M30,30 L40,40 M50,50 L60,60 M70,70 L80,80 M90,90 L100,100"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2,8"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#termite-pattern)" />
        </svg>
      </div>

      {/* Animated termites */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, index) => {
          const delay = index * 0.8
          const duration = 8 + index * 2
          const startPos = termitePath[index % termitePath.length]

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${startPos.x}%`,
                top: `${startPos.y}%`,
                animation: `termiteMove${index + 1} ${duration}s infinite ${delay}s`,
              }}
            >
              <Bug
                className="h-4 w-4 text-amber-500/60 animate-pulse"
                style={{ transform: `rotate(${index * 45}deg)` }}
              />
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        @keyframes termiteMove1 {
          0% { transform: translate(0, 0); }
          20% { transform: translate(100px, 50px); }
          40% { transform: translate(200px, -30px); }
          60% { transform: translate(100px, -80px); }
          80% { transform: translate(-50px, -30px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes termiteMove2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-120px, 80px); }
          50% { transform: translate(-60px, 160px); }
          75% { transform: translate(80px, 80px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes termiteMove3 {
          0% { transform: translate(0, 0); }
          33% { transform: translate(150px, 100px); }
          66% { transform: translate(75px, -100px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes termiteMove4 {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-80px, -60px); }
          40% { transform: translate(-160px, 0px); }
          60% { transform: translate(-80px, 60px); }
          80% { transform: translate(0px, 120px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes termiteMove5 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, -100px); }
          50% { transform: translate(0px, -200px); }
          75% { transform: translate(-100px, -100px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>

      {/* Scanning effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-amber-500/20 to-transparent animate-[scanLine_3s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-10">
        <div className="w-24 h-24 rounded-full bg-black/50 border-4 border-amber-500 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-2 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <Bug className="h-10 w-10 text-amber-500 animate-pulse" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold headline text-center mb-2">ANALISIS RISIKO RAYAP</h2>
        <p className="text-amber-400 text-center mb-6 animate-pulse">{analysisSteps[currentStep].message}</p>

        <div className="flex items-center gap-3 mb-2">
          {analysisSteps[currentStep].icon}
          <span className="text-white/80">
            Langkah {currentStep + 1} dari {analysisSteps.length}
          </span>
        </div>

        <div className="w-full max-w-md mb-4">
          <Progress value={progress} className="h-2 bg-black/50" indicatorClassName="bg-amber-500" />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {analysisSteps.map((step, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep ? "bg-amber-500 scale-125" : index < currentStep ? "bg-amber-700" : "bg-gray-700"
              }`}
            ></div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm animate-pulse">AI kami sedang memproses data untuk hasil yang akurat</p>
          <div className="flex justify-center mt-2">
            <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
            <span
              className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-bounce ml-1"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-bounce ml-1"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-white/40">SNC SAFE & CARE PEST CONTROL</div>
      </div>
    </Card>
  )
}
