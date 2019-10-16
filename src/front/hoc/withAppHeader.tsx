import * as React from "react";
import { AppHeader } from "../components/appheader";
import { SemanticICONS, Grid } from "semantic-ui-react";

const withAppHeader = (component: React.ReactElement, title: string, icon: SemanticICONS): React.ReactElement => {
	return(
		<React.Fragment>
			<AppHeader firstItemTitle={title} iconName={icon} />
			<Grid id="splash-grid">
				<Grid.Row verticalAlign='middle'>
					<Grid.Column>
						{component}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</React.Fragment>
	)
}

export default withAppHeader;