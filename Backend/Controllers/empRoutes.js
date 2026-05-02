const express = require('express');
const User = require('../Models/empModel');
const router = express.Router();


router.get('/',(req,res)=>{
    try {
      res.send('Hello World!!!!')
    } catch(err){
      return err
    }
});

router.post('/save',async (req,res)=>{
    try {
        console.log(req.body)
        const newUser = await new User(req.body);
        const saveUser = await newUser.save();
         res.status(201).json({
         message: 'User saved successfully',
         data: saveUser
    });
    } catch (err) {
    res.status(500).json({
      message: 'Error saving user',
      error: err.message
    });
  }
    
})

router.get('/all',async (req,res)=>{
  try {
    const getUser = await User.find();
    return res.status(200).json({
      success:true,
      data:getUser
    })
  } catch(err){
 res.status(500).json({
      status:false,
      error: err.message
    });
  }
})
router.put('/update/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // ✅ return updated document
        runValidators: true // ✅ apply schema validation
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error updating user',
      error: err.message
    });
  }
});
// router.delete('/delete/:id',async (req,res)=>{
//    try {
//     console.log(req.params.id);
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//       if (!deletedUser) {
//       return res.status(404).json({
//         message: 'User not found'
//       });
//     }
//      if (!deletedUser) {
//       return res.status(404).json({
//         message: 'User not found'
//       });
//     }
//         return res.status(200).json({
//       message: 'User deleted successfully',
//       data: deletedUser
//     });

//   } catch (err) {
//     res.status(500).json({
//       message: 'Error updating user',
//       error: err.message
//     });
//   }
// })
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log("Delete hit:", req.params.id);

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      data: deletedUser
    });

  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({
      message: 'Error deleting user',
      error: err.message
    });
  }
});
module.exports = router