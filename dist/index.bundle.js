/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n/* config.js */\n\n\n// require and configure dotenv, will load vars in .env in PROCESS.ENV\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\n// 建立每個變數 joi 驗證規則\nconst envVarSchema = joi__WEBPACK_IMPORTED_MODULE_0___default().object().keys({\n  NODE_ENV: joi__WEBPACK_IMPORTED_MODULE_0___default().string().default('development').allow('development', 'production'),\n  // 字串且預設值為development 並只允許兩種參數\n  PORT: joi__WEBPACK_IMPORTED_MODULE_0___default().number().default(8080),\n  // 數字且預設值為 8080\n  VERSION: joi__WEBPACK_IMPORTED_MODULE_0___default().string(),\n  // 字串\n  MYSQL_PORT: joi__WEBPACK_IMPORTED_MODULE_0___default().number().default(3306),\n  //數字且預設值為3306\n  MYSQL_HOST: joi__WEBPACK_IMPORTED_MODULE_0___default().string().default('127.0.0.1'),\n  //字串取預設值為127.0.0.1\n  MYSQL_USER: joi__WEBPACK_IMPORTED_MODULE_0___default().string(),\n  // 字串\n  MYSQL_PASS: joi__WEBPACK_IMPORTED_MODULE_0___default().string(),\n  // 字串\n  MYSQL_NAME: joi__WEBPACK_IMPORTED_MODULE_0___default().string() // 字串\n}).unknown().required();\n\n// process.env 撈取 .env 內的變數做 joi 驗證\nconst {\n  error,\n  value: envVars\n} = envVarSchema.validate(process.env);\nif (error) {\n  throw new Error(`Config validation error: ${error.message}`);\n}\nconst config = {\n  version: envVars.VERSION,\n  // 版本\n  env: envVars.NODE_ENV,\n  // 開發模式\n  port: envVars.PORT,\n  // 阜號\n  mysqlPort: envVars.MYSQL_PORT,\n  // 連接阜號(MYSQL_PORT)\n  mysqlHost: envVars.MYSQL_HOST,\n  // 主機名稱 (MYSQL_HOST)\n  mysqlUserName: envVars.MYSQL_USER,\n  // 用戶名稱 (MYSQL_USER)\n  mysqlPass: envVars.MYSQL_PASS,\n  // 資料庫密碼(MYSQL_PASS)\n  mysqlDatabase: envVars.MYSQL_DATABASE // 資料庫名稱(MYSQL_DATABASE)\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config); // 匯出共用\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/config/config.js?");

/***/ }),

/***/ "./src/config/express.js":
/*!*******************************!*\
  !*** ./src/config/express.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _server_routes_index_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../server/routes/index.route */ \"./src/server/routes/index.route.js\");\n/* harmony import */ var _server_routes_service_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../server/routes/service.route */ \"./src/server/routes/service.route.js\");\n/* harmony import */ var _server_routes_admin_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../server/routes/admin.route */ \"./src/server/routes/admin.route.js\");\n/* harmony import */ var _server_routes_sql_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../server/routes/sql.route */ \"./src/server/routes/sql.route.js\");\n/* express.js */\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use((req, res, next) => {\n  const now = new Date();\n  const currentHour = now.getHours();\n  const currentMinute = now.getMinutes();\n  const currentSecond = now.getSeconds();\n  console.log(`${currentHour}:${currentMinute}:${currentSecond}` + ' GMT+0800 (台北標準時間): ' + req.method + \" \" + req.url);\n  next();\n});\n\n/* GET home page. */\napp.use('/', _server_routes_index_route__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\napp.use('/admin', _server_routes_admin_route__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\napp.use('/service', _server_routes_service_route__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\napp.use('/sql', _server_routes_sql_route__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/config/express.js?");

/***/ }),

