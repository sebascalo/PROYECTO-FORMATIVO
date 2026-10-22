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

interface Cattle {
  id_Bovine: number;
  name: string;
  currentweight: number; // 👈 Necesitamos el peso para mostrarlo
  active: boolean | number;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function FormCreationWeighing() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    idBovine: "",
    weighingdate: new Date().toISOString().split("T")[0],
    currentweight: "",
    profitorloss: "",
    bodycondition: "",
    observations: "",
    idResponsible: "",
  });

  // 👇 Estado para guardar el último peso del bovino seleccionado
  const [lastWeight, setLastWeight] = useState<number>(0);

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);
  const [responsiblesError, setResponsiblesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error al obtener bovinos");

        const activeCattles = (resJson.info ?? []).filter(
          (c: Cattle) => c.active === true || Number(c.active) === 1,
        );
        setCattles(activeCattles);
      } catch (err) {
        setCattlesError(err instanceof Error ? err.message : "No se pudieron cargar los bovinos");
      } finally {
        setLoadingCattles(false);
      }
    };
    fetchCattles();
  }, []);

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=200", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error al obtener responsables");

        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );
        setResponsibles(activeResponsibles);
      } catch (err) {
        setResponsiblesError(err instanceof Error ? err.message : "No se pudieron cargar los responsables");
      } finally {
        setLoadingResponsibles(false);
      }
    };
    fetchResponsibles();
  }, []);

  // 👇 Lógica para calcular la ganancia/pérdida y mostrar el último peso
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "idBovine") {
      const selectedCattle = cattles.find((c) => String(c.id_Bovine) === value);
      const weight = selectedCattle ? Number(selectedCattle.currentweight) : 0;
      setLastWeight(weight);
      
      // Limpiamos el peso nuevo y la ganancia al cambiar de bovino
      setFormData((prev) => ({ ...prev, idBovine: value, currentweight: "", profitorloss: "" }));
      return;
    }

    if (name === "currentweight") {
      const newWeight = parseFloat(value);
      const diff = isNaN(newWeight) ? "" : (newWeight - lastWeight).toFixed(1);
      setFormData((prev) => ({ ...prev, currentweight: value, profitorloss: diff }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      idBovine: "",
      weighingdate: new Date().toISOString().split("T")[0],
      currentweight: "",
      profitorloss: "",
      bodycondition: "",
      observations: "",
      idResponsible: "",
    });
    setLastWeight(0);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.idBovine) return setError("Debes seleccionar un bovino");
    if (!formData.weighingdate) return setError("La fecha de pesaje es obligatoria");

    const weight = parseFloat(formData.currentweight);
    if (isNaN(weight) || weight <= 0) return setError("El peso nuevo debe ser un número mayor a 0");
    if (!formData.bodycondition) return setError("Debes seleccionar una condición corporal");

    if (formData.observations && formData.observations.length > 100) {
      return setError("Las observaciones no pueden exceder los 100 caracteres");
    }

    if (new Date(formData.weighingdate) > new Date()) {
      return setError("La fecha de pesaje no puede ser una fecha futura");
    }

    const datosEnviar = {
      id_Bovine: formData.idBovine,
      weighingdate: formData.weighingdate,
      currentweight: weight,
      profitorloss: formData.profitorloss ? parseFloat(formData.profitorloss) : null,
      bodycondition: formData.bodycondition || null,
      observations: formData.observations || null,
      idResponsible: formData.idResponsible ? Number(formData.idResponsible) : null,
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/weighing/CreateWeighing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosEnviar),
      });

      if (!response.ok) {
        let backendMessage = "";
        try {
          const errorBody = await response.json();
          if (Array.isArray(errorBody?.errors)) {
            backendMessage = errorBody.errors.map((e: any) => typeof e === "string" ? e : e.message).join(" | ");
          } else {
            backendMessage = errorBody?.message || errorBody?.error || JSON.stringify(errorBody);
          }
        } catch {
          backendMessage = await response.text();
        }
        throw new Error(`El servidor respondió ${response.status}: ${backendMessage}`);
      }

      limpiarFormulario();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar el pesaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) limpiarFormulario();
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Pesaje</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">Crear Pesaje</DialogTitle>
        <form id="weighing-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* BOVINO DINÁMICO */}
            <div>
              <label htmlFor="idBovine" className="block text-sm font-medium text-gray-700 mb-1">Bovino:</label>
              <select
                id="idBovine"
                name="idBovine"
                value={formData.idBovine}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{loadingCattles ? "Cargando bovinos..." : "Seleccione un bovino"}</option>
                {cattles.map((cattle) => (
                  <option key={cattle.id_Bovine} value={cattle.id_Bovine}>
                    {cattle.id_Bovine} - {cattle.name}
                  </option>
                ))}
              </select>
              {cattlesError && <p className="text-xs text-red-600 mt-1">{cattlesError}</p>}
            </div>

            {/* FECHA PESAJE */}
            <div>
              <label htmlFor="weighingdate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pesaje:</label>
              <input
                type="date"
                id="weighingdate"
                name="weighingdate"
                value={formData.weighingdate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* ÚLTIMO PESO (SOLO LECTURA) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Último Peso (kg):</label>
              <input
                type="text"
                disabled
                value={lastWeight ? `${lastWeight} kg` : ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                placeholder="Seleccione un bovino"
              />
            </div>

            {/* NUEVO PESO */}
            <div>
              <label htmlFor="currentweight" className="block text-sm font-medium text-gray-700 mb-1">Peso Nuevo (kg):</label>
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

            {/* GANANCIA / PÉRDIDA (AUTO) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ganancia/Pérdida (kg):</label>
              <input
                type="text"
                disabled
                value={
                  formData.profitorloss 
                    ? `${Number(formData.profitorloss) > 0 ? "+" : ""}${formData.profitorloss} kg` 
                    : ""
                }
                className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed font-medium ${
                  Number(formData.profitorloss) > 0 ? "text-[#4B6043]" : 
                  Number(formData.profitorloss) < 0 ? "text-[#A9744F]" : "text-gray-600"
                }`}
                placeholder="Auto"
              />
            </div>

            {/* CONDICIÓN CORPORAL CON NUEVOS VALORES */}
            <div>
              <label htmlFor="bodycondition" className="block text-sm font-medium text-gray-700 mb-1">Condición Corporal:</label>
              <select
                id="bodycondition"
                name="bodycondition"
                value={formData.bodycondition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una condición</option>
                <option value="1 - Flaco">1 - Flaco</option>
                <option value="2 - Delgado">2 - Delgado</option>
                <option value="3 - Ideal">3 - Ideal</option>
                <option value="4 - Gordo">4 - Gordo</option>
                <option value="5 - Obeso">5 - Obeso</option>
              </select>
            </div>

            {/* RESPONSABLE DINÁMICO */}
            <div>
              <label htmlFor="idResponsible" className="block text-sm font-medium text-gray-700 mb-1">Responsable:</label>
              <select
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
                onChange={handleChange}
                disabled={loadingResponsibles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{loadingResponsibles ? "Cargando responsables..." : "Seleccione un responsable"}</option>
                {responsibles.map((resp) => (
                  <option key={resp.idResponsible} value={resp.idResponsible}>
                    {resp.fullName} - {resp.role}
                  </option>
                ))}
              </select>
              {responsiblesError && <p className="text-xs text-red-600 mt-1">{responsiblesError}</p>}
            </div>
          </div>

          {/* OBSERVACIONES */}
          <div>
            <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">Observaciones:</label>
            <div className="relative">
              <textarea
                id="observations"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                rows={2}
                maxLength={100}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white resize-none"
                placeholder="Escribe tus observaciones..."
              />
              {formData.observations.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, observations: "" }))}
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-600">Complete los campos para crear un nuevo pesaje.</p>
              <p className="text-xs text-gray-500">{formData.observations.length}/100</p>
            </div>
          </div>
        </form>

        <DialogDescription className="sr-only">Complete los campos para crear un nuevo pesaje.</DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center font-medium">⚠️ {error}</p>}
          <div className="flex flex-row gap-2 w-full">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="weighing-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Pesaje"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}