import { Router } from "express"
import { getDataFromFile, writeToFile } from "../utils/dishes"
import { IDrink, initDrink, setDrinkName, setDrinkId, setDrinkPrice, setDrinkQuantity, setDrinkIsAlcoholic, setDrinkAlcoholVolume } from "../utils/drinks"
import { createWriteStream } from "fs"

const drinksRouter = Router()

drinksRouter.get("/:id?", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null
    getDataFromFile("./src/server/data/drinks.json").then((s) => {
        const drinks: IDrink[] = JSON.parse(s)
        if (definedId === null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.send(drinks)
        } else {
            if (isNaN(definedId)) {
                res.statusCode = 404
                res.statusMessage = "Aucune boisson trouvée"
                res.send()
            }
            const dish = drinks.filter(x => x.id === definedId)
            if (dish[0]) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.send(dish[0])
            } else {
                res.statusCode = 404
                res.statusMessage = "Aucune boisson trouvée"
                res.send()
            }
        }
    }).catch((e) => {
        res.statusCode = 404
        res.statusMessage = "Aucune boisson trouvée"
        res.send()
    })
})

drinksRouter.post("/", (req, res) => {
    if (req.header('Content-Type') !== 'application/json') {
        res.statusCode = 415
        res.send(false);
    }
    const drink: IDrink = req.body || null;
    if (drink !== null) {
        const emptyDrink = initDrink();
        let newDrink = setDrinkName(emptyDrink, drink.name)
        newDrink = setDrinkId(newDrink, drink.id)
        newDrink = setDrinkPrice(newDrink, drink.price)
        newDrink = setDrinkQuantity(newDrink, drink.cl)
        newDrink = drink.alcohol ? setDrinkIsAlcoholic(newDrink) : newDrink
        newDrink = newDrink.alcohol ? setDrinkAlcoholVolume(newDrink, drink.alcohol_volume) : newDrink
        writeToFile("./src/server/data/drinks.json", JSON.stringify(newDrink)).then((c) => {
            res.statusCode = 200
            res.send(JSON.stringify(c))
        }).catch((e) => {
            res.statusCode = 400
            res.send(JSON.stringify(e))
        })
    } else {
        res.statusCode = 400
        res.send(false)
    }
})

drinksRouter.patch("/:id?/:att?/:value?", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null;
    const definedAtt = req.params.att || null;
    const definedValue = req.params.value || null;
    getDataFromFile("./src/server/data/drinks.json").then((s) => {
        const drinks: IDrink[] = JSON.parse(s)
        const foundDrink = drinks.filter(x => x.id === definedId)
        if (foundDrink[0]) {
            const foundDishIndex = drinks.indexOf(foundDrink[0])
            const drink = drinks[foundDishIndex];
            drinks.splice(foundDishIndex, 1)
            const stream = createWriteStream("./src/server/data/drinks.json")

            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (drinks.length > 0) {
                stream.write(JSON.stringify(drinks), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()

                        const emptyDrink = initDrink();
                        let newDrink = setDrinkName(emptyDrink, drink.name)
                        newDrink = setDrinkId(newDrink, drink.id)
                        newDrink = setDrinkPrice(newDrink, drink.price)
                        newDrink = setDrinkQuantity(newDrink, drink.cl)
                        newDrink = drink.alcohol ? setDrinkIsAlcoholic(newDrink) : newDrink
                        newDrink = newDrink.alcohol ? setDrinkAlcoholVolume(newDrink, drink.alcohol_volume) : newDrink
                        writeToFile("./src/server/data/drinks.json", JSON.stringify(newDrink)).then((c) => {
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

                        const emptyDrink = initDrink();
                        let newDrink = setDrinkName(emptyDrink, drink.name)
                        newDrink = setDrinkId(newDrink, drink.id)
                        newDrink = setDrinkPrice(newDrink, drink.price)
                        newDrink = setDrinkQuantity(newDrink, drink.cl)
                        newDrink = drink.alcohol ? setDrinkIsAlcoholic(newDrink) : newDrink
                        newDrink = newDrink.alcohol ? setDrinkAlcoholVolume(newDrink, drink.alcohol_volume) : newDrink
                        writeToFile("./src/server/data/drinks.json", JSON.stringify(newDrink)).then((c) => {
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
            res.statusMessage = "Aucune boisson trouvée"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

drinksRouter.put("/", (req, res) => {
    const drink: IDrink = req.body || null;
    getDataFromFile("./src/server/data/drinks.json").then((s) => {
        const drinks: IDrink[] = JSON.parse(s)
        const foundDrink = drinks.filter(x => x.id === drink.id)
        if (foundDrink[0]) {
            const foundDishIndex = drinks.indexOf(foundDrink[0])
            drinks.splice(foundDishIndex, 1)
            const stream = createWriteStream("./src/server/data/drinks.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (drinks.length > 0) {
                stream.write(JSON.stringify(drinks), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                        if (drink !== null) {
                            const emptyDrink = initDrink();
                            let newDrink = setDrinkName(emptyDrink, drink.name)
                            newDrink = setDrinkId(newDrink, drink.id)
                            newDrink = setDrinkPrice(newDrink, drink.price)
                            newDrink = setDrinkQuantity(newDrink, drink.cl)
                            newDrink = drink.alcohol ? setDrinkIsAlcoholic(newDrink) : newDrink
                            newDrink = newDrink.alcohol ? setDrinkAlcoholVolume(newDrink, drink.alcohol_volume) : newDrink
                            writeToFile("./src/server/data/drinks.json", JSON.stringify(newDrink)).then((c) => {
                                res.statusCode = 200
                                res.send(JSON.stringify(c))
                            }).catch((e) => {
                                res.statusCode = 400
                                res.send(JSON.stringify(e))
                            })
                        } else {
                            res.statusCode = 400
                            res.send(false)
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
                        if (drink !== null) {
                            const emptyDrink = initDrink();
                            let newDrink = setDrinkName(emptyDrink, drink.name)
                            newDrink = setDrinkId(newDrink, drink.id)
                            newDrink = setDrinkPrice(newDrink, drink.price)
                            newDrink = setDrinkQuantity(newDrink, drink.cl)
                            newDrink = drink.alcohol ? setDrinkIsAlcoholic(newDrink) : newDrink
                            newDrink = newDrink.alcohol ? setDrinkAlcoholVolume(newDrink, drink.alcohol_volume) : newDrink
                            writeToFile("./src/server/data/drinks.json", JSON.stringify(newDrink)).then((c) => {
                                res.statusCode = 200
                                res.send(JSON.stringify(c))
                            }).catch((e) => {
                                res.statusCode = 400
                                res.send(JSON.stringify(e))
                            })
                        } else {
                            res.statusCode = 400
                            res.send(false)
                        }
                    }
                })
            }
        } else {
            res.statusCode = 404
            res.statusMessage = "Aucune boisson trouvée"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

drinksRouter.delete("/:id", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null
    if (definedId === null) {
        res.statusCode = 400
        res.send(false)
    }
    getDataFromFile("./src/server/data/drinks.json").then((s) => {
        const drinks: IDrink[] = JSON.parse(s)
        const foundDrink = drinks.filter(x => x.id === definedId)
        if (foundDrink[0]) {
            const foundDishIndex = drinks.indexOf(foundDrink[0])
            drinks.splice(foundDishIndex, 1)
            const stream = createWriteStream("./src/server/data/drinks.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (drinks.length > 0) {
                stream.write(JSON.stringify(drinks), (e) => {
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
            res.statusMessage = "Aucune boisson trouvée"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

export default drinksRouter