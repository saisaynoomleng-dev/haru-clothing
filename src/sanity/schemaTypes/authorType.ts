import { LuUserPen } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatTitle } from '@/lib/formatter';

export const authorType = defineType({
  name: 'author',
  title: 'Authors',
  icon: LuUserPen,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `author-${doc.name}`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Author Photo',
      type: 'blockImage',
    }),
    defineField({
      name: 'body',
      title: 'Author Bio',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';

      return {
        title: nameFormatted,
        media: image || LuUserPen,
      };
    },
  },
});
