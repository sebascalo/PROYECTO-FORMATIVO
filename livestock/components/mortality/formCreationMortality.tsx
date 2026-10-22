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
  active: boolean | number;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function FormCreationMortality() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_Bovine: "", // 👈 Restaurado
    dateofExit: new Date().toISOString().split("T")[0],
    exitReason: "",
    idResponsible: "",
    observations: "",
  });

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
        if (!response.ok) throw new Error(resJson?.message || "Error bovinos");
        const activeCattles = (resJson.info ?? []).filter(
          (c: Cattle) => c.active === true || Number(c.active) === 1,
        );
        setCattles(activeCattles);
      } catch (err) {
        setCattlesError(err instanceof Error ? err.message : "No se pudieron cargar bovinos");
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
        if (!response.ok) throw new Error(resJson?.message || "Error responsables");
        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );
        setResponsibles(activeResponsibles);
      } catch (err) {
        setResponsiblesError(err instanceof Error ? err.message : "No se pudieron cargar responsables");
      } finally {
        setLoadingResponsibles(false);
      }
    };
    fetchResponsibles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      id_Bovine: "",
      dateofExit: new Date().toISOString().split("T")[0],
      exitReason: "",
      idResponsible: "",
      observations: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_Bovine) return setError("Debes seleccionar un bovino");
    if (!formData.dateofExit) return setError("La fecha de salida es obligatoria");
    if (!formData.exitReason) return setError("Debes seleccionar un motivo de salida");
    if (!formData.idResponsible) return setError("Debes seleccionar un responsable");

    if (new Date(formData.dateofExit) > new Date()) return setError("La fecha no puede ser futura");

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      dateofExit: formData.dateofExit,
      exitReason: formData.exitReason,
      idResponsible: Number(formData.idResponsible),
      observations: formData.observations || "",
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/mortality/CreateMortality", {
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
      setError(error instanceof Error ? error.message : "No se pudo guardar la salida.");
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
        <ButtonCreate>Agregar Salida</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Registrar Salida
        </DialogTitle>
        <form id="exit-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* BOVINO */}
            <div>
              <label htmlFor="id_Bovine" className="block text-sm font-medium text-gray-700 mb-1">Bovino:</label>
              <select
                id="id_Bovine"
                name="id_Bovine" // 👈 Restaurado
                value={formData.id_Bovine}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{loadingCattles ? "Cargando bovinos..." : "Seleccione un bovino"}</option>
                {cattles.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>{c.id_Bovine} - {c.name}</option>
                ))}
              </select>
              {cattlesError && <p className="text-xs text-red-600 mt-1">{cattlesError}</p>}
            </div>

            {/* FECHA */}
            <div>
              <label htmlFor="dateofExit" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Salida:</label>
              <input
                type="date"
                id="dateofExit"
                name="dateofExit"
                value={formData.dateofExit}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* MOTIVO */}
            <div>
              <label htmlFor="exitReason" className="block text-sm font-medium text-gray-700 mb-1">Motivo de Salida:</label>
              <select
                id="exitReason"
                name="exitReason"
                value={formData.exitReason}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un motivo</option>
                <option value="Venta">Venta</option>
                <option value="Muerte">Muerte</option>
                <option value="Traslado">Traslado a otra finca</option>
                <option value="Descarte">Descarte</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* RESPONSABLE */}
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
                {responsibles.map((r) => (
                  <option key={r.idResponsible} value={r.idResponsible}>{r.fullName} - {r.role}</option>
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
              <p className="text-sm text-gray-600">Complete los campos para registrar una salida.</p>
              <p className="text-xs text-gray-500">{formData.observations.length}/100</p>
            </div>
          </div>
        </form>

        <DialogDescription className="sr-only">Complete los campos para registrar una salida.</DialogDescription>

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
              form="exit-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Salida"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}