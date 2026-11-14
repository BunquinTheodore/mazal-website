/** The MAZAL "M" mark as a flat vector, traced from the brand mock. */
export default function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 96"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      <path d="M0 0H28L50 64L72 0H100V35H94V56H100V96H0V56H6V35H0Z" />
    </svg>
  );
}
