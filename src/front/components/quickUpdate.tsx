import * as React from "react";
import { Button, Icon, Form, Modal, Message, Select } from 'semantic-ui-react';
import { IDish, initDish, Temperature } from "../../server/utils/dishes";
import { IDrink, initDrink } from "../../server/utils/drinks";
import { ISweet, initSweet } from "../../server/utils/sweets";

import { Dropdown } from 'semantic-ui-react'

import { init } from "ramda";
import isNil from "ramda/es/isNil";

import * as _ from 'lodash';

interface IState {
    itemToUpdate: IDrink | ISweet | IDish
    isOpened: boolean
    ingredientsAsString: string
    option: Array<any>
    selected :string

}

interface IProps {
    item: string
    currentItem: IDrink | ISweet | IDish
    updateParentState: Function

}


export default class QuickUpdate extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.changeDrink = this.changeDrink.bind(this);
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
       

        let tempOption = [];
        let index = 0;

        _.keys(props.currentItem).forEach(el => {
            if (el !== 'id') {
                tempOption = [...tempOption, {
                    key: index,
                    text: el,
                    value: el,
                }]
                index++
            }
        })



        this.state = { itemToUpdate: props.currentItem, isOpened: false, ingredientsAsString: '', option: tempOption, selected: 'name' }



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



    private submit = () => {
        this.props.updateParentState({item : this.props.currentItem, att :this.state.selected});
        setTimeout(this.close, 200);
    }

    private changeDrink = (e: React.ChangeEvent<any>, { name, value, checked }) => {
        let currentDrink = this.props.currentItem as IDrink;
        currentDrink[name] = e.type === 'mouseup' ? checked : value;
        this.setState({ itemToUpdate: currentDrink });
    }

    private changeDishOrSweet = (e: React.ChangeEvent<any>, { name, value, checked }) => {
        const dishOrSweet = this.props.currentItem as ISweet | IDish;
        let ingredients: string = '';
        if (name === 'ingredientsAsString') {
            ingredients = value;
            dishOrSweet.ingredients = ingredients.split("\n");
            this.setState({ ingredientsAsString: ingredients, itemToUpdate: dishOrSweet })
        } else {
            dishOrSweet[name] = (e.type === 'mouseup' && name != 'temperature') ? checked : value;
            this.setState({ itemToUpdate: dishOrSweet });
        }
    }

    private ingredientsToString(ingredients: Array<string>): string {
        let ingredientsString = '';

        ingredients.forEach(el => {
            ingredientsString += el + '\n'
        })

        return ingredientsString
    }

    private close = () => {

        this.setState({ isOpened: false })
    }

    private open = (e: React.MouseEvent) => {
       
        this.setState({ isOpened: true })
    }

    private getFormForDishOrSweet = (att: string) => {
        const dishOrSweet = this.props.currentItem as ISweet | IDish;
        this.ingredientsToString(dishOrSweet.ingredients);
        isNil(dishOrSweet.id) ? dishOrSweet.id = 0 : dishOrSweet.id;
        isNil(dishOrSweet.temperature) ? dishOrSweet.temperature = 0 : dishOrSweet.temperature;

        switch (att) {
            case 'name':
                return (<Form onSubmit={this.submit}>
                    <Form.Input label='Nom' name='name' value={dishOrSweet.name} onChange={this.changeDishOrSweet} required />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)

            case 'price':
                return (<Form onSubmit={this.submit}>
                    <Form.Input label='Prix' name='price' type='number' step='0.01' min='1' value={dishOrSweet.price} onChange={this.changeDishOrSweet} required />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)

            case 'isVegan':
                return (<Form onSubmit={this.submit}>
                    <Form.Checkbox toggle label="Convient aux végétaliens ?" name='isVegan' onChange={this.changeDishOrSweet} checked={dishOrSweet.isVegan} />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)
            case 'homemade':
                return (<Form onSubmit={this.submit}>
                    <Form.Checkbox toggle label="Fait maison ?" name='homemade' onChange={this.changeDishOrSweet} checked={dishOrSweet.homemade} />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)
            case 'temperature':
                return (<Form onSubmit={this.submit}>
                    <Form.Group>
                        <label>Température</label>
                        <Form.Radio name='temperature' label='Chaud' value={Temperature.HOT} checked={dishOrSweet.temperature === Temperature.HOT} onChange={this.changeDishOrSweet} />
                        <Form.Radio name='temperature' label='Froid' value={Temperature.COLD} checked={dishOrSweet.temperature === Temperature.COLD} onChange={this.changeDishOrSweet} />
                    </Form.Group>                <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)
            case 'ingredients':
                return (<Form onSubmit={this.submit}>
                    <Form.TextArea label="Liste d'ingrédients (un par ligne)" name='ingredientsAsString' onChange={this.changeDishOrSweet} value={this.ingredientsToString(dishOrSweet.ingredients)} required />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)



        }
    }

    private getFormForDrink = (att: string) => {
        const drink = this.props.currentItem as IDrink;
        isNil(drink.id) ? drink.id = 0 : drink.id;
        isNil(drink.alcohol_volume) ? drink.alcohol_volume = 0 : drink.alcohol_volume;
        isNil(drink.cl) ? drink.cl = 0 : drink.cl;


        switch (att) {
            case 'name':
                return (<Form onSubmit={this.submit}>
                    <Form.Input label='Nom' name='name' value={drink.name} onChange={this.changeDrink} required />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)

            case 'price':
                return (<Form onSubmit={this.submit}>
                    <Form.Input label='Prix' name='price' type='number' step='0.01' min='1' value={drink.price} onChange={this.changeDrink} required />
                    <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)

            case 'cl':
                return (<Form onSubmit={this.submit}>
                    <Form.Input label='Quantité (cl)' name='cl' type='number' min='1' value={drink.cl} onChange={this.changeDrink} required />                <Form.Group widths='1'>
                        <Form.Button primary content='Valider' />
                        <Form.Button secondary content='Annuler' onClick={this.close} />
                    </Form.Group>
                </Form>)
            case 'alcohol':
                return (<Form onSubmit={this.submit}>
                    <Form.Checkbox toggle label="Contient de l'alcool ?" name='alcohol' onChange={this.changeDrink} checked={drink.alcohol} />                     <Form.Button primary content='Valider' />
                    <Form.Group widths='1'>
                    <Form.Button primary content='Valider' />
                    <Form.Button secondary content='Annuler' onClick={this.close} />
                 </Form.Group>
             </Form >)
             case 'alcohol_volume':
             return (<Form onSubmit={this.submit}>
                <Form.Input label="Degrés d'alcool" type='number' step='0.01' name='alcohol_volume' value={drink.alcohol_volume} onChange={this.changeDrink} />
                 <Form.Group widths='1'>
                 <Form.Button primary content='Valider' />
                 <Form.Button secondary content='Annuler' onClick={this.close} />
              </Form.Group>
          </Form >)
        }
    }

    
  onChange = (e, data) => {
    this.setState({ selected: data.value });
    this.open(e);
  }


    componentDidMount = () => {
        this.setState({ itemToUpdate: this.getTypeObjet(this.props.item) })
    }

    render = () => {
        const itemLabel = init(this.props.item.toLowerCase());
        return (
            <Modal trigger={
              
                <Dropdown selection onChange={(this.onChange )} value={this.state.selected}   text='Modif rapide' options={this.state.option}  item />}
                open={this.state.isOpened}
            >
                <Modal.Header>Modifier {itemLabel === 'boisson' ? 'une' : 'un'} {itemLabel}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {itemLabel === 'boisson' ? this.getFormForDrink(this.state.selected) : this.getFormForDishOrSweet(this.state.selected)}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}