export const enviroment = {
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPw: process.env.DB_PW,
    dbSynchronize: process.env.DB_SYNCHRONIZE === 'true',
    jwtSecretATKey: process.env.JWT_SECRET
}