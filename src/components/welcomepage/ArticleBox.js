import React from 'react';

//going to use this to display a few divs on the welcome page with smaller articles views.
function ArticleBox(props) {

    return(
        <div className="div-box">{<p>{props.details.title}</p>}</div>
    )
};

export default ArticleBox;