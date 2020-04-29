import React from 'react';

function Comment(props) {
    return(
        <div>
            {`${props.idProp}: ${props.comment}`}
        </div>
    )
};

export default Comment;