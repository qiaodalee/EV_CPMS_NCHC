set_charge_point();

function rec_message(rec_data) {
    /*
        ocpp connect to websocket server
    */
    if (rec_data["header"] == "IDRes") {
        ws_id = rec_data["body"]["id"]
        return null;
    }
    else if (rec_data["header"] == 'updateReq'){
        const update_charge_point_data = rec_data['charge_point'];
        //console.log(update_charge_point_data);
        charge_point[update_charge_point_data.SERIAL_NUMBER].update_charge_point(update_charge_point_data);
        cp_number = document.getElementById('cp_number');
        charging = document.getElementById('charging');
        ev = document.getElementById('ev');
        error_cp = document.getElementById('error_cp');
        fetch('../sql/chargePoint/all')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(cp => {
                //console.log(cp);
                cp_number.value = (cp.length).toString();
                charging.value = '0';
                ev.value = '0';
                error_cp.value = '0';
                cp.forEach(element => {
                    if (element.STATE == 'Charging'){
                        charging.value = (parseInt(charging.value) + 1).toString();
                    } 
                    if (element.ERROR_CODE != 'NoError') {
                        error_cp.value = (parseInt(error_cp.value) + 1).toString();
                    } 
                    ev.value = (parseInt(ev.value) + element.CUMULATIVE_METER).toString();
                });                
            })
            .catch(err => {
                console.error(err);
            })
        return null;
        //{
        //    header: 'updateRes',
        //    body: {
        //        ok: true
        //    }
        //};
    }
}

ws.onmessage = rec_data => {
    rec_data = JSON.parse(rec_data.data)
    try {
        message = rec_message(rec_data)
        if (message != null) send_message(message);
    }
    catch (e) {
        console.log(e.name);
    }
}

