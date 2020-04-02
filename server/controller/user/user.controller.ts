import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';
import { UserSchema } from 'schema/user.schema';
import { User } from 'models/user.model';

export class UserController extends BaseController {

	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'users';
		this.modelName = 'user';
		this.schema = UserSchema;
	}

	async getUsers(): Promise<User[]> {
		return this.model.find().then((resp) => {
			return resp.map((row: User) => new User(row));
		});
	}

	async getUser(password: string): Promise<User> {
		return this.model.find({password: password}).then((resp: User) => new User(resp));
	}


}
