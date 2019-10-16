import {IDishMongo, dishSchema} from "../schemas/dish"
import {model} from "mongoose"

const Dish = model<IDishMongo>("Dish", dishSchema);

export default Dish;