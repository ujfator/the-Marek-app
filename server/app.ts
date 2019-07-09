import * as express from 'express';

import { Api } from '../server/api';

const server = express();

const PORT = process.env.PORT || 3000;
server.set('port', PORT);

server.listen(PORT, () => console.log(`Server started on port ${PORT} with user ${process.env.USERNAME}`))

const api: Api = new Api({ server });
api.server.use(express.static('dist'));
