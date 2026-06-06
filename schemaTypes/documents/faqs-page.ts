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

export const faqsPage = defineType({
  name: 'faqsPage',
  title: 'FAQs Page',
  type: 'document',

  preview: {
    select: { title: 'title' },
  },

  groups: [
    { name: 'header', title: 'Header' },
    { name: 'categories', title: 'FAQ Categories' },
    { name: 'cta', title: 'Contact CTA' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],

  fieldsets: [
    { name: 'header', title: '🔴 Header Section' },
    { name: 'categories', title: '📋 FAQ Categories' },
    { name: 'cta', title: '🔴 Contact CTA' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Used as the display name in Studio (e.g. "FAQs")',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g. "faqs")',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    // ═══════════════════════════════════════════
    // HEADER SECTION
    // ═══════════════════════════════════════════

    defineField({
      name: 'headerVisible',
      title: 'Show header section',
      type: 'boolean',
      initialValue: true,
      group: 'header',
      fieldset: 'header',
    }),

    defineField({
      name: 'header',
      title: 'Content',
      type: 'object',
      group: 'header',
      fieldset: 'header',
      hidden: ({ parent }) => !parent?.headerVisible,
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Label',
          type: 'string',
          description: 'e.g. "FAQS"',
          initialValue: 'FAQS',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Main Heading',
          type: 'array',
          of: [portableTextWithLinks],
          description: 'e.g. "Solar, simplified." — use italics for emphasis',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          description:
            'e.g. "Everything you need to know about going solar with Atria."',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'searchPlaceholder',
          title: 'Search Placeholder',
          type: 'string',
          description:
            'e.g. "Search — e.g. subsidy, net metering, installation time..."',
          initialValue: 'Search — e.g. subsidy, net metering, installation time...',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'sidebarLabel',
          title: 'Sidebar Label',
          type: 'string',
          description: 'Label above the category navigation list',
          initialValue: 'CATEGORIES',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // FAQ CATEGORIES
    // ═══════════════════════════════════════════

    defineField({
      name: 'categoriesVisible',
      title: 'Show FAQ categories',
      type: 'boolean',
      initialValue: true,
      group: 'categories',
      fieldset: 'categories',
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Select FAQ categories to display on this page (order determines sidebar and section order)',
      group: 'categories',
      fieldset: 'categories',
      hidden: ({ parent }) => !parent?.categoriesVisible,
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'faqCategory' }],
        }),
      ],
      validation: (rule) => rule.min(1).error('Select at least one FAQ category'),
    }),

    // ═══════════════════════════════════════════
    // CONTACT CTA
    // ═══════════════════════════════════════════

    defineField({
      name: 'ctaVisible',
      title: 'Show contact CTA',
      type: 'boolean',
      initialValue: true,
      group: 'cta',
      fieldset: 'cta',
    }),

    defineField({
      name: 'cta',
      title: 'Content',
      type: 'object',
      group: 'cta',
      fieldset: 'cta',
      hidden: ({ parent }) => !parent?.ctaVisible,
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'e.g. "Still have questions?"',
          initialValue: 'Still have questions?',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          description:
            'e.g. "Our solar experts are here to help — talk to us or get a free personalized quote."',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Get a Quote',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'e.g. "/quote" or full URL',
              validation: (rule) =>
                rule
                  .required()
                  .uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Call Us',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'e.g. "tel:+918904388829"',
              validation: (rule) =>
                rule
                  .required()
                  .uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
            }),
          ],
        }),
        defineField({
          name: 'contact',
          title: 'Contact Details',
          type: 'object',
          fields: [
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
              description: 'e.g. "support@atriarenewable.com"',
              validation: (rule) => rule.required().email(),
            }),
            defineField({
              name: 'emailLink',
              title: 'Email Link',
              type: 'url',
              description: 'e.g. "mailto:support@atriarenewable.com"',
              validation: (rule) =>
                rule
                  .required()
                  .uri({ allowRelative: false, scheme: ['mailto'] }),
            }),
            defineField({
              name: 'website',
              title: 'Website Label',
              type: 'string',
              description: 'Display text, e.g. "atriarenewable.com"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'websiteLink',
              title: 'Website Link',
              type: 'url',
              description: 'e.g. "https://atriarenewable.com"',
              validation: (rule) =>
                rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'string',
              description: 'Display text, e.g. "+91 8904388829"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'phoneLink',
              title: 'Phone Link',
              type: 'url',
              description: 'e.g. "tel:+918904388829"',
              validation: (rule) =>
                rule.required().uri({ allowRelative: false, scheme: ['tel'] }),
            }),
          ],
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // FOOTER
    // ═══════════════════════════════════════════

    defineField({
      name: 'footerVisible',
      title: 'Show footer',
      type: 'boolean',
      initialValue: true,
      group: 'footer',
      fieldset: 'footer',
    }),

    defineField({
      name: 'footer',
      title: 'Content',
      type: 'object',
      group: 'footer',
      fieldset: 'footer',
      hidden: ({ parent }) => !parent?.footerVisible,
      fields: [
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description:
            'e.g. "© 2025 Atria Renewable Private Limited. All rights reserved. atriarenewable.com"',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fieldset: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Overrides the default page title in search results',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Short description shown in search engine results',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image used when the page is shared on social media',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
