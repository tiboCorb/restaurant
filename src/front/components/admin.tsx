import * as React from "react";
import { Menu, Segment, List, Header, Icon, Button, Modal } from "semantic-ui-react";
import { IDish, Temperature } from "../../server/utils/dishes";
import { ISweet } from "../../server/utils/sweets";
import { IDrink } from "../../server/utils/drinks";
import { without } from "ramda";
import { Modals } from './modals';
import { Icons } from './icons';
import Add from './add';
import Update from './update';
import QuickUpdate from './quickUpdate';
import { HttpService } from "../services/httpservice"
import inc from "ramda/es/inc";

interface IProps {
    itemsToAdmin: string[];
}

interface IState {
    activeTab: string;
    dishes: IDish[];
    sweets: ISweet[];
    drinks: IDrink[];
    openModal: boolean;
    currentItemSelected: any;
    errorMessage: string;
}



export default class Admin extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            activeTab: this.props.itemsToAdmin[0],
            dishes: [],
            sweets: [],
            drinks: [],
            openModal: false,
            currentItemSelected: {},
            errorMessage: ''
        };
        this.switchTab = this.switchTab.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.callErrorModal = this.callErrorModal.bind(this);
        this.callSuccessModal = this.callSuccessModal.bind(this);
        this.update = this.update.bind(this);
        this.addItem = this.addItem.bind(this);
        this.successModal = React.createRef();
        this.errorModal = React.createRef();

    }

    private successModal;

    private errorModal;

    componentDidMount = () => {
        HttpService.getDishes().then((response) => this.setState({ dishes: response.data })).catch((reason) => this.callErrorModal(reason))
        HttpService.getSweets().then((response) => this.setState({ sweets: response.data })).catch((reason) => this.callErrorModal(reason))
        HttpService.getDrinks().then((response) => this.setState({ drinks: response.data })).catch((reason) => this.callErrorModal(reason))
    }


    private switchTab = (e: React.MouseEvent, name: string) => {
        this.setState({ activeTab: name });
    };

    private renderDishesOrSweets = (obj: IDish[] | ISweet[]) => {
        return (
            <Segment padded>
                <List divided verticalAlign='middle' relaxed animated>
                    {obj.map((o, i) => {
                        return (
                            <List.Item key={i} onClick={() => this.openModal(o)}>
                                <List.Icon verticalAlign='middle'>{o.isVegan ? Icons.isVegan() : Icons.isNotVegan()}</List.Icon>
                                <List.Icon verticalAlign='middle'>{o.homemade ? Icons.isHomemade() : Icons.isNotHomemade()}</List.Icon>
                                <List.Icon verticalAlign='middle'
                                    name={o.temperature == Temperature.COLD ? 'snowflake' : 'fire'}
                                    color={o.temperature == Temperature.COLD ? 'teal' : 'orange'}
                                    size='large'
                                />
                                <List.Content style={{ position: 'relative' }}>
                                    <List.Header as='a'>{o.name}</List.Header>
                                    <List.Description as='a'>Ingrédients : {o.ingredients.join(", ")}</List.Description>
                                    <List.Description as='a'>Prix : {`${o.price} €`}</List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
            </Segment>
        );
    }

    private renderDrinks = (obj: IDrink[]) => {
        return (
            <Segment padded>
                <List divided verticalAlign='middle' relaxed animated>
                    {obj.map((o, i) => {
                        return (
                            <List.Item key={i} onClick={() => this.openModal(o)} >
                                <List.Icon verticalAlign='middle'>{o.alcohol ? Icons.isAlcohol() : Icons.isNotAlcohol()}</List.Icon>
                                <List.Icon verticalAlign='middle'>{o.alcohol_volume ? o.alcohol_volume : 0}<Icon name='percent' /> </List.Icon>
                                <List.Content style={{ position: 'relative' }}>
                                    <List.Header as='a'>{o.name}</List.Header>
                                    <List.Description as='a'>Quantité : {o.cl} cl</List.Description>
                                    <List.Description as='a'>Prix : {o.price} €</List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}

                </List>
            </Segment>
        )
    }

    private getEmptyPlaceholder = () => {
        return (
            <Segment placeholder attached="bottom">
                <Header icon>
                    <Icon name='question circle' />
                    Pas d'éléments à afficher pour cette catégorie
                </Header>
            </Segment>
        )
    }

    private closeModal = () => {
        this.setState({ openModal: false })
    }

    private openModal = (item: IDrink | ISweet | IDish) => {
        this.setState({ openModal: true })
        this.setState({ currentItemSelected: item })
    }

    private callErrorModal = (errorMessage: string) => {
        this.setState({ errorMessage: errorMessage });
        this.errorModal.current.setState({ modalOpen: true });
    }

    private callSuccessModal = () => {
        this.successModal.current.setState({ modalOpen: true });
    }

    private deleteItem(item: any) {
        switch (this.state.activeTab.toLowerCase()) {
            case 'plats':
                HttpService.removeDish(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ dishes: without([item], this.state.dishes) });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
            case 'boissons':
                HttpService.removeDrink(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ drinks: without([item], this.state.drinks) });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
            case 'desserts':
                HttpService.removeSweet(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ sweets: without([item], this.state.sweets) });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
        }

    }

    private getConfigModal = () => {
        return (
            <Modal dimmer='blurring' open={this.state.openModal} basic size='small' onClose={this.closeModal} closeIcon>
                <Header icon='cogs' content="Gestion de l'objet" />
                <Modal.Content>
                    Quelle action souhaitez-vous effectuer sur {this.state.currentItemSelected.name} ?
                    </Modal.Content>
                <Modal.Actions>

                    <Button inverted onClick={this.deleteItem}>
                        Supprimer
                    </Button>
                    <Update currentItem={this.state.currentItemSelected} item={this.state.activeTab} updateParentState={this.update} ></Update>
                    <QuickUpdate currentItem={this.state.currentItemSelected} item={this.state.activeTab} updateParentState={this.quickUpdate}></QuickUpdate>
                </Modal.Actions>
            </Modal>
        )
    }

    private addItem = (item: IDrink | IDish | ISweet) => {
        const name = this.state.activeTab.toLowerCase();
        switch (name) {
            case 'plats':
                item = item as IDish;
                const dishes = this.state.dishes;
                item.id = inc(dishes.length);
                dishes.push(item);
                HttpService.addDish(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ dishes: dishes });
                    }
                }).catch((reason) => this.callErrorModal(reason))

                break;
            case 'boissons':
                item = item as IDrink;
                const drinks = this.state.drinks;
                item.id = inc(drinks.length);
                drinks.push(item);
                HttpService.addDrink(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ drinks: drinks });
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
            case 'desserts':
                item = item as ISweet;
                const sweets = this.state.sweets;
                item.id = inc(sweets.length);
                sweets.push(item);
                HttpService.addSweet(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ sweets: sweets });
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
        }
    }

    private update = (item: IDrink | IDish | ISweet) => {
        const name = this.state.activeTab.toLowerCase();
        switch (name) {
            case 'plats':
                item = item as IDish;
                const dishes = this.state.dishes;
                const dishIndex = this.state.dishes.findIndex(el => el.id === item.id);
                dishes[dishIndex] = item;
                HttpService.updateDish(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ dishes: dishes });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))

                break;
            case 'boissons':
                item = item as IDrink;
                const drinks = this.state.drinks;
                const drinkIndex = this.state.drinks.findIndex(el => el.id === item.id);
                drinks[drinkIndex] = item;
                HttpService.updateDrink(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ drinks: drinks });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
            case 'desserts':
                item = item as ISweet;
                const sweets = this.state.sweets;
                const sweetIndex = this.state.sweets.findIndex(el => el.id === item.id);
                sweets[sweetIndex] = item;

                HttpService.updateSweet(item).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ sweets: sweets });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
        }
    }

    private quickUpdate = (item: any) => {
        const name = this.state.activeTab.toLowerCase();
        let tmpItem
        switch (name) {
            case 'plats':
                tmpItem = item.item as IDish;
                const dishes = this.state.dishes;
                const dishIndex = this.state.dishes.findIndex(el => el.id === tmpItem.id);
                dishes[dishIndex] = tmpItem;
                HttpService.quickUpdateDish(tmpItem.id, item.att, tmpItem[`${item.att}`]).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ dishes: dishes });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))

                break;
            case 'boissons':
                tmpItem = item.item as IDrink;
                const drinks = this.state.drinks;
                const drinkIndex = this.state.drinks.findIndex(el => el.id === tmpItem.id);
                drinks[drinkIndex] = tmpItem;
                HttpService.quickupdateDrinks(tmpItem.id, item.att, tmpItem[`${item.att}`]).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ drinks: drinks });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
            case 'desserts':
                tmpItem = item.item as ISweet;
                const sweets = this.state.sweets;
                const sweetIndex = this.state.sweets.findIndex(el => el.id === tmpItem.id);
                sweets[sweetIndex] = tmpItem;

                HttpService.quickupdateSweet(tmpItem.id, item.att, tmpItem[`${item.att}`]).then((response) => {
                    if (response) {
                        this.callSuccessModal();
                        this.setState({ sweets: sweets });
                        this.closeModal();
                    }
                }).catch((reason) => this.callErrorModal(reason))
                break;
        }
    }


    render = () => {
        const name = this.state.activeTab.toLowerCase();
        let contentToShow = null;
        switch (name) {
            case 'plats':
                contentToShow = this.state.dishes.length > 0 ? this.renderDishesOrSweets(this.state.dishes) : this.getEmptyPlaceholder();
                break;
            case 'desserts':
                contentToShow = this.state.sweets.length > 0 ? this.renderDishesOrSweets(this.state.sweets) : this.getEmptyPlaceholder();
                break;
            case 'boissons':
                contentToShow = this.state.drinks.length > 0 ? this.renderDrinks(this.state.drinks) : this.getEmptyPlaceholder();
                break;
            default:
                contentToShow = this.getEmptyPlaceholder();
                break;
        }
        return (
            <div>
                <Menu pointing secondary>
                    {this.props.itemsToAdmin.map((name, index) => (
                        <Menu.Item
                            name={name}
                            active={this.state.activeTab === name}
                            onClick={(e, { name }) => this.switchTab(e, name)}
                            key={index}
                        />
                    ))}
                </Menu>
                {contentToShow}
                {this.getConfigModal()}
                <Modals.SuccessModal ref={this.successModal} />
                <Modals.ErrorModal ref={this.errorModal} errorMessage={this.state.errorMessage} />
                <Add item={this.state.activeTab} updateParentState={this.addItem} />
            </div>
        );
    }
}
