import  {Sequelize}  from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Place = db.define('place',{
    nama: DataTypes.STRING,
    rating: DataTypes.STRING,
    gambar: DataTypes.STRING,
    alamat: DataTypes.STRING,
    url: DataTypes.STRING,
    deskripsi: DataTypes.STRING
},{
    freezeTableName: true
});

export default Place;

(async()=>{
    await db.sync();
})();