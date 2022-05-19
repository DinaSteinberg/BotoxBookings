import './App.css';
import {Header} from './components/header/header';
import {Homepage} from './components/home/Homepage';
import {Quickstart} from './components/booking/quickstart';
import {CreateAccount} from './components/account/createAccount';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import {BookingProvider} from "./context/booking/context.jsx";
import {Booking} from "./components/booking/booking.jsx";

function App() {
  return (
    <div className="App">
      <BookingProvider>
      <HashRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/booking" element={<Booking />} />
              {/* <Route path="/contact" element={<Contact />} />*/}
              <Route path="/myAccount" element={<CreateAccount />} /> 
            </Routes>
          </HashRouter>
        </BookingProvider>
    </div>
  );
}

export default App;
