module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/home-bootstrap',
        handler: 'home.bootstrap',
        config: {
          auth: false,
        }
      },
    ]
  }