function formCreationUser() {
    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Crear Usuario
            </h2>
            
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre:
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Juan Pérez"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo:
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña:
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                    />
                </div>

                <div>
                    <label htmlFor="documentId" className="block text-sm font-medium text-gray-700 mb-1">
                        Documento:
                    </label>
                    <input 
                        type="text" 
                        id="documentId" 
                        name="documentId" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123456789"
                    />
                </div>

                <div>
                    <label htmlFor="postJob" className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo:
                    </label>
                    <select 
                        id="postJob" 
                        name="postJob" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="">Seleccione un cargo</option>
                        <option value="administrador">Administrador</option>
                        <option value="veterinaria">Veterinario</option>
                        <option value="operario">Operario</option>
                        <option value="gerente">Gerente</option>
                        <option value="asistente">Asistente</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="verifyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Verificacion de email:
                    </label>
                    <select 
                        id="verifyEmail" 
                        name="verifyEmail" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Guardar Usuario
                </button>
            </form>
        </div>
    )
}

export default formCreationUser;