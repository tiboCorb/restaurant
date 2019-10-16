import { Router } from "express"
import { initDish, IDish, getDataFromFile, setDishName, setDishHomemade, setDishId, setDishIngredients, setDishPrice, setDishTemperature, setDishVegan, writeToFile, createHomemadeVeganDish, Temperature } from "../utils/dishes";
import { createWriteStream } from "fs"
import { resolve } from "path"


const dishesRouter = Router()

dishesRouter.get("/:id?", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null
    getDataFromFile("./src/server/data/dishes.json").then((s) => {
        const dishes = JSON.parse(s)
        if (definedId === null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.send(dishes)
        } else {
            if (isNaN(definedId)) {
                res.statusCode = 404
                res.statusMessage = "Aucun plat trouvé"
                res.send()
            }
            const dish = dishes.filter(x => x.id === definedId)
            if (dish[0]) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.send(dish[0])
            } else {
                res.statusCode = 404
                res.statusMessage = "Aucun plat trouvé"
                res.send()
            }
        }
    }).catch((e) => {
        res.statusCode = 404
        res.statusMessage = "Aucun plat trouvé"
        res.send()
    })
})

dishesRouter.post("/", (req, res) => {
    if (req.header('Content-Type') !== 'application/json') {
        res.statusCode = 415
        res.send("false");
    }
    const dish: IDish = req.body || null;
    if (dish !== null) {
        const emptyDish = initDish();
        let newDish = setDishName(emptyDish, dish.name)
        newDish = setDishId(newDish, dish.id)
        newDish = setDishIngredients(newDish, dish.ingredients)
        newDish = setDishPrice(newDish, dish.price)
        newDish = setDishTemperature(newDish, dish.temperature)
        newDish = dish.isVegan ? setDishVegan(newDish) : newDish
        newDish = dish.homemade ? setDishHomemade(newDish) : newDish
        writeToFile("./src/server/data/dishes.json", JSON.stringify(newDish)).then((c) => {
            res.statusCode = 200
            res.send(JSON.stringify(c))
        }).catch((e) => {
            res.statusCode = 400
            res.send(JSON.stringify(e))
        })
    } else {
        res.statusCode = 400
        res.send("false")
    }
})
dishesRouter.patch("/:id?/:att?/:value?", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null;
    const definedAtt = req.params.att || null;
    const definedValue = req.params.value || null;
    getDataFromFile("./src/server/data/dishes.json").then((s) => {
        const dishes: IDish[] = JSON.parse(s)
        const foundDish = dishes.filter(x => x.id === definedId)
        if (foundDish[0]) {
            const foundDishIndex = dishes.indexOf(foundDish[0])
            const dish = dishes[foundDishIndex];
            dishes.splice(foundDishIndex, 1)
            const stream = createWriteStream("./src/server/data/dishes.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (dishes.length > 0) {
                stream.write(JSON.stringify(dishes), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                      
                            const emptyDish = initDish();
                            let newDish = setDishName(emptyDish, dish.name)
                            newDish = setDishId(newDish, dish.id)
                            newDish = setDishIngredients(newDish, dish.ingredients)
                            newDish = setDishPrice(newDish, dish.price)
                            newDish = setDishTemperature(newDish, dish.temperature)
                            newDish = dish.isVegan ? setDishVegan(newDish) : newDish
                            newDish = dish.homemade ? setDishHomemade(newDish) : newDish
                            writeToFile("./src/server/data/dishes.json", JSON.stringify(newDish)).then((c) => {
                                res.statusCode = 200
                                res.send(JSON.stringify(c))
                            }).catch((e) => {
                                res.statusCode = 400
                                res.send(JSON.stringify(e))
                            })
                        
                    }
                })
            } else {
                stream.write("[]", (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()

                        
                            const emptyDish = initDish();
                            let newDish = setDishName(emptyDish, dish.name)
                            newDish = setDishId(newDish, dish.id)
                            newDish = setDishIngredients(newDish, dish.ingredients)
                            newDish = setDishPrice(newDish, dish.price)
                            newDish = setDishTemperature(newDish, dish.temperature)
                            newDish = dish.isVegan ? setDishVegan(newDish) : newDish
                            newDish = dish.homemade ? setDishHomemade(newDish) : newDish
                            writeToFile("./src/server/data/dishes.json", JSON.stringify(newDish)).then((c) => {
                                res.statusCode = 200
                                res.send(JSON.stringify(c))
                            }).catch((e) => {
                                res.statusCode = 400
                                res.send(JSON.stringify(e))
                            })
                       
                    }
                })
            }
        } else {
            res.statusCode = 404
            res.statusMessage = "Aucun plat trouvé"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

dishesRouter.put("/", (req, res) => {

    const dish: IDish = req.body || null;
    getDataFromFile("./src/server/data/dishes.json").then((s) => {
        const dishes: IDish[] = JSON.parse(s)
        const foundDish = dishes.filter(x => x.id === dish.id)
        if (foundDish[0]) {
            const foundDishIndex = dishes.indexOf(foundDish[0])
            dishes.splice(foundDishIndex, 1)
            const stream = createWriteStream("./src/server/data/dishes.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (dishes.length > 0) {
                stream.write(JSON.stringify(dishes), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                        if (dish !== null) {
                            const emptyDish = initDish();
                            let newDish = setDishName(emptyDish, dish.name)
                            newDish = setDishId(newDish, dish.id)
                            newDish = setDishIngredients(newDish, dish.ingredients)
                            newDish = setDishPrice(newDish, dish.price)
                            newDish = setDishTemperature(newDish, dish.temperature)
                            newDish = dish.isVegan ? setDishVegan(newDish) : newDish
                            newDish = dish.homemade ? setDishHomemade(newDish) : newDish
                            writeToFile("./src/server/data/dishes.json", JSON.stringify(newDish)).then((c) => {
                                res.statusCode = 200
                                res.send(JSON.stringify(c))
                            }).catch((e) => {
                                res.statusCode = 400
                                res.send(JSON.stringify(e))
                            })
                        } else {
                            res.statusCode = 400
                            res.send("false")
                        }
                    }
                })
            } else {
                stream.write("[]", (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()

                        if (dish !== null) {
                            const emptyDish = initDish();
                            let newDish = setDishName(emptyDish, dish.name)
                            newDish = setDishId(newDish, dish.id)
                            newDish = setDishIngredients(newDish, dish.ingredients)
                            newDish = setDishPrice(newDish, dish.price)
                            newDish = setDishTemperature(newDish, dish.temperature)
                            newDish = dish.isVegan ? setDishVegan(newDish) : newDish
                            newDish = dish.homemade ? setDishHomemade(newDish) : newDish
                            writeToFile("./src/server/data/dishes.json", JSON.stringify(newDish)).then((c) => {
                                res.statusCode = 200
                                res.send(JSON.stringify(c))
                            }).catch((e) => {
                                res.statusCode = 400
                                res.send(JSON.stringify(e))
                            })
                        } else {
                            res.statusCode = 400
                            res.send("false")
                        }
                    }
                })
            }
        } else {
            res.statusCode = 404
            res.statusMessage = "Aucun plat trouvé"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })

})

dishesRouter.delete("/:id", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null
    if (definedId === null) {
        res.statusCode = 400
        res.send("false")
    }
    getDataFromFile("./src/server/data/dishes.json").then((s) => {
        const dishes: IDish[] = JSON.parse(s)
        const foundDish = dishes.filter(x => x.id === definedId)
        if (foundDish[0]) {
            const foundDishIndex = dishes.indexOf(foundDish[0])
            dishes.splice(foundDishIndex, 1)
            const stream = createWriteStream("./src/server/data/dishes.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (dishes.length > 0) {
                stream.write(JSON.stringify(dishes), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                        res.statusCode = 200
                        res.send(true)
                    }
                })
            } else {
                stream.write("[]", (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                        res.statusCode = 200
                        res.send(true)
                    }
                })
            }
        } else {
            res.statusCode = 404
            res.statusMessage = "Aucun plat trouvé"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

export default dishesRouter