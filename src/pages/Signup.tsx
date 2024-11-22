import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account created",
      description: "Welcome to FoodieHub! Your account has been created successfully.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-white p-4">
      <Card className="w-full max-w-md p-8 glass-card fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-600">Join FoodieHub today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              className="w-full"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link to="/login" className="text-sage-600 hover:text-sage-700 font-medium">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;