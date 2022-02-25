import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/appointment/style.scss"


export default function Appointment(props){
  const { id, time, interview} = props;
  let interviewer = "";
  if (interview) {
    interviewer = props.interview.interviewer.name;
  }
  

  return (
    <article className="appointment">
      <Header time={ time } />
      { !interview  && <Empty /> }
      { interview &&  <Show student={interview.student} interviewer={ interviewer } />}
    </article>
  );
}