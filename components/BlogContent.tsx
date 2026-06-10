interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  return <div className="fg-article max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
