import { createReadStream, createWriteStream } from "fs"
import { resolve } from "path"
import { curry, pipe, flip } from "ramda"
import { Document } from "mongoose"
import Dish from "../models/dish";
import { IDishMongo } from "../schemas/dish"

const getDataFromFile = (filePath: string): Promise<string> => {
    return new Promise((res, rej) => {
        let data = ""
        const stream = createReadStream(resolve(filePath))
        stream.on('data', (c) => data += c)
        stream.on('end', () => {
            res(data);
        })
        stream.on('error', (e) => rej(e))
    })
}

const writeToFile = (filePath: string, content: string): Promise<boolean> => {
    return new Promise((res, rej) => {
        getDataFromFile(resolve(filePath)).then((s) => {
            const retrievedContent: any[] = s ? JSON.parse(s) : []
            retrievedContent.push(JSON.parse(content))
            const stream = createWriteStream(resolve(filePath))
            stream.write(JSON.stringify(retrievedContent, null, 4), (e) => {
                if (e) {
                    rej(false)
                }
                res(true)
            })
            stream.on('error', () => rej(false))
            stream.close()
        }).catch(e => rej(false))
    })
}

export const writeDishToMongo = (dish: IDish, mongoConn: Promise<any>): Promise<IDishMongo> => {
    return mongoConn.then((m) => {
        return Dish.create({
            name: dish.name,
            price: dish.price,
            temperature: dish.temperature,
            homemade: dish.homemade,
            isVegan: dish.isVegan,
            id: dish.id,
            ingredients: dish.ingredients
        }).then((d) => d)
            .catch((e) => e)
    })
}

interface IDish {
    name: string,
    price: number,
    ingredients: string[],
    homemade: boolean,
    isVegan: boolean,
    id: number,
    temperature: Temperature
}

enum Temperature {
    HOT,
    COLD
}

const initDish = (): IDish => {
    return {
        name: "",
        price: 0,
        ingredients: [],
        homemade: false,
        isVegan: false,
        id: null,
        temperature: null
    }
}

const setDishName = (dish: IDish, name: string): IDish => {
    return {
        ...dish,
        name: name
    }
}

const setDishPrice = (dish: IDish, price: number): IDish => {
    return {
        ...dish,
        price: price
    }
}

const setDishIngredients = (dish: IDish, ingredients: string[]): IDish => {
    return {
        ...dish,
        ingredients: ingredients
    }
}

const setDishHomemade = (dish: IDish): IDish => {
    return {
        ...dish,
        homemade: !dish.homemade
    }
}

const setDishVegan = (dish: IDish): IDish => {
    return {
        ...dish,
        isVegan: !dish.isVegan
    }
}

const setDishId = (dish: IDish, id: number): IDish => {
    return {
        ...dish,
        id: id
    }
}

const setDishTemperature = (dish: IDish, temp: Temperature): IDish => {
    return {
        ...dish,
        temperature: temp
    }
}

export const curriedSetDishName = curry(flip(setDishName))
export const curriedSetDishPrice = curry(flip(setDishPrice))
export const curriedSetDishIngredients = curry(flip(setDishIngredients))
export const curriedSetDishId = curry(flip(setDishId))
export const curriedSetDishTemperature = curry(flip(setDishTemperature))

export const createHomemadeVeganDish = (name: string, price: number, ingredients: string[], id: number, temp: Temperature): IDish => {
    return pipe(
        initDish,
        curriedSetDishName(name),
        curriedSetDishPrice(price),
        curriedSetDishIngredients(ingredients),
        curriedSetDishId(id),
        curriedSetDishTemperature(temp),
        setDishHomemade,
        setDishVegan
    )()
}

// export const createDish = (name: String, price: number, ingredients: string[], id:number, temp: Temperature, isVegan: boolean, isHomemade: boolean): IDish => {
//     return pipe(
//         initDish,
//         curriedSetDishName(name),
//         curriedSetDishPrice(price),
//         curriedSetDishIngredients(ingredients),
//         curriedSetDishId(id),
//         curriedSetDishTemperature(temp),
//         isVegan ? setDishVegan : (d) => d.,
//         isHomemade ? setDishHomemade : (d) => d
//     )
// }

export {
    IDish,
    Temperature,
    initDish,
    setDishName,
    setDishHomemade,
    setDishId,
    setDishIngredients,
    setDishPrice,
    setDishTemperature,
    setDishVegan,
    getDataFromFile,
    writeToFile
}