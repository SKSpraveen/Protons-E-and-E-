const router = require("express").Router();

let UserDetails = require("../../models/Kavishka/Staff")


router.route("/update/:id").put(async(req,res)=> {
    try { 
        let userId=req.params.id;
        const {name,email,address,phoneNumber,password} = req.body;
        const updateDetails = {
        name, 
        email, 
        password,
        address,
        phoneNumber
    };

        // Find user by ID and update details
        const updatedUser = await UserDetails.findByIdAndUpdate(userId, updateDetails, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ status: "Details updated", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
    
})


router.route("/profile/:email").get(async (req, res) => {
    try {
      const { email } = req.params;
  
      await UserDetails.findOne({email})
        .then((reservation) => {
          return res.status(200).json(reservation);
        })
        .catch(() => {
          return res.status(404).json({ message: "User not found" });
        });
    } catch (err) {
      console.timeLog(err.message);
      res.status(500).send({ message: err.message });
    }
  });

  router.route("/staff/:email").delete(async (req, res) => {
    try {
        const { email } = req.params;

        const deletedUser = await UserDetails.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});




router.route("/staff").get(async (req, res) => {
    try {
      await UserDetails.find() 
        .then((users) => {
          if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
          }
          return res.status(200).json(users); 
        })
        .catch((err) => {
          console.error(err); // Log error
          return res.status(500).json({ message: "Internal Server Error" }); 
        });
    } catch (err) {
      console.error(err.message); // Log error message
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

module.exports= router;