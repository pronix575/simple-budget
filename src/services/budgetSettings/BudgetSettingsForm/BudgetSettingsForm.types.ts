import { MonthEvent } from "../budgetSettings.types";

export { BudgetSettingsForm } from "./BudgetSettingsForm";

export type BudgetSettingsFormProps = {
  isOpen: boolean;
  close: () => void;
  averageExpenses: number | null;
  setAverageExpenses: (payload: number | null) => void;
  monthEvents: MonthEvent[];
  addMonthEvent: (payload: MonthEvent) => void;
  removeMonthEvent: (payload: number) => void;
  editMonthEvent: (payload: MonthEvent) => void;
};
