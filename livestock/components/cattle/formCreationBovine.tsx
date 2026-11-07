"use client";

import { useEffect, useState } from "react";
import { type Cattle } from "./columns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import ButtonCreate from "../ui/buttonCreate";
import { toast } from "@/components/ui/toast";

// Tipos
interface Race {
  id_race: number;
  name_race: string;
  active: "Active" | "Inactive";
}

interface CattleBase {
  id_Bovine: number;
  name: string;
  sex: string;
}

// Props del componente
interface FormCreationCattleProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cattleToEdit?: Cattle | null;
}

export default function FormCreationCattle({
  isOpen,
  onClose,
  onSuccess,
  cattleToEdit = null,
}: FormCreationCattleProps): React.JSX.Element | null {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id_Bovine: "",
    name: "",
    id_race: "",
    sex: "",
    entrydate: "",
    id_mother: "",
    id_father: "",
    birthdate: "",
    photo: "",
    currentweight: "",
    classificationbytype: "",
    active: "Activo",
  });

  // Estados para las razas
  const [races, setRaces] = useState<Race[]>([]);
  const [loadingRaces, setLoadingRaces] = useState(true);

  // Estados para padre y madre
  const [allCattles, setAllCattles] = useState<CattleBase[]>([]);

  // Detectar si estamos editando
  const isEditing = Boolean(cattleToEdit);

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      id_Bovine: "",
      name: "",
      id_race: "",
      sex: "",
      entrydate: "",
      id_mother: "",
      id_father: "",
      birthdate: "",
      photo: "",
      currentweight: "",
      classificationbytype: "",
      active: "Activo",
    });

    setError(null);
  };

  // Cargar datos cuando se edita un bovino
  useEffect(() => {
    if (isOpen && cattleToEdit) {
      setFormData({
        id_Bovine: String(cattleToEdit.id_Bovine ?? ""),
        name: cattleToEdit.name ?? "",
        id_race: String(cattleToEdit.id_race ?? ""),
        sex: cattleToEdit.sex ?? "",
        entrydate: cattleToEdit.entrydate?.split("T")[0] ?? "",
        id_mother: cattleToEdit.id_mother
          ? String(cattleToEdit.id_mother)
          : "",
        id_father: cattleToEdit.id_father
          ? String(cattleToEdit.id_father)
          : "",
        birthdate: cattleToEdit.birthdate?.split("T")[0] ?? "",
        photo: cattleToEdit.photo ?? "",
        currentweight: String(cattleToEdit.currentweight ?? ""),
        classificationbytype: cattleToEdit.classificationbytype ?? "",
        active: String(cattleToEdit.active ?? "Activo"),
      });

      setError(null);
    } else if (isOpen && !cattleToEdit) {
      limpiarFormulario();
    }
  }, [cattleToEdit, isOpen]);

  // Cargar razas
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/race/RaceAll?limit=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson?.message || "Error al obtener razas");
        }

        const activeRaces = (resJson.info ?? []).filter(
          (r: Race) => r.active === "Active"
        );

        setRaces(activeRaces);
      } catch (err) {
        console.error("Error razas:", err);
      } finally {
        setLoadingRaces(false);
      }
    };

    fetchRaces();
  }, []);

  // Cargar bovinos para seleccionar padre y madre
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/cattle/CattleAll?limit=500",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resJson = await response.json();

        if (response.ok) {
          setAllCattles(resJson.info ?? []);
        }
      } catch (err) {
        console.error("Error cargando bovinos:", err);
      }
    };

    fetchCattles();
  }, []);

  // Filtrar padres y madres
  const mothers = allCattles.filter(
    (c) =>
      c.sex === "Hembra" &&
      c.id_Bovine !== Number(cattleToEdit?.id_Bovine)
  );

  const fathers = allCattles.filter(
    (c) =>
      c.sex === "Macho" &&
      c.id_Bovine !== Number(cattleToEdit?.id_Bovine)
  );

  // Detectar cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!formData.id_Bovine.trim()) {
      return setError("El ID / Arete del bovino es obligatorio");
    }

    if (!formData.name.trim()) {
      return setError("El nombre del bovino es obligatorio");
    }

    if (!formData.id_race) {
      return setError("Debes seleccionar una raza");
    }

    if (!formData.sex) {
      return setError("Debes seleccionar un sexo");
    }

    if (!formData.entrydate) {
      return setError("La fecha de ingreso es obligatoria");
    }

    if (!formData.birthdate) {
      return setError("La fecha de nacimiento es obligatoria");
    }

    const weight = parseFloat(formData.currentweight);

    if (isNaN(weight) || weight <= 0) {
      return setError("El peso debe ser un número mayor a 0");
    }

    if (!formData.classificationbytype) {
      return setError("Debes seleccionar una clasificación");
    }

    if (new Date(formData.birthdate) > new Date(formData.entrydate)) {
      return setError(
        "La fecha de nacimiento no puede ser posterior a la de ingreso"
      );
    }

    if (new Date(formData.entrydate) > new Date()) {
      return showError("La fecha de ingreso no puede ser futura");
    }

    // Datos que se envían al backend
    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      name: formData.name,
      id_race: Number(formData.id_race),
      sex: formData.sex,
      entrydate: formData.entrydate,
      id_mother: formData.id_mother
        ? Number(formData.id_mother)
        : null,
      id_father: formData.id_father
        ? Number(formData.id_father)
        : null,
      birthdate: formData.birthdate,
      photo: formData.photo || null,
      currentweight: weight,
      classificationbytype: formData.classificationbytype,
      active: formData.active,
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      // Determinar URL según la operación
      const url = isEditing
        ? `http://localhost:3000/api/cattle/UpdateCattle/${cattleToEdit?.id_Bovine}`
        : "http://localhost:3000/api/cattle/CreateCattle";

      const method = isEditing ? "PUT" : "POST";

      const payload = isEditing
        ? {
            name: formData.name,
            id_race: Number(formData.id_race),
            sex: formData.sex,
            entrydate: formData.entrydate,
            id_mother: formData.id_mother
              ? Number(formData.id_mother)
              : null,
            id_father: formData.id_father
              ? Number(formData.id_father)
              : null,
            birthdate: formData.birthdate,
            photo: formData.photo || null,
            currentweight: weight,
            classificationbytype: formData.classificationbytype,
            active: formData.active,
          }
        : datosEnviar;

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

          if (Array.isArray(errorBody?.errors)) {
            backendMessage = errorBody.errors
              .map((e: { message?: string } | string) =>
                typeof e === "string"
                  ? e
                  : e.message ?? String(e)
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
          `El servidor respondió ${response.status}: ${
            backendMessage || "sin detalle"
          }`
        );
      }

      // Si todo sale bien
      limpiarFormulario();
      onSuccess();
      onClose();

    } catch (error) {
      console.error("Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el bovino. Intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cerrar formulario
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
          {isEditing ? "Editar Bovino" : "Crear Bovino"}
        </DialogTitle>

        <form
          id="cattle-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">

            {/* ID */}
            <div>
              <label
                htmlFor="id_Bovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID / Arete:
              </label>

              <input
                type="number"
                id="id_Bovine"
                name="id_Bovine"
                value={formData.id_Bovine}
                onChange={handleChange}
                disabled={isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] disabled:bg-gray-100"
                placeholder="Ej: 1001"
              />
            </div>

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
                placeholder="Ej: Lola"
              />
            </div>

            {/* RAZA */}
            <div>
              <label
                htmlFor="id_race"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Raza:
              </label>

              <select
                id="id_race"
                name="id_race"
                value={formData.id_race}
                onChange={handleChange}
                disabled={loadingRaces}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">
                  {loadingRaces ? "Cargando razas..." : "Seleccione una raza"}
                </option>

                {races.map((race) => (
                  <option key={race.id_race} value={race.id_race}>
                    {race.name_race}
                  </option>
                ))}
              </select>
            </div>

            {/* SEXO */}
            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sexo:
              </label>

              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un sexo</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            {/* PADRE */}
            <div>
              <label
                htmlFor="id_father"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Padre (Opcional):
              </label>

              <select
                id="id_father"
                name="id_father"
                value={formData.id_father}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Sin registrar</option>

                {fathers.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* MADRE */}
            <div>
              <label
                htmlFor="id_mother"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Madre (Opcional):
              </label>

              <select
                id="id_mother"
                name="id_mother"
                value={formData.id_mother}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Sin registrar</option>

                {mothers.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FECHA INGRESO */}
            <div>
              <label
                htmlFor="entrydate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Ingreso:
              </label>

              <input
                type="date"
                id="entrydate"
                name="entrydate"
                value={formData.entrydate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* FECHA NACIMIENTO */}
            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Nacimiento:
              </label>

              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* PESO */}
            <div>
              <label
                htmlFor="currentweight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Peso Actual (kg):
              </label>

              <input
                type="number"
                id="currentweight"
                name="currentweight"
                value={formData.currentweight}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 450.5"
              />
            </div>

            {/* CLASIFICACIÓN */}
            <div>
              <label
                htmlFor="classificationbytype"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Clasificación:
              </label>

              <select
                id="classificationbytype"
                name="classificationbytype"
                value={formData.classificationbytype}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una clasificación</option>
                <option value="Toro">Toro</option>
                <option value="Novilla levante">Novilla levante</option>
                <option value="Novilla vientre">Novilla vientre</option>
                <option value="Ternero">Ternero</option>
                <option value="Vaca">Vaca</option>
              </select>
            </div>

            {/* FOTO */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Foto (URL):
              </label>

              <input
                type="text"
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="https://ejemplo.com/foto.jpg"
              />
            </div>

          </div>
        </form>

        <p className="text-sm text-gray-600 -mt-2">
          Complete los campos para {isEditing ? "actualizar" : "crear"} un bovino.
        </p>

        <DialogDescription className="sr-only">
          Complete los campos para registrar o actualizar un bovino.
        </DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">

          {error && (
            <p className="text-sm text-red-600 text-center font-medium">
              ⚠️ {error}
            </p>
          )}

          <div className="flex flex-row gap-2 w-full">

            {/* CANCELAR */}
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

            {/* GUARDAR / ACTUALIZAR */}
            <button
              type="submit"
              form="cattle-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Bovino"
                  : "Guardar Bovino"}
            </button>

          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}