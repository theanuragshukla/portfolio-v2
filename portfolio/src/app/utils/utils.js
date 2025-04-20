export const parseDate = (date) => {
  if (!date) return "";
  
  try {
    const now = new Date();
    const parsedDate = new Date(date);
    
    if (isNaN(parsedDate.getTime())) {
      return "";
    }
    
    const diff = now - parsedDate;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 0) {
      return "in the future";
    }
    
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    
    if (seconds < minute) {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    } else if (seconds < hour) {
      const minutes = Math.floor(seconds / minute);
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (seconds < day) {
      const hours = Math.floor(seconds / hour);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (seconds < week) {
      const days = Math.floor(seconds / day);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (seconds < month) {
      const weeks = Math.floor(seconds / week);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (seconds < year) {
      const months = Math.floor(seconds / month);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      const years = Math.floor(seconds / year);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  } catch (error) {
    console.error("Error parsing date:", error);
    return "";
  }
};
