const usuarios = [{
    nombre: 'Matías',
    correo: 'matias@gmail.com',
    clave: '123'
}, {
    nombre: 'Daniel',
    correo: 'daniel@gmail.com',
    clave: '456'
}, {
    nombre: 'León',
    correo: 'leon@gmail.com',
    clave: '789'
}]

const juegos = [{
    nombre: 'Call of Duty Modern Warfare 2',
    genero: 'Guerra',
    consola: 'Playstation 5',
    precio: 30000,
    img: './img/cod.jpg'
}, {
    nombre: 'Fifa 23',
    genero: 'Deportes',
    consola: 'Xbox Series X',
    precio: 25000,
    img: './img/fifa.webp'
}, {
    nombre: 'Age of Empires IV',
    genero: 'Estrategia',
    consola: 'PC',
    precio: 12500,
    img: './img/age.jpg'
}]

const btnIngresar = document.getElementById('botonIngresar'),
    btnSalir = document.getElementById('botonSalir'),
    correoLogin = document.getElementById('correo'),
    passLogin = document.getElementById('pass'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    tarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');

function ingresar(bd, usuario, clave) { //DB Array de usuarios
    let encontrado = bd.find((db) => db.correo == usuario);

    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        if (encontrado.clave != clave) {
            return false;
        } else {
            return encontrado
        }

    }
}

function guardar(db, storage) {
    const usuario = {
        'nombre': db.nombre,
        'clave': db.clave,
        'correo': db.correo
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}

function bienvenida(usuario) {
    nombreUsuario.innerHTML = `Bienvenido, <span>${usuario.nombre}</span>`
}

function borrarStorage() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioStorage;
}

function recordar(usuario) {
    if (usuario) {
        bienvenida(usuario);
        informacionJuegos(juegos);
        mostrarInformacion(toggles, 'd-none');
    }
}

function mostrarInformacion(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function informacionJuegos(array) {
    tarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardJuego" id="tarjeta${element.nombre}">
        <h3 class="card-header" id="nombreJuego">Nombre: ${element.nombre}</h3>
        <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoJuego">
                <div class="card-body">
                    <p class="card-text" id="generoJuego">Género: ${element.genero}</p>
                    <p class="card-text" id="consolaJuego">Consola: ${element.consola}</p>
                    <p class="card-text" id="precioJuego">Precio: $${element.precio}</p>
                </div>
            </div>`;
        tarjetas.innerHTML += html;
    });
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (!correoLogin.value || !passLogin.value) {
        alert('Ambos campos son requeridos');
    } else {
        let datos = ingresar(usuarios, correoLogin.value, passLogin.value);
        if (!datos) {
            alert('Usuario y/o contraseña incorrectos');
        } else {
            if (recordar.checked) {
                guardar(datos, localStorage);
                bienvenida(recuperarUsuario(localStorage));
            } else {
                guardar(datos, sessionStorage);
                bienvenida(recuperarUsuario(sessionStorage));
            }
            modal.hide();
            informacionJuegos(juegos);
            mostrarInformacion(toggles, 'd-none');
        }
    }
});

btnSalir.addEventListener('click', () => {
    borrarStorage();
    mostrarInformacion(toggles, 'd-none');
});

window.onload = () => recordar(recuperarUsuario(localStorage));