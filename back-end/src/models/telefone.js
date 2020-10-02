const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const Cliente = require('../models/cliente');

const Telefone = sequelize.define('telefones', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Telefone.belongsTo(Cliente, {
    foreignKey: 'clienteId',
    allowNull: false,
    type: Sequelize.INTEGER,
    onDelete: 'cascade'
})
module.exports = Telefone;