import jwt_decode from "jwt-decode";
import React, { Component } from 'react';
import './Home.css';
import ListItems from './Listitems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import NavigationBar  from './NavigationBar';
import axios from 'axios';
import heroku from '../../variable'
const Swal = require('sweetalert2')
const jwt = require('jsonwebtoken')
var token = document.cookie.split('=')[1];
library.add(faTrash);


var custid;



export class Home extends Component {
  constructor(props) {
    super(props)
  
    this.submit=this.submit.bind(this);
  }
  


  

  //  change=(e,id)=> {
  //   console.log(e,id);
  
  //   axios.patch('http://localhost:8000/api/'+id, 
  //   { 
      
  //     status: e.target.value
  //   }
    
  // );
  // this.setState({
  //   status:e.target.value,

  // });
  
  
  
   
  // }

  state={
    
    c_id:'',
    body:'',
    location:'',
    profession:'',
    posts: [],
    status:'',
    pid:'',
    price:'',
    name:'',
    email:'',
    phoneNo:''
  };
  
  componentDidMount=()=>{
    this.setState({
      c_id:jwt_decode(document.cookie.split('=')[1]).id,
      name:jwt_decode(document.cookie.split('=')[1]).name,
      email:jwt_decode(document.cookie.split('=')[1]).email,
      phoneNo:jwt_decode(document.cookie.split('=')[1]).phNo

    })
    
    
  };


  

            

  handleChange=(event)=>{
    const target=event.target;
    const name=target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    });

  };

  submit = (event)=>{
    console.log("button clicked");
    //event.preventDefault();
    const payload={
     
      c_id: custid,
      body: document.getElementById('body').value,
      location:document.getElementById('location').value,
      profession:document.getElementById('profession').value,
      price:document.getElementById('price').value,
      phoneNo:this.state.phoneNo,
    email:this.state.email,
    name:this.state.name
     
    };

    axios({
      url:`${heroku.baseurl}api/available`,
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


            window.location.replace('/Home')                         
          }
      })
     
      // this.resetUserInput();
      //this.getBlogPost();
    })
    .catch((error)=>{
      console.log("error while sending data",error);
    });
    

   
  };

  // resetUserInput=()=>{
  //   this.setState({
  //     body:''
     
  //   });
  // };
  // deleteItem(key){
  //   const filteredItems= this.state.items.filter(item => item.key!==key);
  //   this.setState({
  //     items:filteredItems
  //   })

  // }

  

 
  


  render() {
    custid=jwt_decode(document.cookie.split('=')[1]).id;
    console.log('State',this.state);
    return (
      
      
      <div className="Home">
        <NavigationBar />
        <Sidebar />
        <header>
          
          <form onSubmit={this.submit}>
            <div className="form-input">
            <label htmlFor="profession" id='black-text'>
                    Profession :
                </label>
                &nbsp;&nbsp;
                <select name="profession" id="profession" className="dropdown" placeholder='profession'>
                    
                    
                    <option value="carpenter">Carpenter</option>
                    <option value="electrician">Electrician</option>
                    <option value="tutor">Tutor</option>
                    <option value="painter">Painter</option>
                    <option value="driver">Driver</option>
                    <option value="mechanic">Mechanic</option>
                    
                </select>

                <label htmlFor="city" id='black-text'>
                    City :
                </label>
                &nbsp;&nbsp;
                <select name="city" id="location" className="dropdown" placeholder='city'>
                    
                <option value="mumbai">Mumbai</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="delhi">Delhi</option>
                    <option value="chennai">Chennai</option>
                    <option value="vizag">Vizag</option>
                    <option value="banglore">Banglore</option>
                    
                    <option value="ahemdabad">Ahmedabad</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="guwahati">Guwahati</option>
                    
                </select>
                <br></br>
            
         
            </div>

            <div className="form-input">
            <textarea 
            placeholder="Enter body" 
            name="body" 
            cols="70 " 
            rows="10"
            id='body'
         
         >
           
         </textarea>
         <br></br>
         <h id="black-text">Price(Approx) : </h>
         <input id='price'></input>
         
            </div>
            <br></br>
           
            <button type="submit" >Add Post</button>
            
            

          </form>
          {/* <div className="blog-">
            {
              
              this.displayBlogPost(this.state.posts)
            }
          </div> */}
          <ListItems></ListItems>

     </header>

      </div>
     
    )
  }
}

export default Home;



