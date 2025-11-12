import 'dotenv/config';

export default {
  expo: {
    name: "Rentwise",
    slug: "rentwise-app",
    extra: {
      API_KEY: process.env.API_KEY,
    },
  },
};