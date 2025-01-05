const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long', // e.g., Monday
      year: 'numeric', // e.g., 2025
      month: 'long',   // e.g., January
      day: 'numeric',  // e.g., 4
      hour: '2-digit', // e.g., 01
      minute: '2-digit', // e.g., 05
      second: '2-digit', // e.g., 12
      hour12: false,   // 24-hour format
    });
  };


module.exports = {formatDate}