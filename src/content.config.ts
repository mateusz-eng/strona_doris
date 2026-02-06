import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const szkolenia = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/szkolenia' }),
  schema: z.object({
    title: z.string(),
    overline: z.string(),
    description: z.string(),
    icon: z.string(),
    heroImage: z.string(),
    order: z.number(),
    program: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    cards: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    cardsSectionTitle: z.string().optional(),
    cardsSectionOverline: z.string().optional(),
    infoGrid: z.array(z.object({
      title: z.string(),
      text: z.string(),
      text2: z.string().optional(),
    })).optional(),
    infoGridTitle: z.string().optional(),
    infoGridOverline: z.string().optional(),
    infoGridDescription: z.string().optional(),
    ctaTitle: z.string(),
    ctaDescription: z.string(),
    ctaButtonText: z.string().default('Zapisz się'),
  }),
});

export const collections = { szkolenia };
