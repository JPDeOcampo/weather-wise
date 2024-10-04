export const formatHours = (item) =>{
    const hour = new Date(item).getHours();
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; 
    return `${formattedHour}:00 ${period}`;
  }