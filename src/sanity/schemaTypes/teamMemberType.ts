import { HiUserGroup } from 'react-icons/hi';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatTitle } from '@/lib/formatter';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  icon: HiUserGroup,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Member Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-member`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Member Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'Member Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      position: 'position',
      image: 'mainImage',
    },
    prepare({ name, position, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const positionFormatted = position
        ? formatTitle(position)
        : 'Position not provided';

      return {
        title: nameFormatted,
        subtitle: `Position: ${positionFormatted}`,
        media: image || HiUserGroup,
      };
    },
  },
});
