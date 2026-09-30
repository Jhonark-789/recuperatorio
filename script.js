// ---------- Datos ----------
// Estructura de datos: arreglo de objetos { id, nombre, telefono }
let contactos = [];
let siguienteId = 1;

// ---------- Elementos del DOM ----------
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const inputBuscador = document.getElementById("buscador");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");
const contador = document.getElementById("contador");

// ---------- Agregar contacto ----------
function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  // No se permiten contactos vacíos
  if (nombre === "" || telefono === "") {
    return;
  }

  contactos.push({ id: siguienteId++, nombre: nombre, telefono: telefono });

  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  render();
}

// ---------- Eliminar contacto ----------
function eliminarContacto(id) {
  contactos = contactos.filter(function (c) {
    return c.id !== id;
  });
  render();
}

// ---------- Contador (siempre el total real) ----------
function actualizarContador() {
  contador.textContent = "Contactos: " + contactos.length;
}

// ---------- Render: crea la lista dinámicamente ----------
function render() {
  const texto = inputBuscador.value.trim().toLowerCase();

  const visibles = contactos.filter(function (c) {
    return c.nombre.toLowerCase().includes(texto);
  });

  lista.innerHTML = "";

  visibles.forEach(function (c) {
    const li = document.createElement("li");
    li.className = "contacto";

    const info = document.createElement("div");
    info.className = "contacto-info";

    const nombre = document.createElement("span");
    nombre.className = "contacto-nombre";
    nombre.textContent = c.nombre;

    const telefono = document.createElement("span");
    telefono.className = "contacto-telefono";
    telefono.textContent = c.telefono;

    info.appendChild(nombre);
    info.appendChild(telefono);

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    // Un event listener por cada botón de eliminar
    btnEliminar.addEventListener("click", function () {
      eliminarContacto(c.id);
    });

    li.appendChild(info);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  // Mensajes cuando no hay nada que mostrar
  if (contactos.length === 0) {
    mensajeVacio.textContent = "Todavía no agregaste contactos.";
    mensajeVacio.classList.remove("oculto");
  } else if (visibles.length === 0) {
    mensajeVacio.textContent = "No se encontraron contactos con ese nombre.";
    mensajeVacio.classList.remove("oculto");
  } else {
    mensajeVacio.classList.add("oculto");
  }

  actualizarContador();
}

// ---------- Event listeners ----------
btnAgregar.addEventListener("click", agregarContacto);
inputBuscador.addEventListener("input", render);

// Render inicial
render();
