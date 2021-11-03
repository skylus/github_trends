import { Octokit } from '@octokit/rest';
import {
    GetResponseTypeFromEndpointMethod,
} from "@octokit/types";
import Repo from "../interfaces/Repo";
type SearchReposResponseType = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.search.repos
>;

const octokit = new Octokit();

const getMostPopularRepos = async (): Promise<Repo[]> => {
    // TODO dynamic last week
    const results:SearchReposResponseType = await octokit.rest.search.repos({
        sort: 'stars',
        order: 'desc',
        q: 'created:>2021-10-10'
    });

    console.log('results', results);
    return results.data.items.map(({
        stargazers_count: starsCount,
        forks_count: forksCount,
        watchers_count: watchersCount,
        full_name: fullName,
        pushed_at: pushedAt,
        id,
        url,
    }) => ({ starsCount, forksCount, watchersCount, fullName, pushedAt, id, url }))
}

export { getMostPopularRepos };
