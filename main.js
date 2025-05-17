function mostrarSeccion(event, id) {
    event.preventDefault(); // evitar que el link haga scroll o cambie URL
    
    // Ocultar página principal
    document.getElementById('pagina-principal').style.display = 'none';

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion-publicaciones');
    secciones.forEach(seccion => {
        seccion.style.display = seccion.id === id ? 'block' : 'none';
    });
}

function mostrarPaginaPrincipal(event) {
    if(event) event.preventDefault();

    // Mostrar página principal
    document.getElementById('pagina-principal').style.display = 'block';

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion-publicaciones');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}
function mostrarSeccion(seccion) {
    // Ocultar todo lo que tenga clase seccion-publicaciones y pagina-principal
    document.querySelectorAll('.seccion-publicaciones, #pagina-principal').forEach(el => el.style.display = 'none');

    // Mostrar la sección que corresponde
    const elemento = document.getElementById('seccion-' + seccion);
    if (elemento) {
        elemento.style.display = 'block';
    }
}

function mostrarPaginaPrincipal() {
    document.querySelectorAll('.seccion-publicaciones').forEach(el => el.style.display = 'none');
    document.getElementById('pagina-principal').style.display = 'block';
}

function filtrarPublicaciones(seccionId) {
    const seccion = document.getElementById('seccion-' + seccionId);

    // Obtener filtros activos
    const filtroUsuarioBtn = seccion.querySelector('.filtro-usuario.active');
    const filtroMarcaBtn = seccion.querySelector('.filtro-marca.active');

    const filtroUsuario = filtroUsuarioBtn ? filtroUsuarioBtn.getAttribute('data-usuario') : null;
    const filtroMarca = filtroMarcaBtn ? filtroMarcaBtn.getAttribute('data-marca') : null;

    const publicaciones = seccion.querySelectorAll('.publication-card');

    publicaciones.forEach(pub => {
        const usuario = pub.getAttribute('data-usuario');
        const marca = pub.getAttribute('data-marca');

        let mostrar = true;
        if (filtroUsuario && usuario !== filtroUsuario) mostrar = false;
        if (filtroMarca && marca !== filtroMarca) mostrar = false;

        pub.style.display = mostrar ? 'flex' : 'none';
    });
}

// Manejador para togglear botones filtros
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filtro-usuario, .filtro-marca').forEach(btn => {
        btn.addEventListener('click', function () {
            const grupo = this.classList.contains('filtro-usuario') ? 'filtro-usuario' : 'filtro-marca';

            // Desactivar otros botones del grupo
            const botonesGrupo = this.parentNode.querySelectorAll('.' + grupo);
            botonesGrupo.forEach(b => {
                if (b !== this) b.classList.remove('active');
            });

            this.classList.toggle('active');

            const seccion = this.closest('.seccion-publicaciones');
            if (seccion) {
                filtrarPublicaciones(seccion.id.replace('seccion-', ''));
            }
        });
    });
});

function limpiarFiltros(seccionId) {
    const seccion = document.getElementById('seccion-' + seccionId);

    seccion.querySelectorAll('.filtro-usuario, .filtro-marca').forEach(btn => btn.classList.remove('active'));

    seccion.querySelectorAll('.publication-card').forEach(pub => pub.style.display = 'flex');
}
function mostrarSeccion(seccion) {
  const todasSecciones = document.querySelectorAll('main .seccion-publicaciones, #pagina-principal');
  todasSecciones.forEach(sec => sec.style.display = 'none');

  if (seccion === 'publicar') {
    document.getElementById('seccion-publicar').style.display = 'block';
  } else if (seccion === 'ropa') {
    document.getElementById('seccion-ropa').style.display = 'block';
  } else if (seccion === 'zapatos') {
    document.getElementById('seccion-zapatos').style.display = 'block';
  } else if (seccion === 'accesorios') {
    document.getElementById('seccion-accesorios').style.display = 'block';
  }
}

function mostrarPaginaPrincipal() {
  const todasSecciones = document.querySelectorAll('main .seccion-publicaciones, #pagina-principal');
  todasSecciones.forEach(sec => sec.style.display = 'none');
  document.getElementById('pagina-principal').style.display = 'block';
}
// main.js

// Funciones para mostrar/ocultar secciones
function mostrarPaginaPrincipal() {
  document.getElementById('pagina-principal').style.display = 'block';
  document.getElementById('seccion-ropa').style.display = 'none';
  document.getElementById('seccion-zapatos').style.display = 'none';
  document.getElementById('seccion-accesorios').style.display = 'none';
  document.getElementById('seccion-publicar').style.display = 'none';
}

