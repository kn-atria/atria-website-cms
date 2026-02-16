import {defineType, defineField} from 'sanity'

export const tag = defineType({
    name: 'tag',
    title: 'Tag',
    type: 'document',

    preview: {
        select: {
            title: 'title',
        },
    },

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'e.g. "BESCOM", "Bangalore", "Solar Savings", "Net Metering"',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'URL-friendly identifier (auto-generated from title)',
            options: {source: 'title', maxLength: 96},
            validation: (rule) => rule.required(),
        }),
    ],
})
