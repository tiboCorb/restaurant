import * as React from "react"
import { Modal, Header, Button } from 'semantic-ui-react';
import PropsHolder from "./propsholder";

export namespace Modals {
    interface IState {
        modalOpen: boolean
    }

    interface IProps {
        errorMessage: string;
    }

    export class SuccessModal extends React.Component<{}, IState> {
        constructor(props: any) {
            super(props);
            this.state = { modalOpen: false };
        }

        private close = () => {
            this.setState({ modalOpen: false });
        }

        private open = () => {
            this.setState({ modalOpen: true });
        }

        render() {
            return (
                <Modal open={this.state.modalOpen} onClose={this.close} size='small'>
                    <Header icon="check" content="Succès" />
                    <Modal.Content>
                        <Modal.Description>
                            Action réalisée avec succès
                            </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.close}>
                            OK
                        </Button>
                    </Modal.Actions>
                </Modal>
            )
        }
    }

    export class ErrorModal extends React.Component<IProps, IState> {
        constructor(props: any) {
            super(props);
            this.state = { modalOpen: false };
        }

        private close = () => {
            this.setState({ modalOpen: false });
        }

        private open = () => {
            this.setState({ modalOpen: true });
        }

        render() {
            return (
                <PropsHolder data={this.props.errorMessage}>
                    <Modal open={this.state.modalOpen} onClose={this.close} size='small'>
                        <Header icon="check" content="Succès" />
                        <Modal.Content>
                            <Modal.Description>
                                Action réalisée avec succès
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' inverted onClick={this.close}>
                                OK
                        </Button>
                        </Modal.Actions>
                    </Modal>
                </PropsHolder>
            )
        }
    }
}