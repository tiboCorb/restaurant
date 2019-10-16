import {Document, Schema} from "mongoose"
import {IDrink} from "../utils/drinks"

export interface IDrinkMongo extends Document, IDrink {
    name: string;
    alcohol: boolean;
    alcohol_volume: number;
    price: number;
    cl: number;
    id: number;
}

export const drinkSchema = new Schema({
    name: String,
    alcohol: Boolean,
    alcohol_volume: Number,
    price: Number,
    cl: Number,
    id: Number
});

export const drinkMapper = (drink: IDrink): IDrinkMongo => {
    return drink as IDrinkMongo;
}

export const drinkMongoMapper = (drinkMongo: IDrinkMongo): IDrink => {
    return {
        name: drinkMongo.name,
        price: drinkMongo.price,
        id: drinkMongo.id,
        cl: drinkMongo.cl,
        alcohol: drinkMongo.alcohol,
        alcohol_volume: drinkMongo.alcohol_volume
    }
}
