import { useUnit } from "effector-react";
import { budgetSettingsService } from "./budgetSettings.model";
import { BudgetSettingsForm } from "./BudgetSettingsForm/BudgetSettingsForm";

const { inputs, outputs } = budgetSettingsService;

export const BudgetSettingsContainer = () => {
  const { isOpen, close, averageExpenses, setAverageExpenses } = useUnit({
    close: inputs.close,
    isOpen: outputs.$isOpen,
    setAverageExpenses: inputs.setAverageExpenses,
    averageExpenses: outputs.$averageExpenses,
  });

  return (
    <BudgetSettingsForm
      isOpen={isOpen}
      close={close}
      averageExpenses={averageExpenses}
      setAverageExpenses={setAverageExpenses}
    />
  );
};
