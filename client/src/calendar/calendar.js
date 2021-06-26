import React from 'react';
import { EventSettingsModel, ScheduleComponent, Inject, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

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
