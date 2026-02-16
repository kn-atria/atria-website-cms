import { defineType, defineField, defineArrayMember } from 'sanity'

export const blog = defineType({
    name: 'blog',
    title: 'Blog',
    type: 'document',

    preview: {
        select: {
            title: 'title',
            subtitle: 'metaTitle',
            media: 'featuredImage',
        },
    },

    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'seo', title: 'SEO & Meta' },
        { name: 'faqs', title: 'FAQs' },
    ],

    fields: [
        // ═══════════════════════════════════════════
        // CONTENT
        // ═══════════════════════════════════════════

        defineField({
            name: 'title',
            title: 'Blog Title',
            type: 'string',
            description: 'Main heading of the blog post',
            group: 'content',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'URL-friendly identifier (auto-generated from title)',
            group: 'content',
            options: { source: 'title', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'isFeatured',
            title: 'Featured Blog',
            type: 'boolean',
            description: 'Mark this blog as featured to highlight it on the homepage or listing pages',
            group: 'content',
            initialValue: false,
        }),

        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            description: 'Primary image used for thumbnails, social sharing, and the blog hero',
            group: 'content',
            options: { hotspot: true },
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

        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            description: 'When the blog was published (used for sorting and display)',
            group: 'content',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            description: 'Categories this blog post belongs to',
            group: 'content',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'category' }],
                }),
            ],
            validation: (rule) => rule.required().min(1).error('Add at least one category').unique(),
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            description: 'Tags to help organize and filter blog posts',
            group: 'content',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'tag' }],
                }),
            ],
            validation: (rule) => rule.unique(),
        }),

        defineField({
            name: 'relatedBlogs',
            title: 'Related Blogs',
            type: 'array',
            description: 'Hand-picked related blog posts shown at the bottom',
            group: 'content',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'blog' }],
                }),
            ],
            validation: (rule) =>
                rule.max(4).warning('Keep related blogs to 4 or fewer for best UX').unique(),
        }),

        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'array',
            description: 'A short summary about the blog post',
            group: 'content',
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'External Link',
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
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal Link',
                                fields: [
                                    defineField({
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [{ type: 'blog' }],
                                    }),
                                ],
                            },
                        ],
                    },
                }),
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                }),
            ],
        }),

        defineField({
            name: 'blogHighlights',
            title: 'Blog Highlights',
            type: 'array',
            description: 'Key takeaways shown at the top of the blog post',
            group: 'content',
            of: [defineArrayMember({ type: 'string' })],
            validation: (rule) =>
                rule.min(1).error('Add at least one highlight').max(8).warning('Keep highlights concise'),
        }),

        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            description: 'Main blog content — use headings, paragraphs, lists, images, and inline links',
            group: 'content',
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'External Link',
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
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal Link',
                                fields: [
                                    defineField({
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [{ type: 'blog' }],
                                    }),
                                ],
                            },
                        ],
                    },
                }),
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                }),
            ],
        }),

        // ═══════════════════════════════════════════
        // SEO & META
        // ═══════════════════════════════════════════

        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Title tag for search engines (50–60 characters ideal)',
            group: 'seo',
            validation: (rule) => [
                rule.required(),
                rule.max(70).warning('Meta title should be under 70 characters for best SEO'),
            ],
        }),

        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            description: 'Description shown in search results (120–160 characters ideal)',
            group: 'seo',
            rows: 3,
            validation: (rule) => [
                rule.required(),
                rule.max(160).warning('Meta description should be under 160 characters for best SEO'),
            ],
        }),

        defineField({
            name: 'keywords',
            title: 'Target Keywords',
            type: 'array',
            description: 'Keywords this blog targets along with their search metrics',
            group: 'seo',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'keyword',
                            title: 'Keyword',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'currency',
                            title: 'Currency',
                            type: 'string',
                            initialValue: 'INR',
                        }),
                        defineField({
                            name: 'avgMonthlySearches',
                            title: 'Avg. Monthly Searches',
                            type: 'number',
                        }),
                        defineField({
                            name: 'threeMonthChange',
                            title: 'Three Month Change',
                            type: 'string',
                            description: 'e.g. "0%", "-100%", "23%"',
                        }),
                        defineField({
                            name: 'yoyChange',
                            title: 'Year-over-Year Change',
                            type: 'string',
                            description: 'e.g. "0%", "-33%", "22%"',
                        }),
                        defineField({
                            name: 'competition',
                            title: 'Competition',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Low', value: 'low' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'High', value: 'high' },
                                    { title: 'Unknown', value: 'unknown' },
                                ],
                                layout: 'radio',
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'keyword',
                            subtitle: 'avgMonthlySearches',
                            competition: 'competition',
                        },
                        prepare({ title, subtitle, competition }) {
                            return {
                                title: title || 'Untitled',
                                subtitle: `${subtitle ?? '—'} searches/mo · ${competition ?? '—'}`,
                            }
                        },
                    },
                }),
            ],
        }),

        // ═══════════════════════════════════════════
        // FAQS
        // ═══════════════════════════════════════════

        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            description: 'Frequently asked questions shown at the bottom of the blog',
            group: 'faqs',
            of: [
                defineArrayMember({
                    type: 'object',
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
                            of: [
                                defineArrayMember({
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
                                }),
                            ],
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'question' },
                    },
                }),
            ],
        }),
    ],
})
