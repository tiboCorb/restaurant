import * as React from "react";
import { Header, Image } from "semantic-ui-react";

const welcomeSplashScreen = (): React.ReactElement => {
	return(
		<React.Fragment>
			<Image src="../assets/restaurant-cover.jpg" alt="Image de restaurant" centered bordered />
			<Header textAlign='center'>
				Bienvenue dans votre application de gestion de restaurant !
			</Header>
		</React.Fragment>
	)
}

export default welcomeSplashScreen