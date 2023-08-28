import { ls } from './funciones'
const menuRol = {
  templateAnonimo: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="ms-2 btn btn-success router-link" href="#/login" >
        Iniciar sesión
        <i class="bi bi-box-arrow-in-right"></i>
      </a>
    </li>
    <li class="nav-item">
      <a class="ms-2 btn btn-outline-light router-link" href="#/registro">
        Regístrate
        <i class="bi bi-box-arrow-in-right"></i>
      </a>
    </li>
  </ul>
  `,
  templateRegistrado: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item">
        <a class="nav-link active router-link" aria-current="page" href="#">PROYECTOS</a>
    </li>
    
  </ul>
  `,
  templateDesarrollador: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item">
        <a class="nav-link active router-link" aria-current="page" href="#">PROYECTOS</a>
    </li>
  </ul>
  `,
  templateAdmin: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item">
        <a class="nav-link active router-link" aria-current="page" href="#">PROYECTOS</a>
    </li>
  </ul>
  `
}

const menuUsuario = {
  templateAdmin: // html
  `
  <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle router-link"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img src="/assets/images/avatar.svg" alt="" width="25" />
        </a>
        <ul class="dropdown-menu me-0" style="left: -100px; width: 100px">
            <li class="text-light text-center p-2">
                <p>${ls.getUsuario().email}</p>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Acción</a></li>
            <li><a class="dropdown-item" href="#">Otra acción</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
        </ul>
    </li>
</ul>
  
  `
}

export { menuRol, menuUsuario }
