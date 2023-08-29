import { proyectos } from '../bd/datosPrueba'
export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">Proyectos</h1>
  <div class="row mt-5">
    <div class="col-12">
      <ul class="nav nav-tabs">
        <li class="nav-item w-50">
          <a class="nav-link active" aria-current="page" href="#"
            >Todos los proyectos</a
          >
        </li>
        <li class="nav-item w-50">
          <a class="nav-link" href="#">Mis proyectos</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="border border-top-0 p-3">
    <div class="row">
      <div class="col-12 col-sm-4 mb-3">
        <a href="#/proyectoNuevo" class="btn btn-primary w-100">Subir proyecto</a>
      </div>
      <div class="d-flex col-12 col-sm-8 mb-3">
        <button class="btn btn-secondary me-2 bi bi-grid-3x3-gap vistaTabla">
        </button>
        <button class="btn btn-secondary me-2 bi bi-list vistaTarjetas">
        </button>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="bi bi-search"></i
          ></span>
          <input
            id="inputBusqueda"
            type="text"
            class="form-control"
            placeholder="Buscador"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
          <span class="input-group-text" id="addon-wrapping"
            ><i class="bi bi-x"></i
          ></span>
        </div>
      </div>
    </div>
    <!-- tabla -->
    <div id="tabTabla" class="col-12 d-none d-xl-block" style="overflow-x: auto">
      <table
        class="table table-hover align-middle mt-3"
        style="min-width: 1000px"
      >
        <thead>
          <tr>
            <th></th>
            <th>
              Nombre <span><i class="bi bi-caret-down"></i></span>
            </th>
            <th>
              Descripción <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>
              Enlace <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>Repositorio</th>
            <th>
              Autor <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>
              Fecha <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th>
              Estado <span><i class="bi bi-caret-up"></i></span>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tbodyProyectos">
          <!-- Aqui van los datos generados por la lógica -->
        </tbody>
      </table>
    </div>
    <!-- tarjetas -->
    <div id="tabTarjetas" class="d-xl-none row">
      ...
    </div>
  </div>
