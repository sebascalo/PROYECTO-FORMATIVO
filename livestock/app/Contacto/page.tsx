import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, MapPin, Mail } from "lucide-react";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#F8FAFC] pb-16">
        
        {/* HERO DE CONTACTO */}
        <section className="bg-gradient-to-r from-[#2B7FFF] to-[#1448E6] py-16 px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Contáctanos</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Estamos disponibles para ayudarte con la gestión y el cuidado de tus bovinos. ¡Escríbenos!
          </p>
        </section>

        {/* TARJETAS DE CONTACTO */}
        <section className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Teléfono con Botón de Llamar */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-[#2B7FFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Teléfono</h3>
              <p className="text-gray-600 font-medium text-lg">+57 310 202 3477</p>
              <p className="text-sm text-gray-400 mt-2 mb-6">
                Lun a Vie: 8:00 AM - 5:00 PM
              </p>
              <a
                href="tel:+573102023477"
                className="mt-auto bg-[#2B7FFF] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#1E63CC] transition-colors shadow-md w-full"
              >
                Llamar ahora
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp size={32} />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 font-medium text-lg mb-6">+57 300 157 3906</p>
              <a
                href="https://wa.me/573001573906"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-[#25D366] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#1EBE5A] transition-colors shadow-md w-full"
              >
                Enviar mensaje
              </a>
            </div>

            {/* Correo con Botón de mailto */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Correo</h3>
              <p className="text-gray-600 font-medium break-all mb-6">livestocklagranja@gmail.com</p>
              <a
                href="mailto:livestocklagranja@gmail.com"
                className="mt-auto bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-md w-full"
              >
                Enviar correo
              </a>
            </div>
          </div>
        </section>

        {/* MAPA DE UBICACIÓN */}
        <section className="container mx-auto px-4 mt-12">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden max-w-5xl mx-auto">
            <div className="p-6 text-center border-b border-gray-100 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[#2B7FFF]">
                <MapPin size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Nuestra Ubicación</h2>
              </div>
              <p className="text-gray-500">
                Centro Agropecuario La Granja - SENA (Espinal, Tolima)
              </p>
            </div>
            
            <div className="w-full h-[400px] bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.2426363269915!2d-74.9298274252644!3d4.172643495801179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3ed3e7f32bc353%3A0x17c49f902cb02ef7!2sCentro%20Agropecuario%20La%20granja%20Sena!5e0!3m2!1sen!2sco!4v1792830081763!5m2!1sen!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ubicación SENA La Granja"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}