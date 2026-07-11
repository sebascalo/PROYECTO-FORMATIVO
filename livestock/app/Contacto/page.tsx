import Image from "next/image";
import Ubicacion from "@/public/ubicacion.png";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, MapPin, Mail } from "lucide-react";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* CONTACTO */}
        <section className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Contáctanos</h2>
          <p className="text-gray-500">
            Estamos disponibles para ayudarte con la gestión de tus bovinos.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {/* Teléfono */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow text-center">
            <Phone className="mx-auto mb-3 text-blue-500" size={40} />
            <p className="font-semibold text-lg">Teléfono</p>
            <p className="text-gray-600 mt-2">+57 310 202 3477</p>
            <p className="text-sm text-gray-500 mt-2">
              Lunes a Viernes: 8:00 AM - 5:00 PM
            </p>
          </div>

          {/* WhatsApp */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow text-center">
            <FaWhatsapp className="mx-auto mb-3 text-green-500" size={40} />
            <p className="font-semibold text-lg">WhatsApp</p>
            <p className="text-gray-600 mt-2 mb-4">+57 300 157 3906</p>
            <a
              href="https://wa.me/573001573906"
              target="_blank"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Enviar mensaje
            </a>
          </div>

          {/* Correo */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow text-center">
            <Mail className="mx-auto mb-3 text-purple-500" size={40} />
            <p className="font-semibold text-lg">Correo</p>
            <p className="text-gray-600 mt-2">livestock@gmail.com</p>
          </div>

          {/* Ubicación (ocupa toda la fila) */}
          <div className="md:col-span-3 bg-gray-100 p-6 rounded-2xl shadow text-center">
            <MapPin className="mx-auto mb-3 text-red-500" size={40} />
            <p className="font-semibold text-lg">Ubicación</p>
            <p className="text-gray-600 mt-2 mb-4">
              Espinal - Tolima, SENA La Granja
            </p>
            <Image
              src={Ubicacion}
              alt="Ubicación SENA La Granja"
              width={800}
              height={400}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
