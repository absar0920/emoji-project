interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-primary-dark dark:prose-headings:text-indigo-100 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
