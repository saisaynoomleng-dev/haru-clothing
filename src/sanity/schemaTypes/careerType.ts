import { IoMdBriefcase } from 'react-icons/io';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const careerType = defineType({
  name: 'career',
  title: 'Careers',
  type: 'document',
  icon: IoMdBriefcase,
  fields: [
    defineField({
      name: 'name',
      title: 'Position Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-career`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineer' },
          { title: 'Operations', value: 'operations' },
          { title: 'Growth & Marketing', value: 'growth-&-marketing' },
          { title: 'Design', value: 'design' },
          { title: 'Marchandising', value: 'marchandising' },
          { title: 'Support', value: 'support' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'People', value: 'people' },
          { title: 'Sales', value: 'sales' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'body',
      title: 'Position Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
