document.addEventListener('DOMContentLoaded', () => {
    const seats = document.querySelectorAll('.seat');
    const checkoutButton = document.getElementById('checkout');

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('reserved')) {
                seat.classList.toggle('selected');
            }
        });
    });

    checkoutButton.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const quality = document.getElementById('quality').value;

        if (selectedSeats.length === 0 || !date || !time || !quality) {
            alert('Please select seats, date, time, and quality.');
            return;
        }

        // Proceed with checkout process
        console.log('Selected Seats:', selectedSeats);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('Quality:', quality);
    });
});