function mostrarSeccion(seccion) {
  mostrarPaginaPrincipal(); // primero ocultamos todas
  document.getElementById('pagina-principal').style.display = 'none';

  document.getElementById('seccion-ropa').style.display = (seccion === 'ropa') ? 'block' : 'none';
  document.getElementById('seccion-zapatos').style.display = (seccion === 'zapatos') ? 'block' : 'none';
  document.getElementById('seccion-accesorios').style.display = (seccion === 'accesorios') ? 'block' : 'none';
  document.getElementById('seccion-publicar').style.display = (seccion === 'publicar') ? 'block' : 'none';
}
// Manejar envío del formulario
document.getElementById('form-publicar').addEventListener('submit', function (event) {
  event.preventDefault();

  // Leer datos
  const nombre = document.getElementById('nombreArticulo').value;
  const tipo = document.getElementById('tipoArticulo').value;
  const fotosInput = document.getElementById('fotosArticulo');
  const descripcion = document.getElementById('descripcionArticulo').value;
  const usuario = document.getElementById('nombreUsuario').value;
  const contacto = document.getElementById('contactoVendedor').value;
  const mensaje = document.getElementById('mensajeAdicional').value;

  // NUEVOS CAMPOS
  const usuarioArticulo = document.getElementById('usuarioArticulo').value; // Este debe estar en tu formulario
  const marcaArticulo = document.getElementById('marcaArticulo').value;     // Este también

  // Validar que haya al menos una foto
  if (fotosInput.files.length === 0) {
    alert('Por favor sube al menos una foto.');
    return;
  }

  // Crear contenedor para la nueva publicación
  const nuevaPublicacion = document.createElement('div');
  nuevaPublicacion.className = 'publication-card';

  // Usaremos la primera foto para mostrar
  const fotoURL = URL.createObjectURL(fotosInput.files[0]);
  const img = document.createElement('img');
  img.src = fotoURL;
  img.className = 'img-fluid';
  img.alt = nombre;

  // Agregar imagen y datos como tooltip o descripción
  nuevaPublicacion.appendChild(img);

  // Guardar en atributos data para luego filtrar con JS
  nuevaPublicacion.setAttribute('data-usuario', usuarioArticulo);
  nuevaPublicacion.setAttribute('data-marca', marcaArticulo);

  // Crear un tooltip con la descripción y datos básicos
  nuevaPublicacion.title = `${nombre}\nTipo: ${tipo}\nDescripción: ${descripcion}\nVendedor: ${usuario}\nContacto: ${contacto}\nMensaje: ${mensaje}\nUsuario Artículo: ${usuarioArticulo}\nMarca: ${marcaArticulo}`;

  // Agregar a la página principal
  const contenedorPrincipal = document.querySelector('#pagina-principal .publications');
  contenedorPrincipal.appendChild(nuevaPublicacion);

  // Agregar a la sección correspondiente
  const contenedorCategoria = document.querySelector(`#seccion-${tipo} .publications`);
  if (contenedorCategoria) {
    // Clonar para que aparezca en ambas secciones (o crear uno nuevo si prefieres)
    const clonPublicacion = nuevaPublicacion.cloneNode(true);
    contenedorCategoria.appendChild(clonPublicacion);
  }

  // Limpiar el formulario para la próxima publicación
  this.reset();

  // Mostrar página principal
  mostrarPaginaPrincipal();

  alert('¡Tu artículo fue publicado exitosamente!');
});
// Mostrar sección de registro
document.querySelector('.btn-button2').addEventListener('click', function () {
  ocultarTodasLasSecciones();
  document.getElementById('seccion-registro').style.display = 'block';
});

// Función para ocultar todas las secciones
function ocultarTodasLasSecciones() {
  const secciones = document.querySelectorAll('main section');
  secciones.forEach(seccion => seccion.style.display = 'none');
}
const formRegistro = document.getElementById('form-registro');
const mensajeExito = document.getElementById('mensaje-exito');
const seccionRegistro = document.getElementById('seccion-registro');
const paginaPrincipal = document.getElementById('pagina-principal');
const mensajeSesion = document.getElementById('mensaje-inicio-sesion');

formRegistro.addEventListener('submit', function(event) {
  event.preventDefault();

  // Ocultar el formulario
  formRegistro.style.display = 'none';

  // Mostrar mensaje de éxito
  mensajeExito.style.display = 'block';

  // Esperar 3 segundos
  setTimeout(() => {
    // Ocultar mensaje de éxito y sección registro
    mensajeExito.style.display = 'none';
    seccionRegistro.style.display = 'none';

    // Mostrar página principal
    paginaPrincipal.style.display = 'block';
  }, 3000);
});

// Mostrar sección de inicio de sesion
document.querySelector('.btn-button1').addEventListener('click', function () {
  ocultarTodasLasSecciones();
  document.getElementById('inicia-sesion').style.display = 'block';
});


 function login() {
  var usuario = document.getElementById('usuario').value;
  var contraseña = document.getElementById('contraseña').value;
  if (usuario == "ean@universidadean.edu.co" && contraseña == "EAN") {
        // Mostrar mensaje de inicio sesion exitosa
          mensajeSesion.style.display = 'block';
  } else {
    alert("Usuario o contraseña incorrectos");
    }
}

// Validación de inicio de sesion
    document.getElementById('.btn-button3').addEventListener('click', function() {
    event.preventDefault();
    login();
    });
