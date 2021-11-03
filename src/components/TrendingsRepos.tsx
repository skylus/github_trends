import React, {useEffect, useState} from 'react';
import {getMostPopularRepos} from "../services/GithubService";
import Repo from "../interfaces/Repo";

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
                        <th>Forks 🍴</th>
                        <th>Watchers 👀</th>
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

                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default TrendingRepos;
