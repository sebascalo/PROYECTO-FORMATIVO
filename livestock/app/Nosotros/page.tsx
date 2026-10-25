import Image from "next/image";
import dylan from "@/public/dylan.jpeg";
import stefany from "@/public/stefany.jpeg";
import sebas from "@/public/sebas.jpeg";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Nosotros() {
  const team = [
    {
      name: "Sebastian Calderon",
      role: "Gerente del proyecto Tecnólogo en ADSO",
      description: "Analista y desarrollador del sistema de software",
      image: sebas,
      email: "sebastiancalderon5204@gmail.com", 
      github: "https://github.com/sebascalo", 
      linkedin: "#",
    },
    {
      name: "Stefany Vasquez",
      role: "Tecnólogo en ADSO",
      description: "Analista y desarrollador del sistema de software",
      image: stefany,
      email: "vasquezstefany182@gmail.com",
      github: "https://github.com/vasquezstefany182-hash",
      linkedin: "#",
    },
    {
      name: "Dylan Alarcon",
      role: "Tecnólogo en ADSO",
      description: "Analista y desarrollador del sistema de software",
      image: dylan,
      email: "dylanesneideralarconbarrero@gmail.com",
      github: "https://github.com/dylanesneideralarconbarrero-eng",
      linkedin: "#",
    },
  ];

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#F8FAFC] pb-16">
        <div className="flex flex-col items-center text-center px-4 pt-12 pb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-800 tracking-tight">
            Nuestro Equipo
          </h1>
          <p className="max-w-3xl text-gray-500 text-lg">
            Somos aprendices del Tecnólogo en Análisis y Desarrollo de Software del SENA, apasionados por la tecnología. Trabajamos en equipo para crear soluciones innovadoras y mejorar continuamente nuestras habilidades.
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center bg-white border border-gray-200 h-full p-8 rounded-2xl shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-blue-100 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h2>
                <p className="text-sm font-semibold text-blue-500 mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm flex-grow">
                  {member.description}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    title="GitHub"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    title="LinkedIn"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Enviar correo"
                  >
                    <FaEnvelope size={22} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}