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
import { API_USER_URL } from "@/api/config";

// import {User} from "@/app/admin/usuarios/page";
// IMPORTANTE: en columns.tsx el tipo User debe tener el campo: id_roll?: number | null
import { type User } from "./columns";

/* ==========================================================================
   NUEVO: tipo del rol que viene de la tabla `roles` de la base de datos.
   Reemplaza al antiguo `UserRole` (que tenía los cargos fijos en el código)
   y a `UserPayload` (que ya no se usaba).
   ========================================================================== */
interface Role {
  id: number;
  name: string;
  description?: string | null;
}

/* ==========================================================================
   NUEVO: URLs del backend.
   Coinciden con las rutas base de tu server.js:
     app.use("/api/user", userRoute);
     app.use("/api/roles", roleRoutes);
   ========================================================================== */
const API_BASE = "http://localhost:3000/api";
const USER_URL = `${API_BASE}/user`;
const ROLES_URL = `${API_BASE}/roles`;

// Interfaz de los props del componente
interface FormCreationUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userToEdit?: User | null; // si viene null es crear, si viene objeto es EDITAR
}

// Retorno tipado: React.JSX.Element | null
export default function FormCreationUser({
  isOpen,
  onClose,
  onSuccess,
  userToEdit = null, // valor por defecto
}: FormCreationUserProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------------------------------------
     NUEVO: estados para los roles que vienen de la base de datos.
     - roles: la lista que se pinta en el <select>
     - loadingRoles: para mostrar "Cargando roles..." mientras se piden
     ------------------------------------------------------------------------ */
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  /* ------------------------------------------------------------------------
     CAMBIO: `postJob` pasa a llamarse `id_roll`, que es el nombre del campo
     que espera el backend (createUser lo exige y lo guarda en users.id_roll).
     Guarda el ID del rol como string (el value de un <select> siempre es string).
     ------------------------------------------------------------------------ */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    documentId: "",
    id_roll: "",
  });

  // Estados para el ojito
  const [showPassword, setShowPassword] = useState(false);
  const typePassword = showPassword ? "text" : "password";

  // Detectar si estamos en modo edición
  const isEditing = Boolean(userToEdit);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name ?? "",
        email: userToEdit.email ?? "",
        password: "",
        documentId: userToEdit.documentId ?? "",
        // CAMBIO: al editar, precargamos el rol actual del usuario
        // (se convierte a string para que coincida con el value del <option>)
        id_roll: userToEdit.id_roll != null ? String(userToEdit.id_roll) : "",
      });
    } else {
      limpiarFormulario();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToEdit, isOpen]);

  /* ==========================================================================
     NUEVO: cargar los roles desde la base de datos.
     Se ejecuta cada vez que se abre el modal (isOpen pasa a true).
     Llama a GET /api/roles, que devuelve { message, data: [ {id, name, ...} ] }
     ========================================================================== */
  useEffect(() => {
    if (!isOpen) return; // si el modal está cerrado no pedimos nada

    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(ROLES_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);

        const body = await res.json();
        // Tu clase Response devuelve { success, message, info, error }:
        // la lista de roles viene en `info` (no en `data`).
        setRoles(Array.isArray(body?.info) ? body.info : []);
      } catch (err) {
        console.error("Error cargando roles:", err);
        setError("No se pudieron cargar los roles");
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // VALIDACIÓN SOLO PARA EL DOCUMENTO
    if (name === "documentId") {
      // Reemplaza cualquier cosa que no sea un número del 0 al 9 por un string vacío
      const soloNumeros = value.replace(/\D/g, "");
      // Corta el string a máximo 10 caracteres
      const recortado = soloNumeros.slice(0, 10);

      setFormData((prev) => ({ ...prev, [name]: recortado }));
      if (error) setError(null);
      return;
    }

    // Comportamiento normal para los demás campos (incluye id_roll)
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      documentId: "",
      id_roll: "", // CAMBIO: antes era postJob
    });
    setShowPassword(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación extra al enviar
    if (formData.documentId.length === 0) {
      return setError("El documento es obligatorio");
    }
    // NUEVO: el rol es obligatorio
    if (!formData.id_roll) {
      return setError("Debes seleccionar un rol");
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `${USER_URL}/UpdateUser/${userToEdit?.userId}`
        : `${USER_URL}/CreateUser`;

      const method = isEditing ? "PUT" : "POST";

      /* CAMBIO: el payload ahora envía `id_roll` en lugar de `postJob`.
         Se manda como string porque el backend (createUser) hace id_roll.trim(),
         y eso falla si llegara un número. */
      const payload = isEditing
        ? {
            name: formData.name,
            email: formData.email,
            documentId: formData.documentId,
            id_roll: formData.id_roll,
          }
        : formData; // name, email, password, documentId, id_roll

      const response = await fetch(url, {
        method: method,
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
          // El backend manda los errores en `error` (array de textos u objetos)
          if (Array.isArray(errorBody?.error)) {
            backendMessage = errorBody.error
              .map((e: { message?: string } | string) =>
                typeof e === "string" ? e : (e.message ?? String(e)),
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

      // El usuario ya quedó guardado en `users`, incluyendo su id_roll.
      // (Ya no se usa la tabla user_roles.)
      limpiarFormulario();
      onSuccess();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el usuario. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      limpiarFormulario();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          {isEditing ? "Editar Usuario" : "Crear Usuario"}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
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
              </label>
              <div className="relative">
                <input
                  type={typePassword}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                  placeholder="********"
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
                inputMode="numeric" // Abre teclado numérico en móviles
                maxLength={10} // Límite estricto de 10 caracteres
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 1234567890"
              />
            </div>

            {/* ================================================================
                CAMBIO: ROL
                Antes: <select name="postJob"> con opciones fijas escritas a mano
                (administrador, veterinaria, operario...).
                Ahora: <select name="id_roll"> cuyas opciones se generan con .map()
                a partir de la lista `roles` traída de la base de datos.
                  - value  = el ID del rol  -> es lo que se guarda en users.id_roll
                  - texto  = el nombre del rol -> lo que ve el usuario
                ================================================================ */}
            <div className="col-span-2">
              <label
                htmlFor="id_roll"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rol:
              </label>
              <select
                id="id_roll"
                name="id_roll"
                value={formData.id_roll}
                onChange={handleChange}
                disabled={loadingRoles} // se bloquea mientras cargan los roles
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">
                  {loadingRoles ? "Cargando roles..." : "Seleccione un rol"}
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={String(role.id)}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        {/* Descripción arriba a la izquierda */}
        <p className="text-sm text-gray-600 -mt-2">
          Complete los campos para crear un nuevo usuario.
        </p>

        {/* Oculto para accesibilidad */}
        <DialogDescription className="sr-only">
          Complete los campos para crear un nuevo usuario.
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
              onClick={() => {
                limpiarFormulario();
                onClose();
              }}
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
                : isEditing
                  ? "Actualizar Usuario"
                  : "Guardar Usuario"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}