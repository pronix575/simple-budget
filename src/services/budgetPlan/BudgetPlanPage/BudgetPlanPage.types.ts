import dayjs from "dayjs";
import { BudgetPlanItem } from "../budgetPlan.types";

export type BudgetPlanPageProps = {
  period: [dayjs.Dayjs, dayjs.Dayjs] | null;
  setPeriod: (payload: [dayjs.Dayjs, dayjs.Dayjs] | null) => void;
  budgetPlanItems: BudgetPlanItem[];
  addBudgetPlanItem: (payload: BudgetPlanItem) => void;
  removeBudgetPlanItem: (payload: number) => void;
  editBudgetPlanItemValue: (payload: {
    id: number;
    value: number | null;
  }) => void;
  openSettings: () => void;
  averageExpenses: number | null;
};
