"use client";
import UserProvider from "../providers/UserProvider";
import Navbar from "../ui/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Navbar />
      {children}
    </UserProvider>
  );
}
