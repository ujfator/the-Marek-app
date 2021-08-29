export class Base {
	created?: string;
	id?: any;

	protected __init?: (args: any) => void = (args: any): void => {
		if (args._id) {
			this.created = args._id.getTimestamp();
			this['id'] = args._id.toString();
		}

		for (const property in args) {
			if (this.hasOwnProperty(property)) {
				this[property] = args[property];
			}
		}
	};
}
