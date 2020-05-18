import React from 'react';
import ArticleBrowser from '../containers/ArticleBrowser';


function Search(props) {
    const query = props.match.params.query;
    let str = `topics/${query}`
    return(
        <ArticleBrowser endpoint={str}/> 
    );
};

export default Search;