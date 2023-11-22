function clear_show(id){
    idList.forEach(element => {
        if (element != id && document.getElementById(element).classList.value == 'popup show') {
            document.getElementById(element).classList.toggle('show');
        }
    });
}

function show(id){
    const popup = document.getElementById(id);
    popup.classList.toggle('show');
    clear_show(id);
}

function log_out() {
    document.location.href = "./log_out";
}

function update_charge_point_state(){
    const target_serial_number = document.getElementById('target_serial_number').value;
    const target_state = document.getElementById('target_state').value;
    const popup = document.getElementById('update_charge_point_state');
    popup.classList.toggle('show');    
    fetch("../sql/chargePoint/" + target_serial_number + '/state=' + target_state)
        .then((res) =>{
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) =>{
        	console.log(data.charge_point.SERIAL_NUMBER);
            charge_point[data.charge_point.SERIAL_NUMBER].update_charge_point(data.charge_point);
        })
        .catch((err) =>{
            console.error(err);
        })
}

function update_error_msg(){
    const target_serial_number = document.getElementById('fixed_error').value;
    const display_msg = document.getElementById('error_msg');

    if (target_serial_number != 'null') {
        const target_charge_point = charge_point[target_serial_number].error_code.innerHTML.trim();
        display_msg.value = error_msg.get(target_charge_point);
    }  
    else display_msg.value = '';
}

function fixed_error_charge_point() {
    const target_serial_number = document.getElementById('fixed_error').value;
    if (target_serial_number == 'null') return;
    fetch(`../sql/chargePoint/${target_serial_number}/errorCode=NoError`)
        .then(res =>{
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(data =>{
            const cp = data.charge_point;
            charge_point[cp.SERIAL_NUMBER].update_charge_point(cp);
        })
        .catch(err =>{
            console.error(err);
        })
}
