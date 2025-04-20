
//Todo Inspiration
//https://app.uizard.io/templates/XXJOvmKW0jhEyYZdmA7w/preview

// Function to create a new div element with specified classes and content
function createDiv(classes, content) {
    const div = document.createElement('div');
    div.classList.add(...classes);
    div.textContent = content;
    return div;
}

// Calendar class responsible for handling calendar-related functionalities
class Calendar {
    // Static properties to store selected date, month, year, and event data
    static selectedDate = new Date();
    static weekDay = this.selectedDate.getDay();
    static day = this.selectedDate.getDate();
    static month = this.selectedDate.getMonth();
    static year = this.selectedDate.getFullYear();
    static time = this.selectedDate.getHours();
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    static events = [
        { date: '2024-12-25', repeats: true, frequency: 'yearly', color: 'red', events: [['Christmas', '12:00am']] },
        { date: '2024-12-25', repeats: true, frequency: 'yearly', color: 'pink', events: [['Yearly Reminder', '12:00am']] },
        { date: '2024-12-25', repeats: true, frequency: 'yearly', color: null, events: [['Overload Test', '12:00am']] },
        { date: '2024-12-25', repeats: true, frequency: 'yearly', color: null, events: [['Overload Test', '12:00am']] },
        { date: '2024-12-31', repeats: true, frequency: 'yearly', color: 'green', events: [['New Year\'s Eve', '12:00am']] },
        { date: '2024-12-31', repeats: true, frequency: 'daily', color: null, events: [['Daily Reminder', '6:00am']] },
        { date: '2024-12-06', repeats: true, frequency: 'weekly', color: 'gray', events: [['PayDay', '10:00am']] },
        { date: '2024-12-01', repeats: true, frequency: 'monthly', color: 'blue', events: [['Monthly Reminder', '3:00pm']] },
        { date: '2024-01-01', repeats: true, frequency: 'yearly', color: 'orange', events: [['New Year\'s', '12:00am']] }
    ];

    // Method to handle selecting a day on the calendar
    static selectDay(element) {
        // Remove selected class from all days and add it to the clicked day
        UI.days.forEach(day => {
            if (day.classList.contains('selected')) day.classList.remove('selected', 'Grit');
        });
        element.classList.add('selected', 'Grit');
        this.day = parseInt(element.textContent);
        // Update selected date
        this.selectedDate = new Date(this.year, this.month, this.day);
        // If the clicked day belongs to the last month, update selected date accordingly
        if (element.classList.contains('lastMonth')) {
            this.selectedDate = new Date(this.year, this.month - 1, this.day);
            this.lastMonth();
        }
        // Update calendar info based on the selected date
        this.updateInfo();
    }

    // Method to navigate to the next month
    static nextMonth() {
        UI.update();
        UI.days.forEach(day => {
            day.remove();
        });
        this.month++;
        if (this.month > 11) {
            this.month = 0;
            this.year++;
        }
        Calendar.generate(this.year, this.month);
    }

