import { header } from './componentes/header'
import { footer } from './componentes/footer'

import './scss/styles.scss' 

// Importamos la vista por defecto (que será home)
async function cargarVista () {
  const componente = await import('./vistas/registroVista')
  const vista = componente.default
  // Inyectamos la vista home
  document.querySelector('main').innerHTML = vista.template
  // Ejecutamos la lógica de la vista
  vista.script()
}
cargarVista()

// Inyectamos el componente header
document.querySelector('header').innerHTML = header.template

// Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template
