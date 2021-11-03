interface Repo {
    id: number;
    fullName: string;
    starsCount: number;
    url: string;
    watchersCount: number;
    forksCount: number;
    pushedAt: string;
    description: string | null;
}

export default Repo;