/***/ "./src/controllers/admin.controller.js":
/*!*********************************************!*\
  !*** ./src/controllers/admin.controller.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _modules_config_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/config.module */ \"./src/modules/config.module.js\");\n\nconst parseString = (__webpack_require__(/*! xml2js */ \"xml2js\").parseString);\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst md5 = __webpack_require__(/*! md5 */ \"md5\");\nconst adminPost = (req, res) => {\n  let admin_key = new Map();\n  const xmlContent = _modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getXML();\n  parseString(xmlContent, (err, result) => {\n    if (!!err) return console.error(err.toString());\n    let xml_doc = JSON.stringify(result, null, 2);\n    xml_doc = JSON.parse(xml_doc);\n    let user_list = xml_doc['cs']['normal'];\n    for (let user of user_list) {\n      const second = {\n        password: user['passwd'][0],\n        is_manager: false\n      };\n      admin_key[user['user']] = second;\n    }\n    let super_user_list = xml_doc['cs']['super'];\n    for (let user of super_user_list) {\n      const second = {\n        password: user['super_passwd'][0],\n        is_manager: true\n      };\n      admin_key[user['super_user']] = second;\n    }\n  });\n  const admin = {\n    account: JSON.parse(JSON.stringify(req.body)).account,\n    password: JSON.parse(JSON.stringify(req.body)).password\n  };\n  console.log(admin);\n  console.log(md5(admin.password).toUpperCase());\n  if (admin.account == \"\" || admin.account == \"\") {\n    return res.redirect('/');\n  } else if (admin_key[admin.account] == undefined) {\n    console.log(admin_key[admin.account]);\n    return res.redirect('/');\n  } else if (admin_key[admin.account].password != md5(admin.password).toUpperCase()) {\n    return res.redirect('/');\n  }\n  res.cookie('account', admin.account, {\n    path: '/service',\n    signed: true\n  }); //set cookie\n  res.cookie('password', admin.password, {\n    path: '/service',\n    signed: true\n  }); //set cookie\n  res.cookie('is_manager', admin_key[admin.account].is_manager, {\n    path: '/service',\n    signed: true\n  }); //set cookie\n  return res.redirect('/service');\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  adminPost\n});\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/controllers/admin.controller.js?");

/***/ }),

/***/ "./src/controllers/errorHandler.controller.js":
/*!****************************************************!*\
  !*** ./src/controllers/errorHandler.controller.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction NotFoundError(message) {\n  this.message = message;\n  this.name = \"NotFoundError\";\n}\nfunction NotUpdateError(message) {\n  this.message = message;\n  this.name = \"NotUpdateError\";\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  NotFoundError,\n  NotUpdateError\n});\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/controllers/errorHandler.controller.js?");

/***/ }),

