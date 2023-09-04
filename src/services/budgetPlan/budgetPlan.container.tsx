import { useUnit } from "effector-react";
import { BudgetPlanPage } from "./BudgetPlanPage/BudgetPlanPage";
import { budgetPlanService } from "./budgetPlan.model";

const { inputs, outputs } = budgetPlanService;

export const BudgetPlanContainer = () => {
  const {
    period,
    setPeriod,
    budgetPlanItems,
    addBudgetPlanItem,
    removeBudgetPlanItem,
    editBudgetPlanItemValue,
  } = useUnit({
    period: outputs.$budgetPeriodDate,
    setPeriod: inputs.setBudgetPeriodDate,
    budgetPlanItems: outputs.$budgetPlanItems,
    addBudgetPlanItem: inputs.addBudgetPlanItem,
    removeBudgetPlanItem: inputs.removeBudgetPlanItem,
    editBudgetPlanItemValue: inputs.editBudgetPlanItemValue,
  });

  return (
    <>
      <BudgetPlanPage
        period={period}
        setPeriod={setPeriod}
        budgetPlanItems={budgetPlanItems}
        addBudgetPlanItem={addBudgetPlanItem}
        removeBudgetPlanItem={removeBudgetPlanItem}
        editBudgetPlanItemValue={editBudgetPlanItemValue}
      />
    </>
  );
};
