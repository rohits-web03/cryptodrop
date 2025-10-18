import FileReceive from '@/components/FileReceive';
import FileUpload from '@/components/FileUpload';
import Login from '@/components/Login';
import Register from '@/components/Register';
import LandingPage from '@/routes/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/share">
					<Route index element={<Navigate to="/share/send" replace />} />
					<Route path="send" element={<FileUpload />} />
					<Route path="receive" element={<FileReceive />} />
				</Route>
			</Routes>
			<Toaster position="top-right" richColors />
		</BrowserRouter>
	);
}

export default App;
