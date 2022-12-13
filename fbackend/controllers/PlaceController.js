import Place from "../models/PlaceModel.js";
import path from "path";
import fs from "fs";
import { request } from "http";


export const getPlaces = async(req, res)=>{
    try {
        const response = await Place.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const getPlacesById = async(req, res)=>{
    try {
        const response = await Place.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const createPlace = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg:"No File Created"});
    const name = req.body.title;
    const rate = req.body.rated;
    const address = req.body.address;
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
            await Place.create({
                nama: name, 
                rating: rate, 
                gambar: fileName, 
                alamat: address, 
                url: url, 
                deskripsi: desc
            });
            res.status(201).json({msg: "Place has created masbro"});
        } catch (error) {
            console.log(error.massage);
        }
    });
} 

export const updatePlace = async(req, res)=>{
    const place = await Place.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!place) return res.status(404).json({msg: "No Data Founding titan"});
    let fileName = "";
    if(req.files === null){
        fileName = Place.gambar;
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
    const rate = req.body.rated;
    const address = req.body.address;
    const desc = req.body.description;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Place.update({
            nama: name,
            gambar: fileName,
            url: url,
            rating: rate, 
            alamat: address, 
            deskripsi: desc
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Place Update Sukkkses"});
    } catch (error) {
        console.log(error.massage);
    }
}

export const deletePlace = async (req, res)=>{
    const place = await Place.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!place) return res.status(404).json({msg: "No Data Founding titan"});
     
    try {
        const filepath = `./public/images/${place.gambar}`;
        fs.unlinkSync(filepath);
        await Place.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ msg: "Place Deleted Successfuly" });
    } catch (error) {
        console.log(error.massage);
    }
}
