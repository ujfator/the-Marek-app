import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as commandLineArgs from 'command-line-args';

import { Api } from './api';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const optionDefinitions = [
	{
		alias: 'c',
		name: 'cluster',
		type: Boolean
	},
	{
		alias: 'p',
		name: 'port',
		type: Number
	}
];
const options = commandLineArgs(optionDefinitions);

const PORT = process.env.PORT || options[ 'port' ] || 3000;
server.set('port', PORT);

server.listen(PORT, () => console.log(`Server started on port ${PORT} with user ${process.env.USERNAME}`))

const api: Api = new Api({ server });
api.server.use(express.static(__dirname));
