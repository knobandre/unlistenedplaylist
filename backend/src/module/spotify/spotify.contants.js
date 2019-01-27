const AUTHORIZATION = {
    SCOPES: 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private',
    REDIRECT_URI: `${process.env.BACKEND_API_ADDRESS}/api/spotify/redirect`,
}

const MESSAGES = {
    GENERATED: 'Generated by mycoolplaylist.',
    NO_STATE: 'No corresponding state found on State table.',
    UNDERGROUND: 'That\'s so underground... please try another artist.'
}

const METHODS = {
    GET: 'GET',
    POST: 'POST'
}

const OPTIONS = {
    getAccessTokenOptions: () => ({
        host: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }),
    getUserInfoOptions: accessToken => ({
        host: 'api.spotify.com',
        path: '/v1/me',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    })
};

module.exports = {
    AUTHORIZATION,
    MESSAGES,
    METHODS,
    OPTIONS
};