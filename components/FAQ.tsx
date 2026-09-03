'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const items = [
  {
    question: 'Who is this community for?',
    answer:
      "Anyone curious about trading — complete beginners, experienced traders, students, creators, and brands. If you want to learn the markets with other people instead of alone, MAZAL is for you.",
  },
  {
    question: 'How do I join?',
    answer:
      "Join the Discord at discord.gg/Mazal — it takes less than a minute. Introduce yourself, pick your channels, and you're in. Membership is completely free.",
  },
  {
    question: 'What markets do you trade?',
    answer:
      'Primarily crypto and gold. Daily analysis, live sessions, and trade recaps cover both, and the fundamentals we teach — structure, candlesticks, risk management — apply to any market.',
  },
  {
    question: 'Is this beginner friendly?',
    answer:
      "Yes — it's built for beginners. Our free 8 part Beginner Trading Workshop starts from zero: what crypto is, how platforms work, reading charts, and managing risk. No experience needed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">FAQ</span>
        <h2>
          <Words>
            Questions, <span className="g">answered</span>
          </Words>
        </h2>
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
