import { defineQuery } from 'next-sanity';

// query all products
export const ALL_PRODUCTS_QUERY = defineQuery(`{
  "products": *[_type == 'product'
               && defined(slug.current)]{
                  name,
                  "slug": slug.current,
                  "category": category->.name,
                  basePrice,
                  "imageUrl": mainImages[0].asset->.url,
                  "imageAlt": mainImages[0].alt
               },
  "total": count(*[_type == 'product'
               && defined(slug.current)])
}`);

// query all blogs
export const ALL_BLOGS_QUERY = defineQuery(`{
  "blogs": *[_type == 'blog'
            && defined(slug.current)]{
              name,
              "slug": slug.current,
              publishedAt,
              "imageUrl": mainImage.asset->.url,
              "imageAlt": mainImage.alt,
              "category": category->.name,
              "author": author->.name,
            },
  "total": count(*[_type == 'blog'
            && defined(slug.current)])
}`);

// query all faqs
export const ALL_FAQS_QUERY = defineQuery(`*[_type == 'faq'
 && defined(slug.current)]{
  name,
  "slug": slug.current,
  faqs[]{
    question,
    answer
  }
 }`);

// all members
export const ALL_MEMBERS_QUERY = defineQuery(`{
  "members": *[_type == 'teamMember'
              && defined(slug.current)]{
                name,
                "slug": slug.current,
                position,
                "imageUrl": mainImage.asset->.url,
                "imageAlt": mainImage.alt   
              },
  "total": count(*[_type == 'teamMember'
              && defined(slug.current)])
}`);
