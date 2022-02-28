export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  const appointments = state.appointments
  
  //filter list out the day whose name is equal to argument "day"
  const foundDay = state.days.filter(element => element.name === day);
  if (foundDay[0]) { 
    const appointmentIdArray = foundDay[0].appointments;
    const arrayOfAppointments = [];

    for (let appointment in appointments) {
      if (appointmentIdArray.includes(appointments[appointment].id))
      arrayOfAppointments.push(appointments[appointment]);
    }
    
    return arrayOfAppointments;
  }
  return [];
 }


//returns the an object that incliudes the student (name)
//and the interviewer (object)
export function getInterview(state, interview) {
  if (!interview) { return null; }
  const interviewers = Object.values(state.interviewers);
  for (let interviewer of interviewers) {
    if (interview.interviewer === interviewer.id){
      return {student: interview.student, interviewer,}
    }
  }
}

export function getInterviewersForDay(state, day) {
  if (!state.days || state.days.length === 0) { return []; }
  //get interviews appointments for day
  const interviewers = Object.values(state.interviewers);
  const appointments = getAppointmentsForDay(state, day);
  const interviewersIdArray = [];
  const filteredInterviewers = [];
  
  // get the interviews for those appointments
  appointments.forEach(appointment => {
    if (appointment.interview){
      interviewersIdArray.push(appointment.interview.interviewer)
    } else {
      interviewersIdArray.push(null);
    }
  });
  
  //get the interviewers who(s) id is includes the interviewersIdArray;
  interviewersIdArray.forEach((id) => {
    if (id) {
      for (let interviewer of interviewers) {
        if (interviewersIdArray.includes(interviewer.id)) {
          filteredInterviewers.push(interviewer);
      }
    } 
    
   } else { filteredInterviewers.push(null) }
  })
  
  return filteredInterviewers;
}

