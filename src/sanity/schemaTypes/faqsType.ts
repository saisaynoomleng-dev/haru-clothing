import { FaQuestion } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const faqsType = defineType({
  name: 'faq',
  title: 'FAQs',
  icon: FaQuestion,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'FAQs Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'SLug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-FAQ`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
