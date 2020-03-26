import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";

const Spacer = styled(View)`
  margin: ${({ size = 15 }) => size}px;
`;

export default Spacer;
