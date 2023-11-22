import config from '../modules/config.module';

const parseString = require('xml2js').parseString;
const fs = require('fs');
const md5 = require('md5');

const adminPost = (req, res) => {
    let admin_key = new Map();
	const xmlContent = config.getXML();
	parseString(xmlContent, (err, result) => {
	    if (!!err) return console.error(err.toString());
	    let xml_doc = (JSON.stringify(result, null, 2));
	    xml_doc = JSON.parse(xml_doc);
	    let user_list = xml_doc['cs']['normal'];
	    for (let user of user_list){
		const second = {
		    password: user['passwd'][0],
		    is_manager: false
		};
		admin_key[user['user']] = (second);
	    }
	    let super_user_list = xml_doc['cs']['super'];
	    for (let user of super_user_list) {
		const second = {
		    password: user['super_passwd'][0],
		    is_manager: true
		};
		admin_key[user['super_user']] = (second);
	    }
	});
    const admin = {
        account: JSON.parse(JSON.stringify(req.body)).account,
        password: JSON.parse(JSON.stringify(req.body)).password
    };
    console.log(admin);
    console.log(md5(admin.password).toUpperCase());
    if ( admin.account == "" || admin.account == ""){
        return res.redirect('/');
    }
    else if (admin_key[admin.account] == undefined){
        console.log(admin_key[admin.account])
        return res.redirect('/');
    }
    else if (admin_key[admin.account].password != md5(admin.password).toUpperCase()){
        return res.redirect('/');
    }
    res.cookie('account', admin.account, { path: '/service', signed: true });  //set cookie
    res.cookie('password', admin.password, { path: '/service', signed: true }); //set cookie
    res.cookie('is_manager', admin_key[admin.account].is_manager, { path: '/service', signed: true }); //set cookie
    return res.redirect('/service');
};

export default {
    adminPost
};
