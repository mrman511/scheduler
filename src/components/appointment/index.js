import React from "react";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/appointment/style.scss"


export default function Appointment(props){
  const { id, time, interview, bookInterview, interviewers, cancelInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const deleteMessage = 'Would you like to delete this appointment?';

  function save(name, interviewer) {
    transition(SAVING);
    const newInterview = {
      student: name,
      interviewer
    };
    
    bookInterview(id, newInterview)
    .then(() => transition(SHOW))
    .catch(() => {
      transition(ERROR_SAVE);
    } );
  }

  function onDelete(){
    transition(CONFIRM);
  }

  function onConfirm(){
    transition(DELETING);
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch((err) => {
      transition(ERROR_DELETE);
    });
  }

  function onEdit(){
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header time={ time } />
        {mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } />}
        {mode === SHOW && (
          <Show
            student={ interview.student }
            interviewer={ interview.interviewer }
            onDelete={ () => onDelete(id) }
            onEdit={ () => onEdit() }
          />
        )}
        { mode === CREATE && <Form interviewers={ interviewers } onSave = { save } onCancel={ back }/> }
        { mode === SAVING && <Status message="SAVING"/> }
        { mode === DELETING && <Status message="DELETING" /> }
        { mode === CONFIRM && <Confirm message={ deleteMessage } onConfirm={ () => onConfirm() } onCancel={ back }/> }
        { mode === EDIT && <Form interviewers= { interviewers } student={ interview.student } interviewer={ interview.interviewer } onSave = { save } onCancel={ back }/> }
        { mode === ERROR_SAVE && <Error message={ 'Failed to save appointment' }  onClose={ () => transition(CREATE) } /> }
        { mode === ERROR_DELETE && <Error message={ 'Failed to delete appointment' }  onClose={ () => transition(SHOW) } /> }
    </article>
  );
}