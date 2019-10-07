import React, { Component } from 'react';
// import HospitalMain from '../lifecare-component/cards/hospitalmain/hospitalmain.component.js';
import $ from 'jquery';
// import _ from 'lodash';
// import './lifecare-container.css';
// import SearchInput, {createFilter} from 'react-search-input';
// import logo from '../lifecarelogo.png'
// import Footer from '../lifecare-component/footer/footer.component';
// import AdminComponent from '../lifecare-component/cards/admin/AdminComponent';
// import Login from '../lifecare-component/cards/login/login';
// import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        username: '',
        password: '',
        // loginSuccess:false
    }
    this.inputOnChange=this.inputOnChange.bind(this);
    this.getEncodedString=this.getEncodedString.bind(this);
  }

  getEncodedString(value) {
    return typeof value === 'string' ? window.btoa(value) : value;
  }

  onSignin(){
      const {username, password} = this.state;
    const login = {
        username: this.getEncodedString(username),
        password: this.getEncodedString(password),
    }
    $.ajax({
        type: 'POST',
        data:login,
        dataType:'json',
        url: 'http://localhost:8282/login',
           success: (data)=> {
             this.props.onSignin(data.loginSuccess);
           },
        error: function(error) {
          if(error.loginSuccess === 'false') this.props.onSignin(error.loginSuccess)
          else alert('error post data...');
        }
      });
    }

    inputOnChange(e, type){
      if(e) {
        this.setState({[type]:e.target.value});
      }
    }

 render () {
     const {username, password} = this.state;
      return (
        <div className="container well">
            <div className="form-group">
                <label for="username">Username</label>
                <input 
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e)=>this.inputOnChange(e, 'username')}
                    id="username"
                    placeholder="Username"/>
            </div>
            <div className="form-group">
                <label for="inputPassword">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e)=>this.inputOnChange(e, 'password')}
                    placeholder="Password"/>
            </div>
            <div className="form-group">
                <label className="form-check-label"><input type="checkbox"/> Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary"  onClick={()=>this.onSignin(username, password)}>Sign in</button>
        </div>
      );
    }
}

export default Login;
