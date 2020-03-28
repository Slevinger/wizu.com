import React, { Component } from "react";
import PropTypes from "prop-types";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { last } from "lodash";
import { AutoBinder } from "../utils/AutoBinder";

export default class Router extends Component {
  static propTypes = {
    handleNavChange: PropTypes.func.isRequired,
    handleNavRef: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        routeName: PropTypes.string.isRequired
      })
    ).isRequired,
    title: PropTypes.string.isRequired
  };

  state = {};

  componentDidMount() {
    this.setState({ Navigator: this.generateNavigator() });
    // this.Navigator = ;
  }

  generateNavigator = () => {
    const { steps, title } = this.props;
    const navigationRoutes = {};
    steps.forEach((step, index) => {
      const routeOptions = { screen: step.component };
      navigationRoutes[step.routeName] = routeOptions;
    });

    const navigationOptions = {
      headerStyle: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 5
      },
      headerTintColor: "#111111",
      headerTitle: title
    };

    return createAppContainer(
      createStackNavigator(navigationRoutes, { navigationOptions })
    );
  };

  handleRef = navigator => {
    this.props.handleNavRef(navigator);
  };

  handleNavigationChange = (prevState, currentState, action) => {
    const { isTransitioning, routes } = currentState;
    if (isTransitioning) {
      const { routeName } = last(routes);
      this.props.handleNavChange(routeName);
    }
  };

  render() {
    const { Navigator } = this.state;
    console.log("Navigator", Navigator);
    if (!Navigator) {
      return null;
    }
    return (
      <Navigator
        onNavigationStateChange={this.handleNavigationChange}
        ref={this.handleRef}
      />
    );
  }
}
