import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

    renderNav() {
        const token = localStorage.getItem("token");
        return(
            <>
                <button className="closebtn" onClick={() => this.closeNav()}>&times;</button> 
                {token ?  null : this.showLogin()}
                <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li className="article-li"><Link to="/top_articles">Top US Articles</Link></li>
                        <li className="article-li"><Link to="/tech_articles">Technology</Link></li>
                        <li className="article-li"><Link to="/health_articles">Health</Link></li>
                        <li className="article-li"><Link to="/business_articles">Business</Link></li>
                        <li className="article-li"><Link to="/sports_articles">Sports</Link></li>
                        {token ? <li><Link to={`/users/${this.props.user.user.username}`}>My Account</Link></li> : null}
                        {token ? null : <li><Link to={'/sign-up'}>Sign Up</Link></li>}
                        <li><Link to="/users/">Users</Link></li>
                        {token ? <li><Link to="/" onClick={() => this.showLogout()}>Log Out</Link></li> : null}
                        <form onSubmit={e => this.search(e)}>
                            <input type="text" name="query"></input>
                            <input type="submit" value="Search Headlines"></input>
                        </form>
                </ul>
            </>
        );
    };
    
    search(e) {
        const query = e.target.query.value;
        const {history} = this.props;
        e.preventDefault();
        e.persist();
        history.push(`/search/${query}`)
    };

    showLogin = () => {
        return <Login />;
    };

    showLogout = () => {
        localStorage.removeItem("token");
        this.props.removeCurrentUser();
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
        user: state.user,
        show: state.nav.show
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showNavigation: (boolean) => dispatch(changeNavigationShow(boolean)),
        removeCurrentUser: () => dispatch(removeCurrentUser())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));