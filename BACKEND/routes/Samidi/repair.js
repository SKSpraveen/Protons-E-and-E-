const router = require("express").Router();
const repair = require("../../models/Samidi/repair");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");


// Middleware
router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

// Route to get CSRF token (frontend can fetch this)
router.get("/csrf-token", csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Add repair (protected)
router.route("/add").post(csrfProtection, (req, res) => {
    const { name, email, phone, repairType, description } = req.body;

    const newRepair = new repair({
        name,
        email,
        phone,
        repairType,
        description,
    });

    newRepair.save()
        .then(() => res.json("Repair Added.."))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding repair" });
        });
});

router.route("/").get((req,res)=> {
    repair.find().then((repair)=>{
        res.json({success:true, repair});
    }).catch((err)=> {
        console.log(err)
        res.status(500).json({ success: false, error: "Error fetching repair" });
    });
});

router.route("/update/:id").put(async(req,res)=> {
    let repairId = req.params.id;
    const {name,email,phone,repairType,description} = req.body;
    const updateRepair= {
        name,
        email,
        phone,
        repairType,
        description,
    }
    const update = await repair.findByIdAndUpdate(repairId,updateRepair).then(()=> {
        res.status(200).send({status:"Repair updated.."})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with updating data..."});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    try {
        const repairId = req.params.id;
        await repair.findByIdAndDelete(repairId);
        res.status(200).json({ status: "Repair deleted" });
    } catch (error) {
        console.error("Error deleting repair:", error);
        res.status(500).json({ status: "Error deleting repair" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const Repair = await repair.findById(req.params.id);
        if (!repair) {
            return res.status(404).json({ error: "Repair not found" });
        }
        res.json(Repair);
    } catch (error) {
        console.error("Error fetching repair by ID:", error);
        res.status(500).json({ error: "Error fetching repair" });
    }
})

module.exports= router;