import { formatPrice, formatTitle, skuGenerator } from '@/lib/formatter';
import { FaTshirt } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  icon: FaTshirt,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Product SKU',
      type: 'string',
      initialValue: skuGenerator(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-${doc.sku}`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'basePrice',
      title: 'Product Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availableColors',
      title: 'Product Colors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productColor' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availableSizes',
      title: 'Product Sizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productSize' }] }],
    }),
    defineField({
      name: 'brand',
      title: 'Product Brand',
      type: 'reference',
      to: [{ type: 'productBrand' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productTag' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImages',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'blockImage' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Product Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'basePrice',
      image: 'mainImages.0.asset',
      category: 'category.name',
    },
    prepare({ name, price, image, category }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Product name not provided';
      const priceFormatted = price ? formatPrice(price) : 'Price not provided';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category Not provided';

      return {
        title: nameFormatted,
        subtitle: `Price: ${priceFormatted} | Category: ${categoryFormatted}`,
        media: image || FaTshirt,
      };
    },
  },
});
