import { header } from './componentes/header'
import { footer } from './componentes/footer'

import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//Importamos la vista por defecto (que será home)
async function cargarVista(){
  const componenteHome = await import('./vistas/homeVista')
  const homeVista = componenteHome.default
  //Inyectamos la vista home
  document.querySelector('main').innerHTML = homeVista.template
}
cargarVista()

//Inyectamos el componente header
document.querySelector('header').innerHTML = header.template

//Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template

