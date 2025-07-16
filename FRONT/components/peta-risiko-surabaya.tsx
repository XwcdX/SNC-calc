"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, AlertTriangle, Info, X, Search, Compass, Layers, ZoomIn, ZoomOut, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

interface KecamatanData {
  id: string
  name: string
  riskLevel: "tinggi" | "sedang" | "rendah"
  affectedHomes: number
  totalHomes: number
  description: string
  coordinates: {
    x: number
    y: number
  }
  path: string
  region: "barat" | "utara" | "pusat" | "timur" | "selatan"
}

interface PetaRisikoSurabayaProps {
  onKecamatanSelected: (kecamatan: KecamatanData) => void
}

export default function PetaRisikoSurabaya({ onKecamatanSelected }: PetaRisikoSurabayaProps) {
  const [selectedKecamatan, setSelectedKecamatan] = useState<KecamatanData | null>(null)
  const [hoveredKecamatan, setHoveredKecamatan] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [filterRegion, setFilterRegion] = useState<string>("all")
  const [filterRisk, setFilterRisk] = useState<string>("all")
  const [showLayers, setShowLayers] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [showRoads, setShowRoads] = useState(false)
  const [showWaterBodies, setShowWaterBodies] = useState(true)
  const [showLandmarks, setShowLandmarks] = useState(false)
  const [mapTheme, setMapTheme] = useState<"standard" | "satellite" | "dark">("standard")

  const mapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Data kecamatan Surabaya dengan tingkat risiko rayap
  const kecamatanData: KecamatanData[] = [
    // SURABAYA BARAT (WEST)
    {
      id: "pakal",
      name: "Pakal",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Pakal memiliki campuran area pemukiman baru dan lama. Beberapa area memiliki risiko tinggi terutama yang dekat dengan sungai dan area hijau.",
      coordinates: { x: 15, y: 20 },
      path: "M10,10 L5,35 L20,50 L30,35 L25,25 L15,15 Z",
      region: "barat",
    },
    {
      id: "benowo",
      name: "Benowo",
      riskLevel: "tinggi",
      affectedHomes: 7,
      totalHomes: 10,
      description:
        "Benowo memiliki banyak area bekas rawa dan dekat dengan tambak. Kondisi tanah yang lembab dan sejarah area sebagai lahan basah membuat risiko serangan rayap sangat tinggi.",
      coordinates: { x: 35, y: 30 },
      path: "M25,25 L30,35 L45,40 L50,30 L45,20 L25,25 Z",
      region: "barat",
    },
    {
      id: "lakarsantri",
      name: "Lakarsantri",
      riskLevel: "tinggi",
      affectedHomes: 7,
      totalHomes: 10,
      description:
        "Kecamatan Lakarsantri memiliki tingkat kelembaban tinggi dan banyak area hijau yang menjadi habitat alami rayap. Bangunan di area ini sering menggunakan material kayu yang rentan terhadap serangan rayap.",
      coordinates: { x: 20, y: 70 },
      path: "M10,60 L15,85 L30,90 L40,75 L35,65 L25,75 L20,50 Z",
      region: "barat",
    },
    {
      id: "sambikerep",
      name: "Sambikerep",
      riskLevel: "tinggi",
      affectedHomes: 6,
      totalHomes: 10,
      description:
        "Sambikerep memiliki banyak perumahan baru yang dibangun di atas lahan bekas area pertanian. Kondisi tanah yang sebelumnya digunakan untuk pertanian menciptakan lingkungan ideal bagi koloni rayap.",
      coordinates: { x: 30, y: 45 },
      path: "M20,50 L30,35 L45,40 L40,50 L35,65 Z",
      region: "barat",
    },
    {
      id: "tandes",
      name: "Tandes",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Tandes memiliki campuran area komersial dan pemukiman. Beberapa area memiliki sejarah sebagai lahan basah yang meningkatkan risiko rayap.",
      coordinates: { x: 45, y: 50 },
      path: "M40,50 L45,40 L55,45 L60,55 L50,60 Z",
      region: "barat",
    },
    {
      id: "sukomanunggal",
      name: "Sukomanunggal",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Sukomanunggal memiliki pemukiman padat dengan berbagai usia bangunan. Bangunan yang lebih tua memiliki risiko lebih tinggi karena sistem anti-rayap yang mungkin sudah tidak efektif.",
      coordinates: { x: 50, y: 45 },
      path: "M45,40 L55,45 L60,40 L55,35 L50,30 Z",
      region: "barat",
    },
    {
      id: "asemrowo",
      name: "Asemrowo",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Asemrowo adalah area industri dengan beberapa pemukiman. Bangunan industri sering menggunakan material yang kurang disukai rayap, namun pemukiman di sekitarnya tetap berisiko.",
      coordinates: { x: 55, y: 35 },
      path: "M50,30 L55,35 L60,40 L65,35 L60,25 L50,30 Z",
      region: "barat",
    },

    // SURABAYA UTARA (NORTH)
    {
      id: "krembangan",
      name: "Krembangan",
      riskLevel: "tinggi",
      affectedHomes: 6,
      totalHomes: 10,
      description:
        "Krembangan adalah area dekat pelabuhan dengan banyak bangunan tua. Kombinasi kelembaban tinggi dari laut dan usia bangunan menciptakan kondisi ideal bagi rayap.",
      coordinates: { x: 65, y: 30 },
      path: "M60,25 L65,35 L75,35 L80,25 L70,20 L60,25 Z",
      region: "utara",
    },
    {
      id: "pabean-cantikan",
      name: "Pabean Cantikan",
      riskLevel: "tinggi",
      affectedHomes: 7,
      totalHomes: 10,
      description:
        "Pabean Cantikan adalah area pelabuhan tua dengan banyak bangunan bersejarah. Kelembaban tinggi dan bangunan kayu tua sangat rentan terhadap serangan rayap.",
      coordinates: { x: 70, y: 25 },
      path: "M70,20 L80,25 L85,20 L80,15 L75,15 Z",
      region: "utara",
    },
    {
      id: "semampir",
      name: "Semampir",
      riskLevel: "tinggi",
      affectedHomes: 7,
      totalHomes: 10,
      description:
        "Semampir adalah area padat penduduk dengan banyak bangunan tua. Kelembaban tinggi dari laut dan kondisi drainase yang kurang baik meningkatkan risiko rayap.",
      coordinates: { x: 80, y: 20 },
      path: "M75,15 L80,15 L85,20 L90,15 L85,10 Z",
      region: "utara",
    },
    {
      id: "kenjeran",
      name: "Kenjeran",
      riskLevel: "tinggi",
      affectedHomes: 8,
      totalHomes: 10,
      description:
        "Kenjeran terletak di pesisir dengan kelembaban sangat tinggi. Banyak bangunan menggunakan kayu dan berada di atas atau dekat dengan air, menciptakan risiko rayap tertinggi di Surabaya.",
      coordinates: { x: 90, y: 25 },
      path: "M85,10 L90,15 L95,25 L90,35 L85,20 Z",
      region: "utara",
    },
    {
      id: "bulak",
      name: "Bulak",
      riskLevel: "tinggi",
      affectedHomes: 7,
      totalHomes: 10,
      description:
        "Bulak adalah area pesisir dengan banyak bangunan kayu tradisional. Kelembaban tinggi dan penggunaan material kayu membuat area ini sangat rentan terhadap serangan rayap.",
      coordinates: { x: 90, y: 35 },
      path: "M85,20 L90,35 L85,45 L75,35 Z",
      region: "utara",
    },
    {
      id: "simokerto",
      name: "Simokerto",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Simokerto adalah area pemukiman padat dengan campuran bangunan tua dan baru. Sistem drainase yang kurang baik di beberapa area meningkatkan risiko rayap.",
      coordinates: { x: 75, y: 30 },
      path: "M75,35 L85,45 L80,50 L70,40 L75,35 Z",
      region: "utara",
    },

    // SURABAYA PUSAT (CENTRAL)
    {
      id: "bubutan",
      name: "Bubutan",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Bubutan adalah area pusat kota dengan banyak bangunan komersial dan pemukiman padat. Beberapa bangunan tua memiliki risiko rayap yang lebih tinggi.",
      coordinates: { x: 65, y: 40 },
      path: "M65,35 L75,35 L70,40 L65,50 L60,55 L60,40 L65,35 Z",
      region: "pusat",
    },
    {
      id: "genteng",
      name: "Genteng",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Genteng adalah pusat bisnis dan pemerintahan dengan banyak bangunan modern. Risiko rayap lebih rendah karena konstruksi yang lebih baik, namun beberapa bangunan tua tetap berisiko.",
      coordinates: { x: 70, y: 45 },
      path: "M70,40 L80,50 L75,55 L65,50 L70,40 Z",
      region: "pusat",
    },
    {
      id: "tegalsari",
      name: "Tegalsari",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Tegalsari adalah area pemukiman padat di pusat kota dengan banyak bangunan tua. Usia bangunan dan sistem drainase yang kurang baik meningkatkan risiko rayap.",
      coordinates: { x: 65, y: 55 },
      path: "M60,55 L65,50 L75,55 L70,60 Z",
      region: "pusat",
    },
    {
      id: "sawahan",
      name: "Sawahan",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Sawahan adalah area pemukiman padat dengan banyak bangunan tua. Usia bangunan dan kepadatan meningkatkan risiko penyebaran rayap antar bangunan.",
      coordinates: { x: 60, y: 60 },
      path: "M50,60 L60,55 L70,60 L65,70 L55,65 Z",
      region: "pusat",
    },

    // SURABAYA TIMUR (EAST)
    {
      id: "tambaksari",
      name: "Tambaksari",
      riskLevel: "tinggi",
      affectedHomes: 6,
      totalHomes: 10,
      description:
        "Tambaksari memiliki sejarah sebagai area tambak yang dikeringkan. Kondisi tanah yang sebelumnya basah menciptakan risiko rayap yang tinggi.",
      coordinates: { x: 80, y: 55 },
      path: "M75,55 L80,50 L90,55 L85,65 L75,65 Z",
      region: "timur",
    },
    {
      id: "gubeng",
      name: "Gubeng",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Gubeng memiliki campuran bangunan tua dan baru. Area dengan bangunan yang lebih tua memiliki risiko rayap yang lebih tinggi.",
      coordinates: { x: 75, y: 65 },
      path: "M70,60 L75,55 L75,65 L70,70 Z",
      region: "timur",
    },
    {
      id: "mulyorejo",
      name: "Mulyorejo",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Mulyorejo memiliki banyak area kampus dan perumahan baru. Meskipun banyak bangunan baru dengan sistem anti-rayap, beberapa area masih berisiko terutama yang dekat dengan area hijau.",
      coordinates: { x: 90, y: 60 },
      path: "M85,45 L90,55 L95,65 L85,65 Z",
      region: "timur",
    },
    {
      id: "sukolilo",
      name: "Sukolilo",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Sukolilo memiliki banyak kampus dan perumahan kelas menengah ke atas. Bangunan yang lebih baru cenderung memiliki perlindungan anti-rayap yang lebih baik.",
      coordinates: { x: 85, y: 75 },
      path: "M85,65 L95,65 L90,80 L80,75 Z",
      region: "timur",
    },
    {
      id: "rungkut",
      name: "Rungkut",
      riskLevel: "tinggi",
      affectedHomes: 6,
      totalHomes: 10,
      description:
        "Rungkut memiliki banyak area industri dan pemukiman. Beberapa area adalah bekas rawa yang dikeringkan, menciptakan kondisi tanah yang disukai rayap.",
      coordinates: { x: 90, y: 85 },
      path: "M80,75 L90,80 L95,90 L85,95 L75,85 Z",
      region: "timur",
    },
    {
      id: "gunung-anyar",
      name: "Gunung Anyar",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Gunung Anyar memiliki banyak perumahan baru dan dekat dengan area mangrove. Kelembaban dari area mangrove meningkatkan risiko rayap di beberapa lokasi.",
      coordinates: { x: 85, y: 95 },
      path: "M75,85 L85,95 L90,100 L70,95 Z",
      region: "timur",
    },
    {
      id: "tenggilis-mejoyo",
      name: "Tenggilis Mejoyo",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Tenggilis Mejoyo memiliki banyak perumahan dan area komersial. Bangunan yang lebih baru memiliki risiko lebih rendah, tetapi area yang dekat dengan sungai tetap berisiko.",
      coordinates: { x: 75, y: 80 },
      path: "M70,70 L75,65 L80,75 L75,85 L65,80 Z",
      region: "timur",
    },

    // SURABAYA SELATAN (SOUTH)
    {
      id: "wonokromo",
      name: "Wonokromo",
      riskLevel: "sedang",
      affectedHomes: 5,
      totalHomes: 10,
      description:
        "Wonokromo dilalui sungai besar dan memiliki banyak bangunan tua. Kombinasi kelembaban dari sungai dan usia bangunan meningkatkan risiko rayap.",
      coordinates: { x: 70, y: 75 },
      path: "M65,70 L70,70 L75,65 L70,60 L65,70 Z",
      region: "selatan",
    },
    {
      id: "wonocolo",
      name: "Wonocolo",
      riskLevel: "rendah",
      affectedHomes: 3,
      totalHomes: 10,
      description:
        "Wonocolo memiliki banyak area kampus dan pemukiman. Bangunan yang lebih baru dan perawatan yang baik mengurangi risiko rayap.",
      coordinates: { x: 65, y: 75 },
      path: "M60,75 L65,70 L65,80 L60,85 L55,80 L60,75 Z",
      region: "selatan",
    },
    {
      id: "gayungan",
      name: "Gayungan",
      riskLevel: "rendah",
      affectedHomes: 3,
      totalHomes: 10,
      description:
        "Gayungan memiliki banyak perumahan kelas menengah ke atas dengan konstruksi yang lebih baik. Sistem drainase yang baik mengurangi kelembaban dan risiko rayap.",
      coordinates: { x: 60, y: 85 },
      path: "M55,80 L60,85 L55,90 L50,85 Z",
      region: "selatan",
    },
    {
      id: "jambangan",
      name: "Jambangan",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Jambangan memiliki banyak area hijau dan dekat dengan sungai. Kelembaban dari area hijau dan sungai meningkatkan risiko rayap.",
      coordinates: { x: 55, y: 80 },
      path: "M50,75 L55,80 L50,85 L45,80 L50,75 Z",
      region: "selatan",
    },
    {
      id: "karangpilang",
      name: "Karangpilang",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Karangpilang memiliki campuran area industri dan pemukiman. Beberapa area dekat sungai memiliki risiko rayap yang lebih tinggi.",
      coordinates: { x: 45, y: 85 },
      path: "M40,75 L45,80 L50,85 L45,90 L35,85 Z",
      region: "selatan",
    },
    {
      id: "dukuh-pakis",
      name: "Dukuh Pakis",
      riskLevel: "sedang",
      affectedHomes: 4,
      totalHomes: 10,
      description:
        "Dukuh Pakis memiliki banyak perumahan kelas menengah. Beberapa area memiliki sejarah sebagai lahan basah yang meningkatkan risiko rayap.",
      coordinates: { x: 50, y: 70 },
      path: "M45,70 L50,75 L55,65 L50,60 L45,70 Z",
      region: "selatan",
    },
    {
      id: "wiyung",
      name: "Wiyung",
      riskLevel: "tinggi",
      affectedHomes: 6,
      totalHomes: 10,
      description:
        "Wiyung memiliki banyak area hijau dan perumahan baru yang dibangun di atas lahan pertanian. Kondisi tanah yang sebelumnya digunakan untuk pertanian menciptakan risiko rayap yang tinggi.",
      coordinates: { x: 40, y: 75 },
      path: "M35,65 L40,75 L45,70 L40,60 Z",
      region: "selatan",
    },
  ]

  // Define major roads for the map
  const majorRoads = [
    // Main highways
    "M10,50 L90,50", // East-West Highway
    "M50,10 L50,90", // North-South Highway
    // Ring roads
    "M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20", // Outer ring road
    "M30,30 Q50,25 70,30 Q75,50 70,70 Q50,75 30,70 Q25,50 30,30", // Middle ring road
  ]

  // Define water bodies
  const waterBodies = [
    {
      path: "M85,5 Q95,15 95,30 L90,40 L85,45 L80,35 L85,5 Z", // Madura Strait
      name: "Selat Madura",
      type: "sea",
    },
    {
      path: "M60,45 Q65,50 60,55 L55,53 L52,50 L55,47 Z", // Central lake
      name: "Danau Kota",
      type: "lake",
    },
    {
      path: "M40,30 L45,35 L43,40 L38,38 L35,35 Z", // Western lake
      name: "Waduk Barat",
      type: "lake",
    },
    {
      path: "M15,40 Q25,45 15,50 L10,45 Z", // Western river
      name: "Sungai Barat",
      type: "river",
    },
    {
      path: "M70,70 L75,75 L73,80 L68,78 L65,75 Z", // Eastern lake
      name: "Waduk Timur",
      type: "lake",
    },
  ]

  // Define landmarks
  const landmarks = [
    { x: 65, y: 45, name: "Tugu Pahlawan", icon: "🏛️" },
    { x: 75, y: 25, name: "Pelabuhan Tanjung Perak", icon: "🚢" },
    { x: 55, y: 55, name: "Kebun Binatang", icon: "🦁" },
    { x: 45, y: 65, name: "Stadion", icon: "🏟️" },
    { x: 85, y: 65, name: "Kampus ITS", icon: "🎓" },
    { x: 35, y: 45, name: "Universitas", icon: "🏫" },
    { x: 70, y: 85, name: "Bandara Juanda", icon: "✈️" },
    { x: 25, y: 30, name: "Hutan Mangrove", icon: "🌳" },
  ]

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  // Handle map dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left mouse button
    setIsDragging(true)
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Reset map position
  const resetMapPosition = () => {
    setPanOffset({ x: 0, y: 0 })
    setZoomLevel(1)
  }

  // Effect to add event listeners for mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!mapRef.current?.contains(e.target as Node)) return
      e.preventDefault()

      const delta = -Math.sign(e.deltaY) * 0.1
      setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.5), 3))
    }

    const mapElement = mapRef.current
    if (mapElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  // Mendapatkan warna berdasarkan tingkat risiko
  const getRiskColor = (riskLevel: string, isHovered = false, isSelected = false) => {
    if (isSelected) {
      return riskLevel === "tinggi"
        ? "fill-red-600 stroke-white stroke-[0.5]"
        : riskLevel === "sedang"
          ? "fill-yellow-600 stroke-white stroke-[0.5]"
          : "fill-green-600 stroke-white stroke-[0.5]"
    }

    if (isHovered) {
      return riskLevel === "tinggi"
        ? "fill-red-500 stroke-white stroke-[0.5]"
        : riskLevel === "sedang"
          ? "fill-yellow-500 stroke-white stroke-[0.5]"
          : "fill-green-500 stroke-white stroke-[0.5]"
    }

    return riskLevel === "tinggi"
      ? "fill-red-700/70 hover:fill-red-600"
      : riskLevel === "sedang"
        ? "fill-yellow-700/70 hover:fill-yellow-600"
        : "fill-green-700/70 hover:fill-green-600"
  }

  const handleKecamatanClick = (kecamatan: KecamatanData) => {
    setSelectedKecamatan(kecamatan)
  }

  const handleConfirmSelection = () => {
    if (selectedKecamatan) {
      onKecamatanSelected(selectedKecamatan)
    }
  }

  // Filter kecamatan berdasarkan pencarian dan filter
  const filteredKecamatan = kecamatanData.filter((kecamatan) => {
    const matchesSearch = kecamatan.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = filterRegion === "all" || kecamatan.region === filterRegion
    const matchesRisk = filterRisk === "all" || kecamatan.riskLevel === filterRisk
    return matchesSearch && matchesRegion && matchesRisk
  })

  // Get map background based on theme
  const getMapBackground = () => {
    switch (mapTheme) {
      case "satellite":
        return "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 opacity-90"
      case "dark":
        return "bg-gray-900"
      default:
        return "bg-blue-100"
    }
  }

  // Get water color based on theme
  const getWaterColor = () => {
    switch (mapTheme) {
      case "satellite":
        return "fill-blue-900/70"
      case "dark":
        return "fill-blue-800/50"
      default:
        return "fill-blue-500/70"
    }
  }

  // Hitung jumlah kecamatan berdasarkan tingkat risiko
  const riskCounts = {
    tinggi: kecamatanData.filter((k) => k.riskLevel === "tinggi").length,
    sedang: kecamatanData.filter((k) => k.riskLevel === "sedang").length,
    rendah: kecamatanData.filter((k) => k.riskLevel === "rendah").length,
  }

  return (
    <Card className="p-6 bg-black/90 border-l-4 border-yellow-500 text-white shadow-lg relative">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl md:text-2xl font-bold headline">PILIH LOKASI RUMAH ANDA DI PETA</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="mb-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari kecamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/50 border-amber-600 text-white"
              />
              {searchQuery && filteredKecamatan.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-black/95 border border-amber-800/50 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredKecamatan.map((kecamatan) => (
                    <div
                      key={kecamatan.id}
                      className="p-2 hover:bg-amber-900/30 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setSelectedKecamatan(kecamatan)
                        setSearchQuery("")
                      }}
                    >
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          kecamatan.riskLevel === "tinggi"
                            ? "bg-red-500"
                            : kecamatan.riskLevel === "sedang"
                              ? "bg-yellow-500"
                              : "bg-green-500",
                        )}
                      ></div>
                      <span>{kecamatan.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="w-[130px] bg-black/50 border-amber-600 text-white">
                  <SelectValue placeholder="Wilayah" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-amber-600">
                  <SelectItem value="all">Semua Wilayah</SelectItem>
                  <SelectItem value="utara">Surabaya Utara</SelectItem>
                  <SelectItem value="selatan">Surabaya Selatan</SelectItem>
                  <SelectItem value="timur">Surabaya Timur</SelectItem>
                  <SelectItem value="barat">Surabaya Barat</SelectItem>
                  <SelectItem value="pusat">Surabaya Pusat</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-[130px] bg-black/50 border-amber-600 text-white">
                  <SelectValue placeholder="Risiko" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-amber-600">
                  <SelectItem value="all">Semua Risiko</SelectItem>
                  <SelectItem value="tinggi">Risiko Tinggi</SelectItem>
                  <SelectItem value="sedang">Risiko Sedang</SelectItem>
                  <SelectItem value="rendah">Risiko Rendah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 border border-amber-800/30 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-amber-400 font-bold">Peta Risiko Rayap Kota Surabaya</h3>

              <div className="flex items-center gap-2">
                <Select
                  value={mapTheme}
                  onValueChange={(value: "standard" | "satellite" | "dark") => setMapTheme(value)}
                >
                  <SelectTrigger className="w-[130px] h-8 text-xs bg-black/50 border-amber-600 text-white">
                    <SelectValue placeholder="Tema Peta" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border-amber-600">
                    <SelectItem value="standard">Standar</SelectItem>
                    <SelectItem value="satellite">Satelit</SelectItem>
                    <SelectItem value="dark">Gelap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              ref={mapRef}
              className="relative w-full aspect-square max-w-[600px] mx-auto overflow-hidden rounded-md border border-amber-800/20"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))",
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                  transformOrigin: "center",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
              >
                {/* Map background based on theme */}
                <rect x="0" y="0" width="100" height="100" className={getMapBackground()} />

                {/* Grid lines for professional look */}
                {mapTheme !== "satellite" && (
                  <g className="opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <line
                        key={`grid-h-${i}`}
                        x1="0"
                        y1={i * 10}
                        x2="100"
                        y2={i * 10}
                        stroke="white"
                        strokeWidth="0.2"
                        strokeDasharray="1,1"
                      />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <line
                        key={`grid-v-${i}`}
                        x1={i * 10}
                        y1="0"
                        x2={i * 10}
                        y2="100"
                        stroke="white"
                        strokeWidth="0.2"
                        strokeDasharray="1,1"
                      />
                    ))}
                  </g>
                )}

                {/* Water bodies */}
                {showWaterBodies && (
                  <g>
                    {waterBodies.map((water, index) => (
                      <path
                        key={`water-${index}`}
                        d={water.path}
                        className={`${getWaterColor()} stroke-blue-600/30 stroke-[0.3]`}
                      />
                    ))}
                  </g>
                )}

                {/* Background daratan Surabaya */}
                <path
                  d="M5,5 L95,5 L95,95 L5,95 Z"
                  className={
                    mapTheme === "satellite"
                      ? "fill-gray-700/50"
                      : mapTheme === "dark"
                        ? "fill-gray-800/50"
                        : "fill-amber-100/10"
                  }
                />

                {/* Major roads */}
                {showRoads && (
                  <g>
                    {majorRoads.map((road, index) => (
                      <path
                        key={`road-${index}`}
                        d={road}
                        className={mapTheme === "dark" ? "stroke-amber-700/70" : "stroke-amber-600/70"}
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        fill="none"
                      />
                    ))}
                  </g>
                )}

                {/* Kecamatan berdasarkan region */}
                <g>
                  {kecamatanData.map((kecamatan) => {
                    const isFiltered =
                      (filterRegion !== "all" && kecamatan.region !== filterRegion) ||
                      (filterRisk !== "all" && kecamatan.riskLevel !== filterRisk)

                    return (
                      <path
                        key={kecamatan.id}
                        d={kecamatan.path}
                        className={cn(
                          "cursor-pointer transition-all duration-300",
                          isFiltered ? "opacity-30" : "opacity-100",
                          searchQuery
                            ? filteredKecamatan.includes(kecamatan)
                              ? getRiskColor(kecamatan.riskLevel, true, selectedKecamatan?.id === kecamatan.id)
                              : getRiskColor(kecamatan.riskLevel, false, false) + " opacity-30"
                            : getRiskColor(
                                kecamatan.riskLevel,
                                hoveredKecamatan === kecamatan.id,
                                selectedKecamatan?.id === kecamatan.id,
                              ),
                        )}
                        onMouseEnter={() => setHoveredKecamatan(kecamatan.id)}
                        onMouseLeave={() => setHoveredKecamatan(null)}
                        onClick={() => handleKecamatanClick(kecamatan)}
                      />
                    )
                  })}
                </g>

                {/* Borders between kecamatan */}
                <g>
                  {kecamatanData.map((kecamatan) => (
                    <path
                      key={`border-${kecamatan.id}`}
                      d={kecamatan.path}
                      className="fill-none stroke-white/30 stroke-[0.2]"
                    />
                  ))}
                </g>

                {/* Landmarks */}
                {showLandmarks && (
                  <g>
                    {landmarks.map((landmark, index) => (
                      <g key={`landmark-${index}`}>
                        <circle
                          cx={landmark.x}
                          cy={landmark.y}
                          r="1.2"
                          className="fill-amber-500/80 stroke-white/50 stroke-[0.2]"
                        />
                        <text
                          x={landmark.x}
                          y={landmark.y - 2}
                          textAnchor="middle"
                          className="fill-white text-[2px] font-bold"
                        >
                          {landmark.icon}
                        </text>
                        {zoomLevel > 1.5 && (
                          <text
                            x={landmark.x}
                            y={landmark.y + 2.5}
                            textAnchor="middle"
                            className="fill-white/80 text-[1.5px]"
                          >
                            {landmark.name}
                          </text>
                        )}
                      </g>
                    ))}
                  </g>
                )}

                {/* Labels untuk kecamatan */}
                {showLabels && (
                  <g>
                    {kecamatanData.map((kecamatan) => {
                      const isFiltered =
                        (filterRegion !== "all" && kecamatan.region !== filterRegion) ||
                        (filterRisk !== "all" && kecamatan.riskLevel !== filterRisk)

                      return (
                        <g key={`label-${kecamatan.id}`} className={isFiltered ? "opacity-30" : "opacity-100"}>
                          <text
                            x={kecamatan.coordinates.x}
                            y={kecamatan.coordinates.y}
                            textAnchor="middle"
                            className={cn(
                              "fill-white text-[2px] font-bold",
                              hoveredKecamatan === kecamatan.id || selectedKecamatan?.id === kecamatan.id
                                ? "opacity-100"
                                : "opacity-70",
                            )}
                          >
                            {kecamatan.name}
                          </text>
                          {kecamatan.riskLevel === "tinggi" && (
                            <circle
                              cx={kecamatan.coordinates.x + 4}
                              cy={kecamatan.coordinates.y - 1}
                              r="0.8"
                              className="fill-red-500 animate-pulse"
                            />
                          )}
                        </g>
                      )
                    })}
                  </g>
                )}

                {/* Compass rose */}
                <g transform="translate(85, 15)">
                  <circle cx="0" cy="0" r="5" className="fill-black/40 stroke-amber-500/70 stroke-[0.3]" />
                  <path d="M0,-4 L1,-1 L0,0 L-1,-1 Z" className="fill-red-500" /> {/* North */}
                  <path d="M0,4 L1,1 L0,0 L-1,1 Z" className="fill-white" /> {/* South */}
                  <path d="M4,0 L1,1 L0,0 L1,-1 Z" className="fill-white" /> {/* East */}
                  <path d="M-4,0 L-1,1 L0,0 L-1,-1 Z" className="fill-white" /> {/* West */}
                  <text x="0" y="-2.5" textAnchor="middle" className="fill-white text-[1.8px] font-bold">
                    U
                  </text>
                  <text x="0" y="3.5" textAnchor="middle" className="fill-white text-[1.8px] font-bold">
                    S
                  </text>
                  <text x="2.5" y="0.5" textAnchor="middle" className="fill-white text-[1.8px] font-bold">
                    T
                  </text>
                  <text x="-2.5" y="0.5" textAnchor="middle" className="fill-white text-[1.8px] font-bold">
                    B
                  </text>
                </g>

                {/* Scale bar */}
                <g transform="translate(10, 90)">
                  <rect width="20" height="1" className="fill-white" />
                  <rect x="0" y="1" width="1" height="1" className="fill-white" />
                  <rect x="5" y="1" width="1" height="1" className="fill-white" />
                  <rect x="10" y="1" width="1" height="1" className="fill-white" />
                  <rect x="15" y="1" width="1" height="1" className="fill-white" />
                  <rect x="20" y="1" width="1" height="1" className="fill-white" />
                  <text x="10" y="4" textAnchor="middle" className="fill-white text-[1.8px]">
                    0 5 10 km
                  </text>
                </g>

                {/* Legenda */}
                <g transform="translate(2, 75)">
                  <rect width="20" height="13" rx="1" fill="#000000" fillOpacity="0.7" />
                  <text x="2" y="3" className="fill-white text-[2px]">
                    Legenda:
                  </text>
                  <rect x="2" y="5" width="3" height="2" rx="0.5" className="fill-red-700/70" />
                  <text x="6" y="6.5" className="fill-white text-[1.8px]">
                    Risiko Tinggi
                  </text>
                  <rect x="2" y="8" width="3" height="2" rx="0.5" className="fill-yellow-700/70" />
                  <text x="6" y="9.5" className="fill-white text-[1.8px]">
                    Risiko Sedang
                  </text>
                  <rect x="2" y="11" width="3" height="2" rx="0.5" className="fill-green-700/70" />
                  <text x="6" y="12.5" className="fill-white text-[1.8px]">
                    Risiko Rendah
                  </text>
                </g>
              </svg>

              {/* Map controls */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 bg-black/70 border-amber-600/50 text-amber-500"
                  onClick={handleZoomIn}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 bg-black/70 border-amber-600/50 text-amber-500"
                  onClick={handleZoomOut}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 bg-black/70 border-amber-600/50 text-amber-500"
                  onClick={resetMapPosition}
                >
                  <Compass className="h-4 w-4" />
                </Button>
              </div>

              {/* Layer controls */}
              <div className="absolute bottom-2 left-2">
                <div className="bg-black/70 rounded-md p-1 border border-amber-600/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("w-7 h-7 p-1", showLayers ? "text-amber-500" : "text-white/50")}
                    onClick={() => setShowLayers(!showLayers)}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>

                <AnimatePresence>
                  {showLayers && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      className="bg-black/70 mt-1 rounded-md p-2 border border-amber-600/30 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="show-labels"
                            checked={showLabels}
                            onChange={() => setShowLabels(!showLabels)}
                            className="rounded border-amber-600"
                          />
                          <label htmlFor="show-labels">Label Kecamatan</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="show-roads"
                            checked={showRoads}
                            onChange={() => setShowRoads(!showRoads)}
                            className="rounded border-amber-600"
                          />
                          <label htmlFor="show-roads">Jalan Utama</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="show-water"
                            checked={showWaterBodies}
                            onChange={() => setShowWaterBodies(!showWaterBodies)}
                            className="rounded border-amber-600"
                          />
                          <label htmlFor="show-water">Badan Air</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="show-landmarks"
                            checked={showLandmarks}
                            onChange={() => setShowLandmarks(!showLandmarks)}
                            className="rounded border-amber-600"
                          />
                          <label htmlFor="show-landmarks">Landmark</label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover tooltip */}
              <AnimatePresence>
                {hoveredKecamatan && !selectedKecamatan && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-2 right-2 bg-black/80 text-white text-xs p-2 rounded-md border border-amber-600/30"
                  >
                    {kecamatanData.find((k) => k.id === hoveredKecamatan)?.name}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Overlay text */}
              <div className="absolute top-2 left-2 bg-black/70 rounded px-2 py-1 text-xs text-amber-400 border border-amber-600/30">
                Kota Surabaya
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-xs text-white/60">
                <span className="mr-2">Zoom: {Math.round(zoomLevel * 100)}%</span>
                <span>Geser peta dengan mouse</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-amber-600/50 text-amber-500"
                  onClick={resetMapPosition}
                >
                  Reset Peta
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-amber-600/50 text-amber-500"
                  onClick={() => {
                    setFilterRegion("all")
                    setFilterRisk("all")
                    setSearchQuery("")
                  }}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Reset Filter
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="bg-red-900/30 p-3 rounded-md border border-red-900/50 text-center">
              <div className="text-red-400 font-bold headline text-lg">TINGGI</div>
              <div className="text-white/80 text-sm">{riskCounts.tinggi} Kecamatan</div>
            </div>
            <div className="bg-yellow-900/30 p-3 rounded-md border border-yellow-900/50 text-center">
              <div className="text-yellow-400 font-bold headline text-lg">SEDANG</div>
              <div className="text-white/80 text-sm">{riskCounts.sedang} Kecamatan</div>
            </div>
            <div className="bg-green-900/30 p-3 rounded-md border border-green-900/50 text-center">
              <div className="text-green-400 font-bold headline text-lg">RENDAH</div>
              <div className="text-white/80 text-sm">{riskCounts.rendah} Kecamatan</div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          {selectedKecamatan ? (
            <div className="bg-black/50 rounded-lg p-4 border border-amber-800/30 h-full relative">
              <button
                onClick={() => setSelectedKecamatan(null)}
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className={cn(
                  "text-center mb-4 p-2 rounded-md",
                  selectedKecamatan.riskLevel === "tinggi"
                    ? "bg-red-900/30 border border-red-900/50"
                    : selectedKecamatan.riskLevel === "sedang"
                      ? "bg-yellow-900/30 border border-yellow-900/50"
                      : "bg-green-900/30 border border-green-900/50",
                )}
              >
                <h3 className="font-bold headline text-xl">{selectedKecamatan.name}</h3>
                <div
                  className={cn(
                    "text-sm mt-1",
                    selectedKecamatan.riskLevel === "tinggi"
                      ? "text-red-400"
                      : selectedKecamatan.riskLevel === "sedang"
                        ? "text-yellow-400"
                        : "text-green-400",
                  )}
                >
                  Risiko {selectedKecamatan.riskLevel.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertTriangle
                  className={cn(
                    "h-5 w-5",
                    selectedKecamatan.riskLevel === "tinggi"
                      ? "text-red-500"
                      : selectedKecamatan.riskLevel === "sedang"
                        ? "text-yellow-500"
                        : "text-green-500",
                  )}
                />
                <div className="text-lg font-bold headline">
                  {selectedKecamatan.affectedHomes} dari {selectedKecamatan.totalHomes} Rumah
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-white/80">di kecamatan ini terdampak rayap!</div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="bg-amber-900/20 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-400">Karakteristik Area</h4>
                      <p className="mt-1 text-white/80 text-sm">{selectedKecamatan.description}</p>
                    </div>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleConfirmSelection}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold mt-4"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Pilih Lokasi Ini
                  </Button>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="bg-black/50 rounded-lg p-4 border border-amber-800/30 h-full flex flex-col items-center justify-center">
              <MapPin className="h-12 w-12 text-amber-500/50 mb-4" />
              <h3 className="text-lg font-bold text-amber-400 text-center">Pilih Kecamatan</h3>
              <p className="text-white/70 text-center mt-2">
                Klik pada salah satu kecamatan di peta untuk memilih lokasi rumah Anda.
              </p>
              <div className="mt-4 text-center">
                <p className="text-xs text-white/60 mb-2">Fitur Peta:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <ZoomIn className="h-3 w-3 text-amber-500" />
                    <span>Zoom dengan scroll</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Compass className="h-3 w-3 text-amber-500" />
                    <span>Geser dengan mouse</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Filter className="h-3 w-3 text-amber-500" />
                    <span>Filter berdasarkan risiko</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="h-3 w-3 text-amber-500" />
                    <span>Tampilkan/sembunyikan layer</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-amber-900/20 p-4 rounded-md border border-amber-800/30">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-400 headline">Tentang Peta Risiko Rayap Surabaya</h3>
            <p className="mt-2 text-white/80 text-sm">
              Peta ini menunjukkan tingkat risiko serangan rayap di berbagai kecamatan di Surabaya berdasarkan data yang
              dikumpulkan oleh tim SnC Pest Control. Pilih kecamatan tempat rumah Anda berada untuk analisis yang lebih
              akurat.
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-black/30 p-2 rounded-md">
                <h4 className="font-bold text-amber-400 mb-1">Faktor Risiko Tinggi:</h4>
                <ul className="list-disc list-inside space-y-0.5 text-white/80">
                  <li>Kelembaban tinggi</li>
                  <li>Dekat dengan badan air</li>
                  <li>Bangunan tua ({">"}15 tahun)</li>
                  <li>Riwayat serangan rayap</li>
                </ul>
              </div>
              <div className="bg-black/30 p-2 rounded-md">
                <h4 className="font-bold text-amber-400 mb-1">Faktor Risiko Sedang:</h4>
                <ul className="list-disc list-inside space-y-0.5 text-white/80">
                  <li>Kelembaban moderat</li>
                  <li>Bangunan 5-15 tahun</li>
                  <li>Campuran material kayu</li>
                  <li>Drainase kurang baik</li>
                </ul>
              </div>
              <div className="bg-black/30 p-2 rounded-md">
                <h4 className="font-bold text-amber-400 mb-1">Faktor Risiko Rendah:</h4>
                <ul className="list-disc list-inside space-y-0.5 text-white/80">
                  <li>Kelembaban rendah</li>
                  <li>Bangunan baru ({"<"}5 tahun)</li>
                  <li>Material dominan beton</li>
                  <li>Sistem drainase baik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
