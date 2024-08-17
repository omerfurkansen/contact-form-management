import AppBar from '@/src/components/AppBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
