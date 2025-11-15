"use client";
import React, { useState } from "react";

import Link from "next/link";
import Input from "@/app/(public)/components/ui/Input";
import UserIcon from "@/app/icons/UserIcon";
import AuthLayout from "@/app/layout/AuthLayout";
import Button from "@/app/(public)/components/ui/Button";
import MailIcon from "@/app/icons/MailIcon";
import LockIcon from "@/app/icons/LockIcon";
import { useAuth } from "@/app/context/AuthContext";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    try {
      await signup(name, email);
      // The router in App.tsx will handle redirection
    } catch (err) {
      console.log(err);
      setError("Failed to create an account.");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Join the Junhae Circle
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Create an account to print your vibe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md shadow-sm">
          <Input
            type="text"
            placeholder="Full name"
            icon={<UserIcon />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <Input
            type="password"
            placeholder="Confirm Password"
            icon={<LockIcon />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <div className="cursor-pointer">
          <Button type="submit" isLoading={loading} variant="primary">
            Create Account
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-gray-800 hover:text-gray-600"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
