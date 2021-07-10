import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { List, ListItem } from '@material-ui/core';

const Calendar = () => {

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        db.collection('meetings').orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
            setMeetings(snapshot.docs.map(doc => doc.data()))
        });
    })


    
    return(
        <div style={{ marginTop: '15vh', marginLeft: '10vw', marginRight: '10vw', marginBottom: '10vh' }}>
            
        </div>
    )
}

export default Calendar;