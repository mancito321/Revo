import React, {Component} from 'react';
import {Route, Redirect} from 'react-router'
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
  FormText,
  Form
} from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import DropIt from './DropIt'
const axios = require('axios');

class NuevoReto extends Component {

  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM') === null)
    this.state = {
      NameReto:"",
      TextReto:"",
      Reto:null,
      Rubrica:null,
      Formato:null,
      recursos: [],
      RecursoName :"",
      RecursoText:"",
      RecursoURL:""
    };
  }

  validateForm() {
      if (this.state.NameReto.length > 0 && this.state.TextReto.length > 0 && this.state.Reto != null && this.state.Rubrica != null && this.state.Formato != null){
        return true
      }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidMount() {

  }

  handleSubmit = event => {
    let formData = new FormData();
    console.log(formData);
    formData.append('NameReto', this.state.NameReto);
    formData.append('TextReto', this.state.TextReto);
    formData.append('Reto', this.state.Reto);
    formData.append('Rubrica', this.state.Rubrica);
    formData.append('Formato', this.state.Formato);
    formData.append('recursos', this.state.recursos);
    let session=JSON.parse(sessionStorage.getItem('mySteamM'))
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'x-access-token':session.token
        }
    }
    console.log(config);
    axios.post('http://localhost:5000/api/auth/newreto', formData,config)
    .then( (response) =>{
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  handleDropFile=(e)=> {
    this.setState({
      [e.target.name]:e.target.files[0]
    });
  }

  render() {
    if (this.state.session) {
      return <Redirect to='/login'/>
    } else {
      try {
        return (
          <div>
            <Container fluid="true">
              <Row>
                <Col md="2" className="nav_cont"><Nav/></Col>
                <Col md="2"></Col>
                <Col md="10" xs="12" className="contenido_general">
                  <Container className="Contenido_general">
                    <Row>
                      <Col md="12">
                        <h2 className="titulo">RETOS</h2>
                        <small>Nuevo Reto</small>
                      </Col>
                      <Row className="margin_container">
                        <form onSubmit={this.handleSubmit}>
                          <Container>
                            <Row>
                              <Col xs="12">
                                <h5>INFORMACIÓN DEL GRUPO</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6" xs="12">
                                <FormGroup id="name">
                                  <Label>Nombre del reto</Label>
                                  <Input type="text" id="name" name="NameReto" placeholder="Ingresa el nombre del reto" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                              <Col xs="12">
                                <FormGroup>
                                  <Label for="exampleText">Descripción del reto</Label>
                                  <Input type="textarea" name="TextReto" id="exampleText" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col xs="12">
                                <h5>DOCUMENTACIÓN DEL RETO</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6" xs="12">
                                <FormGroup id="reto">
                                  <Label for="exampleFile">Reto</Label>
                                  <Input type="file" name="Reto"  onChange={this.handleDropFile}/>
                                  <FormText color="muted">
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6" xs="12">
                                <FormGroup id="rubica">
                                  <Label for="exampleFile">Rubrica</Label>
                                  <Input type="file" name="Rubrica"  onChange={this.handleDropFile}/>
                                  <FormText color="muted">
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6" xs="12">
                                <FormGroup id="formato">
                                  <Label for="exampleFile">Formato</Label>
                                  <Input type="file" name="Formato" onChange={this.handleDropFile}/>
                                  <FormText color="muted">
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col md="12"><h5>RECURSOS</h5></Col>
                            </Row>
                            <Row>
                              <Col xs="12" md="6">
                                <FormGroup id="name">
                                  <Label>Nombre del recurso</Label>
                                  <Input type="text" name="RecursoName" id="recurso-name" placeholder="Ingresa el nombre del recurso" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                              <Col xs="12">
                                <FormGroup>
                                  <Label for="exampleText">Descripción del recurso</Label>
                                  <Input type="textarea"  name="RecursoText" id="recurso-text" onChange={this.handleChange.bind(this)} />
                                  </FormGroup>
                                </Col>
                                <Col md="6" xs="12">
                                  <FormGroup id="name">
                                    <Label>Enlace del recurso</Label>
                                    <Input type="text" id="recurso-url" name="RecursoURL" placeholder="http://" onChange={this.handleChange.bind(this)}/>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="2" xs='12' className="">
                                  <Button className="ingresar_recurso" disabled={!this.validateParticipante()} onClick={this.add_recurso.bind(this)} >Guardar</Button>
                                </Col>
                              </Row>

                            </Container>
                            <Container className="form_margin">
                              <Row>
                                <Col xs="12">
                                  <Col md="12"><div className="header_participants">
                                    <Row>
                                      <Col md="4" className="center">Nombre recurso</Col>
                                      <Col md="4" className="center">Enlace</Col>
                                      <Col md="2" className="center">Remover</Col>
                                      <Col md="2" className="center">Remover</Col>
                                    </Row>
                                  </div></Col>
                                  <Col md="12"><div className="cont_participants">
                                    {
                                      this.state.recursos.map(function(item, i){
                                        console.log(this.state.recursos);
                                        return (
                                          <Row key={'Row'+i}>
                                            <Col md="4" key={i}>{item[0]}</Col>
                                            <Col md="4" key={i}>{item[1]}</Col>
                                            <Col md="2" key={i} onClick={this.delete_recurso.bind(this,item)} >ver/editar</Col>
                                            <Col md="2" key={i} onClick={this.delete_recurso.bind(this,item)} >delete</Col>
                                          </Row>
                                        );
                                      }.bind(this))
                                    }
                                  </div></Col>
                                </Col>
                              </Row>
                            </Container>

                            <Container className="form_margin">
                              <Row className="center">
                                <Col md="2">
                                  <Button block disabled={!this.validateForm()} type="submit">
                                    Crear
                                  </Button>
                                </Col>
                                <Col md="2">
                                  <Button block disabled={!this.validateForm()} type="submit">
                                    Regresar
                                  </Button>
                                </Col>

                              </Row>
                            </Container>
                          </form>
                        </Row>
                      </Row>

                    </Container>
                  </Col>
                </Row>
              </Container>
              <footer><Footer/></footer>
            </div>
          );
        } catch (error) {
          return (
            <p></p>
          );
        }
      }
    }

    validateParticipante=(e)=>{
      return true
    }
    ie() {
      this.setState(this.state)
    }


    add_recurso() {
      console.log(this.state.RecursoName);
      this.state.recursos.push([this.state.RecursoName,this.state.RecursoText,this.state.RecursoURL]);
      this.setState(this.state)
      this.setState({RecursoName:"",RecursoText:"",RecursoURL: ""})
      document.getElementById('recurso-name').value = "";
      document.getElementById('recurso-text').value = "";
      document.getElementById('recurso-url').value = "";
    }

    delete_recurso(i) {
      var array = this.state.recursos;
      var index = array.indexOf(i);
      array.splice(index,1);
      this.setState(this.state)
    }

  }
  export default NuevoReto;