const express = require("express");

const upload = require("../middlewares/upload");

const router = express.Router();

const Gallery = require("../models/gallery.model")

router.post("/", upload.any("pictures"), async (req, res) => {
    
    const filePaths = req.files.map( file => file.path);

    try {
        
        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            pictures: filePaths
        })

        return res.status(201).json({gallery});

    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message })
    }
});

// can upload array files use limit as well --> https://medium.com/@svibhuti22/file-upload-with-multer-in-node-js-and-express-5bc76073419f

router.post("/multiple", upload.array("pictures", 5), async (req, res) => {
    
    const filePaths = req.files.map( file => file.path);

    try {
        
        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            pictures: filePaths
        })

        return res.status(201).json({gallery});

    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message })
    }
});

module.exports = router;