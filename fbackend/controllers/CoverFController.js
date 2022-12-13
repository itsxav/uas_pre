import CoverF from "../models/CoverFModel.js";
import path from "path";
import fs from "fs";


export const getCoverFs = async(req, res)=>{
    try {
        const response = await CoverF.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const getCoverFById = async(req, res)=>{
    try {
        const response = await CoverF.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const createCoverF = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg:"No File Created"});
    const name = req.body.title;
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
            await CoverF.create({
                nama: name,
                gambar: fileName, 
                url: url
            });
            res.status(201).json({msg: "CoverF has created masbro"});
        } catch (error) {
            console.log(error.massage);
        }
    });
} 

export const updateCoverF = async(req, res)=>{
    const coverf = await CoverF.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!coverf) return res.status(404).json({msg: "No Data Founding titan"});
    let fileName = "";
    if(req.files === null){
        fileName = CoverF.gambar;
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
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await CoverF.update({
            nama: name,
            gambar: fileName,
            url: url
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

export const deleteCoverF = async (req, res)=>{
    const coverf = await CoverF.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!coverf) return res.status(404).json({msg: "No Data Founding titan"});
     
    try {
        const filepath = `./public/images/${coverf.gambar}`;
        fs.unlinkSync(filepath);
        await CoverF.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ msg: "Food Deleted Successfuly" });
    } catch (error) {
        console.log(error.massage);
    }
}
