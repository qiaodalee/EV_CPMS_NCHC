/*
    Websocket server listen on 443 port
    This server is a proxy between the OCPP server and charge points
*/
const { constants } = require('buffer')
const { error } = require('console')
const express = require('express')
const SocketServer = require('ws').Server

let PORT = 443;
const ocpp = 80;
var server;

server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new SocketServer({ server });

const charge_point_client = new Map();
var ocpp_client = new Map();
const ocpp_id = Math.floor(Math.random() * Math.pow(10, 16)).toString();

function send_to_ocpp(rec_data) {
    console.log("\n[cp]   cp send to ocpp: " + JSON.stringify(rec_data));
    send_massage(rec_data, ocpp_client.get(ocpp_id));
}

function send_to_charge_point(rec_data) {
    console.log("\n[ocpp] ocpp send to cp: " + JSON.stringify(rec_data))
    send_massage(rec_data, charge_point_client.get(rec_data["header"]["des"]))
}

function deconstruct(rec_data, ws) {
    console.log("\n[cp]   cp send to ocpp: " + JSON.stringify(rec_data))
    if (rec_data["header"] == "IDReq") {
        ocpp_client.set(ocpp_id, ws)
        console.log("[ocpp] rec data: " + JSON.stringify(rec_data))
        console.log("[ocpp] ocpp server id: " + ocpp_id)
        console.log("[ws]   send data: " + JSON.stringify({
            header: "IDRes",
            body: { id: ocpp_id }
        }))
        send_massage({
            header: "IDRes",
            body: { id: ocpp_id }
        }, ocpp_client.get(ocpp_id))
        return
    }

    else if (rec_data["header"] == "BootNotification_req") {
        charge_point_client.set(rec_data["body"]["chargePointid"], ws);
        const id = rec_data["body"]["chargePointid"];
        const state = 'Available';
        fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/state=${state}`)
            .then(response => response.json())
            .then(data => {
                let message = {
                    header: {
                        req: "BootNotification_conf",
                        des: rec_data["body"]["chargePointid"]
                    },
                    body: {
                        currentTime: Date.now(),
                        interval: 60,
                        status: "accepted"
                    }
                }
                send_to_charge_point(message);
                try{
                    const cp = JSON.parse(JSON.stringify(data))['charge_point'];
                    message = {
                        header: 'updateReq',
                        charge_point: {
                            MODEL: cp.MODEL,
                            VENDOR: cp.VENDOR,
                            SERIAL_NUMBER: cp.SERIAL_NUMBER,
                            STATE: cp.STATE,
                            START_TIME: cp.START_TIME,
                            CURRENT_METER: cp.CURRENT_METER,
                            CUMULATIVE_METER: cp.CUMULATIVE_METER,
                            ERROR_CODE: cp.ERROR_CODE
                        }    
                    };
                    send_to_ocpp((message));
                }
                catch(error){
                    
                }
            })
            .catch(error => {
                console.error('Error:', error)
                message = {
                    header: {
                        req: "BootNotification_conf",
                        des: rec_data["body"]["chargePointid"]
                    },
                    body: {
                        currentTime: Date.now(),
                        interval: 60,
                        status: "rejected"
                    }
                }
                send_to_charge_point(message);
            });
    }
    else if (rec_data["header"]['req'] == "HeartBeat_req"){
        const id = rec_data['header']['id'];
        fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}`)
            .then(response => response.text())
            .then(data => {
                if (data.STATE == 'Unavailable'){
                    fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/${state}`)
                        .then(response => response.text())
                        .then(data => {
                            if (JSON.parse(data).success == true) {
                                const charge_point = JSON.parse(data)['charge_point'];
                                let message = {
                                    header: 'updateReq',
                                    charge_point: {
                                        MODEL: charge_point.MODEL,
                                        VENDOR: charge_point.VENDOR,
                                        SERIAL_NUMBER: charge_point.SERIAL_NUMBER,
                                        STATE: charge_point.STATE,
                                        START_TIME: charge_point.START_TIME,
                                        CURRENT_METER: charge_point.CURRENT_METER,
                                        CUMULATIVE_METER: charge_point.CUMULATIVE_METER,
                                        ERROR_CODE: charge_point.ERROR_CODE
                                    }
                                }
                                send_to_ocpp((message));
                            }
                        })
                }
                let message = {
                    header: {
                        req: "HeartBeat_conf",
                        des: rec_data["header"]["id"]
                    },
                    body: {
                        currentTime: Date.now()
                    }
                }
                send_to_charge_point(message);
            })
            .catch(err =>{
                console.error(err);
                let message = {
                    header: {
                        req: "HeartBeat_conf",
                        des: rec_data["header"]["id"]
                    },
                    body: {
                        currentTime: Date.now()
                    }
                }
                send_to_charge_point(message);
            })
    }
    else if (rec_data["header"]["req"] == "StatusNotification_req"){
        const id = rec_data["header"]["id"];
        const error_code = rec_data["body"]["errorCode"];
        if(error_code == "NoError"){
		    fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/state=Unavailable`)
		        .then(response => response.text())
		        .then(data => {
		            
		        })
		        .catch(err =>{
		            
		        })
        }
        fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/errorCode=${error_code}`)
            .then(response => response.text())
            .then(data => {
                const charge_point = JSON.parse(data)['charge_point'];
                let message = {
                    header: 'updateReq',
                    charge_point: {
                        MODEL: charge_point.MODEL,
                        VENDOR: charge_point.VENDOR,
                        SERIAL_NUMBER: charge_point.SERIAL_NUMBER,
                        STATE: charge_point.STATE,
                        START_TIME: charge_point.START_TIME,
                        CURRENT_METER: charge_point.CURRENT_METER,
                        CUMULATIVE_METER: charge_point.CUMULATIVE_METER,
                        ERROR_CODE: charge_point.ERROR_CODE
                    }
                }
                send_to_ocpp((message));
                message = {
                    header: {
                        req: "StatusNotification_conf",
                        des: rec_data["header"]["id"]
                    }
                }
                send_to_charge_point(message);
            })
            .catch(err =>{
                console.error(err);
                let message = {
                    header: {
                        req: "StatusNotification_conf",
                        des: rec_data["header"]["id"]
                    }
                }
                send_to_charge_point(message);
            })
    }
    else if (rec_data["header"]["req"] == "StartTransaction_req") {
        const id = rec_data["header"]["id"];
        fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                data = JSON.parse(data)[0];
                if (data.length != 0 && data.IDTAG == rec_data["body"]["chargePointIDTag"]) {
                    if (data.STATE == 'Available' || data.STATE == 'Preparing'){
                        const timestamp = rec_data["body"]["timeStamp"];
                        const date = new Date(timestamp);

                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const seconds = date.getSeconds();

                        const charge_point = {
                            state: 'Charging',
                            meter: 0,
                            start_time_date: `${year}-${month}-${day}`,
                            start_time: `${hours}:${minutes}:${seconds}`,
                            cumulative_meter: rec_data["body"]["meterStart"]
                        }
                        fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/state=${charge_point.state}/start_time_date=${charge_point.start_time_date}/start_time=${charge_point.start_time}/current_meter=${charge_point.meter}/cumulative_meter=${charge_point.cumulative_meter}`)
                            .then(response => response.text())
                            .then(data => {
                                const charge_point = JSON.parse(data)['charge_point'];
                                let message = {
                                    header: 'updateReq',
                                    charge_point: {
                                        MODEL: charge_point.MODEL,
                                        VENDOR: charge_point.VENDOR,
                                        SERIAL_NUMBER: charge_point.SERIAL_NUMBER,
                                        STATE: charge_point.STATE,
                                        START_TIME: charge_point.START_TIME,
                                        CUMULATIVE_METER: charge_point.CUMULATIVE_METER,
                                        CURRENT_METER: charge_point.CURRENT_METER,
                                        ERROR_CODE: charge_point.ERROR_CODE
                                    }
                                }
                                console.log(message);
                                send_to_ocpp(message);
                                message = {
                                    header: {
                                        req: "StartTransaction_conf",
                                        des: rec_data["header"]["id"]
                                    },
                                    body: {
                                        idTagInfo: { status: "accepted" },
                                        transactionId: Math.floor(Math.random() * Math.pow(10, 16)).toString()
                                    }
                                }
                                send_to_charge_point(message);
                            })
                    }
                }
                else{
                    let message = {
                        header: {
                            req: "StartTransaction_conf",
                            des: rec_data["header"]["id"]
                        },
                        body: {
                            idTagInfo: { status: "rejected" },
                            transactionId: Math.floor(Math.random() * Math.pow(10, 16)).toString()
                        }
                    }
                    send_to_charge_point(message);
                }
            })
            .catch(err => {
                console.error(err);
                let message = {
                    header: {
                        req: "StartTransaction_conf",
                        des: rec_data["header"]["id"]
                    },
                    body: {
                        idTagInfo: { status: "rejected" },
                        transactionId: Math.floor(Math.random() * Math.pow(10, 16)).toString()
                    }
                }
                send_to_charge_point(message);
            })        
    }
    else if (rec_data["header"]["req"] == "StopTransaction_req") {
        const id = rec_data["header"]["id"];
        fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}`)
            .then(response => response.text())
            .then(data => {
                data = JSON.parse(data)[0];
                console.log(data);
                if (data.length != 0 && data.IDTAG == rec_data["body"]["chargePointIDTag"] && data.STATE == 'Charging') {
                    const charge_point = {
                        state: 'Finishing',
                        meter: rec_data["body"]["meterStop"] - data.CUMULATIVE_METER,
                        start_time: 'null',
                        cumulative_meter: rec_data["body"]["meterStop"]
                    }
                    fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/state=${charge_point.state}/start_time_date=${charge_point.start_time_date}/start_time=${charge_point.start_time}/current_meter=${charge_point.meter}/cumulative_meter=${charge_point.cumulative_meter}`)
                        .then(response => response.text())
                        .then(data => {
                            const charge_point = JSON.parse(data)['charge_point'];
                            let message = {
                                header: 'updateReq',
                                charge_point: {
                                    MODEL: charge_point.MODEL,
                                    VENDOR: charge_point.VENDOR,
                                    SERIAL_NUMBER: charge_point.SERIAL_NUMBER,
                                    STATE: charge_point.STATE,
                                    START_TIME: charge_point.START_TIME,
                                    CURRENT_METER: charge_point.CURRENT_METER,
                                    CUMULATIVE_METER: charge_point.CUMULATIVE_METER,
                                    ERROR_CODE: charge_point.ERROR_CODE
                                }
                            }
                            send_to_ocpp((message));
                            setTimeout(() => {
                                message = {
                                    header: 'updateReq',
                                    charge_point: {
                                        MODEL: charge_point.MODEL,
                                        VENDOR: charge_point.VENDOR,
                                        SERIAL_NUMBER: charge_point.SERIAL_NUMBER,
                                        STATE: 'Available',
                                        START_TIME: charge_point.START_TIME,
                                        CUMULATIVE_METER: charge_point.CUMULATIVE_METER,
                                        CURRENT_METER: 0,
                                        ERROR_CODE: charge_point.ERROR_CODE
                                    }
                                }
                                send_to_ocpp((message));
                                fetch(`http://127.0.0.1:${ocpp}/sql/chargePoint/${id}/state=Available/start_time_date=null/start_time=null/current_meter=0/cumulative_meter=${charge_point.CUMULATIVE_METER}`)
                                    .then(response => response.text())
                                    .then(data => {
                                    
                                    })
                            }, 5000);
                            message = {
                                header: {
                                    req: "StopTransaction_conf",
                                    des: rec_data["header"]["id"]
                                },
                                body: {
                                    idTagInfo: { status: "accepted" },
                                    transactionId: Math.floor(Math.random() * Math.pow(10, 16)).toString()
                                }
                            }
                            send_to_charge_point(message);
                        })
                }
                else {
                    let message = {
                        header: {
                            req: "StopTransaction_conf",
                            des: rec_data["header"]["id"]
                        },
                        body: {
                            idTagInfo: { status: "accepted" },
                            transactionId: Math.floor(Math.random() * Math.pow(10, 16)).toString()
                        }
                    }
                    send_to_charge_point(message);
                }
            })
            .catch(err =>{
                console.error(err);
                let message = {
                    header: {
                        req: "StopTransaction_conf",
                        des: rec_data["header"]["id"]
                    },
                    body: {
                        idTagInfo: { status: "rejected" },
                        transactionId: Math.floor(Math.random() * Math.pow(10, 16)).toString()
                    }
                }
                send_to_charge_point(message);
            })
    }
}


function rec_message(rec_data, ws) {
    deconstruct(JSON.parse(rec_data), ws)
    return
}

function send_massage(send_data, ws) {
    try {
        data = JSON.stringify(send_data);
        console.log((data));
        ws.send(data);
    }
    catch (e) {
        console.log(e)
    }
    return
}

wss.on('connection', (ws, req) => {

    console.log('[ws]   Client connected: ', req.socket.remoteAddress)

    ws.on('message', (rec_data) => {
        rec_message(rec_data, ws)
    })

    ws.on('close', () => {
        console.log('[ws]   Client close connected')
    })
})
