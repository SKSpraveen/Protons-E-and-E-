import EditStockForm from "../../Components/Sasindu/SMComponents/EditStockForm";
import SM_Dashboard_Header from "../../Components/Sasindu/SMComponents/SM_Dashboard_Header";
import "./StockManager.css";

function EditStock(){
    return(
        <div className="body1">
            <SM_Dashboard_Header />
            <EditStockForm />
        </div>
    )
}
export default EditStock;