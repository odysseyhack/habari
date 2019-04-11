import {Marble} from './models/marble.interface';
import {QueryObject} from './models/queryObject.interface';
import {JsonResponse} from './models/jsonResponse.interface';

const shim = require('fabric-shim');
const util = require('util');

class Chaincode {
  public async Init(stub: any): Promise<any> {
    const functionAndParameters = stub.getFunctionAndParameters();
    console.info(functionAndParameters);
    console.info('=========== Instantiated MIMEA Chaincode ===========');
    console.info('=========== Running Chaincode in TypeScript ===========');

    return shim.success();
  }

  public async Invoke(stub: any): Promise<any> {
    console.info(`Transaction ID: ${stub.getTxID()}`);
    console.info(util.format('Args: %j', stub.getArgs()));

    const functionAndParameters = stub.getFunctionAndParameters();
    console.info(functionAndParameters);

    let payload: any;
    try {
      switch (functionAndParameters.fcn) {
        case 'createMarble':
          payload = await this.createMarble(stub, functionAndParameters.params);
          break;
        case 'readMarble':
          payload = await this.readMarble(stub, functionAndParameters.params);
          break;
        case 'deleteMarble':
          payload = await this.deleteMarble(stub, functionAndParameters.params);
          break;
        case 'transferMarble':
          payload = await this.transferMarble(stub, functionAndParameters.params);
          break;
        case 'getMarblesByRange':
          payload = await this.getMarblesByRange(stub, functionAndParameters.params);
          break;
        case 'getMarbles':
          payload = await this.getMarbles(stub, functionAndParameters.params);
          break;
        case 'getAllResults':
          payload = await this.getAllResults(stub, functionAndParameters.params);
          break;
        case 'getQueryResult':
          payload = await this.getQueryResult(stub, functionAndParameters.params);
          break;
        default: {
          console.log('no function of name:' + functionAndParameters.fcn + ' found');

          return shim.error('Received unknown function ' + functionAndParameters.fcn + ' invocation');
        }
      }

      return shim.success(payload);
    } catch (error) {
      console.log(error);

      return shim.error(error);
    }
  }

  private async createMarble(stub: any, args: string[]): Promise<Buffer> {
    if (args.length !== 4) {
      throw new Error('Incorrect number of arguments. Expecting 4');
    }

    // ==== Input sanitation ====
    console.info('--- start init marble ---');

    args.forEach((arg: string, index: number) => {
      if (arg.length <= 0) {
        throw new Error(`argument ${index} is not a non-empty string`);
      }
    });

    const marble: Marble = {
      docType: 'marble',
      name: args[0],
      color: args[1].toLowerCase(),
      size: parseInt(args[2]),
      owner: args[3].toLowerCase(),
    };

    if (typeof marble.size !== 'number') {
      throw new Error('3rd argument must be a numeric string');
    }

    // ==== Check if marble already exists ====
    const marbleState = await stub.getState(marble.name);
    if (marbleState.toString()) {
      throw new Error(`Marble "${marble.name}" already exists`);
    }

    // === Put marble as a JSON string in a buffer and save the marble to state ===
    await stub.putState(marble.name, Buffer.from(JSON.stringify(marble)));

    // Add the name and color of the new marble to the index 'color~name' index
    const indexName: string = 'color~name';
    const colorNameIndexKey = await stub.createCompositeKey(indexName, [marble.color, marble.name]);
    console.info(colorNameIndexKey);

    //  Note - Passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
    await stub.putState(colorNameIndexKey, Buffer.from('\u0000'));

    // ==== Marble saved and indexed. Return success ====
    console.info('- end init marble');

    return Buffer.from(JSON.stringify(marble));
  }

  private async readMarble(stub: any, args: string[]): Promise<Buffer> {
    if (args.length !== 1) {
      throw new Error('Incorrect number of arguments. Expecting name of the marble to query');
    }

    const marbleName: string = args[0];
    if (!marbleName) {
      throw new Error(' marble name must not be empty');
    }

    const marbleAsbytes: Buffer = await stub.getState(marbleName); // get the marble from Chaincode state
    if (!marbleAsbytes.toString()) {
      throw new Error(`Marble does not exist: ${marbleName}`);
    }

    return marbleAsbytes;
  }

