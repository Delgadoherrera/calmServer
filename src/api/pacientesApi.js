const express = require('express');
const router = express.Router();
const path = require('path')
const db = require("../database/models")
const Paciente = db.Paciente;
const Facturacion = db.Facturacion;



router.get("/pacientesList", async (req, res) => {
    /*     console.log(req.body) */
    let emailVerify = req.body.email
    let password = req.body.password
    const find = await Paciente.findAll({
    })
        .then(await function (pacientes) {
            /*        console.log(pacientes) */
            return res.status(200).send({ data: pacientes })
        })
})

router.get("/detallepaciente/:id", async (req, res) => {
    console.log(req.params.id)

    id = req.params.id
    let emailVerify = req.body.email
    let password = req.body.password
    const find = await Paciente.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(await function (pacientes) {
            /*        console.log(pacientes) */
            return res.status(200).send({ data: pacientes })
        })
})



router.post("/pacientesList/edit", async (req, res) => {
    console.log(req.body)
    Paciente
        .update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            nombreFamiliar: req.body.nombreFamiliar,
            apellidoFamiliar: req.body.apellidoFamiliar,
            telefono: req.body.telefono,
            email: req.body.email,
            patologia: req.body.patologia,
            asistente: req.body.asistente,
            valores: req.body.valores,
            fechaInicio: req.body.fechaInicio,
            fechaFinal: req.body.fechaFinal,
            notasVarias: req.body.notasVarias,
            precio: req.body.precio,
            status: req.body.status,

        }, {
            where: { id: req.body.id }
        }
        ).then(() => {
            return res.redirect('/productos/detail/' + req.params.id)
        })
        .catch(error => res.send(error))
})


router.post("/pacientesList/destroy", (req, res) => {
    console.log(req.body)

    Paciente.destroy({ where: { id: req.body.id }, force: true })
        .then(() => {
            res.status(200)
        })
})
router.post("/pacientesList/create", (req, res) => {
    console.log(req.body)
    Paciente.create(
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            nombreFamiliar: req.body.nombreFamiliar,
            apellidoFamiliar: req.body.apellidoFamiliar,
            telefono: req.body.telefono,
            email: req.body.email,
            patologia: req.body.patologia,
            asistente: req.body.asistente,
            valores: req.body.valores,
            fechaInicio: req.body.fechaInicio,
            fechaFinal: req.body.fechaFinal,
            notasVarias: req.body.notasVarias,
            precio: req.body.precio,
            status: req.body.status,
        })
    res.status(200)
})

router.get("/paciente/facturacion/:id", async (req, res) => {
    console.log('req params: ', req.params.id)
    await Facturacion.findAll({
        where: {
            idPaciente: req.params.id,
        }
    }).then(await function (facturas) {
        /*        console.log(pacientes) */
        return res.status(200).send({ data: facturas })
    })
})

// FACTURACION

router.post("/paciente/facturacion", async (req, res) => {
    console.log(req.body)
    await Facturacion.create({
        idPaciente: req.body.idPaciente,
        numeroFactura: req.body.numeroFactura,
        fechaFactura: req.body.fechaFactura,
        valor: req.body.valor,
        notasVarias: req.body.notasVarias,
        status: req.body.status,     
    });
   
})

router.post("/paciente/facturacion", async (req, res) => {
    console.log(req.body)
    await Facturacion.create({
        idPaciente: req.body.idPaciente,
        numeroFactura: req.body.numeroFactura,
        fechaFactura: req.body.fechaFactura,
        valor: req.body.valor,
        notasVarias: req.body.notasVarias,
        status: req.body.status,     
    });
   
})
router.post("/paciente/facturacion/edit", async (req, res) => {
    console.log(req.body)
    await Facturacion.create({
        idPaciente: req.body.idPaciente,
        numeroFactura: req.body.numeroFactura,
        fechaFactura: req.body.fechaFactura,
        valor: req.body.valor,
        notasVarias: req.body.notasVarias,
        status: req.body.status,     
    });
   
})

router.post("/paciente/facturacion/destroy", (req, res) => {
    console.log(req.body)

    Facturacion.destroy({ where: { id: req.body.id }, force: true })
        .then(() => {
            res.status(200)
        })
})


module.exports = router;