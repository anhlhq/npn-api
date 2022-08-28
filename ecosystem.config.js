module.exports = {
  apps: [
    {
      name: "npn-api",
      script: "server.js",
      env: {
        COMMON_VARIABLE: "true",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "cloud",
      host: "sv.quanganh.uk",
      ref: "origin/master",
      repo: "git@github.com:anhlhq/npn-api.git",
      path: "/var/www/npn-api",
      "pre-deploy-local": "",
      "post-deploy":
        "yarn install && NODE_PATH=. pm2 startOrRestart ecosystem.config.js --env production",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
