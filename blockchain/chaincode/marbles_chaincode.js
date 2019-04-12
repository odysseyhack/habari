"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var shim = require('fabric-shim');
var util = require('util');
var Chaincode = /** @class */ (function () {
    function Chaincode() {
    }
    Chaincode.prototype.Init = function (stub) {
        return __awaiter(this, void 0, void 0, function () {
            var functionAndParameters;
            return __generator(this, function (_a) {
                functionAndParameters = stub.getFunctionAndParameters();
                console.info(functionAndParameters);
                console.info('=========== Instantiated MIMEA Chaincode ===========');
                console.info('=========== Running Chaincode in TypeScript ===========');
                return [2 /*return*/, shim.success()];
            });
        });
    };
    Chaincode.prototype.Invoke = function (stub) {
        return __awaiter(this, void 0, void 0, function () {
            var functionAndParameters, payload, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.info("Transaction ID: " + stub.getTxID());
                        console.info(util.format('Args: %j', stub.getArgs()));
                        functionAndParameters = stub.getFunctionAndParameters();
                        console.info(functionAndParameters);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 20, , 21]);
                        _a = functionAndParameters.fcn;
                        switch (_a) {
                            case 'createMarble': return [3 /*break*/, 2];
                            case 'readMarble': return [3 /*break*/, 4];
                            case 'deleteMarble': return [3 /*break*/, 6];
                            case 'transferMarble': return [3 /*break*/, 8];
                            case 'getMarblesByRange': return [3 /*break*/, 10];
                            case 'getMarbles': return [3 /*break*/, 12];
                            case 'getAllResults': return [3 /*break*/, 14];
                            case 'getQueryResult': return [3 /*break*/, 16];
                        }
                        return [3 /*break*/, 18];
                    case 2: return [4 /*yield*/, this.createMarble(stub, functionAndParameters.params)];
                    case 3:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 4: return [4 /*yield*/, this.readMarble(stub, functionAndParameters.params)];
                    case 5:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 6: return [4 /*yield*/, this.deleteMarble(stub, functionAndParameters.params)];
                    case 7:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 8: return [4 /*yield*/, this.transferMarble(stub, functionAndParameters.params)];
                    case 9:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 10: return [4 /*yield*/, this.getMarblesByRange(stub, functionAndParameters.params)];
                    case 11:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 12: return [4 /*yield*/, this.getMarbles(stub, functionAndParameters.params)];
                    case 13:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 14: return [4 /*yield*/, this.getAllResults(stub, functionAndParameters.params)];
                    case 15:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 16: return [4 /*yield*/, this.getQueryResult(stub, functionAndParameters.params)];
                    case 17:
                        payload = _b.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        {
                            console.log('no function of name:' + functionAndParameters.fcn + ' found');
                            return [2 /*return*/, shim.error('Received unknown function ' + functionAndParameters.fcn + ' invocation')];
                        }
                        _b.label = 19;
                    case 19: return [2 /*return*/, shim.success(payload)];
                    case 20:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, shim.error(error_1)];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    Chaincode.prototype.createMarble = function (stub, args) {
        return __awaiter(this, void 0, void 0, function () {
            var marble, marbleState, indexName, colorNameIndexKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args.length !== 4) {
                            throw new Error('Incorrect number of arguments. Expecting 4');
                        }
                        // ==== Input sanitation ====
                        console.info('--- start init marble ---');
                        args.forEach(function (arg, index) {
                            if (arg.length <= 0) {
                                throw new Error("argument " + index + " is not a non-empty string");
                            }
                        });
                        marble = {
                            docType: 'marble',
                            name: args[0],
                            color: args[1].toLowerCase(),
                            size: parseInt(args[2]),
                            owner: args[3].toLowerCase()
                        };
                        if (typeof marble.size !== 'number') {
                            throw new Error('3rd argument must be a numeric string');
                        }
                        return [4 /*yield*/, stub.getState(marble.name)];
                    case 1:
                        marbleState = _a.sent();
                        if (marbleState.toString()) {
                            throw new Error("Marble \"" + marble.name + "\" already exists");
                        }
                        // === Put marble as a JSON string in a buffer and save the marble to state ===
                        return [4 /*yield*/, stub.putState(marble.name, Buffer.from(JSON.stringify(marble)))];
                    case 2:
                        // === Put marble as a JSON string in a buffer and save the marble to state ===
                        _a.sent();
                        indexName = 'color~name';
                        return [4 /*yield*/, stub.createCompositeKey(indexName, [marble.color, marble.name])];
                    case 3:
                        colorNameIndexKey = _a.sent();
                        console.info(colorNameIndexKey);
                        //  Note - Passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
                        return [4 /*yield*/, stub.putState(colorNameIndexKey, Buffer.from('\u0000'))];
                    case 4:
                        //  Note - Passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
                        _a.sent();
                        // ==== Marble saved and indexed. Return success ====
                        console.info('- end init marble');
                        return [2 /*return*/, Buffer.from(JSON.stringify(marble))];
                }
            });
        });
    };
    Chaincode.prototype.readMarble = function (stub, args) {
        return __awaiter(this, void 0, void 0, function () {
            var marbleName, marbleAsbytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args.length !== 1) {
                            throw new Error('Incorrect number of arguments. Expecting name of the marble to query');
                        }
                        marbleName = args[0];
                        if (!marbleName) {
                            throw new Error(' marble name must not be empty');
                        }
                        return [4 /*yield*/, stub.getState(marbleName)];
                    case 1:
                        marbleAsbytes = _a.sent();
                        if (!marbleAsbytes.toString()) {
                            throw new Error("Marble does not exist: " + marbleName);
                        }
                        return [2 /*return*/, marbleAsbytes];
                }
            });
        });
    };
    Chaincode.prototype.deleteMarble = function (stub, args) {
        return __awaiter(this, void 0, void 0, function () {
            var marbleName, valAsbytes, marbleJSON, indexName, colorNameIndexKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args.length !== 1) {
                            throw new Error('Incorrect number of arguments. Expecting name of the marble to delete.');
                        }
                        marbleName = args[0];
                        if (!marbleName) {
                            throw new Error('Marble name must not be empty.');
                        }
                        return [4 /*yield*/, stub.getState(marbleName)];
                    case 1:
                        valAsbytes = _a.sent();
                        if (!valAsbytes) {
                            throw new Error("Marble \"" + marbleName + "\" does not exist.");
                        }
                        try {
                            marbleJSON = JSON.parse(valAsbytes.toString());
                        }
                        catch (err) {
                            throw new Error('Failed to decode JSON of: ' + marbleName + '. Error message: ' + err.message);
                        }
                        return [4 /*yield*/, stub.deleteState(marbleName)];
                    case 2:
                        _a.sent(); // remove the marble from Chaincode state
                        indexName = 'color~name';
                        colorNameIndexKey = stub.createCompositeKey(indexName, [marbleJSON.color, marbleJSON.name]);
                        if (!colorNameIndexKey) {
                            throw new Error('Failed to create the createCompositeKey');
                        }
                        //  Delete index entry to state.
                        return [4 /*yield*/, stub.deleteState(colorNameIndexKey)];
                    case 3:
                        //  Delete index entry to state.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Chaincode.prototype.transferMarble = function (stub, args) {
        return __awaiter(this, void 0, void 0, function () {
            var marbleName, newOwner, marbleAsBytes, marbleToTransfer, marbleJSONAsBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args.length !== 2) {
                            throw new Error('Incorrect number of arguments. Expecting marbleName and owner');
                        }
                        marbleName = args[0];
                        newOwner = args[1].toLowerCase();
                        console.info('- start transferMarble ', marbleName, newOwner);
                        return [4 /*yield*/, stub.getState(marbleName)];
                    case 1:
                        marbleAsBytes = _a.sent();
                        if (!marbleAsBytes || !marbleAsBytes.toString()) {
                            throw new Error('marble does not exist');
                        }
                        try {
                            marbleToTransfer = JSON.parse(marbleAsBytes.toString()); // unMarshal
                        }
                        catch (err) {
                            throw new Error("Failed to decode JSON of: " + marbleName + ". Reason: " + err.message);
                        }
                        marbleToTransfer.owner = newOwner; // change owner
                        console.info(marbleToTransfer);
                        marbleJSONAsBytes = Buffer.from(JSON.stringify(marbleToTransfer));
                        return [4 /*yield*/, stub.putState(marbleToTransfer.name, marbleJSONAsBytes)];
                    case 2:
                        _a.sent(); // Rewrite the marble
                        console.info('- end transferMarble (success)');
                        return [2 /*return*/, marbleJSONAsBytes];
                }
            });
        });
    };
    // ===========================================================================================
    // getMarblesByRange performs a range query based on the start and end keys provided.
    //
    // Read-only function results are not typically submitted to ordering. If the read-only
    // results are submitted to ordering, or if the query is used in an update transaction
    // and submitted to ordering, then the committing peers will re-execute to guarantee that
    // result sets are stable between endorsement time and commit time. The transaction is
    // invalidated by the committing peers if the result set has changed between endorsement
    // time and commit time.
    // Therefore, range queries are a safe option for performing update transactions based on query results.
    // ===========================================================================================
    Chaincode.prototype.getMarblesByRange = function (stub, args) {
        return __awaiter(this, void 0, void 0, function () {
            var startKey, endKey, resultsIterator, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args.length !== 2) {
                            throw new Error('Incorrect number of arguments. Expecting two arguments');
                        }
                        startKey = args[0];
                        endKey = args[1];
                        return [4 /*yield*/, stub.getStateByRange(startKey, endKey)];
                    case 1:
                        resultsIterator = _a.sent();
                        return [4 /*yield*/, this.getAllResults(resultsIterator, false)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, Buffer.from(JSON.stringify(results))];
                }
            });
        });
    };
    // ===== Example: Ad hoc rich query ========================================================
    // queryMarbles uses a query string to perform a query for marbles.
    // Query string matching state database syntax is passed in and executed as is.
    // Supports ad hoc queries that can be defined at runtime by the client.
    // If this is not desired, follow the queryMarblesForOwner example for parameterized queries.
    // Only available on state databases that support rich query (e.g. CouchDB)
    // =========================================================================================
    Chaincode.prototype.getMarbles = function (stub, args) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args.length !== 1) {
                            throw new Error('Incorrect number of arguments. Expecting queryObject');
                        }
                        try {
                            queryObject = JSON.parse(args[0]);
                        }
                        catch (err) {
                            throw new Error("Failed to decode JSON of queryObject: " + args[0] + ". Reason: " + err.message);
                        }
                        return [4 /*yield*/, this.getQueryResult(stub, queryObject)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Chaincode.prototype.getAllResults = function (iterator, isHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var results, result, jsonResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, iterator.next()];
                    case 2:
                        result = _a.sent();
                        if (result.value && result.value.value.toString()) {
                            jsonResponse = {
                                TxId: '',
                                Timestamp: 0,
                                IsDeleted: '',
                                Value: '',
                                Key: '',
                                Record: ''
                            };
                            console.log(result.value.value.toString('utf8'));
                            if (isHistory && isHistory === true) {
                                jsonResponse.TxId = result.value.tx_id;
                                jsonResponse.Timestamp = result.value.timestamp;
                                jsonResponse.IsDeleted = result.value.is_delete.toString();
                                try {
                                    jsonResponse.Value = JSON.parse(result.value.value.toString('utf8'));
                                }
                                catch (err) {
                                    console.log(err);
                                    jsonResponse.Value = result.value.value.toString('utf8');
                                }
                            }
                            else {
                                jsonResponse.Key = result.value.key;
                                try {
                                    jsonResponse.Record = JSON.parse(result.value.value.toString('utf8'));
                                }
                                catch (err) {
                                    console.log(err);
                                    jsonResponse.Record = result.value.value.toString('utf8');
                                }
                            }
                            results.push(jsonResponse);
                        }
                        if (!result.done) return [3 /*break*/, 4];
                        console.log('end of data');
                        return [4 /*yield*/, iterator.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, results];
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // =========================================================================================
    // getQueryResult executes the passed in query string.
    // Result set is built and returned as a byte array containing the JSON results.
    // =========================================================================================
    Chaincode.prototype.getQueryResult = function (stub, queryObject) {
        return __awaiter(this, void 0, void 0, function () {
            var resultsIterator, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("- getQueryResult queryObject:\n " + queryObject);
                        return [4 /*yield*/, stub.getQueryResult(JSON.stringify(queryObject))];
                    case 1:
                        resultsIterator = _a.sent();
                        return [4 /*yield*/, this.getAllResults(resultsIterator, false)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, Buffer.from(JSON.stringify(results))];
                }
            });
        });
    };
    return Chaincode;
}());
shim.start(new Chaincode());
