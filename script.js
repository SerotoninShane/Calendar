

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
    static eventsCustom = [];

    static eventsDaily = [
        [['SN','7:00am'],['Wake Up','6:00am']],
        [['M','7:00am'],['Wake Up','7:00am']],
        [['T','7:00am'],['Wake Up','8:00am']],
        [['W','7:00am'],['Wake Up','9:00am']],
        [['TH','7:00am'],['Wake Up','10:00am']],
        [['F','7:00am'],['Wake Up','11:00am']],
        [['S','7:00am'],['Wake Up','12:00pm']]
    ]

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
    static updateInfo() {
        // Update calendar month, date, and year
        Display.change(Display.calendarMonth, this.months[this.month]);
        Display.change(Display.calendarDate, `${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getDate()}${["st", "nd", "rd"][((this.selectedDate.getDate() + 90) % 100 - 10) % 10 - 1] || "th"}`);
        Display.change(Display.calendarYear, this.selectedDate.getFullYear());
        Display.change(Display.calendarEvents, '');

        // Display events for the selected day
        this.eventsDaily[this.selectedDate.getDay()].forEach(events => events.forEach((event, isTime) => {
            Display.update();
            isTime ? Display.calendarEvent.append(createDiv(['time'], event)) : Display.calendarEvents.append(createDiv(['event'], event));
        }));

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
            Display.calendarGrid.append(createDiv(date.setHours(0, 0, 0, 0) == this.selectedDate.setHours(0, 0, 0, 0) ? ['selected', 'day', 'interface', 'Grit'] : ['day', 'interface'], date.getDate()));
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



let numberline = document.querySelector('.numberline');
let eventline = document.querySelector('.eventline');
let pin = document.querySelector('.pin');

for(i = 0; i<=23; i++) {   
    let timestamp = createDiv(['timestamp'],(i>12)?i-12:i||12);
    timestamp.style.background = (i < Calendar.time)? '#000': `linear-gradient(to right, hsl(0,0%,${100-(i+9-Calendar.time)*3}%), hsl(0,0%,${100-(i+10-Calendar.time)*3}%)`;
    timestamp.style.color = (i < Calendar.time)? '#aaa': 'white';
    numberline.append(timestamp);

    let eventstamp = createDiv(['eventstamp', `${(i>11)?i+'PM' : i+'AM'}`],'');
    eventline.append(eventstamp);
    let pin = createDiv(['pin'],'')
    eventstamp.append(pin);
}


const formattedEvents = Calendar.eventsDaily.map(dayEvents => {
    return dayEvents.map(event => {
      const [name, timeString] = event;
      const [hours, minutes] = timeString.split(":");
      const amPm = timeString.slice(-2).toUpperCase();
      document.querySelector("body > section.eventline > div.eventstamp.\\37 AM > div")
      return {
        name,
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        amPm,
      };
    });
  });

  formattedEvents[Calendar.weekDay].forEach((e)=> {
    console.log(document.getElementsByClassName(e.hours + e.amPm)[0])
        document.getElementsByClassName(e.hours + e.amPm)[0].children[0].style.backgroundColor = '#333'
        document.getElementsByClassName(e.hours + e.amPm)[0].children[0].style.borderColor = '#333'
  });

