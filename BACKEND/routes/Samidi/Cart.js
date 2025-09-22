const router = require("express").Router();
const Cart = require("../../models/Samidi/Cart");


router.route("/add").post((req, res) => {
    const { product, orderQuantity, amount } = req.body;

    // Convert orderQuantity and amount to numbers
    const parsedOrderQuantity = Number(orderQuantity);
    const parsedAmount = Number(amount);

    // Check if parsedOrderQuantity and parsedAmount are valid numbers
    if (isNaN(parsedOrderQuantity) || isNaN(parsedAmount) || parsedOrderQuantity <= 0 || parsedAmount <= 0) {
        return res.status(400).json({ error: "Invalid quantity or amount" });
    }

    const newCart = new Cart({
        product,
        orderQuantity: parsedOrderQuantity,
        amount: parsedAmount,
    });

    newCart.save()
        .then(() => {
            res.json("Cart Added..");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding cart to database" });
        });
});

router.route("/").get((req, res) => {
    Cart.find()
        .then((cart) => {
            res.json({ success: true, cart }); // Return cart in the expected format
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, error: "Error fetching cart" });
        });
});

router.route("/update/:id").put(async(req,res)=> {
    let cartId = req.params.id;
    const {product,orderQuantity,amount} = req.body;
    const updateCart = {
        product,
        orderQuantity,
        amount,
    }
    const update = await Cart.findByIdAndUpdate(cartId,updateCart).then(()=> {
        res.status(200).send({status:"cart updated.."})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status:"Error with updating data..."});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    try {
        const cartId = req.params.id;
        await Cart.findByIdAndDelete(cartId);
        res.status(200).json({ status: "cart deleted" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ status: "Error deleting cart" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const cart = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.json(stock);
    } catch (error) {
        console.error("Error fetching cart by ID:", error);
        res.status(500).json({ error: "Error fetching cart" });
    }
})
module.exports= router;