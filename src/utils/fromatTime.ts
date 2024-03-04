export function formatAMPM(timeString: string): string {
    const defaultDate: string = "1970-01-01"; // Using an arbitrary date
    const dateTime: Date = new Date(`${defaultDate}T${timeString}`);

    let hours: number = dateTime.getHours();
    let minutes: number | string = dateTime.getMinutes();
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime: string = `${hours}:${minutes}${ampm}`;
    return strTime;
}


