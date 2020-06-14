import React,{Component} from 'react';
//import {timeLog} from './UserFunctions';
import axios from 'axios';
import Header from './Header';
import './homestyle.css';
import {withRouter} from "react-router-dom";

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            email:this.props.email,
            user:null,
            first_name:'',
            task:'',
            project:'',
            start:'',
            end:'',
            timer:null
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleStart=this.handleStart.bind(this);
        this.handleStop=this.handleStop.bind(this);
    }
//--------------------------------------------Fetching user name---------------------------------------
componentDidMount(){
axios.get(`/users/fetch/${this.state.email}`)
.then(res=>{
    console.log("Componentdidmount")
    console.log(res.data);
    this.setState({user:res.data.user_name,first_name:res.data.first_name});
})
.catch(err=>{
    console.log("ERROR");
})
}
//---------------------------------------------------------------------------------------------------------
handleChange(e){
    this.setState({[e.target.name]:e.target.value});
}
//---------------------------------------------------------------------------------------------------------
handleStart(e){
    e.preventDefault();
    var time=0,s=0,m=0,h=0;
    var self=this;
    document.querySelector(".startbtn").disabled=true;
    this.start=setInterval(function(){
        s=s+1;
        if(s%60===0){
            m=m+1;
            s=0;
        }
        if(m%60===0 && m>=1){
            h=h+1;
            m=0;
            s=0;
        }
        var time=h+":"+m+":"+s;
        self.setState({timer:time});
        
    },1000);

}
//-----------------------------------Stoppping timer and saving time log-----------------------------------------------------------
 
handleStop(){
    clearInterval(this.start);
    console.log(this.state);
    const data={
        user:this.state.user,
        task:this.state.task,
        project:this.state.project,
        start:this.state.start,
        end:this.state.end,
        timer:this.state.timer
    }
    axios.post('/users/timelog',data)
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log("err");
    })
    
    this.setState({timer:null});
    document.querySelector(".startbtn").disabled=false;
}

//---------------------------------------------------------------------------------------------------------------------
render(){
        return(<>
    <div className="container">
        <div className="row">
            {(()=>{
                if(this.state.user!=null){
                 return(<>
                  
                    <Header user={this.state.user} email={this.state.email}/>
                        <div className="main">We Welcome {this.state.email}</div>
                            <div className="col-xs-5 col-md-4 col-xs-offset-5 col-md-offset-4 block">
                                
                                <form onSubmit={this.handleStart}>
                                    <div className="form-group">
                                        <label htmlFor="email" >Email</label>
                                        <input type="text" 
                                        name="email" id="email" 
                                        value={this.state.email} 
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" >Task</label>
                                        <input type="text" 
                                        name="task" id="task" 
                                        value={this.state.task} 
                                        onChange={this.handleChange}
                                        className="form-control"
                                        required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="project" >Project</label>
                                        <select className="form-control"
                                        value={this.state.project} 
                                        name="project"
                                        onChange={this.handleChange}
                                        required>
                                            <option id="-1">Select Project</option>
                                            <option id="1" value="E-commerce">E-Commerce Website</option>
                                            <option id="2" value="AI Robot">AI Robot</option>
                                            <option id="3" value="Ultracures App">Ultracures App</option>
                                            <option id="4" value="IOT">IOT</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label htmlFor="start">Start Time</label>
                                            <input type="date" 
                                            value={this.state.start}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            name="start" id="start"
                                            required/>
                                        </div>
                                        <div className="col-xs-6 form-group">
                                            <label htmlFor="end">End Time</label>
                                            <input type="date" 
                                            value={this.state.end}
                                            className="form-control"
                                            onChange={this.handleChange}
                                            name="end" id="end"
                                            required/>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{textAlign:'center'}}>
                                        <label>Start</label><br/>
                                    <button type="submit"
                                     className="fa fa-clock-o btn btn-danger startbtn"
                                     style={{borderRadius:'50%'}}></button>    
                                    </div>
                                </form>
                            
            </div>          
            </>)
                            
                        }
        })()}  
        </div>
           
            <div className="row">
                    {(()=>{

                        if(this.state.timer!=null){
                            return(
                            <div className="col-xs-8 col-xs-offset-2">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Name</th>
                                            <th>Task</th>
                                            <th>Project</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Timer</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="success">
                                            <td>{this.state.user}</td>
                                            <td>{this.state.first_name}</td>
                                            <td>{this.state.task}</td>
                                            <td>{this.state.project}</td>
                                            <td>{this.state.start}</td>
                                            <td>{this.state.end}</td>
                                            <td>{this.state.timer}</td>
                                            <td><a className="btn btn-danger" onClick={this.handleStop}>Stop</a></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            
                            )
                        }
                        
                    })()}
            </div>       
        
        </div>
        </>)
    }
}
 export default withRouter(Home);