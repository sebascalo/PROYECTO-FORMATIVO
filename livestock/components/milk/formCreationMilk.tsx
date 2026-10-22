"use client";
import { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger, DialogTitle,
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";

interface Cattle { id_Bovine: number; name: string; sex: string; active: boolean | number; }
interface Responsible { idResponsible: number; fullName: string; role: string; status: "Active" | "Inactive"; }

export default function FormCreationMilk() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_Bovine: "",
    milkingDate: new Date().toISOString().split("T")[0],
    shift: "Mañana",
    litersQuantity: "",
    observations: "",
    idResponsible: "",
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
        const response = await fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", { headers: { Authorization: `Bearer ${token}` } });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error bovinos");
        const femaleCattles = (resJson.info ?? []).filter((c: Cattle) => c.sex === "Hembra" && (c.active === true || Number(c.active) === 1));
        setCattles(femaleCattles);
      } catch (err) { setCattlesError(err instanceof Error ? err.message : "Error bovinos"); } finally { setLoadingCattles(false); }
    };
    fetchCattles();
  }, []);

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=200", { headers: { Authorization: `Bearer ${token}` } });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error responsables");
        const activeResponsibles = (resJson.info ?? []).filter((r: Responsible) => r.status === "Active");
        setResponsibles(activeResponsibles);
      } catch (err) { setResponsiblesError(err instanceof Error ? err.message : "Error responsables"); } finally { setLoadingResponsibles(false); }
    };
    fetchResponsibles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      id_Bovine: "", milkingDate: new Date().toISOString().split("T")[0], shift: "Mañana", litersQuantity: "", observations: "", idResponsible: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_Bovine) return setError("Debes seleccionar una vaca");
    if (!formData.milkingDate) return setError("La fecha es obligatoria");
    if (!formData.shift) return setError("Debes seleccionar un turno");
    const liters = parseFloat(formData.litersQuantity);
    if (isNaN(liters) || liters <= 0) return setError("Los litros deben ser un número mayor a 0");
    if (!formData.idResponsible) return setError("Debes seleccionar un responsable");
    if (new Date(formData.milkingDate) > new Date()) return setError("La fecha no puede ser futura");

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      milkingDate: formData.milkingDate,
      shift: formData.shift,
      litersQuantity: liters,
      observations: formData.observations || "",
      idResponsible: Number(formData.idResponsible),
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/milk/CreateMilk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(datosEnviar),
      });
      if (!response.ok) {
        let backendMessage = "";
        try {
          const errorBody = await response.json();
          backendMessage = Array.isArray(errorBody?.errors) ? errorBody.errors.map((e: any) => e.message || e).join(" | ") : (errorBody?.message || "Error");
        } catch { backendMessage = await response.text(); }
        throw new Error(`El servidor respondió ${response.status}: ${backendMessage}`);
      }
      limpiarFormulario();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar la producción.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if(!v) limpiarFormulario(); setOpen(v); }}>
      <DialogTrigger asChild><ButtonCreate>Agregar Producción</ButtonCreate></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">Crear Producción de Leche</DialogTitle>
        <form id="milk-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="id_Bovine" className="block text-sm font-medium text-gray-700 mb-1">Vaca:</label>
              <select id="id_Bovine" name="id_Bovine" value={formData.id_Bovine} onChange={handleChange} disabled={loadingCattles} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 bg-white">
                <option value="">{loadingCattles ? "Cargando vacas..." : "Seleccione una vaca"}</option>
                {cattles.map((c) => (<option key={c.id_Bovine} value={c.id_Bovine}>{c.id_Bovine} - {c.name}</option>))}
              </select>
              {cattlesError && <p className="text-xs text-red-600 mt-1">{cattlesError}</p>}
            </div>

            <div>
              <label htmlFor="milkingDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ordeño:</label>
              <input type="date" id="milkingDate" name="milkingDate" value={formData.milkingDate} onChange={handleChange} max={new Date().toISOString().split("T")[0]} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30" />
            </div>

            <div>
              <label htmlFor="shift" className="block text-sm font-medium text-gray-700 mb-1">Turno:</label>
              <select id="shift" name="shift" value={formData.shift} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 bg-white">
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>

            <div>
              <label htmlFor="litersQuantity" className="block text-sm font-medium text-gray-700 mb-1">Cantidad (Litros):</label>
              <input type="number" id="litersQuantity" name="litersQuantity" value={formData.litersQuantity} onChange={handleChange} step="0.1" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30" placeholder="Ej: 25.5" />
            </div>

            {/* ❌ CAMPO CALIDAD ELIMINADO */}

            <div className="col-span-2">
              <label htmlFor="idResponsible" className="block text-sm font-medium text-gray-700 mb-1">Responsable:</label>
              <select id="idResponsible" name="idResponsible" value={formData.idResponsible} onChange={handleChange} disabled={loadingResponsibles} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 bg-white">
                <option value="">{loadingResponsibles ? "Cargando responsables..." : "Seleccione un responsable"}</option>
                {responsibles.map((r) => (<option key={r.idResponsible} value={r.idResponsible}>{r.fullName} - {r.role}</option>))}
              </select>
              {responsiblesError && <p className="text-xs text-red-600 mt-1">{responsiblesError}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">Observaciones:</label>
            <div className="relative">
              <textarea id="observations" name="observations" value={formData.observations} onChange={handleChange} rows={2} maxLength={100} className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 bg-white resize-none" placeholder="Escribe tus observaciones..." />
              {formData.observations.length > 0 && (
                <button type="button" onClick={() => setFormData((prev) => ({ ...prev, observations: "" }))} className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-600">Complete los campos para crear un nuevo registro.</p>
              <p className="text-xs text-gray-500">{formData.observations.length}/100</p>
            </div>
          </div>
        </form>
        <DialogDescription className="sr-only">Complete los campos.</DialogDescription>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center font-medium">⚠️ {error}</p>}
          <div className="flex flex-row gap-2 w-full">
            <button type="button" onClick={() => setOpen(false)} disabled={isSubmitting} className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md">Cancelar</button>
            <button type="submit" form="milk-create-form" disabled={isSubmitting} className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700">
              {isSubmitting ? "Guardando..." : "Guardar Producción"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}