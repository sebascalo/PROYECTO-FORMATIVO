import Image from "next/image";
import Link from "next/link";
import cachos from "@/public/cachos.png";
import livestockAzul from "@/public/livestockAzul.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <div className="flex items-center gap-1">
                    <Image src={cachos} alt="Logo" width={80} height={80}/>
                    <Link href="/" className="flex items-center gap-1">
                    <Image src={livestockAzul} alt="Logo" width={195} height={80} className="cursor-pointer"/>
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
                            <li><Link className="text-white hover:text-white/70 transition" href="/">Inicio</Link></li>
                            <li><Link className="text-white hover:text-white/70 transition" href="/Contacto">Contacto</Link></li>
                            <li><Link className="text-white hover:text-white/70 transition" href="/Nosotros">Nosotros</Link></li>
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