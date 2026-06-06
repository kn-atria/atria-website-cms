import { defineArrayMember, defineField, defineType } from 'sanity'

const portableTextWithLinks = defineArrayMember({
  type: 'block',
  marks: {
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          defineField({
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (rule) =>
              rule.uri({
                allowRelative: true,
                scheme: ['http', 'https', 'mailto', 'tel'],
              }),
          }),
          defineField({
            name: 'openInNewTab',
            type: 'boolean',
            title: 'Open in new tab',
            initialValue: true,
          }),
        ],
      },
    ],
  },
})

export const faqCategory = defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',

  preview: {
    select: {
      title: 'title',
      questions: 'questions',
      media: 'icon',
    },
    prepare({ title, questions, media }) {
      const count = Array.isArray(questions) ? questions.length : 0
      return {
        title,
        subtitle: `${count} question${count === 1 ? '' : 's'}`,
        media,
      }
    },
  },

  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'e.g. "Cost & Subsidies", "Process & Timeline"',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      description: 'Used for anchor navigation (e.g. #cost-subsidies)',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'icon',
      title: 'Category Icon',
      type: 'image',
      description: 'Small icon shown next to the category name',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the icon for accessibility',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqQuestion',
          title: 'FAQ Question',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [portableTextWithLinks],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        }),
      ],
      validation: (rule) => rule.min(1).error('Add at least one question'),
    }),
  ],
})
