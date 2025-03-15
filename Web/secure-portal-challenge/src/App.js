import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SecurePortal from './SecurePortal';
import LoginFailed from './LoginFailed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SecurePortal />} />
        <Route path="/login-failed" element={<LoginFailed />} />
      </Routes>
    </Router>
  );
}

export default App;
