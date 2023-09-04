import { Input } from "antd";
import { styled } from "styled-components";

export const Layout = styled.div``;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1280px 1fr;
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

export const Header = styled.div`
  top: 0;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background-color: #ffffff38;
  backdrop-filter: blur(3px);
  border-bottom: 1px solid #ececec;
  z-index: 10;
`;

export const BaseSettingsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const Content = styled.div`
  padding: 16px;
  max-width: 1280px;
  overflow-x: scroll;
`;

export const DateItem = styled.div`
  display: grid;
  grid-template-columns: 50px 200px 150px 150px 1fr;
  grid-gap: 16px;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #f5f5f5;
`;

export const InputSC = styled(Input)`
  width: 120px;
  transition: 0.2s;

  .x-circle {
    color: white;
    cursor: pointer;
  }

  &:hover {
    .x-circle {
      color: inherit;
    }
  }
`;

export const SumsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
`;

export const DiffWrapper = styled.div<{ isNegative: boolean | null }>`
  padding: 3px 6px;
  color: ${({ isNegative }) => (isNegative ? "#da0028" : "#008029")};
  background: ${({ isNegative }) => (isNegative ? "#da002833" : "#00802935")};
  width: min-content;
  border-radius: 6px;
`;

export const PercentBlock = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}px;
  background-color: #4479ff31;
  border-right: 1px solid #4479ff;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 8px 16px 8px;
  z-index: 7;
  position: absolute;
`;

export const Sum = styled.div`
  font-weight: bold;
  z-index: 1;
  position: relative;
`;

export const RightPanel = styled.div`
  border-left: 1px solid #f5f5f5;
  height: 100%;
`;
