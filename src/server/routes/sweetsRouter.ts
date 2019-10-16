import { Router } from "express"
import { getDataFromFile, writeToFile } from "../utils/dishes"
import { ISweet, initSweet, setSweetName, setSweetId, setSweetPrice, setSweetIngredients, setSweetTemperature, setSweetVegan, setSweetHomemade } from "../utils/sweets"
import { createWriteStream } from "fs"

const sweetsRouter = Router()

sweetsRouter.get("/:id?", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null
    getDataFromFile("./src/server/data/sweets.json").then((s) => {
        const sweets: ISweet[] = JSON.parse(s)
        if (definedId === null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.send(sweets)
        } else {
            if (isNaN(definedId)) {
                res.statusCode = 404
                res.statusMessage = "Aucun dessert trouvé"
                res.send()
            }
            const sweet = sweets.filter(x => x.id === definedId)
            if (sweet[0]) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.send(sweet[0])
            } else {
                res.statusCode = 404
                res.statusMessage = "Aucun dessert trouvé"
                res.send()
            }
        }
    }).catch((e) => {
        res.statusCode = 404
        res.statusMessage = "Aucun dessert trouvé"
        res.send()
    })
})

sweetsRouter.post("/", (req, res) => {
    if (req.header('Content-Type') !== 'application/json') {
        res.statusCode = 415
        res.send(false);
    }
    const sweet: ISweet = req.body || null;
    if (sweet !== null) {
        const emptySweet = initSweet();
        let newSweet = setSweetName(emptySweet, sweet.name)
        newSweet = setSweetId(newSweet, sweet.id)
        newSweet = setSweetPrice(newSweet, sweet.price)
        newSweet = setSweetTemperature(newSweet, sweet.temperature)
        newSweet = setSweetIngredients(newSweet, sweet.ingredients)
        newSweet = sweet.isVegan ? setSweetVegan(newSweet) : newSweet
        newSweet = sweet.homemade ? setSweetHomemade(newSweet) : newSweet
        writeToFile("./src/server/data/sweets.json", JSON.stringify(newSweet)).then((c) => {
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
sweetsRouter.patch("/:id?/:att?/:value?", (req, res) => {
   
    const definedId = parseInt(req.params.id, 10) || null;
    const definedAtt = req.params.att || null;
    const definedValue = req.params.value || null;

    getDataFromFile("./src/server/data/sweets.json").then((s) => {
        const sweets: ISweet[] = JSON.parse(s)
        const foundSweet = sweets.filter(x => x.id === definedId)
        if (foundSweet[0]) {
            const foundSweetIndex = sweets.indexOf(foundSweet[0])
            const sweet = sweets[foundSweetIndex];
            sweets.splice(foundSweetIndex, 1)
            const stream = createWriteStream("./src/server/data/sweets.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (sweets.length > 0) {
                stream.write(JSON.stringify(sweets), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                       
                            const emptySweet = initSweet();
                            let newSweet = setSweetName(emptySweet, sweet.name)
                            newSweet = setSweetId(newSweet, sweet.id)
                            newSweet = setSweetPrice(newSweet, sweet.price)
                            newSweet = setSweetTemperature(newSweet, sweet.temperature)
                            newSweet = setSweetIngredients(newSweet, sweet.ingredients)
                            newSweet = sweet.isVegan ? setSweetVegan(newSweet) : newSweet
                            newSweet = sweet.homemade ? setSweetHomemade(newSweet) : newSweet
                            writeToFile("./src/server/data/sweets.json", JSON.stringify(newSweet)).then((c) => {
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
                       
                            const emptySweet = initSweet();
                            let newSweet = setSweetName(emptySweet, sweet.name)
                            newSweet = setSweetId(newSweet, sweet.id)
                            newSweet = setSweetPrice(newSweet, sweet.price)
                            newSweet = setSweetTemperature(newSweet, sweet.temperature)
                            newSweet = setSweetIngredients(newSweet, sweet.ingredients)
                            newSweet = sweet.isVegan ? setSweetVegan(newSweet) : newSweet
                            newSweet = sweet.homemade ? setSweetHomemade(newSweet) : newSweet
                            writeToFile("./src/server/data/sweets.json", JSON.stringify(newSweet)).then((c) => {
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
            res.statusMessage = "Aucun dessert trouvé"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

sweetsRouter.put("/", (req, res) => {
    const sweet: ISweet = req.body || null;

    getDataFromFile("./src/server/data/sweets.json").then((s) => {
        const sweets: ISweet[] = JSON.parse(s)
        const foundSweet = sweets.filter(x => x.id === sweet.id)
        if (foundSweet[0]) {
            const foundSweetIndex = sweets.indexOf(foundSweet[0])
            sweets.splice(foundSweetIndex, 1)
            const stream = createWriteStream("./src/server/data/sweets.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (sweets.length > 0) {
                stream.write(JSON.stringify(sweets), (e) => {
                    if (e) {
                        res.statusCode = 500
                        res.send(false)
                    } else {
                        stream.close()
                        if (sweet !== null) {
                            const emptySweet = initSweet();
                            let newSweet = setSweetName(emptySweet, sweet.name)
                            newSweet = setSweetId(newSweet, sweet.id)
                            newSweet = setSweetPrice(newSweet, sweet.price)
                            newSweet = setSweetTemperature(newSweet, sweet.temperature)
                            newSweet = setSweetIngredients(newSweet, sweet.ingredients)
                            newSweet = sweet.isVegan ? setSweetVegan(newSweet) : newSweet
                            newSweet = sweet.homemade ? setSweetHomemade(newSweet) : newSweet
                            writeToFile("./src/server/data/sweets.json", JSON.stringify(newSweet)).then((c) => {
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
                        if (sweet !== null) {
                            const emptySweet = initSweet();
                            let newSweet = setSweetName(emptySweet, sweet.name)
                            newSweet = setSweetId(newSweet, sweet.id)
                            newSweet = setSweetPrice(newSweet, sweet.price)
                            newSweet = setSweetTemperature(newSweet, sweet.temperature)
                            newSweet = setSweetIngredients(newSweet, sweet.ingredients)
                            newSweet = sweet.isVegan ? setSweetVegan(newSweet) : newSweet
                            newSweet = sweet.homemade ? setSweetHomemade(newSweet) : newSweet
                            writeToFile("./src/server/data/sweets.json", JSON.stringify(newSweet)).then((c) => {
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
            res.statusMessage = "Aucun dessert trouvé"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

sweetsRouter.delete("/:id", (req, res) => {
    const definedId = parseInt(req.params.id, 10) || null
    if (definedId === null) {
        res.statusCode = 400
        res.send(false)
    }
    getDataFromFile("./src/server/data/sweets.json").then((s) => {
        const sweets: ISweet[] = JSON.parse(s)
        const foundSweet = sweets.filter(x => x.id === definedId)
        if (foundSweet[0]) {
            const foundSweetIndex = sweets.indexOf(foundSweet[0])
            sweets.splice(foundSweetIndex, 1)
            const stream = createWriteStream("./src/server/data/sweets.json")
            stream.on('error', () => {
                res.statusCode = 500
                res.send(false)
            })
            if (sweets.length > 0) {
                stream.write(JSON.stringify(sweets), (e) => {
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
            res.statusMessage = "Aucun dessert trouvé"
            res.send(false)
        }
    }).catch((e) => {
        res.statusCode = 400
        res.send(JSON.stringify(e))
    })
})

export default sweetsRouter