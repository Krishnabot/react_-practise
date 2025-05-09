const baseConfig = {
  WARNING_THRESHOLD_MS: 1000, // default 1 second
};

const environmentConfigs = {
  development: {
    WARNING_THRESHOLD_MS: 1000, // 1 second (more lenient in dev)
  },
  production: {
    WARNING_THRESHOLD_MS: 800, // 0.8 seconds (stricter in prod)
  },
  test: {
    WARNING_THRESHOLD_MS: 2000, // very lenient in tests
  },
};

export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  console.log(`🔧 Loaded config for environment: ${env}`);

  return {
    ...baseConfig,
    ...(environmentConfigs[env] || {}),
  };
};
