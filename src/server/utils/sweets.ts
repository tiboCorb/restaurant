import { IDish, initDish, setDishName, setDishPrice, setDishIngredients, setDishHomemade, setDishId, setDishVegan, Temperature, setDishTemperature } from "./dishes";
import {curry, flip, pipe} from "ramda"
import Sweet from "../models/sweet"
import {ISweetMongo} from "../schemas/sweet"

interface ISweet extends IDish {}

export const writeSweetToMongo = (sweet: ISweet, mongoConn: Promise<any>): Promise<ISweetMongo> => {
    return mongoConn.then((m) => {
        return Sweet.create({
            name: sweet.name,
            price: sweet.price,
            temperature: sweet.temperature,
            homemade: sweet.homemade,
            isVegan: sweet.isVegan,
            id: sweet.id,
            ingredients: sweet.ingredients
        }).then((d) => d)
        .catch((e) => e)
    })
 }

const initSweet = (): ISweet => {
    return (initDish() as ISweet)
}

const setSweetName = (sweet: ISweet, name: string): ISweet => {
    return (setDishName(sweet, name) as ISweet)
}

const setSweetPrice = (sweet: ISweet, price: number): ISweet => {
    return (setDishPrice(sweet, price) as ISweet)
}

const setSweetIngredients = (sweet: ISweet, ingredients: string[]): ISweet => {
    return (setDishIngredients(sweet, ingredients) as ISweet)
}

const setSweetHomemade = (sweet: ISweet): ISweet => {
    return (setDishHomemade(sweet) as ISweet)
}

const setSweetVegan = (sweet: ISweet): ISweet => {
    return (setDishVegan(sweet) as ISweet)
}

const setSweetId = (sweet: ISweet, id: number): ISweet => {
    return (setDishId(sweet, id) as ISweet)
}

const setSweetTemperature = (sweet: ISweet, temp: Temperature): ISweet => {
    return (setDishTemperature(sweet, temp) as ISweet)
}

const curriedSetSweetName = curry(flip(setSweetName))
const curriedSetSweetPrice = curry(flip(setSweetPrice))
const curriedSetSweetIngredients = curry(flip(setSweetIngredients))
const curriedSetSweetId = curry(flip(setSweetId))
const curriedSetSweetTemperature = curry(flip(setSweetTemperature))

const createSweet = (name: string, price: number, ingredients: string[], id: number, temp: Temperature) => {
    return pipe(
        initSweet,
        curriedSetSweetName(name),
        curriedSetSweetPrice(price),
        curriedSetSweetIngredients(ingredients),
        curriedSetSweetId(id),
        curriedSetSweetTemperature(temp)
    )()
}

export {
    initSweet,
    setSweetName,
    setSweetPrice,
    setSweetIngredients,
    setSweetHomemade,
    setSweetVegan,
    setSweetId,
    setSweetTemperature,
    createSweet,
    ISweet
}