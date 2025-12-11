import axios from 'axios';
import { toast } from 'sonner';

export const useLogout = () => {
	const logout = async () => {
		try {
			// Attempt to kill session from server
			await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`);

			toast.success('Logged out successfully');
		} catch (error) {
			console.error('Logout API failed - Network issue?', error);
			toast.error('Logout failed');
		} finally {
			// Wipe Storage
			sessionStorage.clear();

			/* HARD RELOAD
			This forces the browser to dump the JS Heap (RAM),
			ensuring no private keys remain in memory variables.
            */
			window.location.href = '/auth/login';
		}
	};

	return { logout };
};
