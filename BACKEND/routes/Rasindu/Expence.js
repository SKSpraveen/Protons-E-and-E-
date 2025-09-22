const router = require("express").Router();
const Expence = require("../../models/Rasindu/Expence");


router.route("/add").post((req,res)=> {
    const title = req.body.title;
    const amount = req.body.amount;
    const date = req.body.date;
    const category = req.body.category;
    

    const newExpence = new Expence ({
        title,
        amount,
        date,
        category,
        
    });

    newExpence.save().then(()=>{
        res.json("Expence Added..")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=> {
    Expence.find().then((expenses)=>{
        res.json(expenses)
    }).catch((err)=> {
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=> {
    let expenceId = req.params.id;
    const {title,amount,date,category} = req.body;
    const updateExpence = {
        title,
        amount,
        date,
        category,
    }
    const update = await Expence.findByIdAndUpdate(expenceId,updateExpence).then(()=> {
        res.status(200).send({status:"Exepence updated.."})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with updating data..."});
    })
})

router.route("/delete/:id").delete(async(req,res)=> {
    let adId = req.params.id;
    await Expence.findByIdAndDelete(adId).then(()=> {
        res.status(200).send({status:"Expence deleted.."});
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with delete data..."});
    })
})

router.get("/:id", async (req, res) => {
    try {
        const expence = await Expence.findById(req.params.id);
        if (!expence) {
            return res.status(404).json({ error: "Advertisement not found" });
        }
        res.json(expence);
    } catch (error) {
        console.error("Error fetching advertisement by ID:", error);
        res.status(500).json({ error: "Error fetching advertisement" });
    }
})

module.exports= router;