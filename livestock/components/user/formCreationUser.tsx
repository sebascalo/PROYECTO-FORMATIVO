"use client";
// ======================================================================
// 1. IMPORTACIONES DE DEPENDENCIAS
// ======================================================================
import { useState } from 'react';
import { API_USER_URL } from '@/api/config';

// ======================================================================
// 2. COMPONENTE: FORMULARIO DE CREACIÓN DE USUARIO
// Gestiona el registro de nuevos usuarios en la plataforma.
// ======================================================================
const formCreationUser = () => {
    // ==================================================================
    // 3. ESTADOS PARA CAMPOS DEL FORMULARIO
    // Cada campo tiene su propio estado para control reactivo.
    // ==================================================================
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [documentId, setDocumentId] = useState<string>('');
    const [postJob, setPostJob] = useState<string>('');
    const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(true);
    
    // ==================================================================
    // 4. ESTADOS PARA CONTROL DE INTERFAZ
    // Manejan carga, mensajes de éxito y error.
    // ==================================================================
    const [guardando, setGuardando] = useState<boolean>(false);
    const [mensajeExito, setMensajeExito] = useState<string | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);

    // ==================================================================
    // 5. FUNCIÓN: REINICIAR FORMULARIO
    // Restablece todos los campos a sus valores predeterminados.
    // ==================================================================
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setDocumentId('');
        setPostJob('');
        setVerifyEmail(false);
        setActive(true);
        setMensajeExito(null);
        setMensajeError(null);
    };

    // ==================================================================
    // 6. FUNCIÓN PRINCIPAL: GESTIONAR ENVÍO DEL FORMULARIO
    // Se ejecuta al presionar "Guardar Usuario".
    // - Valida campos en el cliente
    // - Envía datos al backend vía POST
    // - Maneja respuesta y feedback visual
    // ==================================================================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previene recarga automática de la página
        setGuardando(true);
        setMensajeExito(null);
        setMensajeError(null);

        // ==============================================================
        // 6a. VALIDACIONES DE CAMPOS OBLIGATORIOS
        // ==============================================================
        if (!name.trim() || name.length < 3) {
            setMensajeError("El nombre debe tener al menos 3 caracteres.");
            setGuardando(false);
            return;
        }
        
        if (!email.trim() || !email.includes('@')) {
            setMensajeError("Por favor ingrese un correo electrónico válido.");
            setGuardando(false);
            return;
        }
        
        if (!password || password.length < 3) {
            setMensajeError("La contraseña debe tener al menos 3 caracteres.");
            setGuardando(false);
            return;
        }
        
        if (!documentId.trim() || documentId.length < 5) {
            setMensajeError("El documento de identidad debe tener al menos 5 caracteres.");
            setGuardando(false);
            return;
        }
        
        if (!postJob.trim()) {
            setMensajeError("Por favor seleccione un cargo.");
            setGuardando(false);
            return;
        }

        // ==============================================================
        // 6b. CONSTRUIR OBJETO CON DATOS DEL FORMULARIO
        // ==============================================================
        const userData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            documentId: documentId.trim(),
            postJob: postJob,
            verifyEmail: verifyEmail,
            active: active
        };

        try {
            // ==========================================================
            // 6c. PETICIÓN POST AL BACKEND
            // Usa la ruta /CreateUser definida en el backend.
            // ==========================================================
            const response = await fetch(`${API_USER_URL}/CreateUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            // ==========================================================
            // 6d. VERIFICAR RESPUESTA DEL SERVIDOR
            // ==========================================================
            if (!response.ok || data.success === false) {
                const errorMsg = Array.isArray(data.error) 
                    ? data.error.join(", ") 
                    : (data.error || data.message || "Error al crear el usuario");
                throw new Error(errorMsg);
            }

            // ==========================================================
            // 6e. NOTIFICACIÓN DE ÉXITO
            // ==========================================================
            setMensajeExito("¡Usuario creado correctamente!");
            resetForm();
            
            // Limpiar mensaje después de 4 segundos
            setTimeout(() => setMensajeExito(null), 4000);

        } catch (error: any) {
            console.error("Error registrando usuario:", error.message);
            setMensajeError("Error al registrar usuario: " + error.message);
        } finally {
            setGuardando(false);
        }
    };

    // ==================================================================
    // 7. RENDERIZADO DEL COMPONENTE
    // ==================================================================
    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Crear Usuario
            </h2>
            
            {/* Mensajes de feedback visual */}
            {mensajeExito && (
                <div className="mb-4 p-3 bg-green-50 border border-green-500 text-green-700 rounded-md">
                    ✅ {mensajeExito}
                </div>
            )}

            {mensajeError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-500 text-red-700 rounded-md">
                    ❌ {mensajeError}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo: Nombre Completo */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Juan Pérez"
                        required
                        minLength={3}
                        maxLength={50}
                    />
                </div>

                {/* Campo: Correo Electrónico */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ejemplo@correo.com"
                        required
                        maxLength={50}
                    />
                </div>

                {/* Campo: Contraseña */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                        required
                        minLength={3}
                        maxLength={50}
                    />
                </div>

                {/* Campo: Documento de Identidad */}
                <div>
                    <label htmlFor="documentId" className="block text-sm font-medium text-gray-700 mb-1">
                        Documento: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="documentId" 
                        value={documentId}
                        onChange={(e) => setDocumentId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123456789"
                        required
                        minLength={5}
                        maxLength={30}
                    />
                </div>

                {/* Campo: Cargo (Select) */}
                <div>
                    <label htmlFor="postJob" className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo: <span className="text-red-500">*</span>
                    </label>
                    <select 
                        id="postJob" 
                        value={postJob}
                        onChange={(e) => setPostJob(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        required
                    >
                        <option value="">Seleccione un cargo</option>
                        <option value="administrador">Administrador</option>
                        <option value="veterinaria">Veterinario</option>
                        <option value="operario">Operario</option>
                        <option value="gerente">Gerente</option>
                        <option value="asistente">Asistente</option>
                    </select>
                </div>

                {/* Campo: Verificación de Email */}
                <div>
                    <label htmlFor="verifyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Verificación de email:
                    </label>
                    <select 
                        id="verifyEmail" 
                        value={verifyEmail ? "true" : "false"}
                        onChange={(e) => setVerifyEmail(e.target.value === "true")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                    </select>
                </div>

                {/* Campo: Usuario Activo (Checkbox) */}
                <div>
                    <label htmlFor="active" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input 
                            type="checkbox" 
                            id="active" 
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        Usuario activo
                    </label>
                </div>

                {/* Botón Guardar */}
                <button 
                    type="submit" 
                    disabled={guardando}
                    className={`w-full text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        guardando 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {guardando ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Guardando...
                        </span>
                    ) : ('Guardar Usuario')}
                </button>
            </form>
        </div>
    );
};

export default formCreationUser;