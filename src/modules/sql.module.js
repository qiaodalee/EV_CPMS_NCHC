import mysql from 'mysql';
import config from '../config/config';

const connection = mysql.createPool({ // 建立一個連線池
    connectionLimit: 10, // 限制池子連線人數
    host: config.mysqlHost, // 主機名稱
    user: config.mysqlUserName, // 用戶名稱 
    password: config.mysqlPass, // 資料庫密碼
    database: config.mysqlDatabase // 資料庫名稱
});

connection.getConnection((err, connect) => {
    if (err) {
        console.log('連線失敗！');
    } else {
        console.log(config.mysqlDatabase + ' connect success');
    }
});

const get_data = (() => {
    //SELECT COUNT(*) AS row_count FROM table_name;
    let charge_point_amount = '';
    let charge_point_charging_amount = '';
    let use_ev_amount = '';
    let charge_point_error_amount = '';
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) FROM ' + config.mysqlDatabase, (err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                charge_point_amount = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];
                connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = "charging"', (err, res, fields) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        charge_point_charging_amount = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];
                        connection.query('SELECT SUM(CUMULATIVE_METER) FROM charge_point_info; ', (err, res, fields) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            } else {
                                use_ev_amount = JSON.parse(JSON.stringify(res[0]))['SUM(CUMULATIVE_METER)'];
                                connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = "error"', (err, res, fields) => {
                                    if (err) {
                                        console.error(err);
                                        reject(err);
                                    } else {
                                        charge_point_error_amount = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];
                                        connection.query('SELECT * ' +
                                            'FROM charge_point ' +
                                            'INNER JOIN charge_point_info ' +
                                            'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER', (err, res, fields) => {
                                                if (err) {
                                                    console.error(err);
                                                    reject(err);
                                                } else {
                                                    let charge_point = [];
                                                    res.forEach(element => {
                                                        element = JSON.parse(JSON.stringify(element));
                                                        charge_point.push(element);
                                                    });
                                                    const data = {
                                                        'charge_point_amount': charge_point_amount,
                                                        'charge_point_charging_amount': charge_point_charging_amount,
                                                        'use_ev_amount': use_ev_amount,
                                                        'charge_point_error_amount': charge_point_error_amount,
                                                        'charge_point': charge_point
                                                    }
                                                    resolve(data);
                                                }
                                            });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
})

const get_charge_point_amount = (() => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) FROM charge_point', (err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const result = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];
                resolve(result);
            }
        });
    });
})

const get_charge_point_charging_amount = (() => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = "charging"', (err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const result = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];
                resolve(result.toString());
            }
        });
    });
});

const get_use_ev_amount = (() => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT SUM(CUMULATIVE_METER) FROM charge_point_info; ', (err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const result = JSON.parse(JSON.stringify(res[0]))['SUM(CUMULATIVE_METER)'];
                resolve(result.toString());
            }
        });
    });
});

const get_charge_point_error_amount = (() => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = "error"', (err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const result = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];
                resolve(result.toString());
            }
        });
    });
});

const get_all_charge_point = (() => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * '+
                        'FROM charge_point '+
                        'INNER JOIN charge_point_info '+
                        'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER', (err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                let charge_point = [];
                res.forEach(element => {
                    element = JSON.parse(JSON.stringify(element));
                    charge_point.push(element);
                });
                resolve(charge_point);
            }
        });
    });
});

const get_charge_point_serial_number = ((serial_number) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * ' +
            'FROM charge_point ' +
            'INNER JOIN charge_point_info ' +
            'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER ' +
            'WHERE charge_point.SERIAL_NUMBER = "' + serial_number +'"', (err, res, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
});

const get_charge_point_idtag = ((idtag) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * ' +
            'FROM charge_point ' +
            'INNER JOIN charge_point_info ' +
            'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER ' +
            'WHERE charge_point_info.IDTAG = "' + idtag + '"', (err, res, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
});

const add_charge_point = ((new_cp) => {
    return new Promise((resolve, reject) => {
        let add_cp = 'INSERT INTO charge_point VALUES("' + new_cp.MODEL + '","' + new_cp.VENDOR + '",' + parseInt(new_cp.SERIAL_NUMBER) + ');'
        connection.query(add_cp, ((err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            }
        })
        ); 
        add_cp = 'INSERT INTO charge_point_info VALUES("' + new_cp.STATE + '",NULL,' + parseInt(new_cp.CURRENT_METER) + ',' + parseInt(new_cp.CUMULATIVE_METER) + ',' + parseInt(new_cp.SERIAL_NUMBER) + ',"' + new_cp.IDTAG + '", "NoError");'
        connection.query(add_cp, ((err, res, fields) => {
                if (err){
                    console.error(err)
                    reject(err);
                }
                else{
                    resolve(res);
                }
            })
        );
    });
});

const remove_charge_point = ((target_serial_number) => {
    return new Promise((resolve, reject) => {
        let remove_cp = 'DELETE FROM charge_point WHERE SERIAL_NUMBER = ' + target_serial_number +';'
        connection.query(remove_cp, ((err, res, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            }
        })
        );
        remove_cp = 'DELETE FROM charge_point_INFO WHERE SERIAL_NUMBER = ' + target_serial_number + ';'
        connection.query(remove_cp, ((err, res, fields) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
        );
    });
});


const update_charge_point_state = ((serial_number, state) =>{
    return new Promise((resolve, reject) => {
        connection.query('UPDATE charge_point_info ' +
            'SET STATE = "' + state +
            '" WHERE charge_point_info.SERIAL_NUMBER = "' + serial_number + '"', (err, res, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    if (res.changedRows == 0) resolve('failed');
                    else resolve('success');
                }
            });
    });
});

const update_charge_point_tracnsaction = ((serial_number, state, start_time_date, start_time, current_meter, cumulative_meter) =>{
    return new Promise((resolve, reject) => {
        if (start_time_date == 'null' || start_time == 'null'){
            start_time_date = 'NULL';
        }
        else{
            start_time_date = `"${start_time_date} ${start_time}"`;
        }
        connection.query('UPDATE charge_point_info ' +
            `SET STATE = "${state}", START_TIME = ${start_time_date}, CURRENT_METER = ${current_meter}, CUMULATIVE_METER = ${cumulative_meter}` +
            ' WHERE charge_point_info.SERIAL_NUMBER = "' + serial_number + '"', (err, res, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    if (res.changedRows == 0) resolve('failed');
                    else resolve('success');
                }
            });
    });
})

const set_error_code = ((serial_number, error_code) =>{
    return new Promise((resolve, reject) => {
        connection.query('UPDATE charge_point_info ' +
            'SET ERROR_CODE = "' + error_code +
            '" WHERE charge_point_info.SERIAL_NUMBER = "' + serial_number + '"', (err, res, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve('success');
                }
            });
    });
})

const get_error_charge_point = (() => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT SERIAL_NUMBER, ERROR_CODE FROM charge_point_info ' +
            'WHERE ERROR_CODE != "NoError"', (err, res, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
})

export default {
    get_charge_point_amount,
    get_charge_point_charging_amount,
    get_use_ev_amount,
    get_charge_point_error_amount,
    get_data,
    get_all_charge_point,
    get_charge_point_serial_number,
    get_charge_point_idtag,
    update_charge_point_state,
    update_charge_point_tracnsaction,
    add_charge_point,
    remove_charge_point,
    set_error_code,
    get_error_charge_point
};
