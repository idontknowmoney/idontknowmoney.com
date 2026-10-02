import { getCollection, type CollectionEntry } from 'astro:content';

export type Episode = CollectionEntry<'blog'>;
export type SocialPost = CollectionEntry<'social'>;

const keep = ({ data }: { data: { draft: boolean } }) => !(import.meta.env.PROD && data.draft);

/** Published episodes, newest first. */
export async function getEpisodes(): Promise<Episode[]> {
	return (await getCollection('blog', keep)).sort((a, b) => b.data.episode - a.data.episode);
}

/** Published social posts, newest first. */
export async function getSocialPosts(): Promise<SocialPost[]> {
	return (await getCollection('social', keep)).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);
}

/** Two-digit episode number: 4 → "04". */
export const epNumber = (n: number) => String(n).padStart(2, '0');

/** "EP 04" */
export const epLabel = (n: number) => `EP ${epNumber(n)}`;

/** Minutes to read, at ~220 words per minute. */
export function readingTime(body: string | undefined): number {
	const words = (body ?? '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}

/** "17 Aug 2026", or "17 Aug" when `short`. */
export function formatDate(date: Date, short = false): string {
	return date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		...(short ? {} : { year: 'numeric' }),
		timeZone: 'UTC',
	});
}

export const episodeHref = (e: Episode) => `/posts/${e.id}/`;
