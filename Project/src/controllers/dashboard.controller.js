import Record from "../models/record.model.js";

export const getSummary = async (req,res)=>{
    try{
        const userId = req.user._id;
        const result = await Record.aggregate([
            {$match:{userId}},
            {$group:{
                _id:"$type",
                total:{$sum:"$amount"}
            }}
        ]);
        let totalexpense = 0;
        let totalincome = 0;

        result.forEach((item)=>{
            if(item._id=="income"){
                totalincome = item.total;
            }
            if(item._id=="expense"){
                totalexpense = item.total;
            }
        })
        res.json({
            totalincome,
            totalexpense,
            netBalance: totalincome-totalexpense
        })
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

export const getCategoryWise = async (req,res)=>{
    try{
        const userId = req.user._id;
        const result = await Record.aggregate([
            {$match:{userId}},
            {$group:{
                _id:"$category",
                total:{$sum:"$amount"}
            }}
        ]);
        res.json(result);
    }catch(error){
        res.status(500).json({message:error.message});
    };
};

export const getTrends = async (req,res)=>{
    try{
        const userId = req.user._id;
        const result = await Record.aggregate([
            {$match:{userId}},
            {$group: {
                _id: {
                    month: { $month: "$date" },
                    type: "$type"
                },
                total: { $sum: "$amount" }
                }
            },
            {$project: {
                month: "$_id.month",
                type: "$_id.type",
                total: 1,
                _id: 0
                }
            },
            {$sort: { "_id.month": 1 }}
        ]);

        res.json(result);

    }catch(error){
        res.status(500).json({message:error.message});
    }
};