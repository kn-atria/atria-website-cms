import {defineType, defineField, defineArrayMember} from 'sanity'

export const adsPage = defineType({
  name: 'adsPage',
  title: 'Ads Landing Page',
  type: 'document',

  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'whyUs', title: 'Why Us'},
    {name: 'testimonials', title: 'Testimonials & Process'},
    {name: 'faq', title: 'FAQ Section'},
    {name: 'comparison', title: 'Comparison Section'},
    {name: 'cta', title: 'CTA Section'},
  ],

  fieldsets: [
    {name: 'hero', title: '🟢 Hero Section'},
    {name: 'whyUs', title: '🟢 Why Us'},
    {name: 'testimonials', title: '🟢 Testimonials & Process'},
    {name: 'faq', title: '🟢 FAQ Section'},
    {name: 'comparison', title: '🟢 Comparison Section'},
    {name: 'cta', title: '🟢 CTA Section'},
  ],

  fields: [
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
      hidden: ({parent}) => !parent?.heroVisible,
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
          type: 'text',
          description: 'e.g. "Go Solar. Save Up to 95%* on Your Electricity Bill."',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
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
                defineField({name: 'text', title: 'Text', type: 'string'}),
              ],
              preview: {
                select: {title: 'text'},
              },
            }),
          ],
          description: 'e.g. "Upto ₹78,000 Subsidy", "50+ Years in Bengaluru"',
        }),
        defineField({
          name: 'backgroundVideo',
          title: 'Background Video',
          type: 'file',
          options: {accept: 'video/*'},
          description: 'Background video for the hero section',
        }),
        defineField({
          name: 'formHeading',
          title: 'Form Heading',
          type: 'string',
          description: 'e.g. "Is your rooftop solar-ready?"',
        }),
        defineField({
          name: 'formSubheading',
          title: 'Form Subheading',
          type: 'string',
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
      hidden: ({parent}) => !parent?.whyUsVisible,
      fields: [
        defineField({
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'heading', title: 'Heading', type: 'string'}),
                defineField({name: 'description', title: 'Description', type: 'text'}),
                defineField({name: 'icon', title: 'Icon', type: 'image'}),
                defineField({name: 'image', title: 'Image', type: 'image'}),
              ],
              preview: {
                select: {title: 'heading', media: 'icon'},
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
      hidden: ({parent}) => !parent?.testimonialsVisible,
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
                defineField({name: 'name', title: 'Customer Name', type: 'string'}),
                defineField({name: 'stats', title: 'Stats Line', type: 'string', description: 'e.g. "Reduced 3,449.25 kg CO2 | Saved 158 trees"'}),
                defineField({name: 'image', title: 'Customer Photo', type: 'image'}),
              ],
              preview: {
                select: {title: 'name', subtitle: 'stats', media: 'image'},
              },
            }),
          ],
        }),
        defineField({
          name: 'processSteps',
          title: 'Process Timeline Steps',
          description: 'Installation process steps (Day 01, Day 02, Day 03 etc.)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'day', title: 'Day Label', type: 'string', description: 'e.g. "DAY 01"'}),
                defineField({name: 'title', title: 'Step Title', type: 'string', description: 'e.g. "Consultation and Booking"'}),
                defineField({name: 'icon', title: 'Step Icon', type: 'image'}),
              ],
              preview: {
                select: {title: 'title', subtitle: 'day', media: 'icon'},
              },
            }),
          ],
        }),
        defineField({
          name: 'video',
          title: 'Section Video',
          type: 'file',
          options: {accept: 'video/*'},
          description: 'Video displayed on the right side of this section',
        }),
        defineField({
          name: 'ctaHeading',
          title: 'CTA Heading',
          type: 'string',
          description: 'e.g. "Atria\'s 50+ year legacy speaks for itself"',
        }),
        defineField({
          name: 'ctaSubheading',
          title: 'CTA Subheading',
          type: 'string',
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
            rule.uri({allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto']}),
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
      hidden: ({parent}) => !parent?.faqVisible,
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
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
                defineField({name: 'question', title: 'Question', type: 'string'}),
                defineField({name: 'answer', title: 'Answer', type: 'text'}),
              ],
              preview: {
                select: {title: 'question'},
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
      hidden: ({parent}) => !parent?.comparisonVisible,
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
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
                defineField({name: 'feature', title: 'Feature', type: 'string'}),
                defineField({name: 'atriaSolar', title: 'Atria Solar', type: 'string'}),
                defineField({name: 'otherEpcs', title: 'Other EPCs', type: 'string'}),
              ],
              preview: {
                select: {title: 'feature', subtitle: 'atriaSolar'},
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
      hidden: ({parent}) => !parent?.ctaVisible,
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'e.g. "Ready to power your home with confidence?"',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
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
            rule.uri({allowRelative: true, scheme: ['http', 'https', 'tel', 'mailto']}),
        }),
      ],
    }),

  ],
})
