import Footer from "../../Components/Footer"
import Header from "../Kavishka/homeHeder"
import Slideshow from '../../Components/Slideshow';
import '../../App.css';
import CCTVAdvertisements from '../../Components/Sasindu/CCTVAdvertisements';


function App() {
  return (

      <div>
        <Header />
        <Slideshow />
        <br /><br />
        <CCTVAdvertisements />
        <Footer />
      </div>
  );
}

export default App;