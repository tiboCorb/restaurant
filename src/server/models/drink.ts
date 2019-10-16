import {IDrinkMongo, drinkSchema} from "../schemas/drink"
import {model} from "mongoose"

const Drink = model<IDrinkMongo>("Drink", drinkSchema);

export default Drink;