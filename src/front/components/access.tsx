import *  as React from "react";
import { Segment, Grid, Divider, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const access = ():React.ReactElement => {
	return(
		<Segment placeholder>
			<Grid columns={2} stackable textAlign='center' relaxed>
				<Divider vertical>OU</Divider>
				<Grid.Row verticalAlign='middle'>
					<Grid.Column>
						<Header icon>
							<Icon name="cogs" />
							Administration
						</Header>
						<Link to="/admin"><Button primary>Accéder</Button></Link>
					</Grid.Column>
					<Grid.Column>
						<Header icon>
							<Icon name="coffee" />
							Application
						</Header>
						<Link to="/index"><Button primary>Accéder</Button></Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	)
}

export default access;

