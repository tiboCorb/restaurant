import {Document, Schema} from "mongoose"
import {ISweet} from "../utils/sweets"
import {Temperature, IDish} from "../utils/dishes"

export interface ISweetMongo extends Document, ISweet {
    name: string;
    price: number;
    ingredients: string[];
    temperature: Temperature;
    homemade: boolean;
    isVegan: boolean;
    id: number;
}

export const sweetSchema = new Schema({
    name: String,
    alcohol: Boolean,
    alcohol_volume: Number,
    price: Number,
    cl: Number,
    id: Number
});

export const sweetMapper = (sweet: ISweet): ISweetMongo => {
    return sweet as ISweetMongo;
}

export const sweetMongoMapper = (sweetMongo: ISweetMongo): ISweet => {
    return {
        name: sweetMongo.name,
        price: sweetMongo.price,
        ingredients: sweetMongo.ingredients,
        isVegan: sweetMongo.isVegan,
        homemade: sweetMongo.homemade,
        id: sweetMongo.id,
        temperature: sweetMongo.temperature
    }
}
