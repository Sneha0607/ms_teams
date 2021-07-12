import React from 'react';

//THIS PAGE WILL BE DISPLAYED TO THE USERS WHO HAVE NOT SIGNED UP OR SIGNED IN AND ARE TRYING TO JOIN USING A MEETING LINK

const NotSigned = () => {
    return (
        <div style={{ margin: '10vw' }}>
            <h2>Dear user, you are have not Signed up to this website! We highly recommend you to sign up and then retry 
            joining with the same link!</h2>
            <h4><a href='/'>Homepage</a></h4>
            <h4><a href='/signup'>Sign up</a></h4>
            <h4><a href='/signin'>Sign in</a></h4>
        </div>
    )
}

export default NotSigned;