export default function StickyJoinBar({ label = 'Join Now' }: { label?: string }) {
  return (
    <div className="sticky-join-bar" aria-hidden={false}>
      <a className="btn" href="#signup">{label}</a>
    </div>
  );
}
