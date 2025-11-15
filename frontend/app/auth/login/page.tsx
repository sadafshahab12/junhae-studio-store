"use client";
import Button from "@/app/(public)/components/ui/Button";
import Input from "@/app/(public)/components/ui/Input";
import { useAuth } from "@/app/context/AuthContext";


import GoogleIcon from "@/app/icons/GoogleIcon";
import LockIcon from "@/app/icons/LockIcon";
import MailIcon from "@/app/icons/MailIcon";
import AuthLayout from "@/app/layout/AuthLayout";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      await login(email);
      // The router in App.tsx will handle redirection
    } catch (err) {
      console.log(err);
      setError("Failed to log in. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to continue to Junhae Studio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md shadow-sm">
          <Input
            type="email"
            placeholder="Email address"
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

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-gray-800 hover:text-gray-600"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="cursor-pointer">
          <Button type="submit" isLoading={loading} variant="primary">
            Sign In
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="social">
            <GoogleIcon className="mr-3" />
            Sign in with Google
          </Button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Not a member?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-gray-800 hover:text-gray-600"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
