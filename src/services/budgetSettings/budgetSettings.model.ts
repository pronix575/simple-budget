import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";
import { MonthEvent } from "./budgetSettings.types";

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

const addMonthEvent = createEvent<MonthEvent>();

const removeMonthEvent = createEvent<number>();

const editMonthEvent = createEvent<MonthEvent>();

const $monthEvents = createStore<MonthEvent[]>([])
  .on(addMonthEvent, (prev, event) => [...prev, event])
  .on(removeMonthEvent, (prev, id) => prev.filter((elem) => elem.id !== id))
  .on(editMonthEvent, (prev, edited) =>
    prev.map((elem) => (elem.id === edited.id ? edited : elem))
  );

persist({
  key: "month-events",
  store: $monthEvents,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

export const budgetSettingsService = {
  inputs: {
    open,
    close,
    setAverageExpenses,
    addMonthEvent,
    removeMonthEvent,
    editMonthEvent,
  },
  outputs: { $isOpen, $averageExpenses, $monthEvents },
};
