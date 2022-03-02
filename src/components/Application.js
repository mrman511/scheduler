import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import Appointment from "./appointment";
import "components/Application.scss";
import axios from "axios"
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "./hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(appointment => {
    const interviewers = getInterviewersForDay(state, state.day);
    const interview = getInterview(state, appointment.interview);
    return (<Appointment 
      key={ appointment.id}
      id={ appointment.id}
      time={ appointment.time}
      bookInterview={ bookInterview }
      interview={ interview }
      interviewers= { interviewers}
      cancelInterview = { cancelInterview }
    /> )
   }
  );
  dailyAppointments.push(<Appointment key="last" time="5pm" />)

  


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList value={ state.day } days={ state.days } onChange={ setDay }/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"            
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { dailyAppointments }
      </section>
    </main>
  );
}
