export function getAppointmentsForDay(state, day) {
  const appointments = state.appointments
  
  //filter list out the day whose name is equal to argument "day"
  const foundDay = state.days.find(element => element.name === day);
  if (foundDay) { 
    const appointmentIdArray = foundDay.appointments;
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
      return { student: interview.student, interviewer,}
    }
  }
}


export function getInterviewersForDay(state, day) {
  if (!state.days || state.days.length === 0) { return []; }
  const foundDay = state.days.find(element => element.name === day)
  //get interviews appointments for day
  const interviewers = foundDay.interviewers.map(interviewerId => (state.interviewers[interviewerId]))
  return interviewers;
}

