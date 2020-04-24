var total = '';
var incoming = false; // Identifies if value is incoming of (default) outgoing
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
var special = ['+', 'undo', 'submit', 'clear'];
var allowedInputs = numbers.concat(special);

function toggleFullScreen() {
    console.log();
    
    if(document.fullscreen === false) {
        document.body.requestFullscreen();
    } else {
        document.exitFullscreen();
        return;
    }
    
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

    display = document.getElementById('display');
    switch(x) {
        case 'undo':
            // Undo button delete last char
            total = display.innerHTML.substring(0, display.innerHTML.length - 1);
            display.innerHTML = total;
            break;
            case 'submit':
                // Submit button save changes to database

                // Just fake logic yet
                total = '';
                display.innerHTML = 'SAVING...';

                // Incoming set to true after save to database because we want
                // already outgoing then
                incoming = true;
                addNumber('+');

                // Logic for submit
                break;
            case 'clear':
                // Clear button delete total string and set display to default value
                total = '';
                display.innerHTML = '0.00';
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