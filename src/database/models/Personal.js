module.exports = (sequelize, dataTypes) => {
    let alias = 'Personal';
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
        dni: {
            type: dataTypes.INTEGER
        },
        vacunaciones: {
            type: dataTypes.STRING
        },
        monotributo: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        fechaInicio: {
            type: dataTypes.DATE
        },
        fechaFinal: {
            type: dataTypes.DATE
        },
        notasVarias: {
            type: dataTypes.STRING
        },
        telefono: {
            type: dataTypes.INTEGER
        },
        valor: {
            type: dataTypes.INTEGER
        },
        status: {
            type: dataTypes.STRING
        },

    };
    let config = {
        tableName: 'personal',
        timestamps: false
    };
    const Personal = sequelize.define(alias, cols, config)

    return Personal

}
