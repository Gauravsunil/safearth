import React from 'react';
import {login} from './UserFunctions';
import {Button,Form, FormGroup, Input} from "reactstrap"
import {withRouter,Link} from "react-router-dom";
import axios from 'axios';

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
//------------------------------------------------------------------------------------------------------------
    onSubmit(e){
        e.preventDefault()
        const user={
            email:this.state.email,
            password:this.state.password
        }
        axios.get(`/users/login/${this.state.email}/${this.state.password}`)
        .then(res=>{    
            console.log(res);
                    var x=document.getElementById('alert');
                    if(res.data.err){
                        x.classList.add("alert-danger");    
                        x.innerHTML=res.data.err;
                        this.props.history.push('/login');
                    }else{
                        alert("Successfully LoggedIn!");
                        this.props.history.push(`/home/${this.state.email}`);

                    }
                    
             })
    }
//----------------------------------------------------------------------------------------------
    render(){
        return(
            <>
            <center>
            <div className="col-xs-4 col-xs-offset-4" style={{padding:"15px",backgroundColor:"white"}}>
                <h2>Log In</h2>
                <Form onSubmit={this.onSubmit}>
                    <div className="alert" id="alert"></div>
                            <FormGroup>
                                <Input type="email" id="email" name="email"
                                    value={this.state.email}
                                    placeholder="Enter Email"
                                    onChange={this.onChange}
                                    required />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" id="password" name="password"
                                      value={this.state.password}
                                      placeholder="Password"
                                      onChange={this.onChange}
                                      required/>
                            </FormGroup>
                            <p>Don't have acoount?<Link to={'/register'}>Register Here</Link></p>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    
                
            </div>
            </center>
            </>
        )
    }
}
export default withRouter(Login);