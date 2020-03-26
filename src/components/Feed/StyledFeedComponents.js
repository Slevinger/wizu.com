import styled from "styled-components";
import { View } from "react-native";

export const ButtonGroupContainer = styled(View)`
  border-color: red;
  border-width: 0px;
  width: 200px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  margin-top: 10px;
`;

export const PostBottomRow = styled(View)`
  flex: 1;
  flex-direction: row;
  display: flex;
  border-color: red;
`;
