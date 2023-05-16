export default () => ({
  port: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
});
