import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeNavigationShow } from '../redux';

const Navigation = () => {

    const closeNav = () => {
        alert("hello.")
    };

    return(
        <div>
            <button onClick={() => closeNav()}>&times;</button>
            <p>These are links.</p>
            <p>These are links.</p>
            <p>These are links.</p>
            <p>These are links.</p>
            <p>These are links.</p>
            <p>These are links.</p>
            <p>These are links.</p>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        show: state.show
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showNavigation: () => dispatch(changeNavigationShow(!this.props.state.show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);