import Image from "next/image";
import dylan from "@/public/dylan.jpeg";
import yeison from "@/public/yeison.jpeg";
import stefany from "@/public/stefany.jpeg";
import sebas from "@/public/sebas.jpeg";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
export default function Nosotros() { 
  return (
    <>
      <NavBar/>
      <div className="flex flex-col items-center text-center pb-16">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800 py-4 lg:py-8">Nuestro equipo</h1>
            <p className="w-3/5 mb-14 text-gray-500 text-sm">Somos aprendices del Tecnólogo en Análisis y Desarrollo de Software del SENA, apasionados por la tecnología. Trabajamos en equipo para crear soluciones innovadoras y mejorar continuamente nuestras habilidades.</p>
            <div className="flex flex-wrap gap-6 items-center justify-center">
                <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
                    <Image src={sebas} alt="Logo" width={50} height={50} className="w-24 rounded-full"/>
                    <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Sebastian Calderon</h2>
                    <p className="text-gray-500 group-hover:text-white/80">Gerente del proyecto Tecnólogo en ADSO</p>
                    <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">Analista y desarrollador del sistema de software</p>
                    <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                </div>
        
                <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
                    <Image src={stefany} alt="Logo" width={50} height={50} className="w-24 rounded-full"/>
                    <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Stefany Vasquez</h2>
                    <p className="text-gray-500 group-hover:text-white/80">Tecnólogo en ADSO</p>
                    <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">Analista y desarrollador del sistema de software</p>
                    <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                </div>
        
                <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
                    <Image src={yeison} alt="Logo" width={50} height={50} className="w-24 rounded-full"/>
                    <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Yeison Vega</h2>
                    <p className="text-gray-500 group-hover:text-white/80">Tecnólogo en ADSO</p>
                    <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">Analista y desarrollador del sistema de software</p>
                    <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition">
                    <Image src={dylan} alt="Logo" width={50} height={50} className="w-24 rounded-full"/>
                    <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Dylan Alarcon</h2>
                    <p className="text-gray-500 group-hover:text-white/80">Tecnólogo en ADSO</p>
                    <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">Analista y desarrollador del sistema de software</p>
                    <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      <Footer />
    </>
  );
}
