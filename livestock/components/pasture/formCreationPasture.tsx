"use client";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger, DialogTitle,
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";

export default function FormCreationPasture() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    extension: "",
    forageCapacity: "",
    pastureType: "",
    currentStatus: "",
    cattleEntryDate: "",
    cattleExitDate: "",
    observations: "", // 👈 NUEVO CAMPO
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      name: "", extension: "", forageCapacity: "", pastureType: "", currentStatus: "", cattleEntryDate: "", cattleExitDate: "", observations: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError("El nombre es obligatorio");
    if (!formData.extension || isNaN(parseFloat(formData.extension))) return setError("La extensión debe ser un número");
    if (!formData.forageCapacity || isNaN(parseInt(formData.forageCapacity))) return setError("El aforo debe ser un número");
    if (!formData.pastureType.trim()) return setError("El tipo de pastura es obligatorio");
    if (!formData.currentStatus) return setError("El estado actual es obligatorio");

    const datosEnviar = {
      ...formData,
      extension: parseFloat(formData.extension),
      forageCapacity: parseInt(formData.forageCapacity),
      cattleEntryDate: formData.cattleEntryDate || null,
      cattleExitDate: formData.cattleExitDate || null,
      observations: formData.observations || null, // 👈 Enviamos observaciones
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/pasture/CreatePasture", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(datosEnviar),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Error al guardar");
      }

      limpiarFormulario();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar el potrero.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if(!v) limpiarFormulario(); setOpen(v); }}>
      <DialogTrigger asChild><ButtonCreate>Agregar Potrero</ButtonCreate></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">Crear Potrero</DialogTitle>
        <form id="pasture-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: Potrero Norte" />
            </div>

            <div>
              <label htmlFor="extension" className="block text-sm font-medium text-gray-700 mb-1">Extensión (ha):</label>
              <input type="number" id="extension" name="extension" value={formData.extension} onChange={handleChange} step="0.1" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: 2.5" />
            </div>

            <div>
              <label htmlFor="forageCapacity" className="block text-sm font-medium text-gray-700 mb-1">Aforo (Cap. Máx):</label>
              <input type="number" id="forageCapacity" name="forageCapacity" value={formData.forageCapacity} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: 20" />
            </div>

            {/* 👇 INPUT DE TIPO DE PASTURA (Antes era Select) */}
            <div>
              <label htmlFor="pastureType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Pastura:</label>
              <input type="text" id="pastureType" name="pastureType" value={formData.pastureType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: Hierba, Leguminosa, Kikuyo..." />
            </div>

            <div>
              <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 mb-1">Estado Actual:</label>
              <select id="currentStatus" name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                <option value="">Seleccione un estado</option>
                <option value="activa">Activa</option>
                <option value="descanso">En Descanso</option>
              </select>
            </div>

            <div>
              <label htmlFor="cattleEntryDate" className="block text-sm font-medium text-gray-700 mb-1">Ingreso Ganado:</label>
              <input type="date" id="cattleEntryDate" name="cattleEntryDate" value={formData.cattleEntryDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="cattleExitDate" className="block text-sm font-medium text-gray-700 mb-1">Salida Ganado:</label>
              <input type="date" id="cattleExitDate" name="cattleExitDate" value={formData.cattleExitDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            {/* 👇 OBSERVACIONES (Antes era Último Químico) */}
            <div className="col-span-2">
              <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">Observaciones:</label>
              <input type="text" id="observations" name="observations" value={formData.observations} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: Se aplicó glifosato el 15/08/2026..." />
            </div>
          </div>
        </form>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center font-medium">⚠️ {error}</p>}
          <div className="flex flex-row gap-2 w-full">
            <button type="button" onClick={() => setOpen(false)} disabled={isSubmitting} className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md">Cancelar</button>
            <button type="submit" form="pasture-create-form" disabled={isSubmitting} className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700">Guardar Potrero</button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}