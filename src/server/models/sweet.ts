import {ISweetMongo, sweetSchema} from "../schemas/sweet"
import {model} from "mongoose"

const Sweet = model<ISweetMongo>("Sweet", sweetSchema);

export default Sweet;