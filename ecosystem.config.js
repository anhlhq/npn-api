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
      host: "do.lehuy.net",
      ref: "origin/master",
      repo: "git@github.com:lehuyco/npn-api-2022.git",
      path: "/var/www/nhanphatnhanh.com/be",
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
