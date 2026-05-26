interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:text-primary-dark prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
