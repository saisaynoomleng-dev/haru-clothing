import { CiTextAlignJustify } from 'react-icons/ci';
import { FaNewspaper, FaQuestion, FaTshirt } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import {
  IoMdBriefcase,
  IoMdColorPalette,
  IoMdPricetags,
  IoMdResize,
} from 'react-icons/io';
import { LuUserPen } from 'react-icons/lu';
import { MdCategory, MdOutlineStore } from 'react-icons/md';
import { SiNike } from 'react-icons/si';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Haru Clothing')
    .items([
      S.divider().title('Office'),
      S.documentTypeListItem('product').title('Products').icon(FaTshirt),
      S.documentTypeListItem('productCategory')
        .title('Product Categories')
        .icon(MdCategory),
      S.documentTypeListItem('productColor')
        .title('Product Colors')
        .icon(IoMdColorPalette),
      S.documentTypeListItem('productSize')
        .title('Product Sizes')
        .icon(IoMdResize),
      S.documentTypeListItem('productBrand')
        .title('Product Brands')
        .icon(SiNike),
      S.documentTypeListItem('productTag')
        .title('Product Tags')
        .icon(IoMdPricetags),
      S.documentTypeListItem('teamMember')
        .title('Team Members')
        .icon(HiUserGroup),
      S.documentTypeListItem('career')
        .title('Job Positions')
        .icon(IoMdBriefcase),
      S.documentTypeListItem('store').title('Stores').icon(MdOutlineStore),
      S.documentTypeListItem('faq').title('FAQs').icon(FaQuestion),
      S.documentTypeListItem('utilityPage')
        .title('Utility Pages')
        .icon(CiTextAlignJustify),

      S.divider().title('Marketing'),
      S.documentTypeListItem('blog').title('Blogs').icon(FaNewspaper),
      S.documentTypeListItem('blogCategory')
        .title('Blog Categories')
        .icon(MdCategory),
      S.documentTypeListItem('author').title('Author').icon(LuUserPen),
    ]);
