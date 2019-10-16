import * as React from "react";
import { TransitionGroup } from "semantic-ui-react";

interface IProps {}
interface IState {
	makeVisible: boolean;
}

const withTimedTransitionFadeUp = (component: React.ReactElement, timeInMs: number) => {
	return class extends React.Component<IProps, IState> {

		private timeOutId;

		constructor(props: IProps) {
			super(props);
			this.handleChange = this.handleChange.bind(this)
			this.state = {
				makeVisible: false
			}
		}

		componentDidMount() {
			this.timeOutId = setTimeout(() => {
				this.handleChange()
			}, timeInMs)
		}
	    
		componentWillUnmount = () => {
			clearTimeout(this.timeOutId);
		}

		handleChange = () => {
			this.setState({makeVisible: true})
		}

		render() {
			return(
				<TransitionGroup animation="fade up" duration="700">
					{this.state.makeVisible && component}
				</TransitionGroup>
			)
		}
	}
}

export default withTimedTransitionFadeUp;