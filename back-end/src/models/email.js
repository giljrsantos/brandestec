const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const Cliente = require('../models/cliente');

const Email = sequelize.define('emails', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
});

Email.belongsTo(Cliente, {
    foreignKey: 'clienteId',
    allowNull: false,
    type: Sequelize.INTEGER,
    onDelete: 'cascade'
})
module.exports = Email;