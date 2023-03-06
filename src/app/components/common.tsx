import { Typography } from "antd";
import styled from "styled-components";

const { Text: AntText } = Typography;

export const Text = styled(AntText)`
  text-align: center;
`;

export const FullContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
