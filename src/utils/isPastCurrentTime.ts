export const isPastCurrentTime = (booking: string) => {
    // console.log(new Date().getTime() > new Date(booking).getTime(), new Date().getTime(),  new Date(booking).getTime())
    return new Date().getTime() > new Date(booking).getTime()  // booking time is past current time
    }