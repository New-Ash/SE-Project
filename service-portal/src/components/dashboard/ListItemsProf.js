import React, { Component } from 'react'
import './Listitem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import heroku from '../../variable'


const Swal=require('sweetalert2');
const jwt = require('jsonwebtoken')

 

  
var profession;
var pid;
var location;

function getUserrole(){
  profession=jwt_decode(document.cookie.split('=')[1]).role;
  pid=jwt_decode(document.cookie.split('=')[1]).id;
  location=jwt_decode(document.cookie.split('=')[1]).place;


}


export class ListItemsProf extends Component {

  

  state={
      pid:'',
      Done:'',
    posts: [],
    cust:[]
    

  };



  componentDidMount(){
   this.getBlogPost();
 
  };
  
getCustDetails(id){
  console.log("get cust details :" + id);
  axios.get(`${heroku.baseurl}api3/`+id,{place : location})
  .then((response)=>{
    const data= response.data;
   
    this.setState({cust:data});

    console.log("retrieve cust data from mongo for posts")
    console.log(data);


  })
  .catch((error)=>{
    console.log("data from mongo didnrt receive");

  })

}
  
 

  getBlogPost(){
    
    console.log("listitems "+profession);
    console.log("listitems "+location);
    
    axios.post(`${heroku.baseurl}api1/getprofdata`,{place :location, role:profession })
    .then((response)=>{
      const data= response.data;
      this.setState({posts:data});

      console.log("data from mongo recieved to listitem")
      console.log(data);


    })
    .catch((error)=>{
      console.log("data from mongo didnrt receive");

    })
  }

  // done(id){

  //   this.setState(
  //     (prev)=>{
  //       return {
  //         ...prev,
  //         posts: prev.posts.map((item)=>{
  //           if(item._id!==id){
  //             return item;
  //           }
  //           else{
              
  //             return {
  //               ...item,
  //               status:"Ongoing"
                
  //             }
  //           }
  //         })

  //       }

  //     }

  //   )

  //   console.log("change: "+this.state.posts);
    
    
  // }
  take(id,location1,profession1,body1,custid,name1,email1,phoneNo1){
    
   
    const payload={
     
      c_id: custid,
      body:body1 ,
      location:location1,
      profession:profession1,
      p_id:pid,
      name:name1,
      email:email1,
      phoneNo:phoneNo1


     
    };

    axios({
      url:`${heroku.baseurl}api1/ongoing`,
      method:'POST',
      data:payload

    }).then(()=>{
      console.log("data sent to server");
      Swal.fire({
        title: 'success',
        text: "success",
        icon: 'success',
        confirmButtonText: 'ok'
      }).then((result) =>{
          if (result.isConfirmed) {
            axios.post(`${heroku.baseurl}api/deleteavailable`,{postid:id})
            .then((response)=>{
      
              console.log("deleted from available")
      
            })
            .catch((error)=>{
              console.log("error is :"+error)
              console.log("data from mongo didnrt receive listiems");
        
            })


            window.location.replace('/profHome')                         
          }
      })

      

      
     

    })
    .catch((error)=>{
      console.log("error while sending data",error);
    });




  }


  render() {
    getUserrole();
    
    
    const items=this.state.posts;

    console.log("lisitmes");

     return this.state.posts.map((item,index)=>{

     

     return(
      <Card style={{marginTop:"2%",border:"2px solid",boxShadow:"0px 14px 20px rgba(34, 35, 58, 0.2)",marginLeft:"10%",marginRight:"10%" ,color:'black',padding:"10px"}}>
      <div  key={index}>
      <h3>City : {(item.location).charAt(0).toUpperCase() + (item.location).slice(1)}  </h3> 
      
      <h3>Profession : {(item.profession).charAt(0).toUpperCase()+(item.profession).slice(1)}</h3>
    <p>Description : {item.body}</p>
    <br></br>
    <p>Price(Approx) in rupees : {item.price}</p>
   

    
   
   
   
    
    

    <button id="take" onClick={()=>this.take(item._id,item.location,item.profession,item.body,item.c_id,item.name,item.email,item.phoneNo)}>Take this job</button>
   
    <Accordion defaultActiveKey="0">
      <Row className="m-0">
        <Col className="">
              <Row className="px-0" style={{padding:'0px'}}>
                <Accordion.Toggle as={Button} className="px-0" variant="link" eventKey="1">
                    Click to View Customer Details
                </Accordion.Toggle>
              </Row>
    <Accordion.Collapse eventKey="1">
    <Card style={{color:"black"}}>               
              <h5>Name : {item.name}</h5>
              <h5>Email : {item.email}</h5>
              <h5>Contact Number : {item.phoneNo}</h5>
           
           </Card>          
    </Accordion.Collapse>
   
    </Col>
    </Row>
</Accordion>

    

 
   


    </div>
    </Card>

     )
       
         
           
           
         
   
       })
    
    
    
 

  }
}

export default ListItemsProf

