"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";
import { Eye, EyeClosed } from "lucide-react";
import type { User } from "./columns";

const API_URL = "http://localhost:3000/api/user";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  documentId: "",
  postJob: "",
  active: true,
  verifyEmail: false,
};

interface FormCreationUserProps {
  // Si viene un usuario => modo EDITAR. Si no viene => modo CREAR.
  userToEdit?: User | null;
  // Modo controlado (lo usa la tabla para abrir el modal desde el botón Editar).
  // Si NO se envían, el componente se comporta como antes, con su propio botón.
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Se ejecuta cuando se guardó bien (para refrescar la tabla)
  onSuccess?: () => void;
}

export default function FormCreationUser({
  userToEdit = null,
  open,
  onOpenChange,
  onSuccess,
}: FormCreationUserProps) {
  const isEditMode = Boolean(userToEdit);

  // Abierto controlado desde afuera (editar) o interno (crear)
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (value: boolean) => {
    if (isControlled) onOpenChange?.(value);
    else setInternalOpen(value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  // Estados para el ojito
  const [showPassword, setShowPassword] = useState(false);
  const typePassword = showPassword ? "text" : "password";

  // Al abrir en modo edición, cargamos los datos del usuario en el formulario
  useEffect(() => {
    if (isOpen && userToEdit) {
      setFormData({
        name: userToEdit.name ?? "",
        email: userToEdit.email ?? "",
        password: "", // se deja vacía: solo se envía si el usuario escribe una nueva
        documentId: userToEdit.documentId ?? "",
        postJob: userToEdit.postJob ?? "",
        active: Boolean(userToEdit.active),
        verifyEmail: Boolean(userToEdit.verifyEmail),
      });
      setShowPassword(false);
      setError(null);
    }
  }, [isOpen, userToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // VALIDACIÓN SOLO PARA EL DOCUMENTO
    if (name === "documentId") {
      const soloNumeros = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: soloNumeros }));
      if (error) setError(null);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData(emptyForm);
    setShowPassword(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.documentId.length === 0) {
      return setError("El documento es obligatorio");
    }

    // Al crear la contraseña es obligatoria, al editar es opcional
    if (!isEditMode && formData.password.trim() === "") {
      return setError("La contraseña es obligatoria");
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      // URL y método según el modo
      const url = userToEdit
        ? `${API_URL}/UpdateUser/${userToEdit.userId}`
        : `${API_URL}/CreateUser`;
      const method = userToEdit ? "PUT" : "POST";

      // Payload según el modo
      const { name, email, password, documentId, postJob, active, verifyEmail } =
        formData;
      const payload = userToEdit
        ? {
            name,
            email,
            documentId,
            postJob,
            active,
            verifyEmail,
            // solo se envía la contraseña si escribieron una nueva
            ...(password.trim() !== "" ? { password } : {}),
          }
        : { name, email, password, documentId, postJob };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let backendMessage = "";
        try {
          const errorBody = await response.json();
          if (Array.isArray(errorBody?.errors)) {
            backendMessage = errorBody.errors
              .map((e: { message?: string } | string) =>
                typeof e === "string" ? e : e.message ?? String(e),
              )
              .join(" | ");
          } else {
            backendMessage =
              errorBody?.message ||
              errorBody?.error ||
              JSON.stringify(errorBody);
          }
        } catch {
          backendMessage = await response.text();
        }
        throw new Error(
          `El servidor respondió ${response.status}: ${backendMessage || "sin detalle"}`,
        );
      }

      limpiarFormulario();
      setOpen(false);
      onSuccess?.(); // la tabla se refresca sin recargar toda la página
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : isEditMode
            ? "No se pudo actualizar el usuario. Intenta de nuevo."
            : "No se pudo guardar el usuario. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) limpiarFormulario();
    setOpen(newOpen);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* El botón "Agregar Usuario" solo existe cuando NO es controlado */}
      {!isControlled && (
        <DialogTrigger asChild>
          <ButtonCreate>Agregar Usuario</ButtonCreate>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          {isEditMode ? "Editar Usuario" : "Crear Usuario"}
        </DialogTitle>
        <form
          id="user-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* NOMBRE */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Ej: Juan Pérez"
              />
            </div>

            {/* CORREO */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="ejemplo@correo.com"
              />
            </div>

            {/* CONTRASEÑA con ojito */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña:
                {isEditMode && (
                  <span className="ml-1 text-xs font-normal text-gray-400">
                    (opcional si no la cambias)
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type={typePassword}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-10`}
                  placeholder={
                    isEditMode ? "Dejar en blanco para mantener la actual" : "********"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            {/* DOCUMENTO */}
            <div>
              <label
                htmlFor="documentId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Documento:
              </label>
              <input
                type="text"
                id="documentId"
                name="documentId"
                value={formData.documentId}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                className={inputClass}
                placeholder="Ej: 1234567890"
              />
            </div>

            {/* CARGO */}
            <div className="col-span-2">
              <label
                htmlFor="postJob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cargo:
              </label>
              <select
                id="postJob"
                name="postJob"
                value={formData.postJob}
                onChange={handleChange}
                className={`${inputClass} bg-white`}
              >
                <option value="">Seleccione un cargo</option>
                <option value="administrador">Administrador</option>
                <option value="veterinaria">Veterinario</option>
                <option value="operario">Operario</option>
                <option value="gerente">Gerente</option>
                <option value="asistente">Asistente</option>
              </select>
            </div>

            {/* ACTIVO / VERIFICADO: solo tienen sentido al editar */}
            {isEditMode && (
              <div className="col-span-2 flex flex-col gap-2 rounded-md border border-gray-200 p-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        active: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#4B6043]"
                  />
                  Usuario activo
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.verifyEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        verifyEmail: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#4B6043]"
                  />
                  Correo verificado
                </label>
              </div>
            )}
          </div>
        </form>

        <p className="text-sm text-gray-600 -mt-2">
          {isEditMode
            ? "Modifique los campos que necesite actualizar."
            : "Complete los campos para crear un nuevo usuario."}
        </p>

        {/* Oculto para accesibilidad */}
        <DialogDescription className="sr-only">
          {isEditMode
            ? "Modifique los campos para actualizar el usuario."
            : "Complete los campos para crear un nuevo usuario."}
        </DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && (
            <p className="text-sm text-red-600 text-center font-medium">
              ⚠️ {error}
            </p>
          )}
          <div className="flex flex-row gap-2 w-full">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="user-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditMode
                  ? "Actualizar Usuario"
                  : "Guardar Usuario"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}