## Initialize the Project

1. Install packages
``` 
npm install
```

2. Include config file
```
var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;
config.pgConnect = 'postgres://username:password@host:port/database';
config.mongoConnect = 'mongodb://host:port/database';

module.exports = config;

```
3. Run webpack to create bundle files
```
webpack
```

4. Setup database
+ Install mongodb (see: [https://docs.mongodb.com])
+ create a db with <dbname>: 
```
mongo
use <dbname>
```

5. Run app
```
npm start
```

