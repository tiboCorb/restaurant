import {Document, Schema} from "mongoose"
import {Temperature, IDish} from "../utils/dishes"

export interface IDishMongo extends Document, IDish {
    name: string;
    price: number;
    ingredients: string[];
    temperature: Temperature;
    homemade: boolean;
    isVegan: boolean;
    id: number;
}

export const dishSchema = new Schema({
    name: String,
    price: Number,
    ingredients:[String],
    temperature: Number,
    homemade: Boolean,
    isVegan: Boolean,
    id: Number
}, {
    collection : "dishes"
});

export const dishMapper = (dish: IDish): IDishMongo => {
    return dish as IDishMongo;
}

export const dishMongoMapper = (dishMongo: IDishMongo): IDish => {
    return {
        name: dishMongo.name,
        price: dishMongo.price,
        ingredients: dishMongo.ingredients,
        isVegan: dishMongo.isVegan,
        homemade: dishMongo.homemade,
        id: dishMongo.id,
        temperature: dishMongo.temperature
    }
}

