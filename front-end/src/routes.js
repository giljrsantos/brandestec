import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/client/main';
import Detail from './pages/client/details';
import CreateClient from './pages/client/create';
import EditClient from './pages/client/edit';
import CreatePhone from './pages/client/create/createadress';
import DeleteClient from './pages/client/delete';
import DeleteEndereco from './pages/client/details/deleteAdress'
import DeletePhone from './pages/client/details/deletePhone';
import DeleteEmail from './pages/client/details/deleteEmail';
//import ActivateClient from './pages/client/activate';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = '/cliente' component={Main} />
            <Route path = '/cliente/:id' component={Detail} />
            <Route path = '/cadastrar' component={CreateClient} />
            <Route path = '/editar/:id' component={EditClient} />
            <Route path = '/endereco/:id' component={CreatePhone} />
            <Route path = '/delete/:id' component={DeleteClient} />
            <Route path = '/enderecoone/:id' component={DeleteEndereco} />
            <Route path = '/telefoneone/:id' component={DeletePhone} />
            <Route path = '/emailone/:id' component={DeleteEmail} />
            {/* <Route path = '/activate/:id' component={ActivateClient} /> */}
        </Switch>
    </BrowserRouter>
)

export default Routes;

