import  {Sequelize}  from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Food = db.define('food',{
    nama: DataTypes.STRING,
    harga: DataTypes.STRING,
    gambar: DataTypes.STRING,
    url: DataTypes.STRING,
    deskripsi: DataTypes.STRING
},{
    freezeTableName: true
});

export default Food;

(async()=>{
    await db.sync();
})();