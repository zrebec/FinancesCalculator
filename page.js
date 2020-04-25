const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
const special = ['+', 'undo', 'submit', 'clear'];
const truncDecimalPlaces = 2;
const allowedInputs = numbers.concat(special);
var total = '';
var incoming = false; // Identifies if value is incoming of (default) outgoing
var display;

function init () {
    display = document.getElementById('display');
}

function toggleFullScreen() {
    
    if(document.fullscreen === false) {
        document.body.requestFullscreen();
    } else {
        document.exitFullscreen();
        return;
    }
    
}

const truncateByDecimalPlace = (value, numDecimalPlaces) =>
  Math.trunc(value * Math.pow(10, numDecimalPlaces)) / Math.pow(10, numDecimalPlaces)

function resetTotal() {
    total = '';
    display.innerHTML = '0,00';

    // TODO We should also reset income
}

window.addEventListener("keypress", function(e) {
    var x = e.which || e.keyCode;
    var key = String.fromCharCode(x);

    if(numbers.includes(key)) {
        addNumber(key);
    } else if (x === 46 || x === 44) {
        // Pressed dash on numpad or pressed dot
        addNumber(',');
    } else if (x === 43 || x === 45 ) {
        // Pressed + (PLUS) or - (MINUS)
        addNumber('+');
    } else if (x === 117 || x === 85) {
        addNumber('undo');
        // Pressed "u" or "U" as UNDO
    } else if (x === 99 || x === 67) {
        // Pressed "c" or "C" as CLEAR
        addNumber('clear');
    } else if (x === 13) {
        // Pressed ENTER
        addNumber('submit');
    } else {
        console.log('Incorrect key with code ' + x + " where string is " + key);
    }

});

function addNumber(x) {

    // If input value isn't in allowed array, return calc
    if (!allowedInputs.includes(x)) {
        return false;
    }

    switch(x) {
        case 'undo':
            // Undo button delete last char
            total = display.innerHTML.substring(0, display.innerHTML.length - 1);
            display.innerHTML = total;
            break;
            case 'submit':
                // Submit button save changes to database

                // 1. Convert to number and truncate to 2 decimal places
                total = truncateByDecimalPlace(parseFloat(total.replace(',', '.')), truncDecimalPlaces);

                // 2. try convert variable into Number;
                if (typeof total !== 'number' ||  isNaN(total) ) {
                    console.log ('Value ' + total + ' is '+ typeof total +'. It\'s not a valid number');
                    
                    resetTotal();
                    return false;
                }

                // 3. Check if n <> 0 because we don't want saving 0 to database
                if (total === 0 ) {
                    console.log ('Zero number. Skipping save to database');
                    resetTotal();
                    return false;
                }

                // 4. Check if sum is incoming or outgoing
                if (incoming === false) {
                    // This is outgoing value
                    total *= -1;
                }

                // Just fake logic yet
                display.innerHTML = (total < 0 ? 'OUTGOING ' : 'INCOMING') + ' ' + total.toString();
                total = '';

                // Incoming set to true after save to database because we want


                // already outgoing then
                incoming = true;
                addNumber('+');

                // Logic for submit
                return true;
                break;
            case 'clear':
                // Clear button delete total string and set display to default value
                resetTotal();
                break;
            case '+':
                // Incoming instead of default outgoing

                if (incoming === true) {
                    document.getElementById('button-plus').className = 
                        document.getElementById('button-plus').className.replace(' button-plus', '');
                    document.getElementById('display').className = 
                        document.getElementById('display').className.replace('incoming', 'outgoing');
                    incoming = false;
                } else {
                    document.getElementById('button-plus').className += ' button-plus';
                    document.getElementById('display').className = 
                        document.getElementById('display').className.replace('outgoing', 'incoming');
                    incoming = true;
                }
                
                break;
        default:
            // Check if decimal place already existing
            if (x === ',' && total.includes(',')) {
                // Decimal place already exists
                return;
            }

            total = total + x;
            display.innerHTML = total;
    }
}