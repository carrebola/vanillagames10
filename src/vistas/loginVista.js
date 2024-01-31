import { perfiles } from '../bd/datosPrueba'
import { ls } from '../componentes/funciones'
import { header } from '../componentes/header'

import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
export default {
  template: // html
    `
  <div class="container">
  <h1 class="mt-5 text-center">Inicia sesión</h1>
  <div class="m-5 mx-auto" style="max-width: 400px">
    <!-- Formulario de inicio de sesión (login) -->
    <form id="formularioLogin" novalidate action="" class="form border shadow-sm p-3">
      <!-- Email -->
      <label for="emailLogin" class="form-label">Email:</label>
      <input id="emailLogin" name="email" value="carrebola@fpllefia.com" required type="email" class="form-control" />
      <div class="invalid-feedback">El formato del email no es correcto</div>
      <!-- Contraseña -->
      <label for="passLogin" class="form-label mt-3">Contraseña:</label>
      <input value="123456" id="passLogin" name="password" required minlength="6" type="password" class="form-control" />
      <div class="invalid-feedback">
        La contraseña debe tener como mínimo 6 caracteres
      </div>

      <!-- Recordar contraseña -->
      <div class="form-check mt-3">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked
        />
        <label class="form-check-label" for="flexCheckChecked">
          Recordar sesión
        </label>
      </div>

      <!-- Link a recordar contraseña -->
      <a class="d-block text-end" href="#">¿Has olvidado tu contraseña?</a>

      <!-- Botón Iniciar sesión -->
      <input
        type="submit"
        class="btn btn-primary w-100 mt-3"
        value="Iniciar sesión"
      />
    </form>

    <a class="d-block mt-5 btn btn-secondary mx-auto" href="#"
      >¿Eres nuevo? Regístrate</a
    >
  </div>
</div>
  `,
  script: () => {
    console.log('vista login cargada')
    // Validación bootstrap

    // Capturamos el formulario en una variable
    const formulario = document.querySelector('#formularioLogin')
    // Detectamos su evento submit (enviar)
    formulario.addEventListener('submit', (event) => {
      // Detenemos el evento enviar (submit)
      event.preventDefault()
      event.stopPropagation()
      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
        // Y añadimos la clase 'was-validate' para que se muestren los mensajes
        formulario.classList.add('was-validated')
      } else {
        // Si valida enviamos los datos
        enviarDatos(formulario)
      }
    })

    // Función para enviar datos a la bd
    async function enviarDatos(formulario) {
      try {
        // login
        const user = {
          email: formulario.email.value,
          password: formulario.password.value
        }
        User.logout()
        const usuarioLogueado = await User.login(user)
        console.log('¡login correcto!', usuarioLogueado)
        // Ahora vamos a capturar los datos del perfil del usuario logueado
        console.log('usuarioLogueado', usuarioLogueado);
        const userId = usuarioLogueado.id
        console.log('userId', userId);
        const perfilLogueado = await Perfil.getByUserId(userId)
        console.log('Perfil logueado', perfilLogueado);
        const usuario = {
          email: usuarioLogueado.email,
          rol: perfilLogueado.rol,
          avatar: perfilLogueado.avatar
        }
        console.log('perfil localstorage', usuario);
        // Guardamos datos de usaurio en localstorage
        ls.setUsuario(usuario)
        // Cargamos página home
        window.location = '#/proyectos'
        // Actualizamos el header para que se muestren los menús que corresponden al rol
        header.script()
      } catch (error) {
        console.log('Error al iniciar sesión', error)
        alert('El usuario no existe o la contraseña no es correcta', error)
      }
    }
  }
}
