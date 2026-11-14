import Mark from '@/components/Mark';

export const metadata = { title: 'MAZAL | unsubscribed', robots: { index: false, follow: false } };

export default function Unsubscribed({ searchParams }: { searchParams: { error?: string } }) {
  const failed = Boolean(searchParams.error);
  return (
    <main className="page plain">
      <div className="aurora" aria-hidden="true" />
      <header className="top">
        <Mark className="top-mark" title="MAZAL" />
      </header>
      <section className="hero">
        <h1 className="headline small">{failed ? 'that link did not work.' : "you're unsubscribed."}</h1>
        <p className="sub">
          {failed
            ? 'the link may be incomplete. reply to any email from us and we will remove you by hand.'
            : 'we will not email you again. if that was a mistake, you can always sign up again.'}
        </p>
        <a className="pill-btn" href="/">back to mazal</a>
      </section>
    </main>
  );
}
