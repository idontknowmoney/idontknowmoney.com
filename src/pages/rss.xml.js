import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { episodeHref, getEpisodes } from '../lib/content';

export async function GET(context) {
	const episodes = await getEpisodes();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: episodes.map((episode) => ({
			title: episode.data.title,
			description: episode.data.description,
			pubDate: episode.data.pubDate,
			link: episodeHref(episode),
		})),
	});
}
