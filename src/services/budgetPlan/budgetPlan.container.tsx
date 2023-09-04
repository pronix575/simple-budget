import { useUnit } from "effector-react";
import { BudgetPlanPage } from "./BudgetPlanPage/BudgetPlanPage";
import { budgetPlanService } from "./budgetPlan.model";
import { BudgetSettingsContainer } from "../budgetSettings/budgetSettings.container";
import { budgetSettingsService } from "../budgetSettings/budgetSettings.model";

const { inputs, outputs } = budgetPlanService;

export const BudgetPlanContainer = () => {
  const {
    period,
    setPeriod,
    budgetPlanItems,
    addBudgetPlanItem,
    removeBudgetPlanItem,
    editBudgetPlanItemValue,
    openSettings,
    averageExpenses,
    monthEvents,
  } = useUnit({
    period: outputs.$budgetPeriodDate,
    setPeriod: inputs.setBudgetPeriodDate,
    budgetPlanItems: outputs.$budgetPlanItems,
    addBudgetPlanItem: inputs.addBudgetPlanItem,
    removeBudgetPlanItem: inputs.removeBudgetPlanItem,
    editBudgetPlanItemValue: inputs.editBudgetPlanItemValue,
    openSettings: budgetSettingsService.inputs.open,
    averageExpenses: budgetSettingsService.outputs.$averageExpenses,
    monthEvents: budgetSettingsService.outputs.$monthEvents,
  });

  return (
    <>
      <BudgetSettingsContainer />
      <BudgetPlanPage
        period={period}
        setPeriod={setPeriod}
        budgetPlanItems={budgetPlanItems}
        addBudgetPlanItem={addBudgetPlanItem}
        removeBudgetPlanItem={removeBudgetPlanItem}
        editBudgetPlanItemValue={editBudgetPlanItemValue}
        openSettings={openSettings}
        averageExpenses={averageExpenses}
        monthEvents={monthEvents}
      />
    </>
  );
};
