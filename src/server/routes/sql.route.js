import express, { response } from 'express';
import sql from './../../controllers/sql.controller';

const router = express.Router();

router.get('/chargePoint/all', sql.all_charge_point);

router.get('/chargePoint/errorChargePoint', sql.get_error_charge_point);

router.get('/chargePoint/:id', sql.chargePoint);

router.get('/chargePoint/:id/errorCode=:error_code', sql.set_error_code);

router.get('/chargePoint/:id/state=:state', sql.update_charge_point_state);

router.get('/chargePoint/:id/state=:state/start_time_date=:start_time_date/start_time=:start_time/current_meter=:current_meter/cumulative_meter=:cumulative_meter', sql.update_charge_point_tracnsaction);


export default router;


