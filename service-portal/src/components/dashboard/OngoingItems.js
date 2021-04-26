import React, { Component } from 'react'
import './Listitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {Card} from 'react-bootstrap'
import heroku from '../../variable'
const Swal=require('sweetalert2');



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
    
    console.log("listitems "+custid);
    
    axios.post(`${heroku.baseurl}api1/getongoing`,{id:custid})
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

  done(id,location1,profession1,body1,profid,name1,email1,phoneNo1){

    const payload={
     
      c_id: custid,
      body:body1 ,
      location:location1,
      profession:profession1,
      p_id:profid,
      name:name1,
      email:email1,
      phoneNo:phoneNo1
     
    };

    axios({
      url:`${heroku.baseurl}api/done`,
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
            axios.post(`${heroku.baseurl}api1/deleteongoing`,{postid:id})
            .then((response)=>{
      
              console.log("deleted from ongoing")
      
            })
            .catch((error)=>{
              console.log("error is :"+error)
              console.log("data from mongo didnrt receive listiems");
        
            })

            window.location.replace('/Ongoing')                         
          }
      })


    })
    .catch((error)=>{
      console.log("error while sending data",error);
    });


    


    


  }





  render() {
    getUserID();
    
    const items=this.state.posts;

    console.log("lisitmes");
    
    
    

    

     return this.state.posts.map((item,index)=>{

     

     return(
      <Card style={{marginTop:"2%",border:"2px solid",boxShadow:"0px 14px 20px rgba(34, 35, 58, 0.2)",marginLeft:"10%",marginRight:"10%" ,color:'black',padding:"10px"}}>
      <div  key={index}>
      <h3>City : {(item.location).charAt(0).toUpperCase() + (item.location).slice(1)}  </h3> 
      
      <h3>Profession : {(item.profession).charAt(0).toUpperCase()+(item.profession).slice(1)}</h3>
    <p>Description : {item.body}</p>
    
  

          <button id="done"  onClick={()=>this.done(item._id,item.location,item.profession,item.body,item.p_id,item.name,item.email,item.phoneNo)}>Done</button>
          

    </div>
    </Card>

     )
       

         
   
       })

  }
}

export default Listitems

