import React, { Profiler ,useEffect,useState,Component} from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import "./ProfProfile.css";
import Sidebarprof from './Sidebarprof';
import axios from "axios";
import { NavigationBarprof } from './NavigationBarprof';
import View_feed_prof from '../feedback/view_feed_prof';
import Accordion from "react-bootstrap/Accordion";
import heroku from '../../variable'
import { render } from 'react-dom';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 

const Hemlo =styled.div`
margin-top: 1em;
margin-left: 6em;
margin-right: 6em;

`;
var pID;

const jwt = require('jsonwebtoken')
function getUserID(){
    var token = document.cookie.split('=')[1];
    jwt.verify(token,"thisisakeyforthejwtandisaccessedatthebackendonly",(err,decodedToken) => {
      if (err) {
          console.log(err);
      } else{
        pID = decodedToken.id;
      }
    })
  }
    
    export class ProfProfile extends Component {
      constructor(props) {
        super(props);
        this.state = {name: '',email:'',phoneno:'',location:'',occupation:'',experience:''};
    
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangeemail = this.handleChangeemail.bind(this);
        this.handleChangephoneno = this.handleChangephoneno.bind(this);
        this.handleChangelocation = this.handleChangelocation.bind(this);
        this.handleChangeexperience = this.handleChangeexperience.bind(this);
        this.handleChangeoccupation = this.handleChangeoccupation.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

     getdetails(){
      
       axios.get(`${heroku.baseurl}profileretrieve_prof/`+pID)
    .then((response)=>{
      const data= response.data;
       console.log(data);
      this.setState({id:data[0]['_id'],name:data[0]['fullName'],occupation:data[0]['occupation'],location:data[0]['location'],email:data[0]['email'],phoneno:data[0]['phoneNo'],gender:data[0]['gender'],experience:data[0]['experience']});
            console.log(data[0]['fullName']);
      console.log("data from mongo recieved to profile")
    })
    .catch((error)=>{
      console.log("data from mongo didn't receive");

    })
  }

  handleChangeemail(event) {
    this.setState({email: event.target.value});
  }

  handleChangename(event) {
    this.setState({name: event.target.value});
  }

  handleChangephoneno(event) {
    this.setState({phoneno: event.target.value});
  }

  handleChangelocation(event) {
    this.setState({location: event.target.value});
  }

  handleChangeoccupation(event) {
    this.setState({occupation: event.target.value});
  }

  handleChangeexperience(event) {
    this.setState({experience: event.target.value});
  }

  UpdateProfileHandler=(e)=>{
    e.preventDefault();
    
    //create object of form data
    const formData = {id: pID,
      name: this.state.name,
      email: this.state.email,
      phoneno: this.state.phoneno,
      location: this.state.location,
      occupation: this.state.occupation,
      experience: this.state.experience};

    axios.post(`${heroku.baseurl}app/updateProfile_prof/`,formData
       ).catch(err=>console.log(err))
}


  componentDidMount(){
    this.getdetails();
  }

      render() {
        getUserID();
        return (
          <div>
           <Sidebarprof />
           <NavigationBarprof/>
           
          <div className = 'prof_profile'> 
          <div className='mt-3'>
            <Card style={{ width: '30rem' },{height: '70rem'}}>
              <Card.Body>
              <Container>
        <Row >
        <Col>
            <h1 style={{color:'black' , fontSize:'3rem',marginRight:'-20px',textDecoration:'underline'}}>USER PROFILE</h1>
            <Form className="form" style={{color:'black'}}>  
            <Card.Img variant="top" className="im" style={{marginRight:'-40px',height:'100px',width:'100px'}}src="https://us.123rf.com/450wm/kritchanut/kritchanut1401/kritchanut140100054/25251050-businessman-avatar-profile-picture.jpg?ver=6"/>

            {/* <p> {this.state.msg}</p>    */}
  <Form.Group controlId="formCategory1">
    <Form.Label className = "labels" style={{color:'black', fontSize:'1rem',marginBottom:'-300px',margin:'-0.8em'}}>Username</Form.Label>
    <Form.Control type="text" style={{color:'black'}} defaultValue={this.state.name} onChange={this.handleChangename}/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Profession</Form.Label>
    <Form.Control type="text" style={{color:'black'}} defaultValue={this.state.occupation} onChange={this.handleChangeoccupation} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Location</Form.Label>
    <Form.Control type="text" style={{color:'black'}} defaultValue={this.state.location} onChange={this.handleChangelocation}/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Email</Form.Label>
    <Form.Control type="email" style={{color:'black'}} defaultValue={this.state.email} onChange={this.handleChangeemail}/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Phone No</Form.Label>
    <Form.Control type="phone" style={{color:'black'}} defaultValue={this.state.phoneno} onChange={this.handleChangephoneno} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Gender</Form.Label>
    <Form.Control type="phone" style={{color:'black'}} defaultValue={this.state.gender} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Experience</Form.Label>
    <Form.Control type="phone" style={{color:'black'}} defaultValue={this.state.experience} onChange={this.handleChangeexperience}/>
  </Form.Group>

  <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
  
  </Form>
   </Col>
       </Row>
        </Container>
        </Card.Body>
        
           </Card>
           <Accordion defaultActiveKey="0">
      <Row className="m-0">
        <Col className="">
              <Row className="p" style={{paddingLeft:'80px'}}>
                <Accordion.Toggle  as={Button}  className="p" variant="link" eventKey="1" >
                    Click to View Feedbacks
                </Accordion.Toggle>
              </Row>
    <Accordion.Collapse eventKey="1">
            <Card  style={{color:"black",padding:"40px"}}>               
              <View_feed_prof professionalID = {this.state.pid}/>  
           
           </Card>          
    </Accordion.Collapse>
    </Col>
    </Row>
</Accordion>
           
           
            
      </div>
      
      </div>
      
      </div>
        )
      }
    }


    
    export default ProfProfile
    