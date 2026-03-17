import { FaNewspaper } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './sanitySlugifier';
import { formatDate, formatTitle } from '@/lib/formatter';

export const blogType = defineType({
  name: 'blog',
  title: 'Blogs',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Blog Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-blog`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minRead',
      title: 'Duration',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Blog Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Blog Cover Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Blog Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      minRead: 'minRead',
      category: 'category.name',
      author: 'author.name',
      publishedAt: 'publishedAt',
      image: 'mainImage',
    },
    prepare({ name, minRead, category, author, publishedAt, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Title not provided';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category not provided';
      const authorFormatted = author
        ? formatTitle(author)
        : 'Author not provided';
      const publishedAtFormatted = publishedAt
        ? formatDate(publishedAt)
        : 'No specific published date';

      return {
        title: `${nameFormatted} | ${categoryFormatted}`,
        subtitle: `Published On: ${publishedAtFormatted} | Author: ${authorFormatted}`,
        media: image || FaNewspaper,
      };
    },
  },
});
