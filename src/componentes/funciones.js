// Gestión del localstorage
export const ls = {
  // Captuar datos de localStorage
  getUsuario: () => {
    // Leer en localStorage
    const usuarioJSON = localStorage.getItem('usuarioVanilla')
    // Convertir a objeto si existe
    try {
      const usuario = JSON.parse(usuarioJSON)
      return usuario
    } catch (error) { // Si no tenemos un objeto con el formato correcto devolvemos objeto vacío.
      return {}
    }
    // Devolvemos objeto
  },
  setUsuario: (usuario) => {
    // Convertir el objeto a una cadena JSON
    const usuarioJSON = JSON.stringify(usuario)
    // Guardar en localStorage
    localStorage.setItem('usuarioVanilla', usuarioJSON)
  }
}
