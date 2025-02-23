const makeApiCall = (url) => {
    return fetch(url)
        .then((res) => res.json())
        .then((json) => json)
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
    console.log(seasons);
    return seasons.map((season) => {
        console.log(season);
        return {
            title: season.name,
            poster: season.poster_path,
            id: season.season_number,
        };
    });
};

module.exports = { makeApiCall, refineMovies, refineTVShows, refinePeople, refineSeasons };
