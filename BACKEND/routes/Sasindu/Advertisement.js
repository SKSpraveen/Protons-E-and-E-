const router = require("express").Router();
const Advertisement = require("../../models/Sasindu/Advertisement");


router.route("/add").post((req,res)=> {
    const type = req.body.type;
    const item = req.body.item;
    const description = req.body.description;
    const photo = req.body.photo;
    const discount = Number(req.body.discount);
    const price = Number(req.body.price);
    const availability = req.body.availability;

    const newAdvertisement = new Advertisement ({
        type,
        item,
        description,
        photo,
        discount,
        price,
        availability,
    });

    newAdvertisement.save().then(()=>{
        res.json("Advertisment Added..")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req, res) => {
    Advertisement.find()
        .then((advertisements) => {
            res.json({ success: true, advertisements }); // Return advertisements in the expected format
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, error: "Error fetching advertisements" });
        });
});

router.route("/update/:id").put(async(req,res)=> {
    let adId = req.params.id;
    const {type,item,description,photo,discount,oldPrice,price,availability} = req.body;
    const updateAd = {
        type,
        item,
        description,
        photo,
        discount,
        price,
        availability,
    }
    const update = await Advertisement.findByIdAndUpdate(adId,updateAd).then(()=> {
        res.status(200).send({status:"advertisement updated.."})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with updating data..."});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    try {
        const adId = req.params.id;
        await Advertisement.findByIdAndDelete(adId);
        res.status(200).json({ status: "advertisement deleted" });
    } catch (error) {
        console.error("Error deleting advertisement:", error);
        res.status(500).json({ status: "Error deleting advertisement" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) {
            return res.status(404).json({ error: "Advertisement not found" });
        }
        res.json(advertisement);
    } catch (error) {
        console.error("Error fetching advertisement by ID:", error);
        res.status(500).json({ error: "Error fetching advertisement" });
    }
})
module.exports= router;