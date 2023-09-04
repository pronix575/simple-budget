import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";

const open = createEvent();
const close = createEvent();

const $isOpen = createStore(false)
  .on(open, () => true)
  .on(close, () => false);

const setAverageExpenses = createEvent<number | null>();

const $averageExpenses = createStore<number | null>(null).on(
  setAverageExpenses,
  (_, value) => value
);

persist({
  store: $averageExpenses,
  key: "average-expenses",
});

export const budgetSettingsService = {
  inputs: { open, close, setAverageExpenses },
  outputs: { $isOpen, $averageExpenses },
};
