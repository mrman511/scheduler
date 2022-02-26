import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import Appointment from "./appointment";
import "components/Application.scss";
import axios from "axios"
import { getAppointmentsForDay, getInterview} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] =useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

  const setDay = day => {
    setState({...state, day})
    console.log(state.day);
  }

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((results) => {
      setState((prev) => ({
        ...prev,
        days: results[0].data, 
        appointments: results[1].data,
        interviewers: results[2].data
      }))
    })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (<Appointment 
      key={appointment.id}
      {...appointment}
      iterview={interview}
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
