import React, { Component } from 'react'
import axios from 'axios'
import heroku from '../../variable'
import {Card} from 'react-bootstrap'
import {BsStarFill} from 'react-icons/bs'
import {BsStar} from 'react-icons/bs'
// import {BsArrowLeft} from 'react-icons/bs'
import Sidebarprof from '../dashboard/Sidebarprof';
import NavigationBarprof from '../dashboard/NavigationBarprof';


import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './profile.css'
var idFromProps;

var avg = 0;
var count = 0;
var avgRating = 0;
const jwt = require('jsonwebtoken');
var pID;
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
 
  
class View_feed_prof extends Component{
        constructor(props) {
            super(props)
        
            this.state = {
                p_id:pID,//hardcoded here.
                feedbacks:[],
            }
            
        }
        
       
        
       
            
    
    render(){
        getUserID();
        avgRating = sessionStorage.getItem('avgRating');
        count = sessionStorage.getItem("count");
        avgRating = avgRating/count;
        avgRating = Math.round(avgRating * 10)/10;
        //console.log("average rating" + avgRating);
        //console.log("ifFromProp " + idFromProps + " pops " + this.props.professionalID)
        
        
        return(
            <div className="entire_div_profile">
                
                
                {/* <Dashboard/> */}
                
                
                <div className="side_main_box">
                   
                    
                    <h3>Feedbacks received: {avgRating}</h3>
                    {this.show_cards()}
                </div>
            </div>
        )
    }
    componentDidMount(){
        
        this.get_feedbacks(pID);
        
        

        
        
    }
    get_feedbacks(p_id){
        
        const prof={p_id:p_id};
        //console.log("id is "+p_id);
        
        axios.post(`${heroku.baseurl}app/get_feedback_prof`,{prof})
        .then(Response=>{
            //console.log(Response);
            // j=Response.data;
            this.setState({feedbacks:Response.data})    
        })
        
    }
    
    show_cards(){
        
        var j=this.state.feedbacks;
        //console.log("j is "+j.length);
        if(!(j.length)){            
            return(<div style={{marginLeft:"40%"}}>No Feedbacks yet :(</div>)
        }
        
        return j.map((fdb_json,index)=>{
                
            let l=[]
    let x=fdb_json['rating'];
    avg = avg + parseInt(x);
    
    //console.log("Avg  " + avg +  " x " + x/(index + 1));
    
    sessionStorage.setItem('avgRating',avg);
    sessionStorage.setItem("count",index + 1);
    //avgRating = avg;
    
    //console.log( " index " + index);
    
    let t=fdb_json['review'];
    //console.log("p_rating is "+x+" p_review is "+t);
    // return <h3>{x}-{t}</h3>
    for(let i=0;i<x;i++){
        l.push(<BsStarFill></BsStarFill>)
    }
    for(let i=0;i<5-x;i++){
        l.push(<BsStar></BsStar>)
    }
    return(
        <Card style={{marginTop:"2%",border:"1px solid",boxShadow:"0px 14px 20px rgba(34, 35, 58, 0.2)",marginLeft:"10%",marginRight:"10%" ,color:'black'}}>
            <Card.Body>
                <Card.Title>
                    {l}
                </Card.Title>
                <Card.Subtitle>Rating</Card.Subtitle>
                <Card.Text>
                    <br></br>{t}
                </Card.Text>
            </Card.Body>
        </Card>
    )
    })
    }
}
export default View_feed_prof;