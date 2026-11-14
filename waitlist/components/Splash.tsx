import Mark from '@/components/Mark';

const CHEVRONS = 8;

/**
 * Loading screen shown first, then faded away. Pure CSS (no JS), so it also
 * disappears on its own if scripts are slow or blocked.
 */
export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="aurora" />
      <div className="splash-inner">
        <Mark className="splash-mark" />
        <div className="chevrons">
          {Array.from({ length: CHEVRONS }, (_, i) => (
            <svg key={i} className="chev" style={{ ['--i' as string]: i }} viewBox="0 0 24 22">
              <path d="M3 3L12 19L21 3" />
            </svg>
          ))}
        </div>
        <p className="splash-text">loading the desk</p>
      </div>
    </div>
  );
}
