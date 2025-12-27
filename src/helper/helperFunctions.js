const makeApiCall = (url) => {
    return fetch(url)
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err));
};

const makePostApiCall = (url, body) => {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjczNGVlZDYzODNhNDRlNjc2NzdkYjNkNDgwMmZlZSIsIm5iZiI6MTcwOTY3NTM5OC4zOTYsInN1YiI6IjY1ZTc5Mzg2Y2U5ZTkxMDE2MjNlMDU5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N78N6TjYyMSSA_4JSxlSr0KEMRHYG7U8oOjeVm3GPOM",
        },
        body: JSON.stringify(body),
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
};

const makeDeleteApiCall = (url) => {
    const options = {
        method: "DELETE",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjczNGVlZDYzODNhNDRlNjc2NzdkYjNkNDgwMmZlZSIsIm5iZiI6MTcwOTY3NTM5OC4zOTYsInN1YiI6IjY1ZTc5Mzg2Y2U5ZTkxMDE2MjNlMDU5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N78N6TjYyMSSA_4JSxlSr0KEMRHYG7U8oOjeVm3GPOM",
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
};

const refineMovies = (movies) => {
    return movies.map((movie) => {
        return {
            title: movie.title,
            poster: movie.poster_path,
            id: movie.id,
        };
    });
};

const refineTVShows = (shows) => {
    return shows.map((show) => {
        return {
            title: show.title,
            poster: show.poster_path,
            id: show.id,
        };
    });
};

const refinePeople = (people) => {
    return people.map((person) => {
        return {
            title: person.name,
            poster: person.profile_path,
            id: person.id,
        };
    });
};

const refineSeasons = (seasons) => {
    return seasons.map((season) => {
        return {
            title: season.name,
            poster: season.poster_path,
            id: season.season_number,
        };
    });
};

const refineEpisodes = (episodes) => {
    return episodes.map((episode) => {
        return {
            title: episode.name,
            poster: episode.still_path,
            id: episode.episode_number,
        };
    });
};

const combineCrewCredits = (credits) => {
    const combinedCredits = Object.values(
        credits.reduce((acc, person) => {
            // Normalize jobs
            const jobs = person.jobs ? person.jobs.map((j) => j.job) : person.job ? [person.job] : [];

            if (!acc[person.id]) {
                acc[person.id] = {
                    ...person,
                    jobs: [...jobs],
                    departments: [person.department],
                };
            } else {
                acc[person.id].jobs.push(...jobs);
                acc[person.id].departments.push(person.department);
            }

            return acc;
        }, {})
    );

    return combinedCredits;
};

module.exports = {
    makeApiCall,
    makePostApiCall,
    makeDeleteApiCall,
    refineMovies,
    refineTVShows,
    refinePeople,
    refineSeasons,
    refineEpisodes,
    combineCrewCredits,
};
