import React from 'react';

const Home = (props) => {
    return (
        <div className="container">
            <div className="text-center">
                {props.name ? 'Hi ' + props.name + '!  Welcome to CrowdLinker School '  : 'You are not logged in, Please login to continue'}
            </div>
        </div>
    );
};

export default Home;
