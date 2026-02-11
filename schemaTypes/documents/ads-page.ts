import { defineType, defineField, defineArrayMember } from 'sanity'

export const adsPage = defineType({
  name: 'adsPage',
  title: 'Ads Landing Page',
  type: 'document',

  preview: {
    select: { title: 'title' },
  },

  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'whyUs', title: 'Why Us' },
    { name: 'testimonials', title: 'Testimonials & Process' },
    { name: 'faq', title: 'FAQ Section' },
    { name: 'comparison', title: 'Comparison Section' },
    { name: 'cta', title: 'CTA Section' },
  ],

  fieldsets: [
    { name: 'hero', title: '🟢 Hero Section' },
    { name: 'whyUs', title: '🟢 Why Us' },
    { name: 'testimonials', title: '🟢 Testimonials & Process' },
    { name: 'faq', title: '🟢 FAQ Section' },
    { name: 'comparison', title: '🟢 Comparison Section' },
    { name: 'cta', title: '🟢 CTA Section' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Used as the display name in Studio (e.g. "Ads Landing Page - Google")',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    // ═══════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════

    defineField({
      name: 'heroVisible',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      group: 'hero',
      fieldset: 'hero',
    }),

    defineField({
      name: 'hero',
      title: 'Content',
      type: 'object',
      group: 'hero',
      fieldset: 'hero',
      hidden: ({ parent }) => !parent?.heroVisible,
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'e.g. "FROM THE FOUNDERS OF"',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Go Solar. Save Up to 95%* on Your Electricity Bill."',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Made for Bengaluru homes — clear pricing..."',
        }),
        defineField({
          name: 'highlights',
          title: 'Highlight Points',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                }),
                defineField({ name: 'logo', title: 'Logo', type: 'image' }),
              ],
              preview: {
                select: { title: 'text', media: 'logo' },
                prepare({ title, media }) {
                  // Extract plain text from the first block for preview
                  const plainText = title?.[0]?.children?.map((c: { text: string }) => c.text).join('') || 'Untitled'
                  return { title: plainText, media }
                },
              },
            }),
          ],
          description: 'e.g. "Upto ₹78,000 Subsidy", "50+ Years in Bengaluru"',
        }),
        defineField({
          name: 'backgroundVideo',
          title: 'Background Video',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'Background video for the hero section',
        }),
        defineField({
          name: 'formHeading',
          title: 'Form Heading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Is your rooftop solar-ready?"',
        }),
        defineField({
          name: 'formSubheading',
          title: 'Form Subheading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Enter your PIN code to find out..."',
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // WHY US SECTION
    // ═══════════════════════════════════════════

    defineField({
      name: 'whyUsVisible',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      group: 'whyUs',
      fieldset: 'whyUs',
    }),

    defineField({
      name: 'whyUs',
      title: 'Content',
      type: 'object',
      group: 'whyUs',
      fieldset: 'whyUs',
      hidden: ({ parent }) => !parent?.whyUsVisible,
      fields: [
        defineField({
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'string' }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                }),
                defineField({ name: 'icon', title: 'Icon', type: 'image' }),
                defineField({ name: 'image', title: 'Image', type: 'image' }),
              ],
              preview: {
                select: { title: 'heading', media: 'icon' },
              },
            }),
          ],
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // TESTIMONIALS & PROCESS SECTION
    // Customer testimonials (left) + Installation process timeline (right video)
    // ═══════════════════════════════════════════

    defineField({
      name: 'testimonialsVisible',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      group: 'testimonials',
      fieldset: 'testimonials',
    }),

    defineField({
      name: 'testimonials',
      title: 'Content',
      type: 'object',
      group: 'testimonials',
      fieldset: 'testimonials',
      hidden: ({ parent }) => !parent?.testimonialsVisible,
      fields: [
        defineField({
          name: 'customers',
          title: 'Customer Testimonials',
          description: 'Carousel of customer cards (left side)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Customer Name', type: 'string' }),
                defineField({
                  name: 'stats',
                  title: 'Stats Line',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                  description: 'e.g. "Reduced 3,449.25 kg CO2 | Saved 158 trees"',
                }),
                defineField({ name: 'image', title: 'Customer Photo', type: 'image' }),
              ],
              preview: {
                select: { title: 'name', media: 'image' },
              },
            }),
          ],
        }),
        defineField({
          name: 'video',
          title: 'Section Video',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'Video displayed on the right side of this section',
        }),
        defineField({
          name: 'ctaHeading',
          title: 'CTA Heading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Atria\'s 50+ year legacy speaks for itself"',
        }),
        defineField({
          name: 'ctaSubheading',
          title: 'CTA Subheading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Cut your electricity bills by 95%*."',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'e.g. "Book Free Roof Check"',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link',
          type: 'url',
          validation: (rule) =>
            rule.uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // FAQ SECTION
    // ═══════════════════════════════════════════

    defineField({
      name: 'faqVisible',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      group: 'faq',
      fieldset: 'faq',
    }),

    defineField({
      name: 'faq',
      title: 'Content',
      type: 'object',
      group: 'faq',
      fieldset: 'faq',
      hidden: ({ parent }) => !parent?.faqVisible,
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "FAQ\'s"',
        }),
        defineField({
          name: 'items',
          title: 'Questions & Answers',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'string' }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                }),
              ],
              preview: {
                select: { title: 'question' },
              },
            }),
          ],
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // COMPARISON SECTION
    // ═══════════════════════════════════════════

    defineField({
      name: 'comparisonVisible',
      title: 'Show this section',
      type: 'boolean',
      initialValue: true,
      group: 'comparison',
      fieldset: 'comparison',
    }),

    defineField({
      name: 'comparison',
      title: 'Content',
      type: 'object',
      group: 'comparison',
      fieldset: 'comparison',
      hidden: ({ parent }) => !parent?.comparisonVisible,
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          description: 'Background image for the comparison section',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "The Atria Advantage"',
        }),
        defineField({
          name: 'rows',
          title: 'Comparison Rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'feature', title: 'Feature', type: 'string' }),
                defineField({ name: 'atriaSolar', title: 'Atria Solar', type: 'string' }),
                defineField({ name: 'otherEpcs', title: 'Other EPCs', type: 'string' }),
              ],
              preview: {
                select: { title: 'feature', subtitle: 'atriaSolar' },
              },
            }),
          ],
        }),
      ],
    }),

    // ═══════════════════════════════════════════
    // CTA SECTION
    // ═══════════════════════════════════════════

    defineField({
      name: 'ctaVisible',
      title: 'Show this section',
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
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Ready to power your home with confidence?"',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          description: 'e.g. "Get a site assessment today. No pressure. Just clarity."',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'e.g. "Call Now"',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
          description: 'e.g. "tel:+919901100428"',
          validation: (rule) =>
            rule.uri({ allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto'] }),
        }),
      ],
    }),

  ],
})
