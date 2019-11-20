import React, { Component } from 'react';
import map from 'lodash/map';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.navbarItems = ['Dashboard', 'Appointment', 'Hospital', 'Profile', 'Contact Us']
        this.getNavbarItems = this.getNavbarItems.bind(this);
    }

    getNavbarItems(){
        return map(this.navbarItems, (item)=>{
            if(item === 'Hospital'){
                return(
                    <div className="dropdown navbar-item">
                        <button className="dropdown-btn">{item}
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Configure Hospital</a>
                            <a href="#">Search for Hospital</a>
                        </div>
                    </div>
                )
            }
            return(
                <li className="navbar-item"><a className="navbar-link" >{item}</a></li>
            )
        });
    }
    render () {
        return(
            <div className="header-main navbar">
                {this.getNavbarItems()}
            </div>
        )
    }
}

export default Navbar;
