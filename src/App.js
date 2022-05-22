import './App.css';
import {Header} from './components/header/header';

import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import {BookingProvider} from "./context/booking/context.jsx";
import {Booking} from "./components/booking/booking.jsx";
import {Homepage} from './components/home/Homepage';
import {CreateAccount} from './components/account/createAccount';
import {SignIn} from './components/account/signIn';
import {LogOut} from './components/account/logOut';
import {MyAccount} from './components/account/myAccount';


function App() {
  return (
    <div className="App">
      <BookingProvider>
      <HashRouter>
          <Header/>
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/booking" element={<Booking />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/createAccount" element={<CreateAccount />} /> 
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/myAccount" element={<MyAccount />} />
              <Route path="/logOut" element={<LogOut />} />
            </Routes>
          </HashRouter>
        </BookingProvider>
    </div>
  );
}

export default App;
