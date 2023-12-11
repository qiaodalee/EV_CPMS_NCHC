const ws = new WebSocket('ws://10.103.103.59:443');

const idList = ['add_user', 'remove_user', 'add_charge_point', 'remove_charge_point', 'update_charge_point_state', 'fixed_error_charge_point'];

const error_msg = new Map([
    ['ConnectorLockFailure', 'Failure to lock or unlock the connector.'],
    ['EVCommunicationError', 'Communication failure with the vehicle, might be Mode 3 or other communication protocol problem. This is not a real error in the sense that the Charge Point doesn’t need to go to the faulted state. Instead, it should go to the SuspendedEVSE state.'],
    ['GroundFailure', 'Ground fault circuit interrupter has been activated.'],
    ['HighTemperature', 'Temperature inside Charge Point is too high.'],
    ['InternalError', 'Error in internal hard- or software component.'],
    ['LocalListConflict', 'The authorization information received from the Central System is in conflict with the LocalAuthorizationList.'],
    ['NoError', 'No error to report.'],
    ['OtherError', 'Other type of error. More information in vendorErrorCode.'],
    ['OverCurrentFailure', 'Over current protection device has tripped.'],
    ['OverVoltage', 'Voltage has risen above an acceptable level.'],
    ['PowerMeterFailure', 'Failure to read power meter.'],
    ['PowerSwitchFailure', 'Failure to control power switch.'],
    ['ReaderFailure', 'Failure with idTag reader.'],
    ['ResetFailure', 'Unable to perform a reset.'],
    ['UnderVoltage', 'Voltage has dropped below an acceptable level.'],
    ['WeakSignal', 'Wireless communication device reports a weak signal.']
]);

var charge_point = new Map();

var ws_id = "0"

class Charge_point {
    constructor(model, vendor, serial_number, state, start_time, current_meter, cumulative_meter, error_code) {
        this.model = model
        this.vendor = vendor
        this.serial_number = serial_number
        this.state = state
        this.start_time = start_time
        this.cumulative_meter = cumulative_meter
        this.current_meter = current_meter
        this.error_code = error_code
    }

    update_charge_point(update_data) {
        this.state.innerHTML = update_data.STATE;
        this.start_time.innerHTML = update_data.START_TIME ? update_data.START_TIME : 'null';
        this.cumulative_meter.innerHTML = update_data.CUMULATIVE_METER;
        this.current_meter.innerHTML = update_data.CURRENT_METER;
        this.error_code.innerHTML = update_data.ERROR_CODE;
    }
}
