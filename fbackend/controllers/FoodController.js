import Food from "../models/FoodModel.js";
import path from "path";
import fs from "fs";
import { request } from "http";


export const getFoods = async(req, res)=>{
    try {
        const response = await Food.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const getFoodById = async(req, res)=>{
    try {
        const response = await Food.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const createFood = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg:"No File Created"});
    const name = req.body.title;
    const price = req.body.prices;
    const desc = req.body.description;
    const file = req.files.file;
    const fileSize = file.data.lenght;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: 
    "Image Salah Pak"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image kase dibawa 5mb"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.massage});
        try {
            await Food.create({
                nama: name, 
                harga: price, 
                gambar: fileName, 
                url: url, 
                deskripsi: desc
            });
            res.status(201).json({msg: "Food has created masbro"});
        } catch (error) {
            console.log(error.massage);
        }
    });
} 

export const updateFood = async(req, res)=>{
    const food = await Food.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!food) return res.status(404).json({msg: "No Data Founding titan"});
    let fileName = "";
    if(req.files === null){
        fileName = Food.gambar;
    }else{
        const file = req.files.file;
        const fileSize = file.data.lenght;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: 
            "Image Salah Pak"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image kase dibawa 5mb"});
        
        const filepath = `./public/images/${place.gambar}`;
        fs.unlinkSync(filepath);
        
        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.massage});
        });
    }
    const name = req.body.title;
    const price = req.body.prices;
    const desc = req.body.description;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Food.update({
            nama: name,
            gambar: fileName,
            url: url,
            harga: price, 
            deskripsi: desc
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Food Update Sukkkses"});
    } catch (error) {
        console.log(error.massage);
    }
}

export const deleteFood = async (req, res)=>{
    const food = await Food.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!food) return res.status(404).json({msg: "No Data Founding titan"});
     
    try {
        const filepath = `./public/images/${place.gambar}`;
        fs.unlinkSync(filepath);
        await Place.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ msg: "Food Deleted Successfuly" });
    } catch (error) {
        console.log(error.massage);
    }
}
