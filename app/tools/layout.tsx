import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-9 sm:py-12">{children}</div>
      </main>
      <Footer />
    </ClientShell>
  );
}
