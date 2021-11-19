const envConfig = {
  url: {
    internalMicroServices: {
      dataReplication: process.env.URL_BASE_DATA_REPLICATION,
      notifications: process.env.URL_BASE_NOTIFICATIONS,
    },
    externalMicroService: {
      reviewingArticle: process.env.URL_BASE_REVIEWING_ARTICLE,
    },
  },
  dataReplication: { key: process.env.DATA_REPLICATION_KEY },
  external: {
    sentry: {
      dsn: process.env.SENTRY_DSN,
    },
  },
};

export default envConfig;
