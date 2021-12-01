const express = require("express");

const fs = require("fs");

const upload = require("../middlewares/upload");

const router = express.Router();

const User = require("../models/user.model")

router.post("/", upload.single("profile_pic"), async (req, res) => {
    
    try {
        
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        })

        return res.status(201).json({user});

    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message })
    }
});

router.get("/", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.send({ users });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

// update profile update
router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
    
    try {
        const path_to_delete = await User.findById(req.params.id).lean().exec();
        // console.log('path_to_delete:', path_to_delete.profile_pic[0])
        //**********file system */
        fs.unlink(path_to_delete.profile_pic[0],
            // 2nd call back function
            function (err) {
                if (err) throw err;
                console.log(path_to_delete.first_name,'File Deleted.');
            }
        ); 
        // *************************
        const user = await User.findByIdAndUpdate(req.params.id, {profile_pic: req.file.path}, {
            new: true,
          }).lean().exec();


        return res.status(201).json({user});

    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message })
    }
});

//*********delete*********
router.delete("/:id", async (req, res) => {
    try {
        
        const path_to_delete = await User.findById(req.params.id).lean().exec();
        console.log('path_to_delete:', path_to_delete.profile_pic[0])
        //**********file system */
        fs.unlink(path_to_delete.profile_pic[0],
            // 2nd call back function
            function (err) {
                if (err) throw err;
                console.log(path_to_delete.first_name,'File Deleted.');
            }
        ); 
        // *************************

      const user = await User.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
});



module.exports = router;