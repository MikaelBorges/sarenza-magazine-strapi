module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 9337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '19eb186919693d467ef4f742f6ea262d'),
    },
  }
});
