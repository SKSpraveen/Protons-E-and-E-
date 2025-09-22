import React from "react"
import '../css/userTable.css'

function UserDetails(){
    return(
        <div className="table-possition">
            <table class="table-fill">
            <thead>
            <tr>
            <th class="text-left">Name</th>
            <th class="text-left">NIC</th>
            <th class="text-left">Age</th>
            <th class="text-left">Email</th>
            <th class="text-left">Whatsapp No.</th>
            <th class="text-left">Contact No.</th>
            <th class="text-left">Password</th>
            </tr>
            </thead>
            <tbody class="table-hover">
            <tr>
            <td class="text-left">January</td>
            <td class="text-left">$ 50,000.00</td>
            <td class="text-left">$ 10,000.00</td>
            </tr>
            <tr>
            <td class="text-left">February</td>
            <td class="text-left">$ 10,000.00</td>
            </tr>
            <tr>
            <td class="text-left">March</td>
            <td class="text-left">$ 85,000.00</td>
            </tr>
            <tr>
            <td class="text-left">April</td>
            <td class="text-left">$ 56,000.00</td>
            </tr>
            <tr>
            <td class="text-left">May</td>
            <td class="text-left">$ 98,000.00</td>
            </tr>
            </tbody>
            </table>
  

            </div>
    )
}
export default UserDetails;