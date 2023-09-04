import { Drawer, Form } from "antd";
import { useUnit } from "effector-react";
import { budgetSettingsService } from "./budgetSettings.model";
import { XCircleFill } from "react-bootstrap-icons";
import FormItem from "antd/es/form/FormItem";
import { InputSimple } from "../budgetPlan/BudgetPlanPage/Input/Input";

const { inputs, outputs } = budgetSettingsService;

export const BudgetSettingsContainer = () => {
  const { isOpen, close, averageExpenses, setAverageExpenses } = useUnit({
    close: inputs.close,
    isOpen: outputs.$isOpen,
    setAverageExpenses: inputs.setAverageExpenses,
    averageExpenses: outputs.$averageExpenses,
  });

  return (
    <>
      <Drawer
        title="Настройки"
        width={520}
        closable={false}
        onClose={close}
        open={isOpen}
        closeIcon={<XCircleFill />}
      >
        <Form layout="vertical">
          <FormItem label="Средние ежедневные расходы">
            <InputSimple
              value={averageExpenses}
              onChange={setAverageExpenses}
            />
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
};
