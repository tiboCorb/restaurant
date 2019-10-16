import { render } from "react-dom";
import * as React from "react";
import Main from './components/main';
import 'semantic-ui-css/semantic.min.css';
import AppRouter from './components/approuter';

const App = () => {
	return(
		<AppRouter />
	)
}
render(<App />, document.getElementById("appRoot"));