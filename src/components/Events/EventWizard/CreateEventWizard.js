import React, { useCallback } from "react";
import { View } from "react-native";
import Step2 from "./Step2";
import Step1 from "./Step1";
const Step = () => {
  return <View />;
};

import Wizard from "../../Wizard";

export default () => {
  const handleSubmit = useCallback(() => {
    console.log("submit");
  }, []);

  const steps = [
    { component: Step1, routeName: "Step1" },
    { component: Step2, routeName: "Step2" },
    { component: Step, routeName: "Step3" }
  ];

  return (
    <Wizard
      handleSubmitWizard={handleSubmit}
      steps={steps}
      title="Basic Wizard Example"
    />
  );
};
