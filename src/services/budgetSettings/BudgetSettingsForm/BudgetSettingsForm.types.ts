export { BudgetSettingsForm } from "./BudgetSettingsForm";

export type BudgetSettingsFormProps = {
  isOpen: boolean;
  close: () => void;
  averageExpenses: number | null;
  setAverageExpenses: (payload: number | null) => void;
};
