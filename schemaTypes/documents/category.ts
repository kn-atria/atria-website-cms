import {defineType, defineField} from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',

    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'image',
        },
    },

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'e.g. "Solar Guides", "Net Metering", "Cost & Savings"',
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

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description of this category',
            rows: 3,
        }),

        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Category image used for thumbnails and category listing pages',
            options: {hotspot: true},
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Describe the image for accessibility and SEO',
                    validation: (rule) => rule.required(),
                }),
            ],
        }),
    ],
})
