import * as React from "react";
import { Header, Segment, Icon, Button } from 'semantic-ui-react';
import withAppHeader from "../hoc/withAppHeader";
import { Link } from "react-router-dom";

const PageNotFound = (): React.ReactElement => {
	const template = () => {
		return (
			<Segment placeholder>
				<Header icon>
					<Icon name="search" />
					La page demandée n'a pas été trouvée.
				</Header>
				<Segment.Inline>
					<Link to="/"><Button primary>Revenir à l'acceuil</Button></Link>
				</Segment.Inline>
			</Segment>
		)
	} 
	return withAppHeader(template(), "Restauratec", "utensils");
}

export default PageNotFound;