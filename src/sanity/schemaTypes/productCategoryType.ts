import { MdCategory } from 'react-icons/md';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Product Categories',
  type: 'document',
  icon: MdCategory,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Category',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-category`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
