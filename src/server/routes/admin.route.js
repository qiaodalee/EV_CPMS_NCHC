// article.route.js
import express, { response } from 'express';
import bodyParser from 'body-parser'
import admin from '../../controllers/admin.controller';

const router = express.Router();
router.use(express.static(__dirname + '/public'));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.route('/').post(admin.adminPost);

export default router;
