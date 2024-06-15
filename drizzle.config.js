/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-mocker_owner:0F1BZQwSONnd@ep-winter-flower-a1x30uj6.ap-southeast-1.aws.neon.tech/ai-mocker?sslmode=require',
    }
  };