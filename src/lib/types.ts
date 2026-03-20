import {
  ALL_AUTHORS_QUERYResult,
  ALL_BLOGS_QUERYResult,
  ALL_MEMBERS_QUERYResult,
  ALL_PRODUCTS_QUERYResult,
  ALL_STORES_QUERYResult,
} from '@/sanity/types';

// bounded
export type BoundedProps = {
  children: React.ReactNode;
  className?: string;
  isPaded?: boolean;
  as?: React.ElementType;
};

// Submit Button
export type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

// CTA
export type CTAProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

// Product Cards
export type ProductCardProps = NonNullable<
  ALL_PRODUCTS_QUERYResult['products'][number]
> & { className?: string };

// Blog Card
export type BlogCardProps = NonNullable<
  ALL_BLOGS_QUERYResult['blogs']
>[number] & { className?: string };

// My Sanity Images
export type MySanityImageProps = {
  src: string;
  alt: string;
  className?: string;
};

// Member Card
export type MemberCardProps = NonNullable<
  ALL_MEMBERS_QUERYResult['members']
>[number] & { className?: string };

// Page Title
export type PageTitleProps = {
  title: string;
  text: string;
  className?: string;
};

// Form Previous Props
export type PreviousFormProps = {
  success: boolean;
  message: string;
  field?: string;
};

// Store Card
export type StoreCardProps = NonNullable<
  ALL_STORES_QUERYResult['stores']
>[number] & { className?: string };

// Store Filter
export type StoreFilterProps = {
  countries: string[];
  continents: string[];
};

// Back to
export type BackToProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
};

// Author Card
export type AuthorCardProps = NonNullable<ALL_AUTHORS_QUERYResult>[number] & {
  className?: string;
};
