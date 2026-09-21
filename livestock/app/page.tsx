import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Login from "@/components/auth/Login";
import Image from "next/image";
import fotovendabal from "@/public/FOTO-VENDABAL.png";

export default function App() {
  return (
    <>
      <NavBar />
<main className="min-h-screen bg-white">
  <section className="relative py-4 lg:py-8">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1 space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-6xl font-black text-black leading-tight">
            GESTIÓN
            <br />
            <span className="text-[#2B7FFF]">GANADERA</span>
          </h1>
          <p className="text-lg text-[#6A7282]">
            Software especializado para el control y monitoreo de
            actividades pecuarias. Lleva el control de tu ganado de forma
            digital y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-[#00A63E]/30 rounded-2xl bg-[#00A63E]/10">
            <div className="text-[#00A63E] mb-2">🌱</div>
            <h3 className="font-bold text-black">Eficiencia</h3>
            <p className="text-sm text-[#6A7282]">
              Optimiza cada proceso de tu finca.
            </p>
          </div>
          <div className="p-4 border border-[#00A63E]/30 rounded-2xl bg-[#00A63E]/10">
            <div className="text-[#00A63E] mb-2">🌿</div>
            <h3 className="font-bold text-black">Sostenible</h3>
            <p className="text-sm text-[#6A7282]">
              Ganadería responsable con el entorno.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Login
            Textbutton="Empezar Ahora"
            style="cursor-pointer px-8 py-8 tracking-wider bg-[#2B7FFF] text-white font-bold rounded-2xl"
          />
        </div>
      </div>

      <div className="order-1 lg:order-2 relative">
        <div className="absolute -inset-4 bg-[#00A63E]/10 rounded-full blur-3xl -z-10"></div>
        <Image
          src={fotovendabal}
          alt="Imagen de Ganadería"
          width={600}
          height={400}
          className="w-full max-w-lg h-auto mx-auto object-cover rounded-3xl shadow-2xl border-8 border-white"
        />
      </div>
    </div>
  </section>
</main>
<Footer />
    </>
  );
}