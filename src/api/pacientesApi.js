const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/models");
const multer = require("multer");
const Paciente = db.Paciente;
const Facturacion = db.Facturacion;
const Evolucion = db.Evolucion;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/facturas"));
  },
  filename: (req, file, cb) => {
    console.log("de multer file: ", file);
    const newFilename = "file" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
    req.session.newFileName = newFilename;
  },
});
const upload = multer({ storage });

router.get("/pacientesList", async (req, res) => {
  /*     console.log(req.body) */
  let emailVerify = req.body.email;
  let password = req.body.password;
  const find = await Paciente.findAll({}).then(
    await function (pacientes) {
      /*        console.log(pacientes) */
      return res.status(200).send({ data: pacientes });
    }
  );
});

router.get("/detallepaciente/:id", async (req, res) => {
  console.log(req.params.id);

  id = req.params.id;
  let emailVerify = req.body.email;
  let password = req.body.password;
  const find = await Paciente.findOne({
    where: {
      id: req.params.id,
    },
  }).then(
    await function (pacientes) {
      /*        console.log(pacientes) */
      return res.status(200).send({ data: pacientes });
    }
  );
});

router.post("/pacientesList/edit", async (req, res) => {
  console.log("body", req.body);
  const updateData = {};
  if (req.body.nombre) updateData.nombre = req.body.nombre;
  if (req.body.apellido) updateData.apellido = req.body.apellido;
  if (req.body.direccion) updateData.direccion = req.body.direccion;
  if (req.body.nombreFamiliar)
    updateData.nombreFamiliar = req.body.nombreFamiliar;
  if (req.body.apellidoFamiliar)
    updateData.apellidoFamiliar = req.body.apellidoFamiliar;
  if (req.body.telefono) updateData.telefono = req.body.telefono;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.patologia) updateData.patologia = req.body.patologia;
  if (req.body.asistente) updateData.asistente = req.body.asistente;
  if (req.body.valores) updateData.valores = req.body.valores;
  if (req.body.fechaInicio) updateData.fechaInicio = req.body.fechaInicio;
  if (req.body.fechaFinal) updateData.fechaFinal = req.body.fechaFinal;
  if (req.body.notasVarias) updateData.notasVarias = req.body.notasVarias;
  if (req.body.precio) updateData.precio = req.body.precio;
  if (req.body.status) updateData.status = req.body.status;
  Paciente.update(updateData, {
    where: { id: req.body.id },
  })
    .then(() => {
      res.status(200);  
    })
    .catch((error) => res.send(error));
});

router.post("/pacientesList/destroy", (req, res) => {
  console.log(req.body);

  Paciente.destroy({ where: { id: req.body.id }, force: true }).then(() => {
    res.status(200);
  });
});
router.post("/pacientesList/create", (req, res) => {
  console.log(req.body);
  Paciente.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    nombreFamiliar: req.body.nombreFliar,
    apellidoFamiliar: "",
    telefono: req.body.telefono,
    email: "",
    patologia: "",
    asistente: "",
    valores: "",
    fechaInicio: "2023/01/01",
    fechaFinal: "2023/01/01",
    notasVarias: "",
    precio: 0,
    status: 0,
  });
  res.status(200);
});
router.post("/andy", (req, res) => {
  console.log(req.body);
  res.status(200);
});

router.get("/paciente/facturacion/:id", async (req, res) => {
  console.log("req params: ", req.params.id);
  await Facturacion.findAll({
    where: {
      idPaciente: req.params.id,
    },
  }).then(
    await function (facturas) {
      /*        console.log(pacientes) */
      return res.status(200).send({ data: facturas });
    }
  );
});

// FACTURACION

router.post("/paciente/facturacion", async (req, res) => {
  console.log(req.body);
  await Facturacion.create({
    idPaciente: req.body.id,
    numeroFactura: 00000,
    fechaFactura: req.body.fechaFactura,
    valor: req.body.valor,
    notasVarias: '',
    status: req.body.status,
    imagenFactura: 'imagen'
});
});
router.post("/paciente/facturacion/edit", async (req, res) => {
  console.log("del que llega", req.body);
  Facturacion.update(
    {
      idPaciente: req.body.idPaciente,
      numeroFactura: req.body.numeroFactura,
      fechaFactura: req.body.fechaFactura,
      valor: req.body.valor,
      notasVarias: req.body.notasVarias,
      status: req.body.status,
    },
    {
      where: { id: req.body.id },
    }
  ).catch((error) => res.send(error));
});

router.post("/paciente/facturacion/destroy", (req, res) => {
  console.log(req.body);

  Facturacion.destroy({ where: { id: req.body.id }, force: true }).then(() => {
    res.status(200);
  });
});

router.post(
  "/paciente/facturacion/uploadFactura/:id",
  upload.single("file"),
  (req, res) => {
    console.log("estan llegando Create de facturas", req.body);
    Facturacion.update(
      {
        imagenFactura:
          "http://localhost:4000//img/facturas/" + req.session.newFileName,
      },
      { where: { id: req.params.id } }
    );
  }
);

// EVOLUCION PACIENTES:

router.get("/paciente/evolucion/:id", async (req, res) => {
  console.log("req params: ", req.params.id);
  await Evolucion.findAll({
    where: {
      pacienteId: req.params.id,
    },
  }).then(
    await function (facturas) {
      /*        console.log(pacientes) */
      return res.status(200).send({ data: facturas });
    }
  );
});

router.post("/paciente/evolucion/edit", async (req, res) => {
  console.log("req params: ", req.body);
  Evolucion.update(
    {
      id: req.body.id,
      pacienteId: req.body.pacienteId,
      obraSocial: req.body.obraSocial,
      diagnostico: req.body.diagnostico,
      fecha: req.body.fecha,
      hora: req.body.hora,
      evolucionDiaria: req.body.evolucionDiaria,
      personal: req.body.personal,
      observaciones: req.body.observaciones,
    },
    {
      where: { id: req.body.id },
    }
  ).then(
    await function (facturas) {
      /*        console.log(pacientes) */
      return res.status(200).send({ data: facturas });
    }
  );
});

router.post("/paciente/evolucion/create", async (req, res) => {
  console.log(req.body);
  Evolucion.create({
    pacienteId: req.body.id,
    obraSocial: req.body.obraSocial,
    diagnostico: req.body.diagnostico,
    fecha: req.body.fecha,
    hora: req.body.hora,
    evolucionDiaria: req.body.evolucionDiaria,
    personal: req.body.personal,
    observaciones: req.body.observaciones,
  }).then(
    await function () {
      return res.status(200);
    }
  );
});

router.post("/evolucion/destroy", (req, res) => {
  console.log(req.body);
  Evolucion.destroy({ where: { id: req.body.id }, force: true }).then(() => {
    res.status(200);
  });
});

module.exports = router;
