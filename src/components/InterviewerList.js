import React from "react";
import InterveiwerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import { PropTypes } from "prop-types"


function InterviewerList(props) {
  const interviewers = props.interviewers;
  const interviewer = props.interviewer;
  // 
  console.log(props);
  
  const parsedInterviewers = interviewers.map(element => (
    <InterveiwerListItem 
      key={ element.id }                                                    
      name={ element.name }
      avatar={ element.avatar }
      selected= { (element.id === interviewer.id) }
      setInterviewer = { () => props.onChange(element) }
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