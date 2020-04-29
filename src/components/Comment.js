import React from 'react';

function Comment(props) {
    const {bookmark_id, comment} = props.comment
    return(
        <div>
            {`${bookmark_id}: ${comment}`}
        </div>
    )
};

export default Comment;