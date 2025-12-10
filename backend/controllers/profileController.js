const User = require('../models/User');
exports.getProfile = async (req,res)=>{
  try{
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  }catch(e){
    res.status(500).json({message:e.message});
  }
};
exports.updateProfile = async (req,res)=>{
  try{
    const updates = req.body;
    if(req.file) updates.avatar = '/uploads/'+req.file.filename;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new:true }).select('-password');
    res.json(user);
  }catch(e){
    res.status(500).json({message:e.message});
  }
};
