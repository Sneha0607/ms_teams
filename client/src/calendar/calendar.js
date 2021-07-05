import React from 'react';
import { ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';

const Calendar = () => {
    return (
        <div style={{ marginTop: '10vh', marginLeft: '5vw' }}>
            <ScheduleComponent currentView='Month' >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
        </div>
    )
}

export default Calendar;