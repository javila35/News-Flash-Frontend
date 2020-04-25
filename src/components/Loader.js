import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => {
    return(
        <center><ReactLoading type="spokes" width={100} height={250} color="black" /></center>
    )
};

export default Loader;