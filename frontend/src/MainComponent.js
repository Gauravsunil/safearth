import React, { Component } from 'react';
import './App.css';
import Register from './Register.js';
import Login from './Login'
import Home from './Home.js'; 
import TimeLog from './TimeLog.js';
import {Switch,Route,Redirect} from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class MainComponent extends Component {
  
  render() {
     
      const RegisterPage=()=>{
        return(
          <Register />
        )
      }
      const HomePage=({match})=>{
        return(
          <Home email={match.params.email}/>
        )
      }
      
      const LogPage=({match})=>{
        return(
          <TimeLog user={match.params.user}/>
        )
      }

      const LoginPage=()=>{
        return(
          <Login/>
        )
      }
    return (
      <>
      <div >
      <TransitionGroup>
            <CSSTransition  classNames="page" timeout={300}>
        <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/home/:email" component={HomePage}/>
        <Route exact path="/log/:user" component={LogPage}/>

        <Redirect to="/register" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>

      </div>
      </>
    );
  }
  
}


export default MainComponent;
