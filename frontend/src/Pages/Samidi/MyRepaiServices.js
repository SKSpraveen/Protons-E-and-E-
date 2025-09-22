import { useNavigate } from "react-router-dom";

function MyRepairService()
{

    const navigate=useNavigate();
    return (
        <div>
              <br /><br />
                <button type="button" onClick={()=> navigate('/viewTable')} class="viewTableBtn"><i class="fa fa-eye" aria-hidden="true"></i> View Table</button>
                <br /><br />
           
        </div>
    );
}
export default MyRepairService;