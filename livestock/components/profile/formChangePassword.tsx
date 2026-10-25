"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyRound, Lock, ShieldCheck, Save, X, Loader2, Eye, EyeClosed } from "lucide-react";

interface FormChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getEmailFromToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.user || payload.email; 
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export default function FormChangePassword({
  open,
  onOpenChange,
}: FormChangePasswordProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 👇 Estados para los ojitos (uno por cada campo)
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    // Ocultar las contraseñas al cerrar
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.currentPassword) return setError("Ingresa tu contraseña actual");
    if (!formData.newPassword) return setError("Ingresa la nueva contraseña");
    if (formData.newPassword.length < 5)
      return setError("La nueva contraseña debe tener al menos 5 caracteres");
    if (formData.newPassword !== formData.confirmPassword)
      return setError("Las contraseñas no coinciden");

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay sesión activa");

      const email = getEmailFromToken(token);
      if (!email) throw new Error("No se pudo obtener el correo de la sesión");

      const response = await fetch("http://localhost:3000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || `Error ${response.status}`);
      }

      limpiarFormulario();
      onOpenChange(false);
      alert("Contraseña actualizada correctamente");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cambiar la contraseña");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) limpiarFormulario();
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        
        {/* Header */}
        <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-100 flex flex-col items-center justify-center relative">
          <DialogTitle className="text-xl font-bold text-slate-800 tracking-tight">Cambiar contraseña</DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            Actualiza tu contraseña de acceso
          </DialogDescription>
        </div>

        <form id="change-password-form" onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          <div className="space-y-4">
            {/* Contraseña actual */}
            <div>
              <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
                Contraseña actual
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showCurrent ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2B7FFF] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 transition-all"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {/* 👇 Ojito actual */}
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrent ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
                Nueva contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <KeyRound className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showNew ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2B7FFF] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 transition-all"
                  placeholder="Mínimo 5 caracteres"
                  autoComplete="new-password"
                />
                {/* 👇 Ojito nueva */}
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNew ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
                Confirmar nueva contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2B7FFF] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 transition-all"
                  placeholder="Repite la contraseña"
                  autoComplete="new-password"
                />
                {/* 👇 Ojito confirmar */}
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirm ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
              <span className="text-red-500 mt-0.5">⚠️</span>
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <DialogFooter className="mt-6 pt-4 border-t border-slate-100 flex flex-row gap-3 sm:justify-between w-full">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2B7FFF] hover:border-[#2B7FFF]/30 disabled:opacity-50 transition-all"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <button
              type="submit"
              form="change-password-form"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#2B7FFF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E63CC] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/40 focus:ring-offset-1 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Cambiar contraseña
                </>
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}