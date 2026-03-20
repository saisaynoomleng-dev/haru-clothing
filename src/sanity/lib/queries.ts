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
            && defined(slug.current)
            && (
              (!defined($category)) || count($category) == 0 || category->slug.current in $category
            )]
            [$startIndex...$endIndex]
            | order(publishedAt){
              name,
              "slug": slug.current,
              publishedAt,
              "imageUrl": mainImage.asset->.url,
              "imageAlt": mainImage.alt,
              "category": category->.name,
              "author": author->.name,
            },
  "total": count(*[_type == 'blog'
            && defined(slug.current)
            && (
              (!defined($category)) || count($category) == 0 || category->slug.current in $category
            )])
}`);

export const ALL_BLOG_CATEGORIES_QUERY = defineQuery(`*[_type == 'blogCategory'
 && defined(slug.current)]{
  name,
  "slug": slug.current
 }`);

export const BLOG_QUERY = defineQuery(`*[_type == 'blog'
 && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  publishedAt,
  minRead,
  "category": category->name,
  author->{
    name,
    "slug": slug.current
  },
  body,
  "imageUrl": mainImage.asset->.url,
  "imageAlt": mainImage.alt
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

// authors
export const ALL_AUTHORS_QUERY = defineQuery(`*[_type == 'author'
 && defined(slug.current)]{
  name,
  "slug": slug.current,
  "imageUrl": mainImage.asset->.url,
  "imageAlt": mainImage.alt
 }`);

export const AUTHOR_QUERY = defineQuery(`{
  "author": *[_type == 'author'
              && slug.current == $slug][0]{
              name,
              "slug": slug.current,
              body,
              socialLink,
              "imageUrl": mainImage.asset->.url,
              "imageAlt": mainImage.alt
             },
  "blogs": *[_type == 'blog'
            && author->slug.current == $slug]{
              name,
              "slug": slug.current,
              publishedAt,
              "imageUrl": mainImage.asset->.url,
              "imageAlt": mainImage.alt,
              "category": category->.name,
              "author": author->.name,
            }
}`);

// search
export const SEARCH_PRODUCTS_QUERY = defineQuery(`*[
  _type == 'product'
  && defined(slug.current)
  && (
    (!defined($search))
    || name match ($search + "*")
    || variants[].color->name match ($search + "*")
    || variants[].size->name match ($search + "*")
  )
]{
  name,
  "slug": slug.current,
  "category": category->name,
  basePrice,
  "imageUrl": mainImages[0].asset->url,
  "imageAlt": mainImages[0].alt
}`);

export const SEARCH_BLOGS_QUERY = defineQuery(`*[
  _type == 'blog'
  && defined(slug.current)
  && (
    (!defined($search))
    || name match ($search + "*")
    || category->name match ($search + "*")
    || author->name match ($search + "*")
  )
]{
  name,
  "slug": slug.current,
  publishedAt,
  "imageUrl": mainImage.asset->.url,
  "imageAlt": mainImage.alt,
  "category": category->.name,
  "author": author->.name,
}`);
+'*';
