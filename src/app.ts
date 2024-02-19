import express, { Application } from "express";
import configService from "./common/config.service";
import router from "./common/routes/router";

const app: Application = express();
const port: number = Number(configService.port);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use('/api', router);
