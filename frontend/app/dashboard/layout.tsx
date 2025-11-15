"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../context/AuthContext";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/admin/login");
      } else if (currentUser.role !== "admin") {
        router.push("/");
      }
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AuthProvider is now top-level of the layout
  return (
    <AuthProvider>
      <ProtectedContent>{children}</ProtectedContent>
    </AuthProvider>
  );
}
