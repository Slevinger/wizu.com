import { Text, View } from "react-native";
import styled from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const EventDate = styled(Text)`
  font-weight: bold;
  font-size: 15px;
  margin-top: 5px;
  color: red;
`;

export const FlexBox = styled(View)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

export const EventDetails = styled(FlexBox)`
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
`;

export const StyledEventItem = styled(View)`
  width: 100%;
  border-bottom-color: rebeccapurple;
  border-bottom-width: 1px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Horizontal = styled(View)`
  flex-direction: row;
  display: flex;
`;

export const ImageInListContainer = styled(View)`
  height: 75px;
  width: 75px;
  overflow: hidden;
  border-radius: 37.5px;
`;

export const FullScreenImageContainer = styled(SafeAreaProvider)`
  background-color: black;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
`;

export const ErrorText = styled(Text)`
  color: red;
`;
