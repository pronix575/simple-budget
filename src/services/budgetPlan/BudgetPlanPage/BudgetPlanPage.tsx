import { Button, DatePicker, Tooltip } from "antd";
import {
  BaseSettingsWrapper,
  Content,
  DateItem,
  DiffWrapper,
  Header,
  InputSC,
  Layout,
  Logo,
  PercentBlock,
  RightPanel,
  Sum,
  SumsWrapper,
  Wrapper,
} from "./BudgetPlanPage.styled";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { BudgetPlanPageProps } from "./BudgetPlanPage.types";
import dayjs, { Dayjs } from "dayjs";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import { BudgetPlanItem } from "../budgetPlan.types";
import FormItem from "antd/es/form/FormItem";
import weekend from "dayjs/plugin/weekday";
import { getWeekendDay } from "./BudgetPlanPage.utils";

dayjs.extend(weekend);
dayjs.locale("ru");

export const BudgetPlanPage: FC<BudgetPlanPageProps> = ({
  period,
  setPeriod,
  budgetPlanItems,
  addBudgetPlanItem,
  removeBudgetPlanItem,
  editBudgetPlanItemValue,
}) => {
  const periodsArray = useMemo(() => {
    if (!period) return null;

    const daysCount = period[1].diff(period[0], "day");

    let sum = 0;

    return Array(daysCount)
      .fill(null)
      .map((_, index) => ({
        index,
        date: period[0].add(index, "day"),
      }))
      .map((elem) => {
        const planItems = budgetPlanItems.filter(
          (item) => item.date === elem.date.format("DD.MM.YYYY")
        );

        const planItemSum =
          sum +
          planItems.reduce((acc, elem) => {
            return acc + (elem.value || 0);
          }, 0);

        sum = planItemSum;

        return { ...elem, planItems, planItemSum };
      });
  }, [budgetPlanItems, period]);

  const maxSum =
    periodsArray?.reduce(
      (acc, elem) => (acc < elem.planItemSum ? elem.planItemSum : acc),
      0
    ) || 1;

  return (
    <Layout>
      <Header>
        <Logo>бюджет</Logo>

        <BaseSettingsWrapper>
          <FormItem label="Выберите период" style={{ margin: 0 }}>
            <DatePicker.RangePicker
              format="DD.MM.YYYY"
              value={period}
              onChange={(date) =>
                date?.[0] && date[1]
                  ? setPeriod(date as [Dayjs, Dayjs])
                  : setPeriod(null)
              }
            />
          </FormItem>
        </BaseSettingsWrapper>
      </Header>
      <Wrapper>
        <Content>
          {periodsArray?.map((period) => {
            const diff =
              period.planItemSum -
              (periodsArray[period.index - 1]?.planItemSum || 0);

            const percentOfMax = (period.planItemSum / maxSum) * 100;

            return (
              <DateItem key={period.index}>
                <div>{period.index + 1}</div>
                <div>
                  <Tooltip
                    title={getWeekendDay(period.date.weekday())}
                    color="blue"
                  >
                    <strong>{period.date.format("DD")}</strong>{" "}
                    {period.date.format("MMMM YYYY")}
                  </Tooltip>
                </div>
                <div>
                  {Boolean(diff) && (
                    <DiffWrapper isNegative={diff < 0}>
                      {diff > 0 && "+"}
                      {diff ? diff.toLocaleString() : ""}
                    </DiffWrapper>
                  )}
                </div>
                <Sum
                  style={{
                    color: period.planItemSum < 0 ? "red" : "inherit",
                  }}
                >
                  <PercentBlock percent={percentOfMax}></PercentBlock>
                  {period.planItemSum.toLocaleString()}
                </Sum>
                <SumsWrapper>
                  {period.planItems.map((elem) => (
                    <Input
                      key={elem.id}
                      elem={elem}
                      editBudgetPlanItemValue={editBudgetPlanItemValue}
                      removeBudgetPlanItem={removeBudgetPlanItem}
                    />
                  ))}
                  <Button
                    icon={
                      <PlusCircleFill
                        style={{
                          transform: "translateY(2px)",
                        }}
                      />
                    }
                    onClick={() =>
                      addBudgetPlanItem({
                        id: Date.now(),
                        value: null,
                        date: period.date.format("DD.MM.YYYY"),
                      })
                    }
                  />
                </SumsWrapper>
              </DateItem>
            );
          })}
        </Content>
        <RightPanel></RightPanel>
      </Wrapper>
    </Layout>
  );
};

const Input: React.FC<{
  editBudgetPlanItemValue: (payload: {
    id: number;
    value: number | null;
  }) => void;
  elem: BudgetPlanItem;
  removeBudgetPlanItem: (payload: number) => void;
}> = ({ editBudgetPlanItemValue, elem, removeBudgetPlanItem }) => {
  const [value, setValue] = useState("");

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
      status={elem.value && elem.value < 0 ? "error" : undefined}
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
