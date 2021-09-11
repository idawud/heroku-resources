
class ResourcesService {
    getPostgresDBResource() {
        return this.getDatabaseResourceData(process.env.DATABASE_URL);
    }

    getMySqlDBResource() {
        return this.getDatabaseResourceData(process.env.JAWSDB_MARIA_URL);
    }

    getDatabaseResourceData(dbURL) {
        if (!dbURL) {
            return {}
        }
        const urlWithNoDBType = dbURL.slice(dbURL.indexOf('://') + 3);
        const splitDBHost = urlWithNoDBType.split('@');
        const [user, password] = splitDBHost[0].split(':');
        const [host, portDBName] = splitDBHost[1].split(':');
        const [port, dbname] = portDBName.split('/');

        return {
            url: dbURL,
            user,
            password,
            host,
            port,
            dbname
        }
    }

    getRedisResource() {
        const redisURL = process.env.REDISTOGO_URL;
        if (!redisURL) {
            return {}
        }
        const urlWithNoDBType = redisURL.slice(redisURL.indexOf('://') + 3);
        const splitDBHost = urlWithNoDBType.split('@');
        const [user, password] = splitDBHost[0].split(':');
        const [host, port] = splitDBHost[1].replace('/', '').split(':');

        return {
            url: redisURL,
            user,
            password,
            host,
            port
        }
    }
}

module.exports = ResourcesService;