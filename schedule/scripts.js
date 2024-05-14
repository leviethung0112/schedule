document.addEventListener('DOMContentLoaded', function() {
    const activityForm = document.getElementById('activityForm');
    const days = document.querySelectorAll('.day');

    // Show the first day by default
    days[0].classList.add('active');

    activityForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const day = document.getElementById('day').value;
        const time = document.getElementById('time').value;
        const ampm = document.getElementById('ampm').value;
        const activity = document.getElementById('activity').value;

        const formattedTime = formatTime(time, ampm);

        addActivityToSchedule(day, formattedTime, activity);

        activityForm.reset();
    });

    function formatTime(time, ampm) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);

        if (ampm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (ampm === 'AM' && hours === 12) {
            hours = 0;
        }

        return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }

    function addActivityToSchedule(day, time, activity) {
        const scheduleTable = document.querySelector(`#${day} .scheduleTable tbody`);
        const newRow = scheduleTable.insertRow();

        const timeCell = newRow.insertCell(0);
        const activityCell = newRow.insertCell(1);

        timeCell.textContent = time;
        activityCell.textContent = activity;
    }

    // Function to handle tab switching
    window.openDay = function(event, dayName) {
        days.forEach(day => day.classList.remove('active'));
        document.getElementById(dayName).classList.add('active');

        // Highlight the active tab
        const tablinks = document.querySelectorAll('.tablink');
        tablinks.forEach(tab => tab.classList.remove('active'));
        event.currentTarget.classList.add('active');
    };
});
