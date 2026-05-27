'use client';

import { PortableText } from '@portabletext/react';

interface StorySectionProps {
  aboutStory?: any[];
}

export default function StorySection({ aboutStory }: StorySectionProps) {
  if (!aboutStory || aboutStory.length === 0) {
    // Fallback content
    return (
      <>
        <h2 style={{fontFamily: 'var(--font-fredoka)', fontSize: 'clamp(32px, 3.6vw, 48px)', margin: '0 0 24px'}}>
          I started baking because <span className="script" style={{color: 'var(--coral)', fontStyle: 'italic'}}>my kids deserved better.</span>
        </h2>
        <p style={{fontSize: '18px', lineHeight: 1.6, marginBottom: '16px', color: 'var(--ink-soft)'}}>
          I'm Zizou — mom of two, lifelong baker, and unwilling reader of every snack ingredient label in Sainsbury's. After one too many "natural" muffins with five kinds of sugar, I started baking my own.
        </p>
        <p style={{fontSize: '18px', lineHeight: 1.6, marginBottom: '24px', color: 'var(--ink-soft)'}}>
          Then friends asked. Then their friends asked. So here we are — handmade bakes for moms who care, made with dates, oats, nuts and a lot of love.
        </p>
        <p className="script" style={{fontSize: '24px', color: 'var(--coral)'}}>— Zizou ✿</p>
      </>
    );
  }

  return (
    <div style={{fontSize: '18px', lineHeight: 1.6, color: 'var(--ink-soft)'}}>
      <PortableText
        value={aboutStory}
        components={{
          block: {
            normal: ({children}) => (
              <p style={{fontSize: '18px', lineHeight: 1.6, marginBottom: '16px', color: 'var(--ink-soft)'}}>
                {children}
              </p>
            ),
            h2: ({children}) => (
              <h2 style={{fontFamily: 'var(--font-fredoka)', fontSize: 'clamp(32px, 3.6vw, 48px)', margin: '0 0 24px'}}>
                {children}
              </h2>
            ),
          },
          marks: {
            em: ({children}) => <span className="script" style={{color: 'var(--coral)', fontStyle: 'italic'}}>{children}</span>,
            strong: ({children}) => <strong>{children}</strong>,
          },
        }}
      />
    </div>
  );
}
