const Email = require('../models/email');
const status = require('http-status');

exports.Insert = (req, res, next) => {

     //recuperando os valores das propriedades
    const { email, clienteId } = req.body;

    //insert no banco de dados
    Email.create({

        email: email,
        clienteId: clienteId,

    })
    .then((email) => {
        if(email){
            res.status(status.OK).send(email);
        }else{
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
};

//Select todos os emails do cliente
exports.SelectAllEmail = (req, res, next) => {
    const { id } = req.params;
    Email.findAll({
        where: { clienteId: id }
    })
    .then(email => {
            if (email) {
                res.status(status.OK).send(email);
            }
        })
        .catch(error => next(error));
};

//Select um email da empresa
exports.SelectOnEmail = (req, res, next) => {
    const { id } = req.params;
        Email.findByPk(id)
        .then(email => {
            if (email) {
                res.status(status.OK).send(email);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//Update Email
exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { email, clienteId } = req.body;

    Email.findByPk(id)
        .then(updateEmail => {
            if(updateEmail){
                Email.update({
                    email: email,
                    clienteId: clienteId
                }, { where: { id: id} })
                    .then( () => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }else{
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};


//Delete Email
exports.Delete = ( req, res, next) => {
    const { id } = req.params;

    Email.findByPk(id)
        .then(deleteEmail => {
            if(deleteEmail){
                Email.destroy({
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
};