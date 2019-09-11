import { BudgetItemModel, MoneyModel, WorkflowModel, SportItemModel } from '../../../server/models';

export interface ItemToSave {
    item: BudgetItemModel|MoneyModel|WorkflowModel|SportItemModel,
    origin: string,
}