import { BudgetItemModel, MoneyModel, WorkflowModel, SportModel } from '../../../server/models';

export interface ItemToSave {
    item: BudgetItemModel|MoneyModel|WorkflowModel|SportModel,
    origin: string,
}