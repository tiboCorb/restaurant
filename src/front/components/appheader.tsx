import * as React from "react";
import { Menu, Icon, SemanticICONS } from "semantic-ui-react";

interface IProps {
	iconName: SemanticICONS;
	firstItemTitle: string;
}

export const AppHeader = (props: IProps): React.ReactElement => {
	return(
		<Menu stackable color="blue"inverted icon size="huge" fixed="top">
			<Menu.Item>
				<Icon name={props.iconName}/>
				{props.firstItemTitle}
			</Menu.Item>
		</Menu>
	)
}