import React from "react";
import "components/appointment/style.scss"

export default function Appointment(props){
  const time = props.time;

  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : "No Appointments"}
    </article>
  );
}