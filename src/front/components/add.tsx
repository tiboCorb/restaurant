import * as React from "react";
import { Button, Icon, Form, Modal, Message } from 'semantic-ui-react';
import { IDish, initDish, Temperature } from "../../server/utils/dishes";
import { IDrink, initDrink } from "../../server/utils/drinks";
import { ISweet, initSweet } from "../../server/utils/sweets";
import { init } from "ramda";
import isNil from "ramda/es/isNil";

interface IState {
    itemToCreate: IDrink | ISweet | IDish
    isOpened: boolean
    ingredientsAsString: string
}

interface IProps {
    item: string
    updateParentState: Function
}

export default class Add extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.changeDrink = this.changeDrink.bind(this);
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = { itemToCreate: { name: '', id: 0, price: 0, homemade: false, isVegan: false, ingredients: [], alcohol: false, alcohol_volume: 0, cl: 0 }, isOpened: false, ingredientsAsString: '' }
    }

    private getTypeObjet = (type: string): IDish | ISweet | IDrink => {
        switch (init(type.toLowerCase())) {
            case 'plat':
                return initDish()
            case 'boisson':
                return initDrink()
            case 'dessert':
                return initSweet()
        }
    }

    private resetState = () => {
        this.setState({ itemToCreate: { name: '', id: 0, price: 0, homemade: false, isVegan: false, ingredients: [], alcohol: false, alcohol_volume: 0, cl: 0 }, isOpened: false, ingredientsAsString: '' });
    }

    private submit = () => {
        this.props.updateParentState(this.state.itemToCreate);
        setTimeout(this.close, 200);
        this.resetState();
    }

    private changeDrink = (e: React.ChangeEvent<any>, { name, value, checked }) => {
        let currentDrink = this.state.itemToCreate as IDrink;
        currentDrink[name] = e.type === 'mouseup' ? checked : value;
        this.setState({ itemToCreate: currentDrink });
    }

    private changeDishOrSweet = (e: React.ChangeEvent<any>, { name, value, checked }) => {
        const dishOrSweet = this.state.itemToCreate as ISweet | IDish;
        let ingredients: string = '';
        if (name === 'ingredientsAsString') {
            ingredients = value;
            dishOrSweet.ingredients = ingredients.split("\n");
            this.setState({ ingredientsAsString: ingredients, itemToCreate: dishOrSweet })
        } else {
            dishOrSweet[name] = (e.type === 'mouseup' && name != 'temperature') ? checked : value;
            this.setState({ itemToCreate: dishOrSweet });
        }
    }

    private close = () => {
        this.setState({ isOpened: false })
    }

    private open = () => {
        this.setState({ isOpened: true })
    }

    private getFormForDishOrSweet = () => {
        const dishOrSweet = this.state.itemToCreate as ISweet | IDish;
        isNil(dishOrSweet.id) ? dishOrSweet.id = 0 : dishOrSweet.id;
        isNil(dishOrSweet.temperature) ? dishOrSweet.temperature = 0 : dishOrSweet.temperature;
        return (
            <Form onSubmit={this.submit}>
                <Form.Input label='Nom' name='name' value={dishOrSweet.name} onChange={this.changeDishOrSweet} required />
                <Form.Input label='Prix' name='price' type='number' step='0.01' min='1' value={dishOrSweet.price} onChange={this.changeDishOrSweet} required />
                <Form.Checkbox toggle label="Convient aux végétaliens ?" name='isVegan' onChange={this.changeDishOrSweet} checked={dishOrSweet.isVegan} />
                <Form.Checkbox toggle label="Fait maison ?" name='homemade' onChange={this.changeDishOrSweet} checked={dishOrSweet.homemade} />
                <Form.Group>
                    <label>Température</label>
                    <Form.Radio name='temperature' label='Chaud' value={Temperature.HOT} checked={dishOrSweet.temperature === Temperature.HOT} onChange={this.changeDishOrSweet} />
                    <Form.Radio name='temperature' label='Froid' value={Temperature.COLD} checked={dishOrSweet.temperature === Temperature.COLD} onChange={this.changeDishOrSweet} />
                </Form.Group>
                <Form.TextArea label="Liste d'ingrédients (un par ligne)" name='ingredientsAsString' onChange={this.changeDishOrSweet} value={this.state.ingredientsAsString} required />
                <Form.Group widths='1'>
                    <Form.Button primary content='Valider' />
                    <Form.Button secondary content='Annuler' onClick={this.close} />
                </Form.Group>
            </Form>
        )
    }

    private getFormForDrink = () => {
        const drink = this.state.itemToCreate as IDrink;
        isNil(drink.id) ? drink.id = 0 : drink.id;
        isNil(drink.alcohol_volume) ? drink.alcohol_volume = 0 : drink.alcohol_volume;
        isNil(drink.cl) ? drink.cl = 0 : drink.cl;
        return (
            <Form onSubmit={this.submit}>
                <Form.Input label='Nom' name='name' value={drink.name} onChange={this.changeDrink} required />
                <Form.Input label='Prix' name='price' type='number' step='0.01' min='1' value={drink.price} onChange={this.changeDrink} required />
                <Form.Input label='Quantité (cl)' name='cl' type='number' min='1' value={drink.cl} onChange={this.changeDrink} required />
                <Form.Checkbox toggle label="Contient de l'alcool ?" name='alcohol' onChange={this.changeDrink} checked={drink.alcohol} />
                <Form.Input label="Degrés d'alcool" type='number' step='0.01' name='alcohol_volume' value={drink.alcohol_volume} onChange={this.changeDrink} />
                <Form.Group widths='1'>
                    <Form.Button primary content='Valider' />
                    <Form.Button secondary content='Annuler' onClick={this.close} />
                </Form.Group>
            </Form>
        )
    }

    componentDidMount = () => {
        this.setState({ itemToCreate: this.getTypeObjet(this.props.item) })
    }

    render = () => {
        const itemLabel = init(this.props.item.toLowerCase());
        return (
            <Modal trigger={
                <Button primary icon labelPosition='left' onClick={this.open}>
                    <Icon name='plus' />
                    Ajouter
                </Button>
                
            }
                open={this.state.isOpened}
            >
                <Modal.Header>Ajouter {itemLabel === 'boisson' ? 'une' : 'un'} {itemLabel}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {itemLabel === 'boisson' ? this.getFormForDrink() : this.getFormForDishOrSweet()}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}