module.exports = {
    database: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    cookieSetings: {
        sameSite: 'strict',
        secure: true,
        httpOnly: true
    },
    cors: {
        origin: ['https://the-well.is', 'https://www.the-well.is'],
        credentials: true
    },
}

