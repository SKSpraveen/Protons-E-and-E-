import React,{useState} from "react";
import axios from "axios";
import  "../../.././Pages/Sasindu/StockManager.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";



function AddAdvertisement(){
    const[type,setType]=useState("");
    const[item,setItem]=useState("");
    const[description,setDescription]=useState("");
    const[photo,setPhoto]=useState("");
    const[discount,setDiscount]=useState("");
    const[price,setPrice]=useState("");
    const[availability,setAvailability]=useState("");
    const [errors, setErrors] = useState("");

    const clearForm = () => {
        setType("");
        setItem("");
        setDescription("");
        setPhoto("");
        setDiscount("");
        setPrice("");
        setAvailability("");
        setErrors({});
    };

    function sendData(e){
        e.preventDefault();

        const errors = {};

    if (!type) {
      errors.type = "** Type is required";
    }
    if (!item) {
      errors.item = "** Item is required";
    }
    if (!description) {
      errors.description = "** Description is required";
    }
    if (!photo) {
      errors.photo = "** Photo is required";
    }
    if (!price) {
      errors.newprice = "** Price is required";
    } else if (isNaN(parseFloat(price))) {
      errors.price = "** Please enter a valid input";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

       

        const newAdvertisement = {
            type,
            item,
            description,
            photo,
            discount:parseFloat(discount),
            price: parseFloat(price),
            availability,
        }
        axios.post("http://localhost:8070/Advertisement/add",newAdvertisement).then(()=>{

            alert("Advertisement Added")
            clearForm();

        }).catch((err)=>{
            alert(err)
        })
    }
    const navigate=useNavigate();

    

    return(

        <div className="body1">
            
                <br /><br />
                <button type="button" onClick={()=> navigate('/viewAllAds')} class="viewAllBtn"><i class="fa fa-eye" aria-hidden="true"></i> View All</button>
                <br /><br />
                <div className="containerSM">
                    <h1 style={{fontSize:"28px",marginLeft:"35%"}}><i>Create Advertisement</i></h1>
                </div>
                <br />
                <div className="form">
                    <form onSubmit={sendData} className="row g-3">
                    <div className="col-10">
                        <br /><br />
                        <label for="inputType" className="form-label1">Type</label>
                        <select id="type" value={type} onChange={(e)=>{setType(e.target.value);}} className="form-select">
                        <option>None</option>
                        <option>CCTV</option>
                        <option>Door Lock</option>
                        <option>Door Phone</option>
                        <option>Alarms & Motion Detectors</option>
                        </select>
                        <div className="err">
                            {errors.type && <p className="error-message">{errors.type}</p>}
                        </div>
                    </div>
                    <div className="col-10">
                        <label for="inputItem" className="form-label1">Item</label>
                        <input type="text" className="form-control" id="item" value={item} onChange={(e)=>{setItem(e.target.value);}} />
                        <div className="err">
                            {errors.item && <p className="error-message">{errors.item}</p>}
                        </div>
                    </div>
                    <div className="col-10">
                        <label for="inputDescription" className="form-label1">Description</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={(e)=>{setDescription(e.target.value);}}/>
                        <div className="err">
                            {errors.description && <p className="error-message">{errors.description}</p>}
                        </div>    
                    </div>
                    <div className="col-10">
                        <label for="inputPhoto" className="form-label1">Image</label>
                        <input type="text" className="form-control" id="photo" value={photo} onChange={(e)=>{setPhoto(e.target.value);}}/>
                        <div className="err">
                        {errors.photo && <p className="error-message">{errors.photo}</p>}
                        </div>
                    </div>
                    <div className="col-md-5" style={{marginLeft:"4%"}}>
                        <label for="inputDiscount" className="form-label1">Discount</label>
                        <input type="text" className="form-control" id="discount" value={discount} onChange={(e)=>{setDiscount(e.target.value);}}/>
                    </div>
                    <div className="col-md-5">
                        <label for="inputOldPrice" className="form-label1">Price</label>
                        <input type="text" className="form-control" id="price" value={price} onChange={(e)=>{setPrice(e.target.value);}} placeholder=" Rs :"/>
                        <div className="err">
                        </div>
                    </div>
                    <div className="col-10">
                        <label for="inputAvailability" className="form-label1">Availability</label>
                        <input type="text" className="form-control" id="availability" value={availability} onChange={(e)=>{setAvailability(e.target.value);}}/>
                    </div>
                
                    <div className="col-6">
                        <br /> 
                        <button type="submit"  className="btn btn-primary1">Post</button>
                    </div>
                    </form>
                    <br />
                </div>
                <br /><br />
                <br /><br />

        </div>
    )
}
export default AddAdvertisement;