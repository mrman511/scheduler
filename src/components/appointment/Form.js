import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const { interviewers, onSave, onCancel,} = props;
  const [student, setStudent] =useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || "")
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer("")
  }

  const cancel = () => {
    setError("");
    reset();
    onCancel();
  }

  const selectInterviewer = (name) => {
    setInterviewer(name)
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === ""){
      setError("Please pick an available interviewer")
    } else {
      setError("");
      onSave(student, interviewer);
    }
  }
  //console.log("Interviewer", interviewer)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={ student }
            placeholder="Enter Student Name"
            onChange= { (event) => setStudent(event.target.value) }
            data-testid = { "student-name-input" }
          />
          <section className="appointment__validation">{ error }</section>
        </form>
        <InterviewerList
        interviewers = { interviewers }
        interviewer ={ interviewer }
        onChange ={ selectInterviewer }

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ cancel }>Cancel</Button>
          <Button confirm onClick={ () => validate() }>Save</Button>
        </section>
      </section>
    </main>
  );
}