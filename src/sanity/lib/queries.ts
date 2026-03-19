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
    answer,
    _key
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

// utility page
export const UTILITY_PAGE_QUERY = defineQuery(`*[_type == 'utilityPage'
 && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  body,
  "title": seo.title,
  "description": seo.description
 }`);

// get all stores
export const ALL_STORES_QUERY = defineQuery(`{
  "stores": *[_type == 'store'
             && defined(slug.current)
             && (
              (!defined($country)) || count($country) == 0 || country in $country
             )
             &&(
              (!defined($continent)) || count($continent) == 0 || continent in $continent
             )
             ]
             [$startIndex...$endIndex]
             |order(name){
              name,
              "slug": slug.current,
              city,
              country,
              continent,
              "imageUrl": mainImage.asset->.url,
              "imageAlt": mainImage.alt
              },
  "total": count(*[_type == 'store'
             && defined(slug.current)
             && (
              (!defined($country)) || count($country) == 0 || country in $country
             )
             &&(
              (!defined($continent)) || count($continent) == 0 || continent in $continent
             )
             ])
}`);

export const STORE_QUERY = defineQuery(`*[_type == 'store'
&& slug.current == $slug][0]{
              name,
              "slug": slug.current,
              address1,
              address2,
              city,
              zip,
              state,
              country,
              lat,
              long,
              "imageUrl": mainImage.asset->.url,
              "imageAlt": mainImage.alt
}`);
