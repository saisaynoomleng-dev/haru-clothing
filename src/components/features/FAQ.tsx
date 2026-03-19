'use client';

import { ALL_FAQS_QUERYResult } from '@/sanity/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import clsx from 'clsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const TABS = [
  'general-information-faq',
  'returns-exchanges-faq',
  'account-profile-faq',
  'payments-discounts-faq',
  'ordering-shipping-faq',
];

const FAQ = ({ data }: { data: NonNullable<ALL_FAQS_QUERYResult> }) => {
  const [currentTab, setCurrentTab] = useState<string>(
    'general-information-faq',
  );

  const faqData = data.filter((d) => d.slug === currentTab)[0].faqs || [];

  if (faqData.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 md:gap-x-5">
      <aside className="flex flex-col">
        {data.map((d) => (
          <Button
            key={d.slug}
            onClick={() => setCurrentTab(d.slug as string)}
            className={clsx(
              'bg-brand-pink-100/50 font-bold hover:bg-brand-pink-100/70',
              currentTab === d.slug && 'bg-brand-pink-200/70',
            )}
          >
            {d.name}
          </Button>
        ))}
      </aside>

      <Accordion type="single" collapsible>
        {faqData.map((faqs) => (
          <AccordionItem value={faqs._key} key={faqs._key}>
            <AccordionTrigger>{faqs.question}</AccordionTrigger>
            <AccordionContent>{faqs.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
