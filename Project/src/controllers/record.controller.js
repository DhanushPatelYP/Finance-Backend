import Record from "../models/record.model.js";

export const createRecord = async (req,res) =>{
    try{
        const { amount,type,category,date,notes } =req.body;

        const record = await Record.create({
            userId:req.user._id,
            amount,
            type,
            category,
            date,
            notes
        });
        res.status(201).json(record);
    }catch(error){
        res.status(500).json(error.message);
    }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category, page = 1, limit = 10 } = req.query;

    const query = { userId: req.user._id };

    if (type) query.type = type;
    if (category) query.category = category;

    const records = await Record.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecord = async (req,res)=>{
    try{
        const record = await Record.findById(req.params.id);
        if(!record){
            return res.status(404).json({message:"Record not found"});
        }
        Object.assign(record,req.body);
        record.save();
        res.json(record);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

export const deleteRecord = async (req,res)=>{
    try{
        const record = await Record.findById(req.params.id);
        if(!record){
            res.status(404).json({message:"Record not found"});
        }
        await record.deleteOne();
        res.json({message:"Record Deleted"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};