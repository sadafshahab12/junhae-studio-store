"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import MailIcon from "@/app/icons/MailIcon";
import LockIcon from "@/app/icons/LockIcon";
import AuthLayout from "@/app/layout/AuthLayout";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const user = await login(email);
      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        setError("Access denied. Admin credentials required.");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to log in. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to access the admin dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md shadow-sm">
          <Input
            type="email"
            placeholder="Admin Email"
            icon={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            icon={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <div>
          <Button type="submit" isLoading={loading} variant="primary">
            Sign In as Admin
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        <a
          href="/auth/login"
          className="font-medium text-gray-800 hover:text-gray-600"
        >
          Regular user login
        </a>
      </p>
    </AuthLayout>
  );
};

export default AdminLoginPage;

