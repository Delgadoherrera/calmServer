const express = require('express');
const router = express.Router();
const path = require('path')
const db = require("../database/models")
const Personal = db.Personal;



router.get("/personalList", async (req, res) => {
    /*     console.log(req.body) */
    let emailVerify = req.body.email
    let password = req.body.password
    const find = await Personal.findAll({
    })
        .then(await function (personal) {
            /*        console.log(Personals) */
            return res.status(200).send({ data: personal })
        })
})


router.post("/personalList/edit", async (req, res) => {
    console.log(req.body)
    Personal
        .update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            dni:req.body.dni,
            email: req.body.email,
            vacunaciones: req.body.vacunaciones,
            monotributo: req.body.monotributo,
            valor: req.body.valor,
            fechaInicio: req.body.fechaInicio,
            fechaFinal: req.body.fechaFinal,
            notasVarias: req.body.notasVarias,
            precio: req.body.precio,
            status: req.body.status,
        }, {
            where: { id: req.body.id }
        }
        ).catch(error => res.send(error))
})


router.post("/personalList/destroy", (req, res) => {
    console.log(req.body)

    Personal.destroy({ where: { id: req.body.id }, force: true })
        .then(() => {
            res.status(200)
        })
})
router.post("/personalList/create", (req, res) => {
    console.log(req.body)
    Personal.create(
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            dni:req.body.dni,
            email: req.body.email,       
            vacunaciones: req.body.vacunaciones,     
            valor: req.body.valor,
            monotributo: req.body.monotributo,
            fechaInicio: req.body.fechaInicio,
            fechaFinal: req.body.fechaFinal,
            notasVarias: req.body.notasVarias,
            status: req.body.status,
        })
        res.status(200)
})





module.exports = router;

