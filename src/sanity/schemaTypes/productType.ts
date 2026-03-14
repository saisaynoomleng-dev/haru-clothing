import { formatPrice, formatTitle, skuGenerator } from '@/lib/formatter';
import { FaTshirt } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { SkuInput } from './components/skuInput';

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
      components: { input: SkuInput },
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
      name: 'brand',
      title: 'Product Brand',
      type: 'reference',
      to: [{ type: 'productBrand' }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            defineField({
              name: 'sku',
              title: 'Product SKU',
              type: 'string',
              components: { input: SkuInput },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'reference',
              to: [{ type: 'productColor' }],
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'reference',
              to: [{ type: 'productSize' }],
            }),
            defineField({
              name: 'stock',
              title: 'Stock Quantity',
              type: 'number',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'priceOverride',
              title: 'Price Override',
              description:
                'Only fill this if the price is different from the base price',
              type: 'number',
            }),
            defineField({
              name: 'fit',
              title: 'Fit size',
              type: 'string',
              options: {
                list: [
                  { title: 'Slim Fit', value: 'slim-fit' },
                  { title: 'Oversized', value: 'oversized' },
                  { title: 'Petite', value: 'petite' },
                  { title: 'tall', value: 'tall' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'mainImages',
              title: 'Variant Images',
              type: 'array',
              of: [{ type: 'blockImage' }],
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
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
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
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
