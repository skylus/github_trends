import React, {useEffect} from 'react';
import {getMostPopularRepos} from "../services/GithubService";

function TrendingRepos() {
    useEffect(() => {
        async function fetchRepos() {
            const repos = await getMostPopularRepos()
            console.log('repos', repos)
        }

        fetchRepos();
    }, [])
    return (
        <div>
            Trending repos
        </div>
    );
}

export default TrendingRepos;