/***/ "./src/controllers/service.controller.js":
/*!***********************************************!*\
  !*** ./src/controllers/service.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _modules_config_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/config.module */ \"./src/modules/config.module.js\");\n/* harmony import */ var _modules_sql_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/sql.module */ \"./src/modules/sql.module.js\");\n\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\nconst md5 = __webpack_require__(/*! md5 */ \"md5\");\nconst service = (req, res) => {\n  if (req.signedCookies.account == undefined || req.signedCookies.password == undefined) {\n    return res.redirect('/');\n  } else {\n    let hide = '';\n    if (req.signedCookies.is_manager == 'false') {\n      hide = 'hidden=true';\n    }\n    let user_list = [];\n    const xml_doc = _modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].readFile();\n    _modules_sql_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get_data().then(result => {\n      let summary = result;\n      const charge_point_amount = summary['charge_point_amount'];\n      const charge_point_charging_amount = summary['charge_point_charging_amount'];\n      const use_ev_amount = summary['use_ev_amount'];\n      const charge_point_error_amount = summary['charge_point_error_amount'];\n      const charge_point = summary['charge_point'];\n      for (let user of xml_doc.cs.normal) {\n        user_list.push({\n          'user': user.user,\n          'is_manager': false\n        });\n      }\n      for (let user of xml_doc.cs.super) {\n        user_list.push({\n          'user': user.super_user,\n          'is_manager': true\n        });\n      }\n      res.render(__dirname + '/views/service', {\n        hide,\n        charge_point_amount,\n        charge_point_charging_amount,\n        use_ev_amount,\n        charge_point_error_amount,\n        charge_point,\n        user_list\n      });\n    }).catch(error => {\n      console.error('Error:', error);\n      res.status(500).json({\n        error: 'something got broken'\n      });\n    });\n    ;\n  }\n};\nconst log_out = (req, res) => {\n  res.clearCookie('account');\n  res.clearCookie('password');\n  res.clearCookie('is_manager');\n  return res.redirect('/');\n};\nconst addUser = (req, res) => {\n  const xml_doc = _modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].readFile();\n  const new_user = {\n    account: JSON.parse(JSON.stringify(req.body)).new_account,\n    password: md5(JSON.parse(JSON.stringify(req.body)).new_password).toUpperCase(),\n    is_manager: JSON.parse(JSON.stringify(req.body)).options\n  };\n  if (new_user.account == undefined || new_user.password == undefined || new_user.is_manager == undefined) {\n    return res.redirect('./add/failed');\n  }\n  const user_list = JSON.stringify(xml_doc.cs.normal) + ',' + JSON.stringify(xml_doc.cs.super);\n  if (user_list.includes('\"user\":[\"' + new_user.account + '\"') || user_list.includes('\"super_user\":[\"' + new_user.account + '\"')) {\n    return res.redirect('./add/failed');\n  }\n  if (new_user.is_manager == 'false') {\n    xml_doc.cs.normal.push({\n      user: new_user.account,\n      passwd: new_user.password\n    });\n  } else if (new_user.is_manager == 'true') {\n    xml_doc.cs.super.push({\n      super_user: new_user.account,\n      super_passwd: new_user.password\n    });\n  }\n  if (_modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].writeFile(xml_doc)) return res.redirect('./add/success');else return res.redirect('./add/failed');\n};\nconst removeUser = (req, res) => {\n  const xml_doc = _modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].readFile();\n  const target_user = JSON.parse(JSON.stringify(req.body)).target_account;\n  const is_exist = JSON.stringify(xml_doc.cs.normal) + ',' + JSON.stringify(xml_doc.cs.super);\n  if (is_exist.includes('\"super_user\":[\"' + target_user + '\"]')) {\n    for (let user of xml_doc.cs.super) {\n      if (target_user == user.super_user) {\n        xml_doc.cs.super.splice(xml_doc.cs.super.indexOf(user), 1);\n        if (_modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].writeFile(xml_doc)) return res.redirect('./remove/success');else return res.redirect('./remove/failed');\n      }\n    }\n  } else if (is_exist.includes('\"user\":[\"' + target_user + '\"]')) {\n    for (let user of xml_doc.cs.normal) {\n      if (target_user == user.user) {\n        xml_doc.cs.normal.splice(xml_doc.cs.normal.indexOf(user), 1);\n        if (_modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].writeFile(xml_doc)) return res.redirect('./remove/success');else return res.redirect('./remove/failed');\n      }\n    }\n  } else {\n    return res.redirect('./remove/failed');\n  }\n};\nconst configxml = (req, res) => {\n  try {\n    const xmlContent = _modules_config_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getXML();\n    console.log(xmlContent);\n    res.set('Content-Type', 'application/xml');\n    res.send(xmlContent);\n  } catch {\n    res.status(500).json({\n      error: 'something got broken'\n    });\n  }\n};\nconst addChargePoint = (req, res) => {\n  const new_charge_point = {\n    MODEL: JSON.parse(JSON.stringify(req.body)).new_model,\n    VENDOR: JSON.parse(JSON.stringify(req.body)).new_vendor,\n    SERIAL_NUMBER: JSON.parse(JSON.stringify(req.body)).new_serial_number,\n    IDTAG: JSON.parse(JSON.stringify(req.body)).new_idtag,\n    STATE: 'Unavailable',\n    START_TIME: 'NULL',\n    CURRENT_METER: 0,\n    CUMULATIVE_METER: 0\n  };\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].add_charge_point(new_charge_point).then(result => {\n    console.log(result);\n    return res.redirect('./add/success');\n  }).catch(err => {\n    console.error(err);\n    return res.redirect('./add/failed');\n  });\n};\nconst removeChargePoint = (req, res) => {\n  const target_serial_number = JSON.parse(JSON.stringify(req.body)).target_serial_number;\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove_charge_point(target_serial_number).then(result => {\n    if (result.affectedRows > 0) return res.redirect('./remove/success');else return res.redirect('./remove/failed');\n  }).catch(err => {\n    console.error(err);\n    return res.redirect('./remove/success');\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  service,\n  log_out,\n  configxml,\n  addUser,\n  removeUser,\n  addChargePoint,\n  removeChargePoint\n});\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/controllers/service.controller.js?");

