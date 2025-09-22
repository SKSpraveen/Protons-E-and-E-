import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../.././Pages/Sasindu/StockManager.css";
import { useNavigate } from "react-router-dom";

function AdsDetails() {

    const [dataList, setDataList] = useState([]);
    const navigate=useNavigate();
    const getFetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Advertisement");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.advertisements);
                alert("Advertisements fetched successfully");
            } else {
                alert("Failed to fetch advertisements");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch advertisements");
        }
    };

    useEffect(() => {
        getFetchData();

    }, []);


    const handleDelete = (id) => {

        axios.delete(`http://localhost:8070/Advertisement/delete/${id}`).then((res) => {
            alert("Delete Successfully");
            setDataList(dataList.filter(advertisement => advertisement._id !== id));
        }).catch((error) => {
            console.error("Error deleting advertisement:", error);
            alert("Failed to delete advertisement");
        });
    };

    const handleSearchArea = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            getFetchData(); // Fetch original data when search query is empty
        } else {
            const filteredAdvertisements = dataList.filter(advertisement => {
                return (
                    advertisement.type.toLowerCase().includes(searchQuery) ||
                    advertisement.item.toLowerCase().includes(searchQuery) ||
                    advertisement.description.toLowerCase().includes(searchQuery) ||
                    advertisement.availability.toLowerCase().includes(searchQuery)
                );
            });
            setDataList(filteredAdvertisements);
        }
    };
    
    return (
        <div>
            <br />
            <button type="button" onClick={()=> navigate('/ads')} class="viewAllBtn" style={{marginLeft:"88%"}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> CreateNew</button>
            <br /> <br /><br />
            <div className="containerSM" style={{width:"91%"}}>
                <h1 style={{fontSize:"28px",marginLeft:"1%"}}><i>Manage Advertisement</i></h1>
            </div>
           
            <div className="row">
                <div className="col-lg-3 mt-2 mb-2" style={{marginLeft:"68%"}}>
                    <input 
                    className="form-control-search"
                    type="search"
                    placeholder="Search products"
                    name="searchQuery"
                    onChange={handleSearchArea}
                        
                    />
                
                </div>
            </div>
            <br /> <br />
            <table className="ads-table table table-hover">
                <thead>
                    <tr style={{textAlign:"center"}}>
                        <th scope="col">Type</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Discount</th>
                        <th scope="col" style={{width:"7%"}} >Price</th>
                        <th scope="col" style={{width:"7%"}}>New Price</th>
                        <th scope="col">Availability</th>
                        <th scope="col" style={{width:"12%"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((advertisement) => (
                        <tr key={advertisement.id}>
                            <td>{advertisement.type}</td>
                            <td>{advertisement.item}</td>
                            <td>{advertisement.description}</td>
                            <td><img src={advertisement.photo}></img></td>
                            <td style={{textAlign:"center"}}>{advertisement.discount}</td>
                            <td style={{textAlign:"center"}}>{advertisement.price}</td>
                            <td style={{textAlign:"center"}}>{advertisement.price-(advertisement.price*advertisement.discount/100)}</td> {/* Assuming 'newprice' is stored as 'price' */}
                            <td style={{textAlign:"center"}}>{advertisement.availability}</td>
                            <td><button type="button"  onClick={()=> navigate(`/editAds/${advertisement._id}`)}  class="btnActionSM1">Edid</button> <button type="button" onClick={() => handleDelete(advertisement._id)} class="btnActionSM2">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
 
        </div>
    );
}
export default AdsDetails;
