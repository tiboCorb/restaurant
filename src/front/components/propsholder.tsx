import * as React from "react"

interface IProps {
    data: any;
}

export default class PropsHolder extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render = () => {
        return (<div>{this.props.children}</div>)
    }
}