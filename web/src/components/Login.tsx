import React from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { loginSchema } from "@/auth.schema";
import{Card,CardHeader,CardTitle,CardContent,CardFooter} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";



type LogInFormFields = z.infer<typeof loginSchema>;



const Login: React.FC = () => {
  //const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormFields>({resolver:zodResolver(loginSchema),});

  const onSubmit= (data:LogInFormFields) => {
    console.log("Login Data", data);
    alert("Successfully Logged In");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md text-white border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative mt-2">
                  <Input id="username" placeholder="Enter Your Username"
                  {...register("username")} className="pl-10 bg-white/20 text-white border-none placeholder-gray-300"/>
                  <User className="absolute left-3 top-3 text-gray-300" size={20} strokeWidth={2}/>
                </div>
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Input id="password" type="password" placeholder="Enter Your Password"
                  {...register("password")} className="pl-10 bg-white/20 text-white border-none placeholder-gray-300"/>
                  <Lock className="absolute left-3 top-3 text-gray-300" size={20} strokeWidth={2}/>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full mt-6 bg-white text-black hover:bg-gray-200 cursor-pointer">Login</Button>
            </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="ml-1 text-blue-400 font-semibold hover:underline">Register</Link>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Login; 
      
    