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

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

// console.log("Get Appointments function: ",getAppointmentsForDay(state, "monday"))