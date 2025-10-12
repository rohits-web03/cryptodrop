import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema } from '@/schema/auth';
import type { RegisterFormFields } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm<RegisterFormFields>({
		resolver: zodResolver(registerSchema),
	});

	//const password = watch("password");

	const onSubmit = (data: RegisterFormFields) => {
		console.log('Form Data:', data);
		alert('Registration Successful');
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-black text-white">
			<Card className="w-full max-w-md bg-white/10 backdrop-blur-md text-white border-none shadow-xl">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-bold">Create An Account</CardTitle>
					<p className="text-sm text-gray-300 mt-2">
						Join us to securely upload and receive files with ease.
					</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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
									className="absolute left-[0.5rem] top-[0.5rem] text-gray-300 "
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
							<Label htmlFor="email">Email</Label>
							<div className="relative mt-2">
								<Input
									id="email"
									type="email"
									placeholder="Enter Your Email"
									{...register('email')}
									className="pl-9 bg-white/20 text-white border-none placeholder-gray-300"
								/>
								<Mail
									className="absolute left-[0.5rem] top-[0.5rem] text-gray-300 "
									size={20}
									strokeWidth={2}
								/>
							</div>
							{errors.email && (
								<p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
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
									className="absolute left-[0.5rem] top-[0.5rem] text-gray-300 "
									size={20}
									strokeWidth={2}
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 cursor-pointer hover:text-white hover:bg-transparent "
									onClick={() => setShowPassword(!showPassword)}
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

						<div>
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<div className="relative mt-2">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="Confirm Password"
									{...register('confirmPassword')}
									className="pl-9 bg-white/20 text-white border-none placeholder-gray-300"
								/>
								<Lock
									className="absolute left-[0.5rem] top-[0.5rem] text-gray-300 "
									size={20}
									strokeWidth={2}
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 cursor-pointer hover:text-white hover:bg-transparent "
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</Button>
							</div>
							{errors.confirmPassword && (
								<p className="text-red-400 text-sm mt-1">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
						<Button
							type="submit"
							className="w-full mt-2 bg-white text-black hover:bg-gray-200 cursor-pointer"
						>
							Register
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center text-sm">
					Already have an account?{' '}
					<Link to="/login" className="ml-1 text-blue-400 font-semibold hover:underline">
						Login
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};
export default Register;
