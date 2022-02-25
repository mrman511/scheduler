import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import Appointment from "./appointment";
import "components/Application.scss";
import axios from "axios"



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];



export default function Application(props) {
  const [day, setDay] = useState('Monday')
  const [days, setDays] = useState([]);
  //const dayUrl = '/api/days'

  function SetDay(newDay) {
    setDay(newDay);
  }

  const parsedAppointments = appointments.map(element => (
    <Appointment 
      key={element.id}
      time={element.time}
      interview={element.interview} 
    /> 
    )
  );
  parsedAppointments.push(<Appointment key='last' time="5pm" />)

  useEffect(()=> {
    axios.get('/api/days').then(response => {
      setDays(response.data)
      console.log("response: ",response.data)
    })
  }, [])

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
          <DayList value={ day } days={ days } onChange={ (event) => SetDay(event) }/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"            
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { parsedAppointments }
      </section>
    </main>
  );
}
