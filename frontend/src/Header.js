import React,{Component} from 'react';
import './HeaderStyle.css';
import {NavLink} from 'react-router-dom' 
class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            email:this.props.email,
            user:this.props.user
        }
    }
    render(){
        return(
            <div className="sidenav">
                <NavLink to={`/home/${this.state.email}`}>Home</NavLink>
                <NavLink to={`/log/${this.state.user}`}>TimeLog</NavLink>
            </div>
        )
    }
}
export default Header;