</div>
  `,
  script: () => {
    console.log('Vista proyectos cargada')

    let tbodyProyectos = ''
    // Para cada proyecto del array 'proyectos'
    proyectos.forEach(proyecto => {
      // sumamos un tr con los datos del proyecto
      tbodyProyectos += `
      <tr>
        <td>
          <div class="containerImagen">
            <img 
              width="200px" 
              src=${proyecto.imagen || '/assets/images/imagenVacia.png'} 
              alt="imagen proyecto" />
          </div>
        </td>
        <td>${proyecto.nombre}</td>
        <td>${proyecto.descripcion}</td>
        <td><a href="${proyecto.enlace}"><i class="bi bi-link fs-4"></i></a></td>
        <td><a href="${proyecto.repositorio}"><i class="bi bi-folder-symlink fs-4"></i></a></td>
        <td>${proyecto.nombre_usuario} ${proyecto.apellidos_usuario}</td>
        <td>${proyecto.created_at}</td>
        <td>${proyecto.estado}</td>
      </tr>
            
      `
    })
    // inyectamos el resultado en el tbody
    document.querySelector('#tbodyProyectos').innerHTML = tbodyProyectos

    let tarjetasProyectos = ''
    // Para cada proyecto del array 'proyectos'
    proyectos.forEach(proyecto => {
      // sumamos un tr con los datos del proyecto
      tarjetasProyectos += // html
      `
      <!-- tarjeta  -->
      <div class="col-12 col-lg-6">
        <div class="card mb-3">
          <div class="row g-0">
            <div
              class="col-4"
              style="
                background-image: url(${proyecto.imagen || '/assets/images/imagenVacia.png'});
                background-position: center;
                background-size: cover;
              "
            ></div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">${proyecto.nombre}</h5>
                <p class="card-text">
                  ${proyecto.descripcion}
                </p>
                <p class="small m-0 text-end text-italic">Autor: ${proyecto.nombre_usuario} ${proyecto.apellidos_usuario}</p>
                <p class="small text-end text-italic">Fecha: ${proyecto.created_at}</p>

                <a class="btn btn-sm btn-outline-primary" href="${proyecto.enlace}"><i class="bi bi-link"></i></a>
                <a class="btn btn-sm btn-outline-primary" href="${proyecto.repositorio}"><i class="bi bi-folder-symlink"></i></a>
                <a class="btn btn-sm btn-success" href="#">${proyecto.estado}</a>
                <a
                  data-user_id = ${proyecto.user_id}
                  class="d-none d-sm-inline btn btn-sm btn-outline-primary bi bi-pencil"
                ></a>
                <a
                  data-user_id = ${proyecto.user_id}
                  class="d-none d-sm-inline btn btn-sm btn-outline-danger bi bi-trash3"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>  
      `
    })
    // inyectamos el resultado en tbody
    document.querySelector('#tabTarjetas').innerHTML = tarjetasProyectos

    // Cambio entre vista de tablas y vista de tarjetas

    // Lineas originales del html para los tabs:
    // <div id="tabTabla" class="col-12 d-none d-xl-block" style="overflow-x: auto">
    // <div id="tabTarjetas" class="d-xl-none row">
    document.querySelector('.vistaTabla').addEventListener('click', (boton) => {
      console.log('vistaTabla')
      // Pinta el boton de verde
      boton.target.classList.add('btn-success')
      // Pinta el otro botón de gris y elimina el verde
      const botonTarjeta = document.querySelector('.vistaTarjetas')
      botonTarjeta.classList.remove('btn-success')
      botonTarjeta.classList.add('btn-secondary')

      // Muestra y oculta los tabs
      document.querySelector('#tabTabla').setAttribute('class', 'col-12 d-block')
      document.querySelector('#tabTarjetas').setAttribute('class', 'd-none')
    })

    document.querySelector('.vistaTarjetas').addEventListener('click', (boton) => {
      console.log('vistaTarjetas')
      // Pinta el boton de verde
      boton.target.classList.add('btn-success')
      // Pinta el otro botón de gris y elimina el verde
      const botonTabla = document.querySelector('.vistaTabla')
      botonTabla.classList.remove('btn-success')
      botonTabla.classList.add('btn-secondary')

      // Muestra y oculta los tabs
      document.querySelector('#tabTabla').setAttribute('class', 'd-none')
      document.querySelector('#tabTarjetas').setAttribute('class', 'row')
    })

    // Filtro para buscador

    // Obtén una referencia al input de búsqueda
    const inputBusqueda = document.getElementById('inputBusqueda')

    // Agrega un evento de escucha para el evento de entrada en el input de búsqueda
    inputBusqueda.addEventListener('input', () => {
      // Obtén el texto de búsqueda del input, conviértelo a minúsculas y elimina espacios en blanco al principio y al final
      const textoBusqueda = inputBusqueda.value.toLowerCase().trim()

      // Filtra los proyectos que coinciden con el texto de búsqueda en cualquier campo
      const proyectosFiltrados = proyectos.filter(proyecto => {
        // Itera sobre las propiedades (campos) de cada proyecto
        for (const key in proyecto) {
          // Obtén el valor del campo actual
          const valorCampo = proyecto[key]

          // Verifica si el valor del campo es una cadena y si contiene el texto de búsqueda
          if (typeof valorCampo === 'string' && valorCampo.toLowerCase().includes(textoBusqueda)) {
            // Si hay coincidencia, devuelve true para incluir el proyecto en la lista filtrada
            return true
          }
        }
        // Si no se encontró coincidencia en ningún campo, devuelve false para excluir el proyecto
        return false
      })

      console.log(proyectosFiltrados)
    })
  }
}
