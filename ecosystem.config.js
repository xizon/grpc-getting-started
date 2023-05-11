module.exports = {
    "apps": [
        {
            name: "apiserver",
            script: "node server-api.js",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};