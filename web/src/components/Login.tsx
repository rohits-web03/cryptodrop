import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/schema/auth';
import type { LogInFormFields } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Lock, EyeOff, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
	//const navigate=useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInFormFields>({ resolver: zodResolver(loginSchema) });

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (data: LogInFormFields) => {
		console.log('Login Data', data);
		alert('Successfully Logged In');
	};
	return (
		<div className="flex items-center justify-center min-h-screen bg-black">
			<Card className="w-full max-w-md bg-white/10 backdrop-blur-md text-white border-none shadow-xl">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
					<p className="text-sm text-gray-300 mt-2">
						Log in to access your files and shared content.
					</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<Label htmlFor="username">Username</Label>
							<div className="relative mt-2">
								<Input
									id="username"
									placeholder="Enter Your Username"
									{...register('username')}
									className="pl-9 bg-white/20 text-white border-none placeholder-gray-300"
								/>
								<User
									className="absolute left-[0.5rem] top-[0.5rem] text-gray-300"
									size={20}
									strokeWidth={2}
								/>
							</div>
							{errors.username && (
								<p className="text-red-400 text-sm mt-1">
									{errors.username.message}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<div className="relative mt-2">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter Your Password"
									{...register('password')}
									className="pl-9 bg-white/20 text-white border-none placeholder-gray-300"
								/>
								<Lock
									className="absolute left-[0.5rem] top-[0.5rem] text-gray-300"
									size={20}
									strokeWidth={2}
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 cursor-pointer hover:text-white hover:bg-transparent "
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</Button>
							</div>
							{errors.password && (
								<p className="text-red-400 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
						<Button
							type="submit"
							className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer"
						>
							Login
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center text-sm">
					Don&apos;t have an account?{' '}
					<Link
						to="/register"
						className="ml-1 text-blue-400 font-semibold hover:underline"
					>
						Register
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};
export default Login;
