import { useCallback, useEffect, useState } from "react";
import { BudgetPlanItem } from "../../budgetPlan.types";
import { InputSC } from "../BudgetPlanPage.styled";
import { XCircleFill } from "react-bootstrap-icons";
import { GreenDot, RedDot } from "./Input.styled";

export const Input: React.FC<{
  editBudgetPlanItemValue: (payload: {
    id: number;
    value: number | null;
  }) => void;
  elem: BudgetPlanItem;
  removeBudgetPlanItem: (payload: number) => void;
}> = ({ editBudgetPlanItemValue, elem, removeBudgetPlanItem }) => {
  const [value, setValue] = useState(elem.value ? String(elem.value) : "");

  const handleUpdate = useCallback(
    (value: string) =>
      editBudgetPlanItemValue({
        id: elem.id,
        value:
          value === ""
            ? null
            : !isNaN(Number(value))
            ? Number(value)
            : elem.value,
      }),
    [editBudgetPlanItemValue, elem.id, elem.value]
  );

  useEffect(() => {
    if (value === "-") return;

    handleUpdate(value);
  }, [handleUpdate, value]);

  return (
    <InputSC
      onChange={(e) => setValue(e.target.value || "")}
      prefix={elem.value && elem.value < 0 ? <RedDot /> : <GreenDot />}
      placeholder="Cумма"
      key={elem.id}
      value={value ?? ""}
      suffix={
        <XCircleFill
          className="x-circle"
          onClick={() => removeBudgetPlanItem(elem.id)}
        />
      }
    />
  );
};

export const InputSimple: React.FC<{
  onChange: (payload: number | null) => void;
  value: number | null;
}> = ({ value: initValue, onChange }) => {
  const [value, setValue] = useState(initValue ? String(initValue) : "");

  const handleUpdate = useCallback(
    (value: string) =>
      onChange(
        value === "" ? null : !isNaN(Number(value)) ? Number(value) : initValue
      ),
    [initValue, onChange]
  );

  useEffect(() => {
    if (value === "-") return;

    handleUpdate(value);
  }, [handleUpdate, value]);

  return (
    <InputSC
      style={{ width: "100%" }}
      onChange={(e) => setValue(e.target.value || "")}
      placeholder="Cумма"
      value={value ?? ""}
      allowClear
    />
  );
};
