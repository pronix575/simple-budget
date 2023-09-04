import { FC } from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Drawer, Form, Input } from "antd";
import { PaintBucket, Trash2, XCircleFill } from "react-bootstrap-icons";
import FormItem from "antd/es/form/FormItem";
import { BudgetSettingsFormProps } from "./BudgetSettingsForm.types";
import { ButtonWrapper, MonthEventWrapper } from "./BudgetSettingsForm.styled";
import { InputSimple } from "../../budgetPlan/BudgetPlanPage/Input/Input";

export const BudgetSettingsForm: FC<BudgetSettingsFormProps> = ({
  isOpen,
  close,
  averageExpenses,
  setAverageExpenses,
  monthEvents,
  addMonthEvent,
  removeMonthEvent,
  editMonthEvent,
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
            <Button
              block
              type="primary"
              onClick={() => {
                addMonthEvent({
                  id: Date.now(),
                  value: null,
                  day: null,
                  emoji: null,
                });
              }}
            >
              Добавить
            </Button>
          </FormItem>
          {monthEvents.map((elem) => (
            <MonthEventWrapper key={elem.id}>
              <ButtonWrapper>
                <Button
                  icon={
                    <PaintBucket
                      style={{
                        transform: "translate(1px, 2px)",
                        fontSize: "18px",
                      }}
                    />
                  }
                />
              </ButtonWrapper>
              <Input
                onChange={(e) =>
                  editMonthEvent({
                    ...elem,
                    value: e.target.value ? e.target.value : null,
                  })
                }
                value={elem.value || ""}
              />
              <DatePicker
                placeholder="Дата"
                style={{ width: "220px" }}
                onChange={(value) =>
                  editMonthEvent({ ...elem, day: value?.get("D") || null })
                }
                value={
                  elem.day
                    ? dayjs(`${dayjs().month()}.${elem.day}.${dayjs().year()}`)
                    : undefined
                }
                format="DD"
              />
              <ButtonWrapper>
                <Button
                  type="primary"
                  danger
                  onClick={() => removeMonthEvent(elem.id)}
                  icon={
                    <Trash2
                      style={{
                        transform: "translate(1px, 2px)",
                        fontSize: "18px",
                      }}
                    />
                  }
                />
              </ButtonWrapper>
            </MonthEventWrapper>
          ))}
        </Form>
      </Drawer>
    </>
  );
};
