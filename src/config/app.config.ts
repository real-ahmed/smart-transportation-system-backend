export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  MONGO_URI: process.env.MONGO_URI,
  PORT: parseInt(process.env.PORT || '3000', 10),
});
