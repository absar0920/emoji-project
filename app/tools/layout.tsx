import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </ClientShell>
  );
}
