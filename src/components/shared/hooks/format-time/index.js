const FormatTimeHooks = () => {
  const formatSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return { hours, minutes, seconds: secs };
  };

  const formatHours = (item) => {
    const date = new Date(item);
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    
    return `${formattedHour}:${minutes} ${period}`;
  };

  return {
    formatSeconds,
    formatHours,
  };
};

export default FormatTimeHooks;
