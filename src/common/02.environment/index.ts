export const environment = {
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPw: process.env.DB_PW,
    dbSynchronize: process.env.DB_SYNCHRONIZE === 'true',
    jwtSecretATKey: process.env.JWT_SECRET,
    jwtSecretRTKey: process.env.JWT_RTACCESS_KEY,
    portApi: process.env.PORT_API,
    enableRedis: process.env.ENABLE_REDIS === 'true',
    redisHost: process.env.REDIS_HOST,
    redisPort: parseInt(process.env.REDIS_PORT),
    redisUsername: process.env.REDIS_USER_NAME,
    redisPw: process.env.REDIS_PW,
    spaUrl: process.env.SPA_URL,
    spaDevUrl: process.env.DEV_SPA_URL,
    originUrls: process.env.ORIGIN_URLS?.split(';') || [],
}