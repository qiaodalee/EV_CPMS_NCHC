import express, { response } from 'express';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(express.static(__dirname + '/public'));
router.use(cookieParser('123456789'));

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
    res.render(__dirname + '/views/admin')
});

export default router;
