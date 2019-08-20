import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as commandLineArgs from 'command-line-args';

import { WorkflowManagerRoutes } from 'api/index';

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

const port = process.env.PORT || options[ 'port' ] || 3000;
server.set('port', port);
server.listen(port, () => console.log(`Server started on port ${port} with user ${process.env.USERNAME}`))

server.get('api/workflowManager', (req, res) => res.send('hej'));

const api: Api = new Api({ server });
api.server.use(express.static(__dirname));
