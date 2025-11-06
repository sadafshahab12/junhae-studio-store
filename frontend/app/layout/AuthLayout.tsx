import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 p-4">
      <div className="text-center mb-8">
        <a href="#login" className="text-2xl font-bold tracking-wider text-gray-900">
            JUNHAE STUDIO
        </a>
      </div>
      <main className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        {children}
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Junhae Studio. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
