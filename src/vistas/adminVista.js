import { proyectos, perfiles } from '../bd/datosPrueba'
import { ls } from '../componentes/funciones'

export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">PAnel de administración</h1>
  <div class="row mt-5">
    <div class="col-12">
      <!--nav-tabs-->
      <ul class="nav nav-tabs">
        <!--Etiqueta Todos los proyectos-->
        <li class="nav-item w-50">
          <button 
            class="selectorFicha fichaProyectos nav-link w-100"
          >
            Proyectos
          </button>
        </li>
        <!--Etiqueta Mis proyectos-->
        <li id="pestanyaUsuarios" class="nav-item w-50">
          <button 
            class="selectorFicha fichaUsuarios nav-link w-100 active"
          >
            Usuarios
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="border border-top-0 p-3">
    <div class="row">
      
      <div class="d-flex col-12 col-sm-8 mb-3">
        
        <!-- Buscador -->
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
            ><i id="borrarBuscador" class="bi bi-x"></i
          ></span>
        </div>
      </div>
    </div>
    <div id="tabUsuarios" class="col-12" style="overflow-x: auto">
    ...
    </div>
    
    </div>
    <div id="tabProyectos" class="col-12" style="overflow-x: auto">
    ...
    </div>

  </div>
</div>
  `,
  script: () => {
    console.log('Vista proyectos cargada')
    // Capturamos los datos del usuario logueado
    const usuario = ls.getUsuario()

    // **** AQUI DEBEMOS CAPTURAR LOS PROYECTOS DE LA BASE DE DATOS ****

    // Capturamos proyectos y guardamos en variable para poder ser filtrada
    const datos = proyectos
    const datosUsuarios = perfiles

    // Definimos que por defecto se muestran 'proyectos'
    let selectUsuarios = true
    // *** Detectamos si se cambia de proyectos a usuarios al hacer click en las pestañas ***
    document.querySelector('.nav-tabs').addEventListener('click', (event) => {
      if (event.target.classList.contains('fichaUsuarios')) {
        // Si click en mis proyectos cambiamos pestaña activa
        document.querySelector('.fichaUsuarios').classList.add('active')
        document.querySelector('.fichaProyectos').classList.remove('active')
        selectUsuarios = true
        console.log('tabusuarios')
        document.querySelector('#tabUsuarios').classList.add('d-block')
        document.querySelector('#tabUsuarios').classList.remove('d-none')
        document.querySelector('#tabProyectos').classList.add('d-none')
      } else {
        // Si click en todos los proyectos cambiamos pestaña activa
        document.querySelector('.fichaProyectos').classList.add('active')
        document.querySelector('.fichaUsuarios').classList.remove('active')
        selectUsuarios = false
        console.log('tabProyectos')
        document.querySelector('#tabProyectos').classList.add('d-block')
        document.querySelector('#tabProyectos').classList.remove('d-none')
        document.querySelector('#tabUsuarios').classList.add('d-none')
      }
      // Actualizamos los datos en el panel central
      pintaTabla(datos)
      pintaUsuarios(datosUsuarios)
    })

    // *** FUNCIÓN PARA PINTAR TABLA A PARTIR DE ARRAY datos ***
    const pintaTabla = (proyectosFiltrados) => {
      let tablaProyectos = // html
      `
      <!-- Tabla de proyectos -->
    
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
        <tbody>
      `
      // Para cada proyecto del array 'proyectos'
      proyectosFiltrados.forEach(proyecto => {
        // Generamos botones dependiendo de si el proyecto ha sido creado por el usuario logueado
        const botones = `
                <td><a
                  data-id = ${proyecto.id}
                  class="botonAdmin botonEditar d-none d-sm-inline btn btn-sm btn-outline-primary bi bi-pencil"
                ></a></td>
                <td><a
                  data-id = ${proyecto.id}
                  class="botonAdmin botonBorrar d-none d-sm-inline btn btn-sm btn-outline-danger bi bi-trash3"
                ></a></td>
                `
        // sumamos un tr con los datos del proyecto de la iteración
        tablaProyectos += // html
        `
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
          <td><a href="${proyecto.enlace}" target="_blank"><i class="bi bi-link fs-4"></i></a></td>
          <td><a href="${proyecto.repositorio}" target="_blank"><i class="bi bi-folder-symlink fs-4"></i></a></td>
          <td>${proyecto.nombre_usuario} ${proyecto.apellidos_usuario}</td>
          <td>${proyecto.created_at}</td>
          <td>${proyecto.estado}</td>
          <td>
            <!-- Botones de edición y borrado -->
            ${botones}
          </td>
        </tr>   
        `
      })
      tablaProyectos += // html
      `
        </tbody>
      </table>
      `
      // inyectamos el resultado en el tbody
      document.querySelector('#tabProyectos').innerHTML = tablaProyectos
    }

    // *** FUNCIÓN PARA PINTAR USUARIOS A PARTIR DE ARRAY datosUsuarios ***
    const pintaUsuarios = (usuariosFiltrados) => {
      let tablaUsuarios = // html
      `
      <!-- tabla usuarios-->
      <table
      class="table table-hover align-middle mt-3"
      style="min-width: 1200px"
      >
      <thead>
        <tr>
          <th></th>
          <th>
            URL imagen <span><i class="bi bi-caret-down"></i></span>
          </th>
          <th>
            Email <span><i class="bi bi-caret-down"></i></span>
          </th>
          <th>
            Nombre <span><i class="bi bi-caret-up"></i></span>
          </th>
          <th>
            Apellidos <span><i class="bi bi-caret-up"></i></span>
          </th>
          <th>
            Fecha <span><i class="bi bi-caret-up"></i></span>
          </th>
          <th>
            Rol <span><i class="bi bi-caret-up"></i></span>
          </th>
          <th>
            Estado <span><i class="bi bi-caret-up"></i></span>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      `
      // Para cada proyecto del array 'proyectos'
      usuariosFiltrados.forEach(usuario => {
        // sumamos un tr con los datos del proyecto de la iteración
        tablaUsuarios += // html
        `
          <tr>
              <form novalidate action="">
                <td>
                  <div class="containerImagen">
                    <div
                      class="rounded-circle d-flex align-items-end justify-content-end"
                      style="
                        background-image: url(${usuario.avatar});
                        width: 50px;
                        height: 50px;
                        background-size: cover;
                        background-position: center;
                      "
                    >
                      <i class="btn btn-success btn-sm rounded-circle bi bi-pencil"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <!-- URL imagen -->
                  <input
                    type="url"
                    class="form-control form-control-sm"
                    value="${usuario.avatar}"
                  />
                  <div class="invalid-feedback">
                    La url no es válida
                  </div>
                </td>
                <td>
                  <!-- email -->
                  <input
                    required
                    type="email"
                    class="form-control form-control-sm"
                    value="${usuario.email}"
                  />
                  <div class="invalid-feedback">
                    Formato incorrecto
                  </div>
                </td>
                <td>
                  <input
                    required
                    type="text"
                    class="form-control form-control-sm"
                    value="${usuario.nombre}"
                  />
                  <div class="invalid-feedback">
                    Nombre requerido
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    value="${usuario.apellidos}"
                  />
                </td>

                <td>
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    value="${usuario.created_at}"
                  />
                  <div class="invalid-feedback">
                    Formato incorrecto
                  </div>
                </td>
                <td>
                  <select class="form-control form-control-sm" name="" id="">
                    <option value="${usuario.rol}">${usuario.rol}</option>
                    <option value="registrado">registrado</option>
                    <option value="desarrollador">desarrollador</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <select class="form-control form-control-sm" name="" id="">
                    <option value="${usuario.estado}">${usuario.estado}</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </td>
                <td>
                  <button data-id="${usuario.user_id}" type="submit" class="btn btn-sm btn-success botonActualizar">
                    Actualizar
                  </button>
                </td>
                <td><i data-id="${usuario.user_id}" class="btn btn-sm btn-outline-danger bi bi-trash3 botonEliminar"></i></td>
              </form>
            </tr>
        `
      })
      // inyectamos el resultado en el tbody
      document.querySelector('#tabUsuarios').innerHTML = tablaUsuarios
    }

    // *** Pintamos los datos en tabla y tarjetas ***
    pintaTabla(datos)
    pintaUsuarios(datosUsuarios)

    // *** SELECCIÓN DE VISTA EN FORMATO TABLA O TARJETAS ***
    // Selección vista tabla
    document.querySelector('.vistaTabla').addEventListener('click', (boton) => {
      // Lineas originales del html para los tabs:
      // <div class="col-12 d-none d-xl-block" style="overflow-x: auto">
      // <div class="d-xl-none row">
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

    // Selección vista tarjetas
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

    // *** FILTRO PARA BUSCADOR ***
    // Capturamos el input de búsqueda
    const inputBusqueda = document.getElementById('inputBusqueda')
    // Agregamos un evento de escucha para el evento de entrada en el input de búsqueda
    inputBusqueda.addEventListener('input', () => {
      // Capturamos el texto de búsqueda del input, conviértelo a minúsculas y elimina espacios en blanco al principio y al final
      const textoBusqueda = inputBusqueda.value.toLowerCase().trim()
      // Filtramos los proyectos que coinciden con el texto de búsqueda en cualquier campo
      let informacion = []
      if (selectUsuarios) {
        informacion = datosUsuarios
      } else {
        informacion = datos
      }
      const informacionFiltrada = informacion.filter(proyecto => {
        // Itera sobre las propiedades (campos) de cada proyecto
        for (const key in proyecto) {
          // Obtenemos el valor del campo actual
          const valorCampo = proyecto[key]
          // Verificamos si el valor del campo es una cadena y si contiene el texto de búsqueda
          if (typeof valorCampo === 'string' && valorCampo.toLowerCase().includes(textoBusqueda)) {
            // Si hay coincidencia, devuelve true para incluir el proyecto en la lista filtrada
            return true
          }
        }
        // Si no se encontró coincidencia en ningún campo, devuelve false para excluir el proyecto
        return false
      })
      // Volvemos a pintar los datos con los proyectos o usuarios filtrados por el buscador
      if (selectUsuarios) {
        pintaUsuarios(informacionFiltrada)
      } else {
        pintaTabla(informacionFiltrada)
      }
    })
    // Borrar datos del input del buscador
    document.querySelector('#borrarBuscador').addEventListener('click', () => {
      // Borramos contenido del buscador
      inputBusqueda.value = ''
      // Actualizamos array con todos los proyectos
      // const proyectosFiltrados = datos
      // Actualizamos los datos en el panel central
      pintaTabla(datos)
      pintaUsuarios(datosUsuarios)
    })

    // *** BOTONES DE EDICIÓN Y BORRADO DE PROYECTOS ***
    // Detectamos clic sobre main (Usamos delegación de eventos porque la tabla y tarjetas se actualizan constantemente en el DOM)
    document.querySelector('main').addEventListener('click', (event) => {
      // Si hemos pulsado sobre uno de los botones
      if (event.target.classList.contains('botonAdmin')) {
        const boton = event.target
        // Capturamos el id de su dataset
        const id = boton.dataset.id
        if (boton.classList.contains('botonEditar')) {
          // Si se trata de editar
          console.log('Editar proyecto ' + id)

          // Cargamos la vista para editar proyecto pasandole como parámetro el id
          window.location = `#/proyectoEditar/${id}`
        } else if (boton.classList.contains('botonBorrar')) {
          // Si se trata de borrar
          console.log('Borrar proyecto ' + id)

          // *** AQUÍ VA LA FUNCIÓN QUE BORRA DE LA BASE DE DATOS EL PROYECTO CORRESPONDIENTE AL ID ***
        }
      }
    })
  }
}
