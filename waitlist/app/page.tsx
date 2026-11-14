import Mark from '@/components/Mark';
import Splash from '@/components/Splash';
import WaitlistForm from '@/components/WaitlistForm';

export default function Page() {
  return (
    <>
      <Splash />
      <main className="page">
        <div className="aurora" aria-hidden="true"><i /></div>
        <header className="top">
          <Mark className="top-mark" title="MAZAL" />
        </header>
        <section className="hero">
          <h1 className="headline">
            you&apos;re <span className="grad">early.</span>
          </h1>
          <p className="sub">something is opening at mazal. leave your email and you hear about it first.</p>
          <p className="surprise">waitlist members get a surprise.</p>
          <WaitlistForm />
        </section>
      </main>
    </>
  );
}
