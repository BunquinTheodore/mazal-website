'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const items = [
  {
    question: 'Is it really free?',
    answer:
      'Yes. The workshop itself is completely free. We just want committed learners, and depositing is a form of commitment. Your $50 stays in your own LBank account the entire time.',
  },
  {
    question: 'Why the $50 deposit?',
    answer:
      "It's not a fee, it's proof of commitment. We've found that people who put a small amount of skin in the game actually show up and finish the workshop. The deposit goes straight into your own LBank account, not to us.",
  },
  {
    question: 'Where does my money go?',
    answer:
      'Nowhere near us. The $50 you deposit goes directly into your own personal LBank account, under your own name and control. MAZAL never touches, holds, or has access to your funds.',
  },
  {
    question: 'Do I need experience?',
    answer:
      "None at all. This workshop is built for people who've never traded before. We start from the absolute basics: what crypto is, how exchanges work, and how to read a chart for the first time.",
  },
];

export default function WorkshopFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">FAQ</span>
        <h2><Words>Questions, <span className="g">answered</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap faq rv">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={'q' + (isOpen ? ' open' : '')} key={index}>
              <button aria-expanded={isOpen} onClick={() => handleClick(index)}>
                {item.question}
              </button>
              <div className="a">{item.answer}</div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
