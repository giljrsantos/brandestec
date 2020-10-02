import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RiCloseCircleFill } from 'react-icons/ri'
import { GrFormPreviousLink } from 'react-icons/gr'
import api from '../../../services/api'
import './index.css';

class DeleteAdress extends Component {

    state = {
        email: {},
        redirect: false
    }

    async componentDidMount() {

        const { id } = this.props.match.params;

         //BUSCA O ENDERECO PASSADO PELO PROPS
         await api.get(`/emailone/${id}`).then(em => {
            var emaila = em.data
            this.setState({ email: em.data });
            console.log(emaila.clienteId);
        })
        .catch(error =>
            console.log(error)
        );

    }

    render(){
      const { redirect } = this.state;
      const { id } = this.props.match.params;

      if(redirect){
          return <Redirect to={`/cliente/${this.state.email.clienteId}`} />
      }else{
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="alert alert-danger text-center text-justify">
                            TEM CERTEZA QUE DESEJA DELETAR O E-MAIL<br/>
                            <strong>{this.state.email.email}</strong>
                        </div>
                        <div className="col-md-12">
                            <Link to={`/cliente/${this.state.email.clienteId}`} className="btn btn-secondary">
                                <GrFormPreviousLink size={35} color="black" /> Voltar
                            </Link>                           
                            <button className="btn btn-danger" onClick={this.handleClick}>
                                <RiCloseCircleFill size={35} color="white" /> REMOVER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
      }
    }

    handleClick = event => {
        const { id } = this.props.match.params;
        fetch(`http://192.168.1.105:3003/sistema/email/${id}`, {
            method: 'delete'
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                }
            })
            .catch(error =>
                console.log(error)
            );

        event.preventDefault();        
    }

}

export default DeleteAdress;