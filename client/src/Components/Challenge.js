import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend} from 'recharts';
import { ChallengeCon } from './ChallengeContext';
  const axios = require('axios');
  const radius = 10

class Challenge extends Component {

  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      challenge : [],
      permission:"",
      group:[]
    };
  }
  componentDidMount(){
    axios.get('159.89.229.68:5000/challenge/challenge/last')
   .then((response)=>  {
      this.setState({
       challenge: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed
     });

  }
  componentWillMount(){
     let session=JSON.parse(sessionStorage.getItem('mySteamM'))
     axios.get('159.89.229.68:5000/api/auth/me',{
       headers: {
           'content-type': 'multipart/form-data',
           'x-access-token':session.token
       }
   })
    .then((response)=>  {
       this.setState({
         permission:response.data.rol
       })
     })
     .catch((error)=>  {
     // handle error
     console.log('Fuck '+error);
      })
      .then(()=> {
     console.log(this.state.permission);
      });
      axios.get('159.89.229.68:5000/group/group/limit')
      .then((response)=>  {
         this.setState({
          group: response.data
         });
       })
       .catch((error)=>  {
       // handle error
        })
        .then(()=> {
       // always executed
        });
  }

  render() {
    console.log(this.state.session);
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      try{
        return (
      <div>
      <Container fluid="true">
        <ChallengeCon>
          {context => {

            context.actions.update();
            console.log('Context :');
            console.log(context);
            console.log('done');
           return(
             <div>
             </div>
           )
         }}
        </ChallengeCon>
       <Row>
       <Col md="2" className="nav_cont"><Nav/></Col>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general">
       <Container className="Contenido_general">
       <Row>
       <Col md="12">
       <h2 className="titulo">INICIO</h2><small>Inicio</small>

       </Col>
       <Row  className="margin_container">
       <Col md="12"><h4 className="subtitulo">Último reto</h4></Col>
         <Col md="4" xs="12">
         <h5>{this.state.challenge[0].name}</h5>
         <p>{this.state.challenge[0].contenido}</p>
          <h5>Fecha de publicación</h5>

        <p>{this.state.challenge[0].ca}</p>
             <h5>Finalizado</h5>

          <p>{this.state.challenge[0].fn}</p>
        </Col>
            <Col md="4" xs="12">
            <h5>Documentos</h5>
            <Documents key="document" id={this.state.challenge[0].id}/>
        </Col>
            <Col md="4" xs="12">
            <h5>Desarrollos</h5>
             <Develops key="develops" id={this.state.challenge[0].id}/>
        </Col>
      </Row>
      <Row>

     <Col md="12" className="line">  <BarChart width={1000} height={300} data={this.state.group} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="puntos" fill="#8884d8" minPointSize={5}>
        </Bar>
      </BarChart></Col>

      </Row>
      </Row>

      </Container>
      </Col>
      </Row>
      </Container>
       <footer><Footer/></footer></div>
      );
      }catch(error){
       return(
         <div>
         <Container fluid="true">
          <Row>
          <Col md="2" className="nav_cont"><Nav/></Col>
          <Col md="2"></Col>
          <Col md="10" xs="12" className="contenido_general">
          <Container className="Contenido_general">
          <Row>
          <Col md="12">
          <h2 className="titulo">INICIO</h2><small>Inicio</small>
          </Col>
          <Row  className="margin_container">
          <Col md="12"><h4 className="subtitulo">Último reto</h4></Col>
            <Col md="4" xs="12">
            <h5>Nombre del reto</h5>

             <h5>Fecha de publicación</h5>


                <h5>Finalizado</h5>


           </Col>
               <Col md="4" xs="12">
               <h5>Documentos</h5>
           </Col>
               <Col md="4" xs="12">
               <h5>Desarrollos</h5>
           </Col>
         </Row>


         </Row>

         </Container>
         </Col>
         </Row>
         </Container>
          <footer><Footer/></footer></div>
        );
      }
    }
  }
}

export default Challenge;