  private async deleteMarble(stub: any, args: string[]): Promise<void> {
    if (args.length !== 1) {
      throw new Error('Incorrect number of arguments. Expecting name of the marble to delete.');
    }

    const marbleName: string = args[0];
    if (!marbleName) {
      throw new Error('Marble name must not be empty.');
    }

    // To maintain the color~name index, we need to read the marble first and get its color
    const valAsbytes: Buffer = await stub.getState(marbleName); // get the marble from Chaincode state
    if (!valAsbytes) {
      throw new Error(`Marble "${marbleName}" does not exist.`);
    }

    let marbleJSON: Marble;

    try {
      marbleJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      throw new Error('Failed to decode JSON of: ' + marbleName + '. Error message: ' + err.message);
    }

    await stub.deleteState(marbleName); // remove the marble from Chaincode state

    // Delete the index
    const indexName: string = 'color~name';
    const colorNameIndexKey: any = stub.createCompositeKey(indexName, [marbleJSON.color, marbleJSON.name]);
    if (!colorNameIndexKey) {
      throw new Error('Failed to create the createCompositeKey');
    }

    //  Delete index entry to state.
    await stub.deleteState(colorNameIndexKey);
  }

  private async transferMarble(stub: any, args: string[]): Promise<Buffer> {
    if (args.length !== 2) {
      throw new Error('Incorrect number of arguments. Expecting marbleName and owner');
    }

    const marbleName: string = args[0];
    const newOwner: string = args[1].toLowerCase();
    console.info('- start transferMarble ', marbleName, newOwner);

    const marbleAsBytes: Buffer = await stub.getState(marbleName);
    if (!marbleAsBytes || !marbleAsBytes.toString()) {
      throw new Error('marble does not exist');
    }

    let marbleToTransfer: Marble;

    try {
      marbleToTransfer = JSON.parse(marbleAsBytes.toString()); // unMarshal
    } catch (err) {
      throw new Error(`Failed to decode JSON of: ${marbleName}. Reason: ${err.message}`);
    }

    marbleToTransfer.owner = newOwner; // change owner
    console.info(marbleToTransfer);

    const marbleJSONAsBytes = Buffer.from(JSON.stringify(marbleToTransfer));
    await stub.putState(marbleToTransfer.name, marbleJSONAsBytes); // Rewrite the marble

    console.info('- end transferMarble (success)');

    return marbleJSONAsBytes;
  }

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
  private async getMarblesByRange(stub: any, args: string[]): Promise<Buffer> {
    if (args.length !== 2) {
      throw new Error('Incorrect number of arguments. Expecting two arguments');
    }

    const startKey: string = args[0];
    const endKey: string = args[1];

    const resultsIterator = await stub.getStateByRange(startKey, endKey);
    const results = await this.getAllResults(resultsIterator, false);

    return Buffer.from(JSON.stringify(results));
  }

  // ===== Example: Ad hoc rich query ========================================================
  // queryMarbles uses a query string to perform a query for marbles.
  // Query string matching state database syntax is passed in and executed as is.
  // Supports ad hoc queries that can be defined at runtime by the client.
  // If this is not desired, follow the queryMarblesForOwner example for parameterized queries.
  // Only available on state databases that support rich query (e.g. CouchDB)
  // =========================================================================================
  private async getMarbles(stub: any, args: string[]): Promise<Buffer> {
    if (args.length !== 1) {
      throw new Error('Incorrect number of arguments. Expecting queryObject');
    }

    let queryObject: QueryObject;

    try {
      queryObject = JSON.parse(args[0]);
    } catch (err) {
      throw new Error(`Failed to decode JSON of queryObject: ${args[0]}. Reason: ${err.message}`);
    }

    return await this.getQueryResult(stub, queryObject);
  }

  private async getAllResults(iterator: any, isHistory: any): Promise<any[]> {
    const results: any[] = [];

    while (true) {
      const result = await iterator.next();
      if (result.value && result.value.value.toString()) {
        const jsonResponse: JsonResponse = {
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
          } catch (err) {
            console.log(err);
            jsonResponse.Value = result.value.value.toString('utf8');
          }
        } else {
          jsonResponse.Key = result.value.key;
          try {
            jsonResponse.Record = JSON.parse(result.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonResponse.Record = result.value.value.toString('utf8');
          }
        }
        results.push(jsonResponse);
      }
      if (result.done) {
        console.log('end of data');
        await iterator.close();

        return results;
      }
    }
  }

  // =========================================================================================
  // getQueryResult executes the passed in query string.
  // Result set is built and returned as a byte array containing the JSON results.
  // =========================================================================================
  public async getQueryResult(stub: any, queryObject: QueryObject): Promise<Buffer> {
    console.info(`- getQueryResult queryObject:\n ${queryObject}`);
    const resultsIterator = await stub.getQueryResult(JSON.stringify(queryObject));
    const results = await this.getAllResults(resultsIterator, false);

    return Buffer.from(JSON.stringify(results));
  }
}

shim.start(new Chaincode());
