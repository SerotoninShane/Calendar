# Calendar App README
This JavaScript application provides an interactive calendar with functionalities like navigating through months, selecting dates, and displaying events for each day.
The calendar also visually represents daily events on a timeline.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Classes and Functions](#classes-and-functions)
  - [createDiv Function](#creatediv-function)
  - [Calendar Class](#calendar-class)
  - [UI Class](#ui-class)
  - [Display Class](#display-class)
- [Calendar Functionalities](#calendar-functionalities)
- [Event Handling](#event-handling)
- [User Interface (UI) Interaction](#user-interface-ui-interaction)
- [How to Use](#how-to-use)
- [Example Usage](#example-usage)

## Overview

This JavaScript-based calendar app allows users to navigate through months, select specific dates, and view events associated with each day. It also visually represents a timeline for daily events, providing a comprehensive scheduling interface.

## File Structure

The code contains the following main components:

- **`createDiv` Function**: A utility function to dynamically create HTML `div` elements with specified classes and content.
- **`Calendar` Class**: Handles all functionalities related to the calendar, such as navigating between months, selecting dates, and displaying events.
- **`UI` Class**: Manages user interface interactions and updates the calendar view based on user actions.
- **`Display` Class**: Controls the display elements on the calendar UI and updates them in response to user interactions.
- **Initialization and Event Listeners**: Sets up the calendar display and initializes event listeners for user interactions.

## Classes and Functions

### `createDiv` Function

```javascript
function createDiv(classes, content) {
    const div = document.createElement('div');
    div.classList.add(...classes);
    div.textContent = content;
    return div;
}
```

**Purpose**: A helper function to create a `div` element with specified CSS classes and content.

**Parameters**:
- `classes`: An array of class names to be applied to the `div`.
- `content`: The text content to be added inside the `div`.

### `Calendar` Class

Manages all calendar-related functionalities, including:

**Static Properties**:
- `selectedDate`: Stores the currently selected date.
- `weekDay`, `day`, `month`, `year`, `time`: Various parts of the current date and time.
- `months`: Array of month names.
- `eventsCustom`: Placeholder for custom events.
- `eventsDaily`: Predefined daily events for each day of the week.

**Methods**:
- `selectDay(element)`: Handles the logic when a day is selected on the calendar.
- `nextMonth()`: Navigates to the next month.
- `lastMonth()`: Navigates to the previous month.
- `reset()`: Resets the calendar to the current date.
- `updateInfo()`: Updates calendar information based on the selected date.
- `generate(year, month)`: Generates the calendar grid for the specified month and year.

### `UI` Class

Handles user interface interactions:

**Static Properties**:
- References to various elements in the HTML (e.g., `calendarMonthRight`, `calendarMonthLeft`, `days`, `reset`).

**Methods**:
- `initialize()`: Initializes event listeners for calendar navigation buttons.
- `update()`: Updates UI elements and attaches click event listeners to each day.

### `Display` Class

Handles the display-related functionalities of the calendar:

**Static Properties**:
- References to display elements on the calendar (e.g., `calendarGrid`, `calendarMonth`, `calendarDate`).

**Methods**:
- `change(element, content)`: Updates the content of a specific element.
- `update()`: Updates the internal references to display elements.

## Calendar Functionalities

### Navigation

- **Next Month/Previous Month**: Users can navigate between months using the arrow buttons (`nextMonth` and `lastMonth` methods).
- **Reset to Current Date**: A reset button allows users to return to the current date (`reset` method).

### Date Selection

- Clicking on any day in the calendar selects that day, updates the `selectedDate`, and highlights the selected day (`selectDay` method).

### Event Display

- The calendar displays predefined events for each day. When a day is selected, it updates the events section to show events for that specific day (`updateInfo` method).

## Event Handling

Events are predefined for each day of the week in the `eventsDaily` array. The calendar dynamically displays these events based on the selected date.

## User Interface (UI) Interaction

The user interface is dynamic and updates based on user interactions:

- **Dynamic Generation of Calendar Days**: The `generate` method dynamically generates calendar days and fills in the calendar grid.
- **Event Listeners**: Event listeners are attached to UI elements to handle user interactions, such as navigating through months or selecting a day.

## How to Use

1. **Initialize the Calendar**: The calendar is initialized to the current date when the page loads.
2. **Navigate Between Months**: Use the left and right arrow buttons to navigate between months.
3. **Select a Day**: Click on any day to select it. The selected date will be highlighted, and the events for that day will be displayed.
4. **View Events**: Events for the selected day will be displayed below the calendar grid.
5. **Reset to Today**: Click the reset button to return the calendar to the current date.

## Example Usage

To see this code in action, ensure your HTML has a structure compatible with the class queries and contains the necessary elements (e.g., `.Schedule .day.interface`, `.Schedule .grid`, etc.).

Upon setting up the HTML and JavaScript, the calendar will be interactive, allowing users to view and select dates, navigate between months, and see predefined (SOON TO BE UPDATED) daily events.
