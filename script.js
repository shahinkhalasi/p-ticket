const allSeats = document.getElementsByClassName('seats');

for(const seat of allSeats){
    seat.addEventListener('click', function(event){

        // selected container
        const selectedContainer = 
            document.getElementById('selected-seats-container');
        // disable button
        event.target.setAttribute('disabled', false);

        // limit selected seats
        const seatSelectedCount = getConvertedValue('seats-left');
        if(seatSelectedCount - 1 < 36 ){
            alert('You have reached your maximum limit!')
            return;
        }
        // change bg color
        event.target.style.backgroundColor = '#1DD100';

        // update selected seats
        const seatCount = getConvertedValue('seats-left');
        document.getElementById('seats-left').innerText = seatCount - 1;


    });
}


function getConvertedValue(id){
    const price = document.getElementById(id).innerText;
    const convertPrice = parseInt(price);
    return convertPrice;
}