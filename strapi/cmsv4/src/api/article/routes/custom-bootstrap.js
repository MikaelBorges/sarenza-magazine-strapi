module.exports = {
  routes: [
    {
      method: "GET",
      path: "/bootstrap",
      handler: "article.bootstrap",
      config: {
        auth: false,
      },
    },
  
  ],
};
