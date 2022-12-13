import  {Sequelize}  from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const CoverF = db.define('coverf',{
    nama: DataTypes.STRING,
    gambar: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default CoverF;

(async()=>{
    await db.sync();
})();