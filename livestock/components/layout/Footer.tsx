import Image from "next/image";
import Link from "next/link";
import logo from "@/public/LOGO-LIVESTOCK.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2B7FFF] to-[#1448E6] px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/30 pb-6">
        <div className="md:max-w-96">
          <div className="flex items-center gap-1">
            <Image src={logo} alt="Logo" width={80} height={80} />
            <Link href="/" className="flex items-center gap-1">
              <span className="text-white font-bold text-3xl tracking-wide cursor-pointer">
                Livestock
              </span>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white">
            Gestiona tu ganado de manera eficiente con livestock.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-white" href="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="text-white"
                  href="/Contacto"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  className="text-white"
                  href="/Nosotros"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-white">Contactanos</h2>
            <div className="text-sm space-y-2">
              <p className="text-white">livestocklagranja@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}