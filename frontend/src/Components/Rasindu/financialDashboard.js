import Header from './componants/Header';
import './css/flex.css';
import './App.css';
import React from "react";
import ExpenceTable from './componants/expenceTable';
import{
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,//y
  Tooltip,
  Legend
}from 'chart.js';
import {Bar} from 'react-chartjs-2';
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,//y
  Tooltip,
  Legend
)
function finacialdashboard() {

  

  const data={
    labels:['Jan','feb','Mar'],
    datasets:[
      {
        label:'Income',
        data:[50,30,89],
        backgroundColor:'black',

      },
      {
        label:'Expence',
        data:[20,60,79],
        backgroundColor:'#fa730c',
  
      }
    ]
  }
  const options={

  }
  return (
    <div>
      <Header />
      <div className="rflex-container">
	      <div className="flex-box">
          <h1 style={{fontSize:"30px",marginTop:"50px", color:"#fa730c"}}>Total Incomes:</h1>
          <h2 style={{fontSize:"70px",marginTop:"50px",color:"white"}}>Rs.100</h2>
		
	      </div>
	      <div className="rflex-box">
          <h1 style={{fontSize:"30px",marginTop:"50px", color:"#fa730c"}}>Total Expences:</h1>
          <h2 style={{fontSize:"70px",marginTop:"50px",color:"white"}}>Rs.200</h2>
		
	      </div>
	      <div className="flex-box">
          <h1 style={{fontSize:"30px",marginTop:"50px", color:"#fa730c"}}>Balance:</h1>
          <h2 style={{fontSize:"70px",marginTop:"50px",color:"white"}}>-Rs.100</h2>
		
	      </div>
      </div>
      <div>
        <Bar
        style={
          {padding:'100px',width:'50%'}
          
        }
        data={data}
        option={options}
        >

        </Bar>
      </div>
      


    </div>
  );
}

export default finacialdashboard;