// import {QueryObject} from './interfaces/queryObject.interface';
// import {JsonResponse} from './interfaces/jsonResponse.interface';
// import { Field } from './models/field';

const shim = require('fabric-shim');
const util = require('util');

class Chaincode {
  public async Init(stub: any): Promise<any> {
    const functionAndParameters = stub.getFunctionAndParameters();
    console.info(functionAndParameters);
    console.info('=========== Instantiated MIMEA 3.0 Chaincode ===========');
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
        case 'createField':
          payload = await this.createField(stub, functionAndParameters.params);
          break;
        // case 'readModel':
        //   payload = await this.readModel(stub, functionAndParameters.params);
        //   break;
        // case 'deleteModel':
        //   payload = await this.deleteModel(stub, functionAndParameters.params);
        //   break;
        // case 'transferModel':
        //   payload = await this.transferModel(stub, functionAndParameters.params);
        //   break;
        // case 'getModelsByRange':
        //   payload = await this.getModelsByRange(stub, functionAndParameters.params);
        //   break;
        // case 'getModels':
        //   payload = await this.getModels(stub, functionAndParameters.params);
        //   break;
        // case 'getAllResults':
        //   payload = await this.getAllResults(stub, functionAndParameters.params);
        //   break;
        // case 'getQueryResult':
        //   payload = await this.getQueryResult(stub, functionAndParameters.params);
        //   break;
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

  private async createField(stub: any, field: any): Promise<Buffer> {
    console.log('========== creating a field ===========');
    // ==== Check if model already exists ====
    const parsedField = JSON.parse(field);
    const fieldState = await stub.getState(JSON.stringify(parsedField.id));
    if (fieldState.toString()) {
      throw new Error(`Field "${parsedField.id}" already exists`);
    }

    // === Put model as a JSON string in a buffer and save the model to state ===
    await stub.putState(parsedField.id, Buffer.from(JSON.stringify(parsedField)));
    //
    // // Add the name and color of the new model to the index 'color~name' index
    // const indexName: string = 'color~name';
    // const colorNameIndexKey = await stub.createCompositeKey(indexName, [model.color, model.name]);
    // console.info(colorNameIndexKey);

    // //  Note - Passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
    // await stub.putState(colorNameIndexKey, Buffer.from('\u0000'));

    // ==== Model saved and indexed. Return success ====

    return Buffer.from(JSON.stringify(parsedField));
  }
  //
  // private async createModel(stub: any, args: string[]): Promise<Buffer> {
  //   if (args.length !== 4) {
  //     throw new Error('Incorrect number of arguments. Expecting 4');
  //   }
  //
  //   // ==== Input sanitation ====
  //   console.info('--- start init model ---');
  //
  //   args.forEach((arg: string, index: number) => {
  //     if (arg.length <= 0) {
  //       throw new Error(`argument ${index} is not a non-empty string`);
  //     }
  //   });
  //
  //   let asdf: Model = json.parseargs[1];
  //
  //   if (typeof model.size !== 'number') {
  //     throw new Error('3rd argument must be a numeric string');
  //   }
  //
  //   // ==== Check if model already exists ====
  //   const modelState = await stub.getState(model.name);
  //   if (modelState.toString()) {
  //     throw new Error(`Model "${model.name}" already exists`);
  //   }
  //
  //   // === Put model as a JSON string in a buffer and save the model to state ===
  //   await stub.putState(model.name, Buffer.from(JSON.stringify(model)));
  //
  //   // Add the name and color of the new model to the index 'color~name' index
  //   const indexName: string = 'color~name';
  //   const colorNameIndexKey = await stub.createCompositeKey(indexName, [model.color, model.name]);
  //   console.info(colorNameIndexKey);
  //
  //   //  Note - Passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
  //   await stub.putState(colorNameIndexKey, Buffer.from('\u0000'));
  //
  //   // ==== Model saved and indexed. Return success ====
  //   console.info('- end init model');
  //
  //   return Buffer.from(JSON.stringify(model));
  // }
  //
  // private async readModel(stub: any, args: string[]): Promise<Buffer> {
  //   if (args.length !== 1) {
  //     throw new Error('Incorrect number of arguments. Expecting name of the model to query');
  //   }
  //
  //   const modelName: string = args[0];
  //   if (!modelName) {
  //     throw new Error(' model name must not be empty');
  //   }
  //
  //   const modelAsbytes: Buffer = await stub.getState(modelName); // get the model from Chaincode state
  //   if (!modelAsbytes.toString()) {
  //     throw new Error(`Model does not exist: ${modelName}`);
  //   }
  //
  //   return modelAsbytes;
  // }
  //
  // private async deleteModel(stub: any, args: string[]): Promise<void> {
  //   if (args.length !== 1) {
  //     throw new Error('Incorrect number of arguments. Expecting name of the model to delete.');
  //   }
  //
  //   const modelName: string = args[0];
  //   if (!modelName) {
  //     throw new Error('Model name must not be empty.');
  //   }
  //
  //   // To maintain the color~name index, we need to read the model first and get its color
  //   const valAsbytes: Buffer = await stub.getState(modelName); // get the model from Chaincode state
  //   if (!valAsbytes) {
  //     throw new Error(`Model "${modelName}" does not exist.`);
  //   }
  //
  //   let modelJSON: Model;
  //
  //   try {
  //     modelJSON = JSON.parse(valAsbytes.toString());
  //   } catch (err) {
  //     throw new Error('Failed to decode JSON of: ' + modelName + '. Error message: ' + err.message);
  //   }
  //
  //   await stub.deleteState(modelName); // remove the model from Chaincode state
  //
  //   // Delete the index
  //   const indexName: string = 'color~name';
  //   const colorNameIndexKey: any = stub.createCompositeKey(indexName, [modelJSON.color, modelJSON.name]);
  //   if (!colorNameIndexKey) {
  //     throw new Error('Failed to create the createCompositeKey');
  //   }
  //
  //   //  Delete index entry to state.
  //   await stub.deleteState(colorNameIndexKey);
  // }
  //
  // private async transferModel(stub: any, args: string[]): Promise<Buffer> {
  //   if (args.length !== 2) {
  //     throw new Error('Incorrect number of arguments. Expecting modelName and owner');
  //   }
  //
  //   const modelName: string = args[0];
  //   const newOwner: string = args[1].toLowerCase();
  //   console.info('- start transferModel ', modelName, newOwner);
  //
  //   const modelAsBytes: Buffer = await stub.getState(modelName);
  //   if (!modelAsBytes || !modelAsBytes.toString()) {
  //     throw new Error('model does not exist');
  //   }
  //
  //   let modelToTransfer: Model;
  //
  //   try {
  //     modelToTransfer = JSON.parse(modelAsBytes.toString()); // unMarshal
  //   } catch (err) {
  //     throw new Error(`Failed to decode JSON of: ${modelName}. Reason: ${err.message}`);
  //   }
  //
  //   modelToTransfer.owner = newOwner; // change owner
  //   console.info(modelToTransfer);
  //
  //   const modelJSONAsBytes = Buffer.from(JSON.stringify(modelToTransfer));
  //   await stub.putState(modelToTransfer.name, modelJSONAsBytes); // Rewrite the model
  //
  //   console.info('- end transferModel (success)');
  //
  //   return modelJSONAsBytes;
  // }
  //
  // // ===========================================================================================
  // // getModelsByRange performs a range query based on the start and end keys provided.
  // //
  // // Read-only function results are not typically submitted to ordering. If the read-only
  // // results are submitted to ordering, or if the query is used in an update transaction
  // // and submitted to ordering, then the committing peers will re-execute to guarantee that
  // // result sets are stable between endorsement time and commit time. The transaction is
  // // invalidated by the committing peers if the result set has changed between endorsement
  // // time and commit time.
  // // Therefore, range queries are a safe option for performing update transactions based on query results.
  // // ===========================================================================================
  // private async getModelsByRange(stub: any, args: string[]): Promise<Buffer> {
  //   if (args.length !== 2) {
  //     throw new Error('Incorrect number of arguments. Expecting two arguments');
  //   }
  //
  //   const startKey: string = args[0];
  //   const endKey: string = args[1];
  //
  //   const resultsIterator = await stub.getStateByRange(startKey, endKey);
  //   const results = await this.getAllResults(resultsIterator, false);
  //
  //   return Buffer.from(JSON.stringify(results));
  // }
  //
  // // ===== Example: Ad hoc rich query ========================================================
  // // queryModels uses a query string to perform a query for models.
  // // Query string matching state database syntax is passed in and executed as is.
  // // Supports ad hoc queries that can be defined at runtime by the client.
  // // If this is not desired, follow the queryModelsForOwner example for parameterized queries.
  // // Only available on state databases that support rich query (e.g. CouchDB)
  // // =========================================================================================
  // private async getModels(stub: any, args: string[]): Promise<Buffer> {
  //   if (args.length !== 1) {
  //     throw new Error('Incorrect number of arguments. Expecting queryObject');
  //   }
  //
  //   let queryObject: QueryObject;
  //
  //   try {
  //     queryObject = JSON.parse(args[0]);
  //   } catch (err) {
  //     throw new Error(`Failed to decode JSON of queryObject: ${args[0]}. Reason: ${err.message}`);
  //   }
  //
  //   return await this.getQueryResult(stub, queryObject);
  // }
  //
  // private async getAllResults(iterator: any, isHistory: any): Promise<any[]> {
  //   const results: any[] = [];
  //
  //   while (true) {
  //     const result = await iterator.next();
  //     if (result.value && result.value.value.toString()) {
  //       const jsonResponse: JsonResponse = {
  //         TxId: '',
  //         Timestamp: 0,
  //         IsDeleted: '',
  //         Value: '',
  //         Key: '',
  //         Record: ''
  //       };
  //       console.log(result.value.value.toString('utf8'));
  //
  //       if (isHistory && isHistory === true) {
  //         jsonResponse.TxId = result.value.tx_id;
  //         jsonResponse.Timestamp = result.value.timestamp;
  //         jsonResponse.IsDeleted = result.value.is_delete.toString();
  //         try {
  //           jsonResponse.Value = JSON.parse(result.value.value.toString('utf8'));
  //         } catch (err) {
  //           console.log(err);
  //           jsonResponse.Value = result.value.value.toString('utf8');
  //         }
  //       } else {
  //         jsonResponse.Key = result.value.key;
  //         try {
  //           jsonResponse.Record = JSON.parse(result.value.value.toString('utf8'));
  //         } catch (err) {
  //           console.log(err);
  //           jsonResponse.Record = result.value.value.toString('utf8');
  //         }
  //       }
  //       results.push(jsonResponse);
  //     }
  //     if (result.done) {
  //       console.log('end of data');
  //       await iterator.close();
  //
  //       return results;
  //     }
  //   }
  // }
  //
  // // =========================================================================================
  // // getQueryResult executes the passed in query string.
  // // Result set is built and returned as a byte array containing the JSON results.
  // // =========================================================================================
  // public async getQueryResult(stub: any, queryObject: QueryObject): Promise<Buffer> {
  //   console.info(`- getQueryResult queryObject:\n ${queryObject}`);
  //   const resultsIterator = await stub.getQueryResult(JSON.stringify(queryObject));
  //   const results = await this.getAllResults(resultsIterator, false);
  //
  //   return Buffer.from(JSON.stringify(results));
  // }
}

shim.start(new Chaincode());
