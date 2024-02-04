3. Date and Time Selection Process
Step 1: Location Selection

The user initiates the booking process by selecting a location. This action triggers the booking modal to appear.
The booking modal is divided into three main columns:
Location Selection: Lists available locations. The user selects one, which sets the context for the subsequent steps.
Date Picker: An interactive calendar for selecting the booking date.
Available Slots: Displays time slots available for the chosen date.
Step 2: Date Picker Interaction

The Date Picker displays dates by month, allowing the user to navigate through months.
It automatically hides holidays, Sundays, and Saturdays, based on the selected location's specific schedule, holidays, and weekend availability.
This dynamic adjustment ensures that users can only pick from dates when the service is operational.
Step 3: Selecting a Date

Upon selecting a date, the app fetches existing booking slots from the server for that specific date and location.
The UI updates to reflect the fetched data, showing available and unavailable (inactive) slots.
Unavailable slots are hidden or marked clearly as inactive, preventing users from selecting them.