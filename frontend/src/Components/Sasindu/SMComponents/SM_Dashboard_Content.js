import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart.js
import "../../.././Pages/Sasindu/StockManager.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

function SM_Dashboard_Content(){

  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [chartInstance, setChartInstance] = useState(null); // State variable to keep track of the chart instance

  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8070/Stock");
      console.log(response.data);
      if (response.data.success) {
        setDataList(response.data.stocks);
      } else {
        alert("Failed to fetch stocks");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch stocks");
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    // Draw chart whenever dataList changes
    drawChart();
    
    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [dataList]); // Redraw chart when dataList changes

  const drawChart = () => {
    const ctx = document.getElementById("myChart");

    if (!ctx) return;

    // Check if a chart already exists and destroy it
    if (chartInstance) {
      chartInstance.destroy();
    }

    const productLabels = dataList.map((stock) => stock.product);
    const productCosts = dataList.map(
      (stock) => stock.unitPrice * stock.quantity
    );

    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: productLabels,
        datasets: [
          {
            label: "Product Cost",
            data: productCosts,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance); // Set the new chart instance
  };

  return (
    <div>
      <div className="row" style={{width:"100%"}}>
        <div className="col-sm-6 mb-2 mb-sm-0">
          <div className="card" style={{marginLeft:"3%"}}>
            <div className="card-body" style={{border:"2px solid"}}>
              {/* Place to render the chart */}
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card" style={{border:"2px solid"}}>
            <div className="card-body">
              <h5 className="card-title" style={{marginLeft:"3%",fontWeight:"bold"}}>Quick Actions</h5>
              <br />
              <div className="d-grid gap-2 d-md-block">
                <button className="Quickbtn" type="button" style={{marginLeft:"4%"}}><i className="fa fa-plus" aria-hidden="true"></i> Sales</button>
                <button className="Quickbtn" type="button" style={{marginLeft:"8%"}} onClick={()=> navigate('/addstock')}><i className="fa fa-plus" aria-hidden="true"></i> Stock</button>
              </div>
              <br />
              <div className="d-grid gap-2 d-md-block">
                <button className="Quickbtn" type="button" style={{marginLeft:"4%"}} onClick={()=> navigate('/ads')}><i className="fa fa-plus" aria-hidden="true"></i> Advertisement</button>
                <button className="Quickbtn" type="button" style={{marginLeft:"8%"}} >Selling Price</button>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <br /> <br />
      <div className="card" style={{width:"80%",marginLeft:"10%"}}>
        <div className="card-body cbody">
          <h5 className="card-header chead">Quick Views</h5><br />
          <div class="d-grid gap-2 d-md-block">
            <button className=" QuickViewbtn" style={{marginLeft:"5%"}} onClick={()=> navigate('/viewAllStock')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> All Stock</button>
            <button className=" QuickViewbtn" style={{marginLeft:"6%"}} onClick={()=> navigate('/ads')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> All Sales</button>
            <button className=" QuickViewbtn" style={{marginLeft:"6%"}} onClick={()=> navigate('/viewAllAds')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> All Advertisement</button>
            <button className=" QuickViewbtn" style={{marginLeft:"6%"}} onClick={()=> navigate('/sellingPrice')} type="button"><i class="fa fa-eye" aria-hidden="true"></i> Price List</button>
          </div>
        </div>
      </div>
      <br /><br /><br />
    </div>
  );
}

export default SM_Dashboard_Content;
