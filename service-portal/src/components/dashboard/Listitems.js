import React, { Component } from 'react'
import './Listitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {Card} from 'react-bootstrap'
import heroku from '../../variable'


const jwt = require('jsonwebtoken')

 

  
var custid;

function getUserID(){
  var token = document.cookie.split('=')[1];
  jwt.verify(token,"thisisakeyforthejwtandisaccessedatthebackendonly",(err,decodedToken) => {
    if (err) {
        console.log(err);
    } else{
      custid= decodedToken.id;
     
    }
  })
}




export class Listitems extends Component {

  

  state={
    posts: []

  };


  componentDidMount(){
   this.getBlogPost();
   
  };
  

  
 

  getBlogPost(){
    
    //console.log("listitems "+custid);
    
    axios.get(`${heroku.baseurl}api/`+custid)
    .then((response)=>{
      const data= response.data;
      this.setState({posts:data});

      console.log("data from mongo recieved to listitem")
      console.log(data);


    })
    .catch((error)=>{
      console.log("error is :"+error)
      console.log("data from mongo didnrt receive listiems");

    })
  }







  render() {
    getUserID();
    
    const items=this.state.posts;

    //console.log("lisitmes");
    
    
    

    

     return this.state.posts.map((item,index)=>{

     

     return(
       <Card style={{marginTop:"2%",border:"2px solid",boxShadow:"0px 14px 20px rgba(34, 35, 58, 0.2)",marginLeft:"10%",marginRight:"10%" ,color:'black',padding:"10px"}}>
               <div  key={index}>
      
      <h3>City : {(item.location).charAt(0).toUpperCase() + (item.location).slice(1)}  </h3> 
      
      <h3>Profession : {(item.profession).charAt(0).toUpperCase()+(item.profession).slice(1)}</h3>
    <p>Description : {item.body}</p>
    <br></br>
    <p>Price(Approx.) in rupees: {item.price}</p>
    </div>

       </Card>

   
    
  

         
          

  

     )
       

         
   
       })

  }
}

export default Listitems

