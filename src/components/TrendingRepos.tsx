import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { getMostPopularRepos, isRepoStarredByCurrentUser, toggleRepoStarForCurrentUser } from "../utils/githubUtils";
import Repo from "../interfaces/Repo";

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
                        <th>Description</th>
                        <th>Pushed At</th>
                        <th>Stars️ ⭐️</th>
                        <th>Forks <FontAwesomeIcon icon={faCodeBranch} /></th>
                        <th>Watchers 👀</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.filter(repo => !showStarredOnly || isRepoStarredByCurrentUser(repo.id))
                      .map(({ id, fullName, starsCount, url, watchersCount, forksCount, pushedAt, description }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>
                                <a href={url}>{fullName}</a>
                            </td>
                            <td>{description}</td>
                            <td>{new Date(pushedAt).toString()}</td>
                            <td>{starsCount}</td>
                            <td>{forksCount}</td>
                            <td>{watchersCount}</td>
                            <td>
                                <button
                                    className={classNames("button is-light", { "is-primary": isRepoStarredByCurrentUser(id) })}
                                    onClick={() => {
                                        toggleRepoStarForCurrentUser(id);
                                        setShouldUpdateStarred(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                    <span className="ml-1">{isRepoStarredByCurrentUser(id) ? 'Unstar' : 'Star'}</span>
                                </button>
                            </td>
                        </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
}

export default TrendingRepos;
