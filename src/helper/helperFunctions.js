const makeApiCall = (url) => {
    return fetch(url)
            .then(res => res.json())
            .then(json => json)
            .catch(err => console.error(err));
}

module.exports = {makeApiCall}; 