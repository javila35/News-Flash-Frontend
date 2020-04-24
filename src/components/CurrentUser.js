import React from 'react';
import { connect } from 'react-redux';

function CurrentUser() {
    return(
        // working on putting user in store, and displaying that user.
        <div>
            <h1>Current User Show</h1>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CurrentUser);