import Navbar from "../ui/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
