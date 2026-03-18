import { MdOutlineStore } from 'react-icons/md';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatTitle } from '@/lib/formatter';

export const storeType = defineType({
  name: 'store',
  title: 'Stores',
  icon: MdOutlineStore,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-store`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address1',
      title: 'Address 1',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address2',
      title: 'Address 2',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'Zip/Postal Code',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Store Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lat',
      title: 'Latitudee',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'long',
      title: 'Longtitude',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: {
        list: [
          { title: 'North America', value: 'north-america' },
          { title: 'South America', value: 'south-america' },
          { title: 'Europe', value: 'europe' },
          { title: 'Asia', value: 'asia' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      name: 'name',
      country: 'country',
      image: 'mainImage',
    },
    prepare({ name, country, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const countryFormatted = country
        ? formatTitle(country)
        : 'Country not provided';

      return {
        title: nameFormatted,
        subtitle: `Country: ${countryFormatted}`,
        media: image || MdOutlineStore,
      };
    },
  },
});
