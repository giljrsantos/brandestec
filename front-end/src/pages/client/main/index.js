import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi';
import { ImUserCheck } from 'react-icons/im';
import api from '../../services/api';
import './index.css';


class Main extends Component{
    
    state = {
        clients: [],   
    }

    async componentDidMount(){
        const res = await api.get('/cliente');
        this.setState({ clients: res.data })
    }

    render(){

        const { clients } = this.state;
       
       return(
          <div className="product-list container">

              <div className="row btncadastrar">
                <Link to={`/cadastrar`} className="btn btn-success mb-3">
                    <AiOutlineCheckCircle size={25} color="fff" /> CADASTRAR
                </Link>                  
              </div>
              
              {clients.map(client => (
           
                <article key={client.id}>
                        <strong>{client.nome}</strong>
                    <div>
                        <Link to={`/cliente/${client.id}`} className="viewer"><BiDetail size={25} color="00ADEF" /></Link>
                        <Link to={`/editar/${client.id}`} className="edite"><FaEdit size={25} color="F7ABAD" /></Link>
                        {client.ativo === true ? <Link to={`/delete/${client.id}`} className="delete"><MdDeleteForever size={25} color="f00" /></Link> : <Link to={`/delete/${client.id}`} className="ativo"><ImUserCheck size={25} color="green" /></Link>}
                    </div>

                </article>
        
            ))}
          </div> 
       ); 
    }
}


export default Main;