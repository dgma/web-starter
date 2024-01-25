export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative md:container md:mx-auto min-h-screen xxl:p-24 p-10 flex flex-col justify-center">
      {children}
    </div>
  );
}
