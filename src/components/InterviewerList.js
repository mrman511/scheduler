import React from "react";
import InterveiwerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import { PropTypes } from "prop-types"


function InterviewerList(props) {
  const interviewers = props.interviewers;
  const interviewer = props.interviewer;
  const parsedInterviewers = interviewers.map(element => (
    <InterveiwerListItem 
      key={ element.id }                                                    
      name={ element.name }
      avatar={ element.avatar }
      selected= { (element.id === props.value) }
      setInterviewer = { () => props.onChange(element.id) }
    />))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { parsedInterviewers }
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;