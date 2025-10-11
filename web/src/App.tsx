import Login from "./components/Login"
import Register from "./components/Register"
import FileUpload from "./components/FileUpload";
import FileReceive from "./components/FileReceive";



import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/share/send" element={<FileUpload/>}/>
        <Route path="/share/receive" element={<FileReceive />} />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
