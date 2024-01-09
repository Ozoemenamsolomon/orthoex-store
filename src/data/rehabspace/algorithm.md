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
