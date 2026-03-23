import { defineArrayMember, defineField, defineType } from 'sanity'

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Used for identifying this document in Studio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'informationSlider',
      title: 'Information Slider',
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Slider Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'slug',
                  title: 'Section Slug',
                  type: 'slug',
                  description: 'Used for hash navigation (e.g. #panels)',
                  options: { source: 'title', maxLength: 96 },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'details',
                  title: 'Details',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                  description: 'Use bullet list style to match the design',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'largeScreenImage',
                  title: 'Large Screen Image',
                  type: 'image',
                  description: 'Used for desktop/larger screens',
                  options: { hotspot: true },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'smallScreenImage',
                  title: 'Small Screen Image',
                  type: 'image',
                  description: 'Used for mobile/tablet screens',
                  options: { hotspot: true },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'cta',
                  title: 'Certificate CTA',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Button Label',
                      type: 'string',
                      initialValue: 'VIEW CERTIFICATE',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'file',
                      title: 'Certificate File',
                      type: 'file',
                      options: { accept: '.pdf,application/pdf' },
                      validation: (rule) => rule.required(),
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'largeScreenImage',
                  subtitle: 'slug.current',
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
})
