const router = require("express").Router();
const Stock = require("../../models/Sasindu/Stock");


router.route("/add").post((req,res)=> {
    const productCode = req.body.productCode;
    const productCategory = req.body.productCategory;
    const product = req.body.product;
    const description = req.body.description;
    const supplyCompany = req.body.supplyCompany;
    const dateReceived =req.body.dateReceived;
    const quantity = Number(req.body.quantity);
    const unitPrice =  Number(req.body.unitPrice);

    const newStock = new Stock ({
        productCode,
        productCategory,
        product,
        description,
        supplyCompany,
        dateReceived,
        quantity,
        unitPrice,
    });

    newStock.save().then(()=>{
        res.json("Stock Added..")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req, res) => {
    Stock.find()
        .then((stocks) => {
            res.json({ success: true, stocks }); // Return stocks in the expected format
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, error: "Error fetching stocks" });
        });
});

router.route("/update/:id").put(async(req,res)=> {
    let stockId = req.params.id;
    const {productCode,productCategory,product,description,supplyCompany,dateReceived,quantity,unitPrice} = req.body;
    const updateStock = {
        productCode,
        productCategory,
        product,
        description,
        supplyCompany,
        dateReceived,
        quantity,
        unitPrice,
    }
    const update = await Stock.findByIdAndUpdate(stockId,updateStock).then(()=> {
        res.status(200).send({status:"stock updated.."})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with updating data..."});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    try {
        const stockId = req.params.id;
        await Stock.findByIdAndDelete(stockId);
        res.status(200).json({ status: "stock deleted" });
    } catch (error) {
        console.error("Error deleting stock:", error);
        res.status(500).json({ status: "Error deleting stock" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }
        res.json(stock);
    } catch (error) {
        console.error("Error fetching stock by ID:", error);
        res.status(500).json({ error: "Error fetching stock" });
    }
})
module.exports= router;