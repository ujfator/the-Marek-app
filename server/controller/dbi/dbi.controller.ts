import { Connection, ConnectionOptions, createConnection } from 'mongoose';
import { environment } from '../../../src/environments/environment';

export class DbiController {
	public get dbh(): Connection {
		return this._dbh;
	}

	private _dbh: Connection;
	private _connectionInitiated: boolean = false;

	constructor() {
		if (!this._connectionInitiated) {
			this._connect();
		}
	}


	
	public uri: string = "mongodb+srv://marek:marek@cluster0-jkdd5.azure.mongodb.net/marekApp?retryWrites=true&w=majority";



	private _connect(): void {
	 	this._connectionInitiated = true;
	 	console.log(`Initiating connection to Database...`);

	 	const options: ConnectionOptions = {
	 		auth: {
	 			password: environment.database_passwd,
	 			user: environment.database_user
	 		},
	 		authSource: environment.auth_database,
	 		dbName: environment.database,
	 		keepAlive: true,
	 	  useNewUrlParser: true
	 		// useMongoClient: true,
     };

	 	createConnection(this.uri).then(
	 		(connection: any) => {
	 			console.log(
	 				`Connected to DB: "${ connection.name }" <${ connection.host }:${ connection.port }> with user: "${ connection.user }"`
	 			);
	 			this._dbh = <Connection>connection;
	 		}).catch((error) => {
	 			if (error) {
	 				throw error;
				}
	 		}
		);
	}
}
