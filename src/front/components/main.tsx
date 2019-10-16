import * as React from "react";
import { Grid, Segment, Divider, Header, Icon, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../styles/main.css";
import withAppHeader from "../hoc/withAppHeader";
import welcomeSplashScreen from "./welcomeSplashScreen";
import withTimedTransitionFadeUp from "../hoc/withTimedTransitionFadeUp";
import access from "./access";

const TimedTransitionAccess = withTimedTransitionFadeUp(access(), 200);

const Main = (): React.ReactElement => {
	return (
		<React.Fragment>
			{withAppHeader(welcomeSplashScreen(), "Restauratec", "utensils")}
			<TimedTransitionAccess />
		</React.Fragment>
	)
}

export default Main;