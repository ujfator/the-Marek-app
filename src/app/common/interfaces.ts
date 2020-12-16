import { Budget, Money, Workflow, Quality } from '../../../server/models';

export interface ItemToSave {
	item: Budget | Money | Workflow | Quality;
	origin: string;
}
