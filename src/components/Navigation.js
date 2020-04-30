import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeNavigationShow, removeCurrentUser } from '../redux';
import Login from './Login';

class Navigation extends Component {
    openNav = () => {
        document.getElementsByClassName("hidden side-nav")[0].className = "side-nav";
        document.getElementsByClassName("App")[0].style.marginLeft = "250px";
        this.changeState();
    };

    changeState = () => {
        this.props.showNavigation(!this.props.show);
    }

    closeNav = () => {
        document.getElementsByClassName("side-nav")[0].className = "hidden side-nav";
        document.getElementsByClassName("App")[0].style.marginLeft = "0px";
        this.changeState();
    };
    
    showLogin = () => {
        return <Login />;
    };

    showLogout = () => {
        localStorage.removeItem("token");
        this.props.removeCurrentUser();
    }

    renderNav() {
        const token = localStorage.getItem("token");
        return(
            <>   
                <button className="closebtn" onClick={() => this.closeNav()}>&times;</button> 
                {token ? <Link to="/" onClick={() => this.showLogout()}>Log Out</Link> : this.showLogin()}
                <div className="nav-links">
                        <Link to="/">Home</Link><br/>
                        <Link to="/articles">Articles</Link><br/>
                        {token ? <Link to={`/users/${this.props.user}`}>My Account</Link> : null}
                        {token ? null : <Link to={'/sign-up'}>Sign Up</Link>}
                </div>
            </>
        );
    };

    render () {
        return(
        <>
            {this.props.show ? null : <button className="nav-button" onClick={() => this.openNav()}>Menu ☰</button>}
            <div className="hidden side-nav">
                {this.props.show ? this.renderNav() : null}
            </div>
        </>
        );
    };
};

const mapStateToProps = state => {
    return {
        user: state.user.user.username,
        show: state.nav.show
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showNavigation: (boolean) => dispatch(changeNavigationShow(boolean)),
        removeCurrentUser: () => dispatch(removeCurrentUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);