/***/ }),

/***/ "./src/controllers/sql.controller.js":
/*!*******************************************!*\
  !*** ./src/controllers/sql.controller.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../modules/sql.module */ \"./src/modules/sql.module.js\");\n/* harmony import */ var _errorHandler_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorHandler.controller */ \"./src/controllers/errorHandler.controller.js\");\n\n\nconst all_charge_point = (req, res) => {\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get_all_charge_point().then(result => {\n    res.json(result);\n  }).catch(err => {\n    console.log(err);\n    res.status(500).json({\n      error: err\n    });\n  });\n};\nconst chargePoint = (req, res) => {\n  const id = req.params.id;\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get_charge_point_serial_number(id).then(result => {\n    res.json(result);\n  }).catch(err => {\n    console.log(err);\n    res.status(500).json({\n      error: err\n    });\n  });\n};\nconst update_charge_point_state = (req, res) => {\n  const id = req.params.id;\n  const updateStateValue = req.params.state;\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update_charge_point_state(id, updateStateValue).then(result => {\n    if (result == 'success') {\n      _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get_charge_point_serial_number(id).then(result => {\n        res.json({\n          charge_point: result[0]\n        });\n      });\n    } else {\n      throw new _errorHandler_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].NotUpdateError('Target charge point not update');\n    }\n  }).catch(err => {\n    console.error(err);\n    res.status(500).json({\n      error: err\n    });\n  });\n};\nconst set_error_code = (req, res) => {\n  const id = req.params.id;\n  const error_code = req.params.error_code;\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set_error_code(id, error_code).then(result => {\n    _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get_charge_point_serial_number(id).then(result => {\n      res.json({\n        charge_point: result[0]\n      });\n    });\n  }).catch(err => {\n    console.error(err);\n    res.status(500).json({\n      error: err\n    });\n  });\n};\nconst get_error_charge_point = (req, res) => {\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get_error_charge_point().then(result => {\n    res.json(result[0]);\n  }).catch(err => {\n    console.error(err);\n    res.status(500).json({\n      error: err\n    });\n  });\n};\nconst update_charge_point_tracnsaction = (req, res) => {\n  const id = req.params.id;\n  const state = req.params.state;\n  const start_time_date = req.params.start_time_date;\n  const start_time = req.params.start_time;\n  const current_meter = req.params.current_meter;\n  const cumulative_meter = req.params.cumulative_meter;\n  _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update_charge_point_tracnsaction(id, state, start_time_date, start_time, current_meter, cumulative_meter).then(result => {\n    if (result != 'success') {\n      throw new _errorHandler_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].NotUpdateError('Target charge point not update');\n    }\n    _modules_sql_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get_charge_point_serial_number(id).then(result => {\n      res.json({\n        charge_point: JSON.parse(JSON.stringify(result[0]))\n      });\n    });\n  }).catch(err => {\n    console.error(err);\n    res.status(500).json({\n      error: err\n    });\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  all_charge_point,\n  chargePoint,\n  update_charge_point_state,\n  update_charge_point_tracnsaction,\n  set_error_code,\n  get_error_charge_point\n});\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/controllers/sql.controller.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/config */ \"./src/config/config.js\");\n/* harmony import */ var _config_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/express */ \"./src/config/express.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nif (!module.parent) {\n  // listen on port config.port\n  _config_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port, () => {\n    console.log(`server started on  port http://127.0.0.1:${_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port} (${_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env})`);\n  });\n  _config_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"].set('view engine', 'ejs');\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_config_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/index.js?");

/***/ }),

