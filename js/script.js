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
    precio: 30000
}, {
    nombre: 'Fifa 23',
    genero: 'Deportes',
    consola: 'Xbox Series X',
    precio: 25000
}, {
    nombre: 'Age of Empires IV',
    genero: 'Estrategia',
    consola: 'PC',
    precio: 12500
}]

const btnLogin = document.getElementById('botonIngresar'),
    btnLogout = document.getElementById('botonSalir'),
    modal = new bootstrap.modal(modalEl);

function ingresar(bd, usuario, clave) { //DB Array de usuarios
    let encontrado = bd.find((db) => db.correo == usuario);

    if (typeof encontrado === 'undefined') {//Typeof nos dice el tipo de dato de determinada variable
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
    const user = {
        'nombre': db.nombre,
        'clave': db.clave,
        'correo': db.correo
    }

    storage.setItem('usuario', JSON.stringify(user));
}

/*function bienvenida(usuario) {

}*/

function borrarStorage(){
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage){
    let usuarioStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioStorage;
}

function recordar(usuario){
    //saludar(usuario);
    //informacionJuegos(juego);
    //mostrarInformacion(a, b);
}