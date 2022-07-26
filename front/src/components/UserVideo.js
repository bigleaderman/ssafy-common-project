import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../style.js';
import '../color.css';


const UserVideo = (props) => {
    return (
        <div>
            {props.streamManager !== undefined ? (
                <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={props.streamManager} />
                </div>
            ) : null}
        </div>
    );
};

export default UserVideo;
