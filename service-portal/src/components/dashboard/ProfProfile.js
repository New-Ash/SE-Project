import React, { Profiler ,useEffect,useState,Component} from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import "./Profile.css";
import Sidebar from './Sidebarprof';
import axios from "axios";
import NavigationBar from './NavigationBarprof';
import View_feed_prof from '../feedback/View_feed_prof';
import Accordion from "react-bootstrap/Accordion";
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
      state = {
        pid:"",
        name:'',
        profession:'',
        location:'',
        email:'',
        phoneno:'',
        gender:'',
        experience:''

      }

     getdetails(){
      
       axios.get('http://localhost:4000/profileretrieve_prof/'+pID)
    .then((response)=>{
      const data= response.data;
       console.log(data);
      this.setState({pid:data[0]['_id'],name:data[0]['fullName'],profession:data[0]['occupation'],location:data[0]['location'],email:data[0]['email'],phoneno:data[0]['phoneNo'],gender:data[0]['gender'],experience:'experience'});
             
      console.log("data from mongo recieved to profile")
    })
    .catch((error)=>{
      console.log("data from mongo didn't receive");

    })
  }
  componentDidMount(){
    this.getdetails();
  }

      render() {
        getUserID();
        return (
          <div>
           <Sidebar />
           
          <div className = 'profile'> 
          
          <div className='mt-3'> 
         
              
            <Card style={{ width: '50rem' },{height: '43rem'}}>
              <Card.Body>
          <Container>
        <Row >
        <Col>
            <h1 style={{color:'black' , fontSize:'3rem',marginRight:'130px',marginBottom:'0px'}}>USER PROFILE</h1>
            <Form className="form" style={{color:'black'}}>  
            <Card.Img variant="top" className="im" style={{marginRight:'-40px'}}src="https://us.123rf.com/450wm/kritchanut/kritchanut1401/kritchanut140100054/25251050-businessman-avatar-profile-picture.jpg?ver=6"/>

            {/* <p> {this.state.msg}</p>    */}
  <Form.Group controlId="formCategory1">
    <Form.Label className = "labels" style={{color:'black', fontSize:'1rem',marginBottom:'-300px'}}>Username</Form.Label>
    <Form.Control type="text" style={{color:'black'}} defaultValue={this.state.name}/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Profession</Form.Label>
    <Form.Control type="email" style={{color:'black'}} defaultValue={this.state.profession} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Location</Form.Label>
    <Form.Control type="email" style={{color:'black'}} defaultValue={this.state.location} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Email</Form.Label>
    <Form.Control type="email" style={{color:'black'}} defaultValue={this.state.email} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label style={{color:'black', fontSize:'1rem'}}>Phone No</Form.Label>
    <Form.Control type="email" style={{color:'black'}} defaultValue={this.state.phoneno} />
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
              <Row className="px-0" style={{padding:'0px'}}>
                <Accordion.Toggle as={Button} className="px-0" variant="link" eventKey="1">
                    Click to View More
                </Accordion.Toggle>
              </Row>
    <Accordion.Collapse eventKey="1">
    <Card  style={{color:"black"}}>               
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
    