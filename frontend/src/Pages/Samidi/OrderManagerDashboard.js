import OM_Dashboard_Content from '../../Components/Samidi/OMComponents/OM_Dashboard_Content';
import OM_Dashboard_Header from '../../Components/Samidi/OMComponents/OM_Dashboard_Header';


function OrderManagerDashboard() {
  return (

      <div className="body1">
        <OM_Dashboard_Header />
      <OM_Dashboard_Content />
      </div>
  );
}

export default OrderManagerDashboard;