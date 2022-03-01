import React from "react";
import useVisualMode from "components/hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import axios from "axios";

import "components/appointment/style.scss"
import { useEffect } from "react";


export default function Appointment(props){
  const { id, time, interview, bookInterview, interviewers, deleteAppointment } = props;
  let interviewer = "";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const { mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);
  const deleteMessage = 'Would you like to delete this appointment?';
  const editMessage = 'Confirm your appointment changes!'

  function save(name, interviewer) {
    transition(SAVING);
    const newInterview = {
      student: name,
      interviewer
    };
    
    axios.put(`/api/appointments/${id}`, {interview: newInterview})
    .then(() => transition(SHOW))
    .catch((err) => console.log("ERROR: ", err));

    bookInterview(id, newInterview);
  }
  function onDelete(id){
    transition(CONFIRM);
  }

  function onConfirm(id){
    transition(DELETING);
    axios.delete(`/api/appointments/${id}`)
    .then(() => transition(EMPTY))
    .catch(err => console.log('ERROR: ', err));
  }

  return (
    <article className="appointment">
      <Header time={ time } />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => onDelete(id)}
          />
        )}
        {mode === CREATE && <Form interviewers={ interviewers } onSave = { save } onCancel={() => back()}/>}
        {mode === SAVING && <Status message="SAVING"/>}
        {mode === DELETING && <Status message="DELETING" />}
        {mode === CONFIRM && <Confirm message={deleteMessage} onConfirm={() => onConfirm(id)} onCancel={() => back()}/> }
    </article>
  );
}