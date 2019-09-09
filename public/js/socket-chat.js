var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {

        renderizarUsuarios(resp);

    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


socket.on('crearMensaje', function(mensaje) {

    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cuando un usuario sale o entra del chat
socket.on('listaPersonas', function(personas) {
    renderizarUsuarios(personas);

});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado:', mensaje);
});