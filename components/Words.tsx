import { Children, cloneElement, isValidElement, ReactNode } from 'react';

function splitNode(node: ReactNode, counter: { i: number }, keyPrefix: string): ReactNode {
  if (typeof node === 'string') {
    const parts = node.split(/(\s+)/);
    return parts.map((part, idx) => {
      if (part.trim() === '') return part;
      const i = counter.i++;
      return (
        <span key={`${keyPrefix}-${idx}`} className="word" style={{ ['--i' as any]: i }}>
          {part}
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((n, idx) => splitNode(n, counter, `${keyPrefix}-${idx}`));
  }
  if (isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>;
    const children = Children.map(el.props.children, (c, idx) =>
      splitNode(c, counter, `${keyPrefix}-c${idx}`)
    );
    return cloneElement(el, undefined, children);
  }
  return node;
}

export default function Words({ children }: { children: ReactNode }) {
  const counter = { i: 0 };
  return <>{splitNode(children, counter, 'w')}</>;
}
