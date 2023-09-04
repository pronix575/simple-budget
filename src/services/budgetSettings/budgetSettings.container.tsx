import { useUnit } from "effector-react";
import { budgetSettingsService } from "./budgetSettings.model";
import { BudgetSettingsForm } from "./BudgetSettingsForm/BudgetSettingsForm";

const { inputs, outputs } = budgetSettingsService;

export const BudgetSettingsContainer = () => {
  const {
    isOpen,
    close,
    averageExpenses,
    setAverageExpenses,
    monthEvents,
    addMonthEvent,
    removeMonthEvent,
    editMonthEvent,
  } = useUnit({
    close: inputs.close,
    isOpen: outputs.$isOpen,
    setAverageExpenses: inputs.setAverageExpenses,
    averageExpenses: outputs.$averageExpenses,
    monthEvents: outputs.$monthEvents,
    addMonthEvent: inputs.addMonthEvent,
    removeMonthEvent: inputs.removeMonthEvent,
    editMonthEvent: inputs.editMonthEvent,
  });

  return (
    <BudgetSettingsForm
      isOpen={isOpen}
      close={close}
      averageExpenses={averageExpenses}
      setAverageExpenses={setAverageExpenses}
      monthEvents={monthEvents}
      addMonthEvent={addMonthEvent}
      removeMonthEvent={removeMonthEvent}
      editMonthEvent={editMonthEvent}
    />
  );
};
