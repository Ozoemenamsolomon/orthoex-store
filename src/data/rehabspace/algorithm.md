# Booking Algorithm

## Initialize Variables:

- **timeSlots**: List of available time slots for the selected day.
- **maxBookingPerSlot**: Maximum allowed bookings for each slot.
- **selectedSlot**: The currently selected slot by the user.
- **isSundayAvailable**: Flag indicating if appointments are available on Sundays.
- **isSaturdayAvailable**: Flag indicating if appointments are available on Saturdays.

## Render UI:

- Display a list of time slots in the UI based on the values in `timeSlots`.
- For each slot in `timeSlots`:
  - Check if the slot appears in the `inactiveSlots` list `maxBookingPerSlot` times or more.
  - If it does, disable the slot in the UI.

## User Interaction:

- When a user selects an active slot in the UI:
  - Check if the selected slot is not disabled.
  - If not disabled:
    - Post the selected slot to the API table.
    - Repeat the process for the next iteration or user interaction.

## Disable Weekends:

- Create a function `isDayDisabled(day)`:
  - Get the day of the week for the given `day`.
  - Disable Sunday if `isSundayAvailable` is false.
  - Disable Saturday if `isSaturdayAvailable` is false.

# Example Usage:

```javascript
const selectedDate = new Date('2024-01-21'); // Replace with your selected date

if (isDayDisabled(selectedDate)) {
  console.log('This day is disabled.');
} else {
  console.log('This day is available.');
}
```
============

# Appointment check-in algorithmn.

On page mount:

Calculate the countdown time by subtracting 48 hours from the appointment's start time.
Determine the updated status based on the current status:
If the current status is 'check-in':
If the countdown time is greater than 0, start countdown.
If the countdown time is less than or equal to 0, set the status to 'checked-in'.
If the current status is 'cancelled' or 'checked-in', keep it as is.

Countdown Timer:
Start a countdown timer that updates every second.
If the countdown time reaches 0 or if the appointment status changes to 'cancelled' or 'checked-in, stop the timer.
Otherwise, continue updating the countdown timer.

Component Rendering:

Display the current status ('check-in', 'cancelled', or 'checked-in').
If the countdown time is greater than 0 and the status is 'check-in', display the countdown timer.
Show a 'Check-in' button that is:
Enabled only if the status is 'check-in'.
Disabled if the status is not 'check-in'.
Clickable to change the status to 'checked-in' when enabled.
Show a 'Cancel' button that is:
Hidden if the countdown time reaches 0 or the status is not 'check-in'.
Clickable to change the status to 'cancelled' when displayed.


