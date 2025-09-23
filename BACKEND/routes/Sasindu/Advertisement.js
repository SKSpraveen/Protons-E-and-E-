const router = require("express").Router();
const Advertisement = require("../../models/Sasindu/Advertisement");
const sanitizeHtml = require("sanitize-html");


// Add new advertisement
router.route("/add").post((req, res) => {
    try {
        // Sanitize all string inputs
        const type = sanitizeHtml(req.body.type);
        const item = sanitizeHtml(req.body.item);
        const description = sanitizeHtml(req.body.description, {
            allowedTags: [],        // no tags allowed
            allowedAttributes: {}   // no attributes allowed
        });

        const photo = sanitizeHtml(req.body.photo);
        const availability = sanitizeHtml(req.body.availability);

        // Ensure numeric fields are numbers
        const discount = Number(req.body.discount);
        const price = Number(req.body.price);

        // Create new advertisement
        const newAdvertisement = new Advertisement({
            type,
            item,
            description,
            photo,
            discount,
            price,
            availability,
        });

        // Save to database
        newAdvertisement.save()
            .then(() => res.json("Advertisement Added Successfully"))
            .catch((err) => res.status(500).json({ error: err.message }));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

// Optional: Update advertisement with sanitization
router.route("/update/:id").put((req, res) => {
    try {
        const type = sanitizeHtml(req.body.type);
        const item = sanitizeHtml(req.body.item);
        const description = sanitizeHtml(req.body.description, {
            allowedTags: [],        // no tags allowed
            allowedAttributes: {}   // no attributes allowed
        });
        const photo = sanitizeHtml(req.body.photo);
        const availability = sanitizeHtml(req.body.availability);
        const discount = Number(req.body.discount);
        const price = Number(req.body.price);

        Advertisement.findByIdAndUpdate(
            req.params.id,
            { type, item, description, photo, discount, price, availability },
            { new: true }
        )
            .then((updatedAd) => res.json(updatedAd))
            .catch((err) => res.status(500).json({ error: err.message }));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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