import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getUsers = async(req, res) =>{
    const last_id = parseInt(req.query.lastId) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";

    let result = [];
    if(last_id < 1){
        const results = await User.findAll({
            where:{
                [Op.or]: [{name:{
                    [Op.like]: '%'+search+'%'
                }}, {email:{
                    [Op.like]: '%'+search+'%'
                }}]
            },
            limit: limit,
            order:[
                ['id', 'DESC']
            ]
        });
        result = results;
    }else{
        const results = await User.findAll({
            where:{
                id:{
                    [Op.lt]: last_id
                },
                [Op.or]: [{name:{
                    [Op.like]: '%'+search+'%'
                }}, {email:{
                    [Op.like]: '%'+search+'%'
                }}]
            },
            limit: limit,
            order:[
                ['id', 'DESC']
            ]
        });
        result = results;
    }
    res.json({
        result: result,
        lastId: result.length ? result[result.length -1].id : 0,
        hasMore: result.length >= limit ? true : false
    });
    
}