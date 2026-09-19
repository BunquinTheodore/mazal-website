import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import JoinWizard from '@/components/join/JoinWizard';

export const metadata: Metadata = {
  title: 'Join Mazal',
  description: 'Tell us about yourself and choose your path into the Mazal community.',
};

export default function JoinPage() {
  return (
    <>
      <Nav />
      <main className="jpage">
        <div className="wrap jwrap">
          <JoinWizard />
        </div>
      </main>
    </>
  );
}
