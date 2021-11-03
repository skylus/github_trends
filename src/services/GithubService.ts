import {Octokit} from '@octokit/rest';
import {
  GetResponseTypeFromEndpointMethod,
} from "@octokit/types";
import Repo from "../interfaces/Repo";

type SearchReposResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.search.repos>;

const octokit = new Octokit();

const getMostPopularRepos = async (): Promise<Repo[]> => {
  try {
    const currentDate = new Date();
    const dateToFetchFrom=new Date(currentDate.setDate(currentDate.getDate() - 7));
    const q = `created:>${dateToFetchFrom.getFullYear()}-${dateToFetchFrom.getMonth() + 1}-${dateToFetchFrom.getDate()}`

    const results: SearchReposResponseType = await octokit.rest.search.repos({
      sort: 'stars',
      order: 'desc',
      q
    });

    // Uncomment this when testing against stub
    // const results:SearchReposResponseType = require('../../src/response.json');

    return results.data.items.map(({
     stargazers_count: starsCount,
     forks_count: forksCount,
     watchers_count: watchersCount,
     full_name: fullName,
     pushed_at: pushedAt,
     html_url: url,
     id,
     description,
   }) => ({ starsCount, forksCount, watchersCount, fullName, pushedAt, id, url, description }));
  } catch (ex) {
    console.error('An error occurred fetching from github API');

    // Normally I'd show an error message for this case, but I feel it's not necessary to implement for this task.
    return [];
  }
}

const STARRED_REPOS_STORAGE_KEY = 'starredRepos';

const getStarredReposForCurrentUser = () => JSON.parse(localStorage.getItem(STARRED_REPOS_STORAGE_KEY) || '[]');

const toggleRepoStarForCurrentUser = (repoID: number): void => {
  const currentlyStarredRepos = getStarredReposForCurrentUser();
  localStorage.setItem(STARRED_REPOS_STORAGE_KEY, JSON.stringify(
    currentlyStarredRepos.includes(repoID) ?
    currentlyStarredRepos.filter((id: number) => id !== repoID) :
    [...currentlyStarredRepos, repoID]));
}

const isStarred = (repoID: number) => {
  const currentlyStarredRepos = getStarredReposForCurrentUser();
  return currentlyStarredRepos.includes(repoID);
}

export { getMostPopularRepos, toggleRepoStarForCurrentUser, isStarred, getStarredReposForCurrentUser };
