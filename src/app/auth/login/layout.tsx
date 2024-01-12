
export default function LoginLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="bg-green-500">
      {children}
    </main>
  );
}