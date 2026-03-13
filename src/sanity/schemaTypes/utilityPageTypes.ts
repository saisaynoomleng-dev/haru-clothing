import { CiTextAlignJustify } from 'react-icons/ci';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utility Pages',
  type: 'document',
  icon: CiTextAlignJustify,
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-utility-page`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
