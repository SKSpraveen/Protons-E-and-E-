import "./StockManager.css";
import SM_Dashboard_Header from "../../Components/Sasindu/SMComponents/SM_Dashboard_Header";
import InventoryTable from "../../Components/Sasindu/SMComponents/InventoryTable";

function Inventory() {
  return (
    <div className="body1">
        <SM_Dashboard_Header />
        <br /> <br /> <br /> <br /> <br />
        <InventoryTable />
    </div>
  );
}

export default Inventory;