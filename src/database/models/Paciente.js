module.exports = (sequelize, dataTypes) => {
    let alias = 'Paciente';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        nombreFamiliar: {
            type: dataTypes.STRING
        },
        apellidoFamiliar: {
            type: dataTypes.INTEGER
        },
        telefono: {
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
        patologia: {
            type: dataTypes.STRING
        },
        asistente: {
            type: dataTypes.STRING
        },
        valores: {
            type: dataTypes.STRING
        },
        fechaInicio: {
            type: dataTypes.STRING
        },
        fechaFinal: {
            type: dataTypes.STRING
        },
        notasVarias: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.INTEGER
        },
        status: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'pacientes',
        timestamps: false
    };
    const Paciente = sequelize.define(alias, cols, config)

    return Paciente

}
