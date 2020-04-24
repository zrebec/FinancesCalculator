var total = '';
var incoming = false; // Identifies if value is incoming of (default) outgoing
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
var special = ['+', 'undo', 'submit', 'clear'];
var allowedInputs = numbers.concat(special);

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
                    incoming = true;
                } else {
                    document.getElementById('button-plus').className += ' button-plus';
                    incoming = true;
                }
                break;
        default:
            //if total()
            total = total + x;
            display.innerHTML = total;
    }
}