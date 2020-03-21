import * as mongo from 'mongoose';

import  { MongoClient } from 'mongodb';

export class DbiController {

	uri: string = "mongodb+srv://marek:marek@cluster0-jkdd5.azure.mongodb.net/marekApp?retryWrites=true&w=majority";
	get dbh(): mongo.Connection {
		return this._dbh;
	}
	client: mongo.MongoClient;
	private _dbh: mongo.Connection;
	private _connectionInitiated: boolean = false;

	constructor() {
		if (!this._connectionInitiated) {
			this._connect();
		}
	}

	private _connect(): void {
		this._connectionInitiated = true;
		console.log(`Initiating connection to Database...`);

		mongo.createConnection(this.uri).then(
		(connection: any) => {
			console.log(
			`Connected to DB: "${ connection.name }" <${ connection.host }:${ connection.port }> with user: "${ connection.user }"`
			);
			this._dbh = <mongo.Connection>connection;
		}).catch((error) => {
			if (error) {
				throw error;
			}
		}
		);

	}
}
