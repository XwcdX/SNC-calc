import FlowController from "@/components/flow-controller"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-500 to-amber-600">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 border-l-4 border-black pl-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 -ml-1.5"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-black headline">Kalkulator Risiko Rayap</h1>
          <p className="text-black/80 mt-2">Hitung potensi kerugian akibat tidak menggunakan layanan anti-rayap</p>
        </header>

        <FlowController />

        <footer className="mt-12 text-center text-black/70 text-sm">
          <p>© 2024 SNC SAFE & CARE PEST CONTROL</p>
          <p className="text-xs mt-1">*Data berdasarkan penelitian internal SNC 2024</p>
        </footer>
      </div>
    </main>
  )
}
