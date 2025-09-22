import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const Report = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8070/vehicle');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/deletevehicle/${id}`);
      const updatedVehicles = vehicles.filter(vehicle => vehicle._id !== id);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  
  const dataCount = vehicles.length;

  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 10,
    },
    header: {
      marginBottom: 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingTop: 5,
      paddingBottom: 5,
    },
    cell: {
      flex: 1,
      padding: 5,
    },
  });

  // PDF content
  const PDFContent = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <Text style={styles.cell}>Vehicle No</Text>
          <Text style={styles.cell}>Telephone No</Text>
        </View>
        {vehicles.map(vehicle => (
          <View key={vehicle._id} style={styles.row}>
            <Text style={styles.cell}>{vehicle.VehicleNo}</Text>
            <Text style={styles.cell}>{vehicle.Telephoneno}</Text>
          </View>
        ))}
        <Text style={{ marginTop: 10 }}>Avalable Total Vehicle Count: {dataCount}</Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFViewer width="100%" height="600">
        {PDFContent}
      </PDFViewer>
      <PDFDownloadLink document={PDFContent} fileName="report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Report;
