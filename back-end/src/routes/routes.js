const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const enderecoController = require('../controllers/enderecoController');
const emailController = require('../controllers/emailController');
const telefoneController = require('../controllers/telefoneController');

//ROTAS DE CLIENTE
router.get('/cliente', clienteController.SelectAll);
router.get('/cliente/:id', clienteController.SelectOne);
router.put('/cliente/:id', clienteController.Update);
router.put ('/cliente/:id', clienteController.InativarClient);
//router.put ('/cliente/:id', clienteController.ActivateCliente);
//router.delete('/cliente/:id', clienteController.Delete);
router.post('/cliente', clienteController.Insert);

//ROTAS ENDEREÇO
router.get('/endereco/:id', enderecoController.SelectAllAdress); //SELECIONA TODOS OS ENDEREÇO DA EMPRESA
router.get('/enderecoone/:id', enderecoController.SelectOnAdress);
router.post('/endereco', enderecoController.Insert);
router.put('/endereco/:id', enderecoController.Update);
router.delete('/endereco/:id', enderecoController.Delete);

//ROTA EMAIL
router.get('/email/:id', emailController.SelectAllEmail);
router.get('/emailone/:id', emailController.SelectOnEmail);
router.post('/email', emailController.Insert);
router.put('/email/:id', emailController.Update);
router.delete('/email/:id', emailController.Delete);

//ROTA TELEFONE
router.get('/telefone/:id', telefoneController.SelectAllPhone);
router.get('/telefoneone/:id', telefoneController.SelectOnPhone);
router.post('/telefone', telefoneController.Insert);
router.put('/telefone/:id', telefoneController.Update);
router.delete('/telefone/:id', telefoneController.Delete);

//EXPORTANDO A CONSTANTE router
module.exports = router;