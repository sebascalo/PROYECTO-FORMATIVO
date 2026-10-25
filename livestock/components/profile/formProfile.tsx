"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, CreditCard, Mail, Briefcase, Camera, Save, X, Loader2 } from "lucide-react";

interface FormProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserProfile {
  name: string;
  documentId: string;
  email: string;
  postJob: string;
}

const emptyProfile: UserProfile = {
  name: "",
  documentId: "",
  email: "",
  postJob: "",
};

export default function FormProfile({ open, onOpenChange }: FormProfileProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserProfile>(emptyProfile);

  useEffect(() => {
    if (!open) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("No se encontró la sesión del usuario. Inicia sesión nuevamente.");
        }

        const response = await fetch(
          `http://localhost:3000/api/user/UserById/${encodeURIComponent(userId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const responseBody = await response.json();

        if (!response.ok) {
          throw new Error(responseBody?.message || "Error al cargar el perfil");
        }

        const user = responseBody?.info;
        if (!user) {
          throw new Error("El servidor no devolvió los datos del usuario");
        }

        setFormData({
          name: user.name ?? "",
          documentId: user.documentId ?? "",
          email: user.email ?? "",
          postJob: user.postJob ?? "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    void fetchProfile();
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError("El nombre es obligatorio");
    if (!formData.documentId.trim()) return setError("El documento es obligatorio");
    if (!formData.postJob.trim()) return setError("El cargo es obligatorio");

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        throw new Error("No se encontró la sesión del usuario. Inicia sesión nuevamente.");
      }

      const response = await fetch(
        `http://localhost:3000/api/user/UpdateUser/${encodeURIComponent(userId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            documentId: formData.documentId.trim(),
            postJob: formData.postJob.trim(),
          }),
        },
      );
      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody?.message || `Error ${response.status}`);
      }

      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-100 flex flex-col items-center justify-center relative">
          <DialogTitle className="text-xl font-bold text-slate-800 tracking-tight">Perfil</DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            Actualiza tu información personal
          </DialogDescription>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            {/* Ícono de carga en azul */}
            <Loader2 className="h-8 w-8 animate-spin text-[#2B7FFF] mb-2" />
            <p className="text-sm text-slate-500">Cargando datos...</p>
          </div>
        ) : (
          <form id="profile-form" onSubmit={handleSubmit} className="px-6 py-8">
            
            {/* CONTENEDOR GRID: Foto a la izquierda, datos a la derecha */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              {/* COLUMNA IZQUIERDA: Foto */}
              <div className="sm:col-span-1 flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                    <User size={64} className="text-slate-300" />
                    {/* Capa oscura al hacer hover */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="text-white h-8 w-8" />
                    </div>
                  </div>
                </div>
                <span className="text-sm text-slate-500 mt-3 font-medium text-center">
                  Cambiar foto
                </span>
              </div>

              {/* COLUMNA DERECHA: Inputs */}
              <div className="sm:col-span-2 space-y-4">
                
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2B7FFF] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 transition-all"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                </div>

                {/* Documento */}
                <div>
                  <label htmlFor="documentId" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Documento de identidad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CreditCard className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="documentId"
                      name="documentId"
                      value={formData.documentId}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2B7FFF] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 transition-all"
                      placeholder="Ej. 10203040"
                    />
                  </div>
                </div>

                {/* Correo (Deshabilitado) */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 py-2.5 text-sm text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 ml-1">El correo no se puede modificar.</p>
                </div>

                {/* Cargo */}
                <div>
                  <label htmlFor="postJob" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Cargo / Rol
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Briefcase className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="postJob"
                      name="postJob"
                      value={formData.postJob}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2B7FFF] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 transition-all"
                      placeholder="Ej. Administrador"
                    />
                  </div>
                </div>

              </div>
            </div>

            {error && (
              <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <DialogFooter className="mt-8 pt-5 border-t border-slate-100 flex flex-row gap-3 sm:justify-end w-full">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="flex-none flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2B7FFF] hover:border-[#2B7FFF]/30 disabled:opacity-50 transition-all"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
              <button
                type="submit"
                form="profile-form"
                disabled={isSubmitting || loading || Boolean(error)}
                className="flex-none flex items-center justify-center gap-2 rounded-lg bg-[#2B7FFF] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1E63CC] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/40 focus:ring-offset-1 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}