import { BaseController } from '../base.controller';
import { BaseInterface } from '../base.interface';
import { UserSchema } from '../../schema/user.schema';
import { User } from '../../models/user.model';
import * as bcrypt from 'bcrypt';

export class UserController extends BaseController {

	constructor(args: BaseInterface) {
		super(args);

		this.collection = 'users';
		this.modelName = 'user';
		this.schema = UserSchema;
	}

	async login(user: User): Promise<boolean> {
		if (!user.login || !user.password) {
			return false;
		} else {
			const savedUser = await this.model.find({login: user.login});
			const match = await bcrypt.compare(user.password, savedUser[0].password);
			return match;
		}
	}

	async setUser(user: User): Promise<string> {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		return this.model.create(
			{
				login: user.login,
				password: hashedPassword,
			}
			).then((resp) => 'User saved.');
	}

	async getUsers(): Promise<User[]> {
		return this.model.find().then((resp) => {
			return resp.map((row: User) => row.login);
		});
	}

	async getUser(data: string): Promise<boolean> {
		const userData = data.split('|');
		return this.model.find({login: userData[0]}).then((resp: User) => {
			bcrypt.compare(userData[1], resp.password, function(err, result) {
				return true;
			});
		});
	}


}
