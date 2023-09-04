import { createEvent, createStore } from "effector";

const open = createEvent();
const close = createEvent();

const $isOpen = createStore(false)
  .on(open, () => true)
  .on(close, () => false);

export const budgetSettingsService = {
  inputs: { open, close },
  outputs: { $isOpen },
};
