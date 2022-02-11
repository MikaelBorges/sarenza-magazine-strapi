module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '18ef392a07b79e31b34678a2bf076a85'),
  },
});
