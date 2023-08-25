export default {
  template: // html
  `
  <div class="container">
  <h1 class="mt-5">Edición de proyecto</h1>
  <div class="d-flex justify-content-end">
    <bottom class="btn btn-outline-secondary mt-5">
      <i class="bi bi-arrow-bar-left" style="font-size: 1em"></i>
      Volver</bottom
    >
  </div>
  <form novalidate id="formulario" action="" class="">
    <div class="row mt-2">
      <div class="col-12 col-md-4 pt-2 mb-3">
        <img src="/assets/images/juego.jpg" alt="" class="img-fluid" />
        <label class="form-label mt-2" for="urlImagen"
          ><strong>URL imagen: </strong></label
        >
        <input
          id="urlImagen"
          type="text"
          class="form-control"
          value="http://enlaceImagen.com"
        />
        <div class="invalid-feedback">
          No es una url correcta
        </div>
      </div>
      <div class="col-12 col-md-8">
        <!-- Formulario nuevo proyecto -->

        <!-- Nombre proyecto -->
        <label class="form-label" for="nombre"><strong>Nombre: </strong></label>
        <input
          required
          id="nombre"
          type="text"
          value="Nombre Autor"
          class="form-control"
        />
        <div class="invalid-feedback">
          Debe tener un nombre de proyecto
        </div>

        <!-- Descripción -->
        <label class="form-label mt-2" for="descripcion"
          ><strong>Descripción: </strong></label
        >
        <textarea id="descripcion" class="form-control" rows="4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.</textarea
        >

        <!-- Estado -->
        <label class="form-label mt-2" for="estado"
          ><strong>Estado: </strong></label
        >
        <select required id="estado" class="form-control">
          <option value="estado">estado</option>
          <option value="otro estado">otro estado</option>
        </select>
        <div class="invalid-feedback">
          Debes definir un estado
        </div>

        <!-- Fecha -->
        <label class="form-label mt-2" for="fecha"
          ><strong>Fecha: </strong></label
        >
        <input id="fecha" type="date" class="form-control" value="12/12/2023" />
        <div class="invalid-feedback">
          El formato no es correcto
        </div>

        <!-- Enlace al proyecto -->
        <label class="form-label mt-2" for="enlace"
          ><strong>Enlace: </strong></label
        >
        <input
          id="enlace"
          type="url"
          class="form-control"
          value="http://enlace.com"
        />
        <div class="invalid-feedback">
          No es una url correcta
        </div>

        <!-- Repositorio -->
        <label class="form-label mt-2" for="repositorio"
          ><strong>Repositorio: </strong></label
        >
        <input
          id="repositorio"
          type="text"
          class="form-control"
          value="user.github.com/123456"
        />

        <!-- Submit -->
        <input
          type="submit"
          class="btn btn-success mt-3"
          value="Subir proyecto"
        />
      </div>
    </div>
  </form>
</div>
  `,
  script: () => {
    console.log('vista proyectoDetalleEditar cargada')
    // Validación bootstrap

    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formulario')
    // Detectamos su evento submit (enviar)
    formulario.addEventListener('submit', (event) => {
    // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
      // Detenemos el evento enviar (submit)
        event.preventDefault()
        event.stopPropagation()
      }
      // Y añadimos la clase 'was-validate' para que se muestren los mensajes
      formulario.classList.add('was-validated')
    })
  }
}
