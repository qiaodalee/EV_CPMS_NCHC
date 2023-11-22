import sql from './../modules/sql.module';
import ErrorHandler from './errorHandler.controller';

const all_charge_point = ((req, res) =>{
    sql.get_all_charge_point()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

const chargePoint = ((req, res) =>{
    const id = req.params.id;
    sql.get_charge_point_serial_number(id)
        .then(result =>{
            res.json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({ error: err });
        })
})

const update_charge_point_state = ((req, res) => {
    const id = req.params.id;
    const updateStateValue = req.params.state;
    sql.update_charge_point_state(id, updateStateValue)
        .then(result => {
            if (result == 'success') {
                sql.get_charge_point_serial_number(id)
                    .then(result => {
                        res.json({
                            charge_point: result[0]
                        });
                    })
            }
            else {
                throw new ErrorHandler.NotUpdateError('Target charge point not update');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        })
});

const set_error_code = ((req, res) =>{
    const id = req.params.id;
    const error_code = req.params.error_code;
    sql.set_error_code(id, error_code)
        .then(result =>{
            sql.get_charge_point_serial_number(id)
                .then(result => {
                    res.json({
                        charge_point: result[0]
                    });
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        })
});

const get_error_charge_point = ((req, res) => {
    sql.get_error_charge_point()
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        })
});

const update_charge_point_tracnsaction = ((req, res) =>{
    const id = req.params.id;
    const state = req.params.state;
    const start_time_date = req.params.start_time_date;
    const start_time = req.params.start_time;
    const current_meter = req.params.current_meter;
    const cumulative_meter = req.params.cumulative_meter;

    sql.update_charge_point_tracnsaction(id, state, start_time_date, start_time, current_meter, cumulative_meter)
        .then(result =>{
            if (result!='success'){
                throw new ErrorHandler.NotUpdateError('Target charge point not update');
            }
            sql.get_charge_point_serial_number(id)
                .then(result => {
                    res.json({
                        charge_point: JSON.parse(JSON.stringify(result[0]))
                    });
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        })
});


export default {
    all_charge_point,
    chargePoint,
    update_charge_point_state,
    update_charge_point_tracnsaction,
    set_error_code,
    get_error_charge_point
};
