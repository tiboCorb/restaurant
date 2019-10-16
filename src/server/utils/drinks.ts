import {curry, flip, pipe} from "ramda"
import Drink from "../models/drink"

export interface IDrink {
    name: string;
    alcohol: boolean;
    alcohol_volume: number;
    price: number;
    cl: number;
    id: number;
}
const initDrink = (): IDrink => {
    return {
        name: "",
        alcohol: false,
        alcohol_volume: 0,
        price: 0,
        cl: 0,
        id: null
    }
}

export const writeDrinkToMongo = (drink: IDrink, mongoConn: Promise<any>) => {
    return mongoConn.then((m) => {
        return Drink.create({
            name: drink.name,
            price: drink.price,
            cl: drink.cl,
            id: drink.id,
            alcohol: drink.alcohol,
            alcoholVolume: drink.alcohol_volume
        }).then((d) => d)
        .catch((e) => e)
    })
}

const setDrinkName = (drink: IDrink, name: string): IDrink => {
    return {
        ...drink,
        name: name
    }
}

const setDrinkPrice = (drink: IDrink, price: number): IDrink => {
    return {
        ...drink,
        price: price
    }
}

const setDrinkId = (drink: IDrink, id: number): IDrink => {
    return {
        ...drink,
        id: id
    }
}

const setDrinkQuantity = (drink: IDrink, cl: number): IDrink => {
    return {
        ...drink,
        cl: cl
    }
}

const setDrinkIsAlcoholic = (drink: IDrink): IDrink => {
    return {
        ...drink,
        alcohol: !drink.alcohol
    }
}

const setDrinkAlcoholVolume = (drink: IDrink, alcoholVolume: number): IDrink => {
    return {
        ...drink,
        alcohol_volume: alcoholVolume
    }
}

const curriedDrinkName = curry(flip(setDrinkName))
const curriedDrinkPrice = curry(flip(setDrinkPrice))
const curriedDrinkId = curry(flip(setDrinkId))
const curriedDrinkQty = curry(flip(setDrinkQuantity))

export const createDrink = (name: string, price: number, id: number, quantity: number): IDrink => {
    return pipe(
        initDrink,
        curriedDrinkName(name),
        curriedDrinkPrice(price),
        curriedDrinkId(id),
        curriedDrinkQty(quantity),
    )()
}

export {
    initDrink,
    setDrinkName,
    setDrinkPrice,
    setDrinkId,
    setDrinkQuantity,
    setDrinkAlcoholVolume,
    setDrinkIsAlcoholic
}
