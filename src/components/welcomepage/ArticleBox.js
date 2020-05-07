import React from 'react';
import { api } from '../../services/api';
import { connect } from 'react-redux'; 

//going to use this to display a few divs on the welcome page with smaller articles views.
function ArticleBox(props) {
    const token = localStorage.getItem("token");

    const bookmarker = () => {
        return (<button className="bookmarker" onClick={() => postBookmark()}>Bookmark</button>)
    };

    const postBookmark = () => {
        const send = {
            user: props.user,
            title: props.details.title,
            link: props.details.url,
            img_url: props.details.urlToImage
        }
        api.bookmarks.postBookmark(send)
    }

    return(

        <div className="div-box">
            <img className="thumbnail" src={props.details.urlToImage} alt={props.details.title}></img>
            <a href={props.details.url}>{props.details.title}</a><br/>
            {token ? bookmarker() : null}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(ArticleBox);