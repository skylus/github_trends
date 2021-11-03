import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Repo from "../interfaces/Repo";
import { getMostPopularRepos, getStarredReposForCurrentUser, isStarred, toggleRepoStarForCurrentUser } from "../services/GithubService";
import classNames from "classnames";

function TrendingRepos() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [shouldUpdateStarred, setShouldUpdateStarred] = useState(false);
    const [showStarredOnly, setShowStarredOnly] = useState(false);

    useEffect(() => {
        async function fetchRepos() {
            const repos = await getMostPopularRepos()
            setRepos(repos);
            console.log('repos', repos)
        }

        fetchRepos();
    }, []);

    useEffect(() => {
        setShouldUpdateStarred(false);
    }, [shouldUpdateStarred]);

    return (
        <div className="mx-1">
            <div className="box my-4">
                <div className="field">
                    <label className="checkbox">
                        <input type="checkbox" onChange={(e) => setShowStarredOnly(e.target.checked)} />
                        <span className="ml-2">Show only starred</span>
                    </label>
                </div>
            </div>
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
                    {repos.filter(repo => !showStarredOnly || isStarred(repo.id))
                      .map(({ id, fullName, starsCount, url, watchersCount, forksCount, pushedAt }) => (<tr key={id}>
                        <td>{id}</td>
                        <td>
                            <a href={url}>{fullName}</a>
                        </td>
                        <td>{new Date(pushedAt).toString()}</td>
                        <td>{starsCount}</td>
                        <td>{forksCount}</td>
                        <td>{watchersCount}</td>
                        <td>
                            <button
                                className={classNames("button is-light", { "is-primary": isStarred(id) })}
                                onClick={() => {
                                    toggleRepoStarForCurrentUser(id);
                                    setShouldUpdateStarred(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faStar} />
                                <span className="ml-1">Star</span>
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default TrendingRepos;
