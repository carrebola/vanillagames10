import { header } from './componentes/header'
import { footer } from './componentes/footer'
import { enrutador } from './componentes/enrutador'

import './scss/styles.scss'

// Inyectamos el componente header
document.querySelector('header').innerHTML = header.template

// Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template

enrutador.observadorRutas()
// Cargamos la página home
window.location = '#/home'
