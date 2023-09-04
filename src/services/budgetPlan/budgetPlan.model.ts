import dayjs, { Dayjs } from "dayjs";
import { createEvent, createStore } from "effector";
import { BudgetPlanItem } from "./budgetPlan.types";
import { persist } from "effector-storage/local";
dayjs.locale("ru")

const setBudgetPeriodDate = createEvent<[Dayjs, Dayjs] | null>();

const $budgetPeriodDate = createStore<[Dayjs, Dayjs] | null>(null).on(
  setBudgetPeriodDate,
  (_, period) => period
);

persist({
  store: $budgetPeriodDate,
  serialize: (value) =>
    value
      ? JSON.stringify({
          from: value[0],
          to: value[1],
        })
      : "null",
  deserialize: (value): [Dayjs, Dayjs] | null => {
    if (value === "null") return null;

    const data = JSON.parse(value)
      
    return [dayjs(data.from), dayjs(data.to)];
  },
  key: "budget-period-date",
});

const addBudgetPlanItem = createEvent<BudgetPlanItem>();

const removeBudgetPlanItem = createEvent<number>();

const editBudgetPlanItemValue = createEvent<{
  id: number;
  value: number | null;
}>();

const $budgetPlanItems = createStore<BudgetPlanItem[]>([])
  .on(addBudgetPlanItem, (prev, item) => [...prev, item])
  .on(removeBudgetPlanItem, (prev, id) => prev.filter((elem) => elem.id !== id))
  .on(editBudgetPlanItemValue, (prev, { id, value }) =>
    prev.map((elem) => (elem.id === id ? { ...elem, value } : elem))
  );

export const budgetPlanService = {
  outputs: { $budgetPeriodDate, $budgetPlanItems },
  inputs: {
    setBudgetPeriodDate,
    addBudgetPlanItem,
    removeBudgetPlanItem,
    editBudgetPlanItemValue,
  },
};
