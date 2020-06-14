import React from 'react';
import {register} from './UserFunctions';
import {Button,Form, FormGroup, Input} from "reactstrap"
import {withRouter} from "react-router-dom";

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            first_name:'',
            last_name:'',
            user_name:'',
            email:'',
            password:''
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        const user={
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            user_name:this.state.user_name,
            email:this.state.email,
            password:this.state.password
        }
        register(user).then(res=>{    
            console.log(res);
                    var x=document.getElementById('alert');
                    if(res.err){
                        x.classList.add("alert-danger");    
                        x.innerHTML=res.err;
                        this.props.history.push('/register');
                    }else{
                        alert("Successfully Registered!");
                        this.props.history.push(`/login`);

                    }
                    
             })
    }

    render(){
        return(
            <>
            <center>
            <div className="col-xs-6 col-xs-offset-3" style={{padding:"15px",backgroundColor:"white"}}>
                <h2>Registration</h2>
                <Form onSubmit={this.onSubmit}>
                    <div className="alert" id="alert"></div>
                            <FormGroup>
                                <Input type="text" id="first_name" name="first_name"
                                    value={this.state.first_name}
                                    placeholder="First Name"
                                    onChange={this.onChange} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                
                                <Input type="text" id="last_name" name="last_name"
                                    value={this.state.last_name}
                                    placeholder="Last Name"
                                    onChange={this.onChange}
                                    required />
                            </FormGroup>
			    <FormGroup>
                                <Input type="text" id="user_name" name="user_name"
                                    value={this.state.user_name}
                                    placeholder="User Name"
                                    onChange={this.onChange}
                                    required />
                            </FormGroup>
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
                            <Button type="submit" value="submit" color="primary">Register</Button>
                        </Form>
                    
                
            </div>
            </center>
            </>
        )
    }
}
export default withRouter(Register);