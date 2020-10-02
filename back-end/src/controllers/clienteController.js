const Cliente = require('../models/cliente');
const status = require('http-status');

//Insert Cliente na tabela
exports.Insert = (req, res, next) => {

    //recuperando os valores das propriedades
    const { nome, cnpj_cpf, ie_rg, ativo, observacao } = req.body;

    //insert no banco de dados
    Cliente.create({
        nome: nome,
        cnpj_cpf: cnpj_cpf,
        ie_rg: ie_rg,
        ativo: ativo,
        observacao: observacao
    })
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//Select todos os registro da tabela
exports.SelectAll = (req, res, next) => {
    Cliente.findAll()
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            }
        })
        .catch(error => next(error));
};


//Select One, Somente um Cliente
exports.SelectOne = (req, res, next) => {
    const { id } = req.params;

    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//Update Cliente
exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { nome, cnpj_cpf, ie_rg, ativo, observacao } = req.body;

    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.update({
                    nome: nome,
                    cnpj_cpf: cnpj_cpf,
                    ie_rg: ie_rg,
                    ativo: ativo,
                    observacao: observacao
                }, { where: { id: id } })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};


//Inativar Cliente
exports.InativarClient = (req, res, next) => {
    const { id } = req.params;
    const { ativo } = req.body;

    Cliente.findByPk(id)
        .then(client => {
            if (client) {
                client.update({
                    ativo: ativo
                }, { where: { id: id } })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//Ativar Cliente
exports.ActivateCliente = (req, res, next) => {
    const { id } = req.params;
    const { ativo } = req.body;

    Cliente.findByPk(id)
        .then(clie => {
            if (clie) {
                clie.update({
                    ativo: ativo
                }, { where: { id: id } })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};


//Delete Cliente
/* exports.Delete = ( req, res, next) => {
    const { id } = req.params;

    Cliente.findByPk(id)
        .then(deleteClient => {
            if(deleteClient){
                Cliente.update({
                    where: { id: id }
                })
                .then( () => {
                    res.status(status.OK).send();
                })
                .catch(error => next(error));
            }else{
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};*/ 