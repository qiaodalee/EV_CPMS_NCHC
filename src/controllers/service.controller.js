import config from '../modules/config.module';
import sql from '../modules/sql.module';

const fs = require('fs');
const xml2js = require('xml2js');
const md5 = require('md5');

const service = (req, res) => {
    if (req.signedCookies.account == undefined || req.signedCookies.password == undefined) {
        return res.redirect('/');
    }
    else {
        let hide = '';
        if (req.signedCookies.is_manager == 'false') {
            hide = 'hidden=true';
        }
        let user_list = [];
        const xml_doc = config.readFile();
        sql.get_data()
            .then(result => {
                let summary = result;
                const charge_point_amount = summary['charge_point_amount'];
                const charge_point_charging_amount = summary['charge_point_charging_amount'];
                const use_ev_amount = summary['use_ev_amount'];
                const charge_point_error_amount = summary['charge_point_error_amount'];
                const charge_point = summary['charge_point'];
                for (let user of xml_doc.cs.normal){
                    user_list.push({'user': user.user, 'is_manager': false});
                }
                for (let user of xml_doc.cs.super) {
                    user_list.push({ 'user': user.super_user, 'is_manager': true });
                }

                res.render(__dirname + '/views/service',
                    {
                        hide,
                        charge_point_amount,
                        charge_point_charging_amount,
                        use_ev_amount,
                        charge_point_error_amount,
                        charge_point,
                        user_list
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({error: 'something got broken'});
            });;
    }
};

const log_out = ((req, res)=>{
    res.clearCookie('account');
    res.clearCookie('password');
    res.clearCookie('is_manager');
    return res.redirect('/');
});

const addUser = ((req, res)=>{
    const xml_doc = config.readFile();
    const new_user = {
        account: JSON.parse(JSON.stringify(req.body)).new_account,
        password: md5(JSON.parse(JSON.stringify(req.body)).new_password).toUpperCase(),
        is_manager: JSON.parse(JSON.stringify(req.body)).options
    }
    if ( new_user.account == undefined ||
         new_user.password == undefined ||
        new_user.is_manager == undefined){
        return res.redirect('./add/failed');
    }
    const user_list = JSON.stringify(xml_doc.cs.normal) + ',' + JSON.stringify(xml_doc.cs.super);
    if (user_list.includes('"user":["' + new_user.account + '"') || user_list.includes('"super_user":["' + new_user.account + '"')) {
        return res.redirect('./add/failed');
    }
    if ( new_user.is_manager == 'false'){
        (xml_doc.cs.normal).push({user: new_user.account, passwd: new_user.password});
    }
    else if (new_user.is_manager == 'true') {
        (xml_doc.cs.super).push({ super_user: new_user.account, super_passwd: new_user.password});
    }
    if (config.writeFile(xml_doc)) return res.redirect('./add/success');
    else return res.redirect('./add/failed');
});

const removeUser = ((req, res)=>{
    const xml_doc = config.readFile();
    const target_user = JSON.parse(JSON.stringify(req.body)).target_account;
    const is_exist = JSON.stringify(xml_doc.cs.normal) + ',' + JSON.stringify(xml_doc.cs.super);
    if (is_exist.includes('"super_user":["' + target_user + '"]')) {
        for (let user of xml_doc.cs.super) {
            if (target_user == user.super_user) {
                xml_doc.cs.super.splice(xml_doc.cs.super.indexOf(user), 1);
                if (config.writeFile(xml_doc)) return res.redirect('./remove/success');
                else return res.redirect('./remove/failed');
            }
        }
    }
    else if (is_exist.includes('"user":["' + target_user + '"]')) {
        for (let user of xml_doc.cs.normal) {
            if (target_user == user.user) {
                xml_doc.cs.normal.splice(xml_doc.cs.normal.indexOf(user), 1);
                if (config.writeFile(xml_doc)) return res.redirect('./remove/success');
                else return res.redirect('./remove/failed');
            }
        }
    }
    else {
        return res.redirect('./remove/failed');
    }
});

const configxml = ((req, res) =>{
    try{
        const xmlContent = config.getXML();
        console.log(xmlContent)

        res.set('Content-Type', 'application/xml');

        res.send(xmlContent);
    }
    catch{
        res.status(500).json({ error: 'something got broken' });
    }
});

const addChargePoint = ((req, res)=>{
    const new_charge_point = {
        MODEL: JSON.parse(JSON.stringify(req.body)).new_model,
        VENDOR: JSON.parse(JSON.stringify(req.body)).new_vendor,
        SERIAL_NUMBER: JSON.parse(JSON.stringify(req.body)).new_serial_number,
        IDTAG: JSON.parse(JSON.stringify(req.body)).new_idtag,
        STATE: 'Unavailable',
        START_TIME: 'NULL',
        CURRENT_METER: 0, 
        CUMULATIVE_METER: 0
    }
    sql.add_charge_point(new_charge_point)
        .then(result =>{
            console.log(result)
            return res.redirect('./add/success');        
        })
        .catch(err =>{
            console.error(err);
            return res.redirect('./add/failed');        
        })
});

const removeChargePoint = ((req, res) => {
    const target_serial_number = JSON.parse(JSON.stringify(req.body)).target_serial_number;
    sql.remove_charge_point(target_serial_number)
        .then(result =>{
            if (result.affectedRows > 0) return res.redirect('./remove/success');
            else return res.redirect('./remove/failed');
        })
        .catch(err =>{
            console.error(err)
            return res.redirect('./remove/success');
        })
});

export default {
    service,
    log_out,
    configxml,
    addUser,
    removeUser,
    addChargePoint,
    removeChargePoint
};
