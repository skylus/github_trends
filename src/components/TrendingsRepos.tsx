import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Repo from "../interfaces/Repo";
import { getMostPopularRepos } from "../services/GithubService";

function TrendingRepos() {
    const [repos, setRepos] = useState<Repo[]>([]);

    useEffect(() => {
        async function fetchRepos() {
            const repos = await getMostPopularRepos()
            setRepos(repos);
            console.log('repos', repos)
        }

        fetchRepos();
    }, [])
    return (
        <div>
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Pushed At</th>
                        <th>Stars️ ⭐️</th>
                        <th>Forks <FontAwesomeIcon icon={faCodeBranch} /></th>
                        <th>Watchers 👀</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map(({ id, fullName, starsCount, url, watchersCount, forksCount, pushedAt }) => <tr>
                        <td>{id}</td>
                        <td>
                            <a href={url}>{fullName}</a>
                        </td>
                        <td>{new Date(pushedAt).toString()}</td>
                        <td>{starsCount}</td>
                        <td>{forksCount}</td>
                        <td>{watchersCount}</td>
                        <td>
                            <button className="button is-light">
                                <FontAwesomeIcon icon={faStar} />
                                <span className="ml-1">Star</span>
                            </button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default TrendingRepos;
