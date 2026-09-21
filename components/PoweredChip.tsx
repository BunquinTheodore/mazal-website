import Image from 'next/image';

export default function PoweredChip() {
  return (
    <a className="powered" href="#" aria-label="Powered by GN Ventures">
      Powered by <Image src="/assets/images/gn-ventures.png" alt="GN Ventures" width={1080} height={1080} />
    </a>
  );
}
