// importamos la función ls del archivo funciones
import { ls } from '../componentes/funciones'
import { menuRol, menuUsuario } from './menus'

export const header = {
  template: // html
  `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <a class="navbar-brand router-link" href="#/home"
      ><img
        src="/assets/images/logo.svg"
        alt=""
        width="30"
        height="24"
        class="d-inline-block align-text-top"
      />

      Vanilla Games</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active router-link" aria-current="page" href="#/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link router-link" aria-current="page" href="#">TOP5 Proyectos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link router-link" aria-current="page" href="#" class="router-link">A cerca de</a>
        </li>


        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>

      <div id="menuRol"></div>
      <div id="menuUsuario"></div>
    </div>
  </div>
</nav>

  `,
  script: () => {
    console.log('Header cargado')
    // Simulamos el inicio de sesión de un usuario
    // Simulamos registro usuario
    ls.setUsuario({ email: 'pepe@gmial.com', rol: 'anonimo' })

    const rolUsuario = ls.getUsuario().rol
    console.log(rolUsuario)

    switch (rolUsuario) {
      case 'anónimo':

        break
      case 'registrado':
        // menú usuario
        document.querySelector('#menuUsuario').innerHTML = menuUsuario.templateRegistrado
        break
      case 'desarrollador':
        // menú usuario
        document.querySelector('#menuUsuario').innerHTML = menuUsuario.templateDesarrollador

        document.querySelector('#menuRol').innerHTML = menuRol.templateDesarrollador

        break
      case 'admin':
        // menú usuario
        document.querySelector('#menuUsuario').innerHTML = menuUsuario.templateAdmin
        break
      default :
        document.querySelector('#menuRol').innerHTML = menuRol.templateAnonimo
        break
    }
  }
}
