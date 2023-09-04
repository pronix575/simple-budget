import { Button, Drawer, Form } from "antd";
import { XCircleFill } from "react-bootstrap-icons";
import FormItem from "antd/es/form/FormItem";
import { InputSimple } from "../../budgetPlan/BudgetPlanPage/Input/Input";
import { FC } from "react";
import { BudgetSettingsFormProps } from "./BudgetSettingsForm.types";

export const BudgetSettingsForm: FC<BudgetSettingsFormProps> = ({
  isOpen,
  close,
  averageExpenses,
  setAverageExpenses,
}) => {
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
          <FormItem label="Ежемесячные события">
            <Button block type="primary">
              Добавить
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
};
