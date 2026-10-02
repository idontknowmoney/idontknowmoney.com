import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPICS } from './consts';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		// The excerpt on cards and the standfirst on the episode page.
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		episode: z.number().int().min(0),
		season: z.number().int().min(1).default(1),
		topic: z.enum(TOPICS),
		// Link to the code for the episode.
		code: z.url().optional(),
		takeaway: z.string().optional(),
		// Overrides the estimate computed from the word count.
		minutes: z.number().int().min(1).optional(),
		// Drafts show in dev and are left out of production builds.
		draft: z.boolean().default(false),
	}),
});

// X and LinkedIn posts; the Markdown body is the post text, exactly as published.
const social = defineCollection({
	loader: glob({ base: './src/content/social', pattern: '**/*.md' }),
	schema: z.object({
		platform: z.enum(['x', 'linkedin']),
		url: z.url(),
		date: z.coerce.date(),
		episode: reference('blog').optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, social };
