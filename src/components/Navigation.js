import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeNavigationShow } from '../redux';
import Login from './Login';

class Navigation extends Component {
    openNav = () => {
        document.getElementsByClassName("sideNav")[0].style.width = "250px";
        this.changeState();
    };

    changeState = () => {
        this.props.showNavigation(!this.props.show);
    }

    closeNav = () => {
        document.getElementsByClassName("sideNav")[0].style.width = "0";
        this.changeState();
    };
    
    showLogin = () => {
        return <Login />;
    };

    renderNav() {
        const token = localStorage.getItem("token");
        return(
            <div className="navLinks">   
                <button className="closebtn" onClick={() => this.closeNav()}>&times;</button> 
                {token ? null : this.showLogin()}
                <div className="navLinks">
                    <Router>
                        <Link to="/">Home</Link><br/>
                        <Link to="/articles">Articles</Link><br/>
                    </Router>
                </div>
            </div>
        );
    };

    render () {
        return(
        <div>
            {this.props.show ? null : <button className="navButton" onClick={() => this.openNav()}>☰</button>}
            <div className="sideNav">
                {this.renderNav()}
            </div>
        </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        show: state.nav.show
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showNavigation: (boolean) => dispatch(changeNavigationShow(boolean))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);