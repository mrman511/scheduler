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
  if (!interview ) { return null; }
  const interviewers = Object.values(state.interviewers);
  for (let interviewer of interviewers) {
    if (interview.interviewer === interviewer.id){
      return {student: interview.student, interviewer,}
    }
  }
}