/***/ "./src/modules/config.module.js":
/*!**************************************!*\
  !*** ./src/modules/config.module.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst xml2js = __webpack_require__(/*! xml2js */ \"xml2js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst file_path = './src/config/config.xml';\nvar parser = new xml2js.Parser();\nfunction getXML() {\n  const xmlFilePath = './src/config/config.xml';\n  return fs.readFileSync(xmlFilePath, 'utf-8');\n}\nfunction readFile() {\n  let xml_doc = fs.readFileSync(file_path, {\n    encoding: 'utf8'\n  }, (err, data) => {\n    if (!!err) return console.error(err.toString());\n  });\n  parser.parseString(xml_doc, (err, result) => {\n    if (!!err) return console.error(err.toString());\n    xml_doc = JSON.parse(JSON.stringify(result));\n  });\n  return xml_doc;\n}\nfunction writeFile(xml_doc) {\n  const xml = new xml2js.Builder().buildObject(xml_doc);\n  fs.writeFile(file_path, xml, err => {\n    if (err != null) {\n      console.log(err);\n      return false;\n    }\n  });\n  return true;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getXML,\n  readFile,\n  writeFile\n});\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/modules/config.module.js?");

/***/ }),

/***/ "./src/modules/sql.module.js":
/*!***********************************!*\
  !*** ./src/modules/sql.module.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ \"mysql\");\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ \"./src/config/config.js\");\n\n\nconst connection = mysql__WEBPACK_IMPORTED_MODULE_0___default().createPool({\n  // 建立一個連線池\n  connectionLimit: 10,\n  // 限制池子連線人數\n  host: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlHost,\n  // 主機名稱\n  user: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlUserName,\n  // 用戶名稱 \n  password: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlPass,\n  // 資料庫密碼\n  database: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlDatabase // 資料庫名稱\n});\n\nconnection.getConnection((err, connect) => {\n  if (err) {\n    console.log('連線失敗！');\n  } else {\n    console.log(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlDatabase + ' connect success');\n  }\n});\nconst get_data = () => {\n  //SELECT COUNT(*) AS row_count FROM table_name;\n  let charge_point_amount = '';\n  let charge_point_charging_amount = '';\n  let use_ev_amount = '';\n  let charge_point_error_amount = '';\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT COUNT(*) FROM ' + _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlDatabase, (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        charge_point_amount = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];\n        connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = \"charging\"', (err, res, fields) => {\n          if (err) {\n            console.error(err);\n            reject(err);\n          } else {\n            charge_point_charging_amount = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];\n            connection.query('SELECT SUM(CUMULATIVE_METER) FROM charge_point_info; ', (err, res, fields) => {\n              if (err) {\n                console.error(err);\n                reject(err);\n              } else {\n                use_ev_amount = JSON.parse(JSON.stringify(res[0]))['SUM(CUMULATIVE_METER)'];\n                connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = \"error\"', (err, res, fields) => {\n                  if (err) {\n                    console.error(err);\n                    reject(err);\n                  } else {\n                    charge_point_error_amount = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];\n                    connection.query('SELECT * ' + 'FROM charge_point ' + 'INNER JOIN charge_point_info ' + 'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER', (err, res, fields) => {\n                      if (err) {\n                        console.error(err);\n                        reject(err);\n                      } else {\n                        let charge_point = [];\n                        res.forEach(element => {\n                          element = JSON.parse(JSON.stringify(element));\n                          charge_point.push(element);\n                        });\n                        const data = {\n                          'charge_point_amount': charge_point_amount,\n                          'charge_point_charging_amount': charge_point_charging_amount,\n                          'use_ev_amount': use_ev_amount,\n                          'charge_point_error_amount': charge_point_error_amount,\n                          'charge_point': charge_point\n                        };\n                        resolve(data);\n                      }\n                    });\n                  }\n                });\n              }\n            });\n          }\n        });\n      }\n    });\n  });\n};\nconst get_charge_point_amount = () => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT COUNT(*) FROM charge_point', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        const result = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];\n        resolve(result);\n      }\n    });\n  });\n};\nconst get_charge_point_charging_amount = () => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = \"charging\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        const result = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];\n        resolve(result.toString());\n      }\n    });\n  });\n};\nconst get_use_ev_amount = () => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT SUM(CUMULATIVE_METER) FROM charge_point_info; ', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        const result = JSON.parse(JSON.stringify(res[0]))['SUM(CUMULATIVE_METER)'];\n        resolve(result.toString());\n      }\n    });\n  });\n};\nconst get_charge_point_error_amount = () => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT COUNT(*) FROM charge_point_info WHERE state = \"error\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        const result = JSON.parse(JSON.stringify(res[0]))['COUNT(*)'];\n        resolve(result.toString());\n      }\n    });\n  });\n};\nconst get_all_charge_point = () => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT * ' + 'FROM charge_point ' + 'INNER JOIN charge_point_info ' + 'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        let charge_point = [];\n        res.forEach(element => {\n          element = JSON.parse(JSON.stringify(element));\n          charge_point.push(element);\n        });\n        resolve(charge_point);\n      }\n    });\n  });\n};\nconst get_charge_point_serial_number = serial_number => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT * ' + 'FROM charge_point ' + 'INNER JOIN charge_point_info ' + 'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER ' + 'WHERE charge_point.SERIAL_NUMBER = \"' + serial_number + '\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        resolve(res);\n      }\n    });\n  });\n};\nconst get_charge_point_idtag = idtag => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT * ' + 'FROM charge_point ' + 'INNER JOIN charge_point_info ' + 'ON charge_point.SERIAL_NUMBER = charge_point_info.SERIAL_NUMBER ' + 'WHERE charge_point_info.IDTAG = \"' + idtag + '\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        resolve(res);\n      }\n    });\n  });\n};\nconst add_charge_point = new_cp => {\n  return new Promise((resolve, reject) => {\n    let add_cp = 'INSERT INTO charge_point VALUES(\"' + new_cp.MODEL + '\",\"' + new_cp.VENDOR + '\",' + parseInt(new_cp.SERIAL_NUMBER) + ');';\n    connection.query(add_cp, (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      }\n    });\n    add_cp = 'INSERT INTO charge_point_info VALUES(\"' + new_cp.STATE + '\",NULL,' + parseInt(new_cp.CURRENT_METER) + ',' + parseInt(new_cp.CUMULATIVE_METER) + ',' + parseInt(new_cp.SERIAL_NUMBER) + ',\"' + new_cp.IDTAG + '\", \"NoError\");';\n    connection.query(add_cp, (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        resolve(res);\n      }\n    });\n  });\n};\nconst remove_charge_point = target_serial_number => {\n  return new Promise((resolve, reject) => {\n    let remove_cp = 'DELETE FROM charge_point WHERE SERIAL_NUMBER = ' + target_serial_number + ';';\n    connection.query(remove_cp, (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      }\n    });\n    remove_cp = 'DELETE FROM charge_point_INFO WHERE SERIAL_NUMBER = ' + target_serial_number + ';';\n    connection.query(remove_cp, (err, res, fields) => {\n      if (err) {\n        reject(err);\n      } else {\n        resolve(res);\n      }\n    });\n  });\n};\nconst update_charge_point_state = (serial_number, state) => {\n  return new Promise((resolve, reject) => {\n    connection.query('UPDATE charge_point_info ' + 'SET STATE = \"' + state + '\" WHERE charge_point_info.SERIAL_NUMBER = \"' + serial_number + '\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        if (res.changedRows == 0) resolve('failed');else resolve('success');\n      }\n    });\n  });\n};\nconst update_charge_point_tracnsaction = (serial_number, state, start_time_date, start_time, current_meter, cumulative_meter) => {\n  return new Promise((resolve, reject) => {\n    if (start_time_date == 'null' || start_time == 'null') {\n      start_time_date = 'NULL';\n    } else {\n      start_time_date = `\"${start_time_date} ${start_time}\"`;\n    }\n    connection.query('UPDATE charge_point_info ' + `SET STATE = \"${state}\", START_TIME = ${start_time_date}, CURRENT_METER = ${current_meter}, CUMULATIVE_METER = ${cumulative_meter}` + ' WHERE charge_point_info.SERIAL_NUMBER = \"' + serial_number + '\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        if (res.changedRows == 0) resolve('failed');else resolve('success');\n      }\n    });\n  });\n};\nconst set_error_code = (serial_number, error_code) => {\n  return new Promise((resolve, reject) => {\n    connection.query('UPDATE charge_point_info ' + 'SET ERROR_CODE = \"' + error_code + '\" WHERE charge_point_info.SERIAL_NUMBER = \"' + serial_number + '\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        resolve('success');\n      }\n    });\n  });\n};\nconst get_error_charge_point = () => {\n  return new Promise((resolve, reject) => {\n    connection.query('SELECT SERIAL_NUMBER, ERROR_CODE FROM charge_point_info ' + 'WHERE ERROR_CODE != \"NoError\"', (err, res, fields) => {\n      if (err) {\n        console.error(err);\n        reject(err);\n      } else {\n        resolve(res);\n      }\n    });\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  get_charge_point_amount,\n  get_charge_point_charging_amount,\n  get_use_ev_amount,\n  get_charge_point_error_amount,\n  get_data,\n  get_all_charge_point,\n  get_charge_point_serial_number,\n  get_charge_point_idtag,\n  update_charge_point_state,\n  update_charge_point_tracnsaction,\n  add_charge_point,\n  remove_charge_point,\n  set_error_code,\n  get_error_charge_point\n});\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/modules/sql.module.js?");

/***/ }),

