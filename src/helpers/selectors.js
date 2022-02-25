export function getAppointmentsForDay(state, day) {
  const thisDay = state.days.filter(element => element.name === day);
  const appointmentIDs = thisDay[0].appointments;
  const appointments = Object.values(state.appointments);
  const dayAppointments = [];
  for (let appointment of appointments) {
    if (appointmentIDs.includes(appointment.id)){
      dayAppointments.push(appointment);
    }
  }
  return dayAppointments
}
