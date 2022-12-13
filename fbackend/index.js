import express from "express";
import FileUpload from "express-fileupload";
import Cors from "cors";
import PlaceRoute from "./routes/PlaceRoute.js";
import FoodRoute from "./routes/FoodRoute.js";
import CoverFRoute from "./routes/CoverFRoute.js"

const app = express();

app.use(Cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(PlaceRoute);
app.use(FoodRoute);
app.use(CoverFRoute);

app.listen(5000, ()=> console.log('Server Running...'));