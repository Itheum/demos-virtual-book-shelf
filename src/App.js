 import './App.css';
import { BookShelf } from './components/BookShelf/BookShelf';
import {Navigate,  Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MyLoginComponent from './components/login/MyLoginComponent';
import { DappProvider } from "@multiversx/sdk-dapp/wrappers";
import { TransactionsToastList, SignTransactionsModals, NotificationModal } from "@multiversx/sdk-dapp/UI";

function App() {

  return (
  <DappProvider
      environment={"devnet"}
      customNetworkConfig={{
        name: "customConfig",
        apiTimeout: 10000,
      }}>
      <TransactionsToastList successfulToastLifetime={1000} customToastClassName="absolute" />
      <NotificationModal />
      <SignTransactionsModals />
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<MyLoginComponent />} />
            <Route path="/shelf" element={<BookShelf />} />
          </Routes>
        </Router>
      </div>
  </DappProvider>
       
      
  );
}

export default App;
