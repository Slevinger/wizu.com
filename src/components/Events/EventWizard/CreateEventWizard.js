import React, { useCallback } from "react";
import { View } from "react-native";

const Step = () => {
  return <View />;
};

import Wizard from "../../Wizard";

export default () => {
  const handleSubmit = useCallback(() => {
    console.log("submit");
  }, []);

  const steps = [
    { component: Step, routeName: "Step1" },
    { component: Step, routeName: "Step2" },
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
