import * as Express from "express";
import dishesRouter from "./routes/dishesRouter";
import drinksRouter from "./routes/drinksRouter";
import sweetsRouter from "./routes/sweetsRouter";
import * as bodyparser from "body-parser";

const app = Express();

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/html");
  res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>Page d'index</title>
            </head>
            <body>
                <h1>Index de l'application</h1>
            </body>
        </html>
    `);
});

app.use("/dishes", bodyparser.json(), dishesRouter);

app.use("/drinks", bodyparser.json(), drinksRouter);

app.use("/sweets", bodyparser.json(), sweetsRouter);

app.use((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.statusCode = 404;
  res.statusMessage = "Ma 404";
  res.send();
});

app.listen(1234, "0.0.0.0", () => ("Serveur UP"));

export default app;
