const selectedSeats = [];
let couponApplied = false;
let seatClickCount = 0;
// apply coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    let discount = 0;
    if (couponCode === 'NEW15') {
        discount = 0.15;
        couponApplied = true;
    } else if (couponCode === 'Couple 20') {
        discount = 0.20;
        couponApplied = true;
    } else {
        couponApplied = false;
    }

    if (couponApplied) {
        updateGrandTotal(discount);
    } else {
        alert('Please enter a valid coupon code.');
    }
}

function updateGrandTotal(discount) {
    const totalCost = getConvertedValue('total-cost');
    const discountedTotal = totalCost * (1 - discount);
    document.getElementById('grand-total').innerText = discountedTotal.toFixed(2);
}

function updateTotalCost(price) {
    const totalCost = getConvertedValue('total-cost');
    const convertedPrice = parseFloat(price);
    const sum = totalCost + convertedPrice;
    document.getElementById('total-cost').innerText = sum.toFixed(2);
}

function getConvertedValue(id) {
    const price = document.getElementById(id).innerText;
    const convertPrice = parseFloat(price);
    return convertPrice;
}

function updateSeatsLeft() {
    const seatsLeft = parseInt(document.getElementById('seats-left').innerText);
    if (seatsLeft > 0) {
        document.getElementById('seats-left').innerText = seatsLeft - 1;
    }
}

function addSeat(seat, price) {
    if (selectedSeats.length >= 4) {
        alert('You can only select up to 4 seats.');
        return;
    }

    if (seatClickCount >= 4) {
        alert('You have already selected 4 seats.');
        return;
    }

    const selectedContainer = document.getElementById('selected-seats-container');

    const div = document.createElement('div');
    div.classList.add('selected-seat');

    const p1 = document.createElement('p');
    p1.innerText = seat;

    const p2 = document.createElement('p');
    p2.innerText = 'AC_Business';

    const p3 = document.createElement('p');
    p3.innerText = price;

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    selectedContainer.appendChild(div);

    selectedSeats.push({ seat, price });

    updateTotalCost(price);
    updateSeatsLeft();
    seatClickCount++;
 // Initial grand total calculation
    if (!couponApplied) {
        updateGrandTotal(0);
    }
}

document.querySelectorAll('.kbd.seats').forEach(seat => {
    seat.addEventListener('click', function() {
        if (seatClickCount < 4) {
            const seatNumber = seat.innerText;
            const seatPrice = document.getElementById('seat-price').innerText;
            // Change seat color
            seat.style.backgroundColor = '#1DD100'; 
            addSeat(seatNumber, seatPrice);
        }
    });
});

document.getElementById('apply-btn').addEventListener('click', applyCoupon);
