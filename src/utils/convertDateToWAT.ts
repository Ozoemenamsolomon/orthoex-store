export function convertDateToWAT(date: Date): Date {
    const isWAT = date.getTimezoneOffset() === -60; 
    if (isWAT) {
      return date;
    } else {
      const watDate = new Date(date);
      watDate.setHours(watDate.getHours() + 1);
      return watDate;
    }
  }