/***/ "./src/server/routes/admin.route.js":
/*!******************************************!*\
  !*** ./src/server/routes/admin.route.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _controllers_admin_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controllers/admin.controller */ \"./src/controllers/admin.controller.js\");\n// article.route.js\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](__dirname + '/public'));\nrouter.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().json());\nrouter.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().urlencoded({\n  extended: false\n}));\nrouter.route('/').post(_controllers_admin_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].adminPost);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/server/routes/admin.route.js?");

/***/ }),

/***/ "./src/server/routes/index.route.js":
/*!******************************************!*\
  !*** ./src/server/routes/index.route.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](__dirname + '/public'));\nrouter.use(cookie_parser__WEBPACK_IMPORTED_MODULE_1___default()('123456789'));\n\n/* GET localhost:[port]/api page. */\nrouter.get('/', (req, res) => {\n  res.render(__dirname + '/views/admin');\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/server/routes/index.route.js?");

/***/ }),

/***/ "./src/server/routes/service.route.js":
/*!********************************************!*\
  !*** ./src/server/routes/service.route.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/service.controller */ \"./src/controllers/service.controller.js\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_3__);\n// article.route.js\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](__dirname + '/public'));\nrouter.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json());\nrouter.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().urlencoded({\n  extended: false\n}));\nrouter.get('/', _controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].service);\nrouter.get('/config', (req, res) => {\n  res.redirect('./');\n});\nrouter.get('/config/config.xml', _controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].configxml);\nrouter.get('/log_out', _controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].log_out);\nrouter.route('/addUser').post(_controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addUser);\nrouter.get('/add/success', (req, res) => {\n  res.render(__dirname + '/views/api', {\n    status: 'add success'\n  });\n});\nrouter.get('/add/failed', (req, res) => {\n  res.render(__dirname + '/views/api', {\n    status: 'add failed'\n  });\n});\nrouter.route('/removeUser').post(_controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].removeUser);\nrouter.get('/remove/success', (req, res) => {\n  res.render(__dirname + '/views/api', {\n    status: 'remove success'\n  });\n});\nrouter.get('/remove/failed', (req, res) => {\n  res.render(__dirname + '/views/api', {\n    status: 'remove failed'\n  });\n});\nrouter.route('/addChargePoint').post(_controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addChargePoint);\nrouter.route('/removeChargePoint').post(_controllers_service_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].removeChargePoint);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/server/routes/service.route.js?");

/***/ }),

/***/ "./src/server/routes/sql.route.js":
/*!****************************************!*\
  !*** ./src/server/routes/sql.route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../controllers/sql.controller */ \"./src/controllers/sql.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.get('/chargePoint/all', _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].all_charge_point);\nrouter.get('/chargePoint/errorChargePoint', _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get_error_charge_point);\nrouter.get('/chargePoint/:id', _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].chargePoint);\nrouter.get('/chargePoint/:id/errorCode=:error_code', _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].set_error_code);\nrouter.get('/chargePoint/:id/state=:state', _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update_charge_point_state);\nrouter.get('/chargePoint/:id/state=:state/start_time_date=:start_time_date/start_time=:start_time/current_meter=:current_meter/cumulative_meter=:cumulative_meter', _controllers_sql_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update_charge_point_tracnsaction);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://ev_ocpp_by_node/./src/server/routes/sql.route.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("md5");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "xml2js":
/*!*************************!*\
  !*** external "xml2js" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("xml2js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;