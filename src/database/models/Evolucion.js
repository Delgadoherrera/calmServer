module.exports = (sequelize, dataTypes) => {
    let alias = 'Evolucion';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pacienteId: {
            type: dataTypes.INTEGER
        },
        obraSocial: {
            type: dataTypes.STRING
        },
        diagnostico: {
            type: dataTypes.STRING
        },
        fecha: {
            type: dataTypes.DATE
        },
        hora: {
            type: dataTypes.STRING
        },
        evolucionDiaria: {
            type: dataTypes.STRING
        },
        personal: {
            type: dataTypes.STRING
        },
        observaciones: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'evoluciones',
        timestamps: false
    };
    const Evolucion = sequelize.define(alias, cols, config)

    return Evolucion

}
