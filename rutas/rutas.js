const express=require('express')
const rutas=express.Router();
const controller=require('../controlador/controller')





rutas.get('/',controller.index);
rutas.post('/ingresar',controller.login);
rutas.get('/cerrar',controller.cerrar);
rutas.get('/bienvenido',controller.consultabienvenido);
/*Inicio Ruta Nosotros*/
rutas.get('/nosotros',controller.consultanosotros);
/*Fin Ruta Nosotros*/

/*Inicio Ruta login*/
rutas.get('/ingresar',controller.consultalogin);
/*Fin Ruta login*/

/*Inicio Ruta Producto*/ 
rutas.get('/alimento',controller.consultaproductosalimentos);
rutas.get('/juguete',controller.consultaproductosjuguetes);
rutas.get('/accesorio',controller.consultaproductosaccesorio);
rutas.get('/farmaceutica',controller.consultaproductosfarmaceutica);
rutas.get('/precio',controller.precio);
rutas.post('/consulta',controller.precio);

rutas.post('/frminsertarproducto',controller.insertarproducto);
rutas.get('/producto',controller.consultaproducto);
rutas.post('/actualizarpro',controller.actualizarproducto);
/*Fin Ruta Producto*/

/*Inicio Ruta Cita*/
rutas.post('/frminsertarcitas',controller.insertarcitas);
rutas.get('/cita',controller.consultacita);
rutas.post('/actualizarcita',controller.actualizarcitas);
rutas.post('/eliminarcita',controller.eliminarcitas);


rutas.get('/agendarcitas',controller.consultaagendarcita);
rutas.post('/frminsertarcitaspri',controller.insertarcitaspri);

rutas.get('/consultarcitas',controller.consultadatcitaspri);
rutas.post('/frmconsultadatcita',controller.consultadatcitaspri);
rutas.post('/cancelarcita',controller.cancelarcita);
/*Fin Ruta Cita*/

/*Inicio Ruta Registrar*/
rutas.get('/regi',controller.consultaregistrar);
/*Fin Ruta Registrar*/

/*Inicio Ruta Categoria*/
rutas.post('/frminsertarcategoria',controller.insertarcategoria);
rutas.get('/categoria',controller.consultacategoria);
/*Fin Ruta Categoria*/

/*Inicio Ruta Detalle Cita*/
rutas.post('/frminsertardetallecita',controller.insertardetallecita);
rutas.get('/detallecita',controller.consultadetallecita);
rutas.post('/eliminardetacita',controller.eliminardetallecita);
/*Fin Ruta Detalle Cita*/

/*Inicio Ruta Detalle Pedido*/
rutas.post('/frminsertardetallepedido',controller.insertardetallepedido);
rutas.get('/detallepedido',controller.consultadetallepedido);
/*Fin Ruta Deatalle Pedido*/

/*Inicio Ruta Dueño*/
rutas.post('/frminsertardueno',controller.insertardueño);
rutas.get('/dueno',controller.consultadueño);
rutas.post('/actualizardue',controller.actualizardueno);
rutas.post('/eliminardueno',controller.eliminardue);

rutas.post('/frminsertarduenopri',controller.insertardueñopri);
/*Fin Ruta Dueño*/

/*Inicio Ruta Insumos*/
rutas.post('/frminsertarinsumos',controller.insertarinsumos);
rutas.get('/insumos',controller.consultainsumos);
rutas.post('/actualizarinsu',controller.actualizarinsumos);421
/*Fin Ruta Insumos*/

/*Inicio Ruta Mascotas*/
rutas.post('/frminsertarmascotas',controller.insertarmascotas);
rutas.get('/mascota',controller.consultamascota);
rutas.post('/actualizarmasco',controller.actualizarmascotas);
rutas.post('/eliminarmasco',controller.eliminarmascotas);

rutas.post('/frminsertarmascotaspri',controller.insertarmascotaspri);

rutas.get('/consultarmasco',controller.consultadatmascopri);
rutas.post('/frmconsultadatmasco',controller.consultadatmascopri);

/*Fin Ruta Mascotas*/




/*Inicio Ruta Pedido*/
rutas.post('/frminsertarpedido',controller.insertarpedido);
rutas.get('/pedido',controller.consultapedido);
/*Fin Ruta Pedido*/

/*Inicio Ruta Proveedor*/
rutas.post('/frminsertarproveedor',controller.insertarproveedor);
rutas.get('/proveedor',controller.consultaproveedor);
/*Fin Ruta Proveedor*/

/*Inicio Ruta Servicios*/
rutas.post('/frminsertarservicios',controller.insertarservicios);
rutas.get('/servicios',controller.consultaservicios);
rutas.post('/eliminarservi',controller.eliminarservicios);
/*Fin Ruta Servicios*/

/*Inicio Ruta Usuarios*/
rutas.post('/frminsertarusuarios',controller.insertarusuarios);
rutas.get('/usuarios',controller.consultausuarios);
rutas.post('/actualizarusu',controller.actualizarusuarios);
rutas.post('/eliminarusu',controller.eliminarusuarios);
/*Fin Ruta Usuarios*/

/*Inicio Ruta Ventas*/
rutas.post('/frminsertarventas',controller.insertarventas);
rutas.get('/ventas',controller.consultaventas);
rutas.post('/actualizarven',controller.actualizarventa);
/*Fin Ruta Ventas*/

/*Inicio Ruta Veterinario*/
rutas.post('/frminsertarveterinario',controller.insertarveterinario);
rutas.get('/veterinario',controller.consultaveterinario);
rutas.post('/actualizarvet',controller.actualizarveterinario);
rutas.post('/eliminarvet',controller.eliminarveterinario);
/*Fin Ruta Veterinario*/

module.exports=rutas