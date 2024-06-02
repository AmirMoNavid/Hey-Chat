export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center w-full">
      {children}
    </div>
  );
}
