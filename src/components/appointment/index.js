import React from "react";
import useVisualMode from "components/hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import "components/appointment/style.scss"


export default function Appointment(props){
  const { id, time, interview} = props;
  let interviewer = "";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);
  

  return (
    <article className="appointment">
      <Header time={ time } />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form interviewers={ [] } onCancel={() => back()}/>}
    </article>
  );
}