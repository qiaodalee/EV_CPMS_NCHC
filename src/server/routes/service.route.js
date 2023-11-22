// article.route.js
import express, { response } from 'express';
import service from '../../controllers/service.controller';
import bodyParser from 'body-parser'
import { Server } from 'socket.io';

const router = express.Router();
router.use(express.static(__dirname + '/public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', service.service);

router.get('/config', (req, res) =>{res.redirect('./')});

router.get('/config/config.xml', service.configxml);

router.get('/log_out', service.log_out);

router.route('/addUser').post(service.addUser);
router.get('/add/success', (req, res)=>{
    res.render(__dirname + '/views/api', {status: 'add success'});
});
router.get('/add/failed', (req, res) => {
    res.render(__dirname + '/views/api', { status: 'add failed' });
});

router.route('/removeUser').post(service.removeUser);
router.get('/remove/success', (req, res) => {
    res.render(__dirname + '/views/api', { status: 'remove success' });
});
router.get('/remove/failed', (req, res) => {
    res.render(__dirname + '/views/api', { status: 'remove failed' });
});

router.route('/addChargePoint').post(service.addChargePoint);

router.route('/removeChargePoint').post(service.removeChargePoint);

export default router;
