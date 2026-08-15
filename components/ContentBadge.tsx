interface ContentBadgeProps {
  children: string;
}

export function ContentBadge({ children }: ContentBadgeProps) {
  return <p className="content-badge">{children}</p>;
}
