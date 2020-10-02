const http = require('http');
const express = require('express');
const cors = require('cors')
const status = require('http-status');
const sequelize = require('./src/database/database');
const app = express();
const routes = require('./src/routes/routes');

//inicializamos a aplicação
app.use(express.json());

//cors middleware
app.use(cors())

//definimos a url base da aplicação
app.use('/sistema', routes);

app.use((req, res, next) => {
    res.status.apply(status.NOT_FOUND).send('Page not found');
});

app.use((req, res, next) => {
    res.status.apply(status.INTERNAL_SERVER_ERROR).json({error});
});


sequelize.sync({force: false}).then ( () => {
    const port = 3003;
    app.set('port', port);
    const server = http.createServer(app);
    server.listen(port, () =>{
        console.log(`API Rodando na porta ${port}`);
    });
});