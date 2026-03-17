import { type SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './components/blockContentType';
import { blockImageType } from './components/blockImageType';
import { productCategoryType } from './productCategoryType';
import { productColorType } from './productColorType';
import { productSizeType } from './productSizeType';
import { productBrandType } from './productBrandType';
import { productTagType } from './productTagType';
import { productType } from './productType';
import { teamMemberType } from './teamMemberType';
import { blogCategoryType } from './blogCategory';
import { authorType } from './authorType';
import { storeType } from './storeType';
import { utilityPageType } from './utilityPageTypes';
import { faqsType } from './faqsType';
import { careerType } from './careerType';
import { blogType } from './components/blogType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blockImageType,
    productCategoryType,
    productColorType,
    productSizeType,
    productBrandType,
    productTagType,
    productType,
    teamMemberType,
    blogCategoryType,
    authorType,
    storeType,
    utilityPageType,
    faqsType,
    careerType,
    blogType,
  ],
};