    // Method to navigate to the previous month
    static lastMonth() {
        UI.update();
        UI.days.forEach(day => {
            day.remove();
        });
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }
        Calendar.generate(this.year, this.month);
    }

    // Method to reset calendar to the current date
    static reset() {
        this.selectedDate = new Date();
        this.day = this.selectedDate.getDate();
        this.month = this.selectedDate.getMonth();
        this.year = this.selectedDate.getFullYear();
        UI.update();
        UI.days.forEach(day => {
            day.remove();
        });
        this.generate(this.year, this.month);
    }

    // Method to update calendar information based on selected date
    static getEventsForDate(date) {

        const selectedDateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        return this.events.filter(event => {
                    const [year, month, day] = event.date.split("-");
                    const eventDateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    if (!event.repeats && eventDateString === selectedDateString) return true;
            // Handle repeating events
            if (event.repeats) {
                switch (event.frequency) {
                    case 'daily':
                        return true; // Always matches for daily events
                    case 'weekly':
                        return date.getDay() === parseInt(day - 1) % 7;
                    case 'monthly':
                        return date.getDate() == parseInt(day); // Match the day of the month
                    case 'yearly':
                        return (date.getDate() == parseInt(day) && date.getMonth() + 1 == parseInt(month)); // Match the day and month
                    case 'custom':
                        break;
                }
            }
        
            return false; // No match
        });
    }
    
    
    
    // Method to update calendar information based on selected date
    static updateInfo() {
        // Update calendar month, date, and year
        Display.change(Display.calendarMonth, this.months[this.month]);
        Display.change(Display.calendarDate, `${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getDate()}${["st", "nd", "rd"][((this.selectedDate.getDate() + 90) % 100 - 10) % 10 - 1] || "th"}`);
        Display.change(Display.calendarYear, this.selectedDate.getFullYear());
        Display.change(Display.calendarEvents, ''); // Clear existing events
    
        // Get events for the selected date
        const eventsForDate = this.getEventsForDate(this.selectedDate);
    
        // Append the events to the display
        eventsForDate.forEach(event => {
            event.events.forEach(([eventName, eventTime]) => {
                const eventDiv = createDiv(['event'], eventName);
                eventDiv.append(createDiv(['time'], eventTime));
                Display.calendarEvents.append(eventDiv);
            });
        });
    }


    // Method to generate calendar grid for a specific month
    static generate(year, month) {
        // Update calendar info
        this.updateInfo();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, month, 0).getDate();

        // Generate days for the month
        for (let i = 1; i < lastDayOfMonth + 1; i++) {
            const date = new Date(year, month, i);

            // If the date is the first day of the month, fill in previous month's days
            if (date.getDate() == 1) {
                for (let i = date.getDay() - 1; i > -1; i--) {
                    Display.calendarGrid.append(createDiv(['day', 'interface', 'lastMonth'], lastDayOfLastMonth - i));
                }
            }
            // Append day to calendar grid
        // Create the day element
        const dayDiv = createDiv(
            date.setHours(0, 0, 0, 0) == this.selectedDate.setHours(0, 0, 0, 0)
            ? ['selected', 'day', 'interface', 'Grit']
            : ['day', 'interface'],
            date.getDate()
        );

        const eventsForDay = this.getEventsForDate(date);
        const dotContainer = createDiv(['event-dot-container']);
        // If there are events, create dots
        if (eventsForDay.length > 0) {
            eventsForDay.forEach(event => {
                let eventColor = event.color || 'white';
                if (event.frequency === 'daily') {
                    return;
                }
                event.events.forEach(() => {
                const dot = createDiv(['event-dot']);
                    dot.style.backgroundColor = eventColor;
                    dot.style.border = eventColor === 'white' ? '2px solid black' : 'none'; // Black outline if no color
                    
                // Limit to 3 dots per day
                if (dotContainer.childElementCount < 3) dotContainer.append(dot);

                })
            });
        }

        // Append the day div to the calendar grid
        dayDiv.append(dotContainer);
        Display.calendarGrid.append(dayDiv);
        }
        UI.update();
    }
}

// UI class responsible for handling user interface interactions
class UI {
    static calendarMonthRight = document.querySelector('.Schedule .right.interface');
    static calendarMonthLeft = document.querySelector('.Schedule .left.interface');
    static days = document.querySelectorAll('.Schedule .day.interface');
    static reset = document.querySelector('.Schedule .reset.interface');

    // Method to initialize UI event listeners
    static initialize() {
        this.calendarMonthLeft.addEventListener('click', () => Calendar.lastMonth());
        this.calendarMonthRight.addEventListener('click', () => Calendar.nextMonth());
        this.reset.addEventListener('click', () => Calendar.reset());
    }

    // Method to update UI elements
    static update() {
        this.days = document.querySelectorAll('.Schedule .day.interface');
        this.days.forEach(day => {
            day.addEventListener('click', () => Calendar.selectDay(day));
        });
    }
}

// Display class responsible for handling display-related functionalities
class Display {
    static calendarGrid = document.querySelector('.Schedule .grid');
    static calendarMonth = document.querySelector('.Schedule .month');
    static calendarInfo = document.querySelector('.Schedule .info');
    static calendarDate = document.querySelector('.Schedule .date');
    static calendarYear = document.querySelector('.Schedule .year');
    static calendarEvents = document.querySelector('.Schedule .events');
    static calendarEvent = document.querySelector('.Schedule .events .event:last-child');

    // Method to change content of an element
    static change(element, content) {
        element.textContent = content;
    }

    // Method to update display elements
    static update() {
        this.calendarEvent = document.querySelector('.Schedule .events .event:last-child');
    }
}

// Generate initial calendar for current month
Calendar.generate(Calendar.year, Calendar.month);

// Initialize UI
UI.initialize();