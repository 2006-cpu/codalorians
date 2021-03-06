const apiRouter = require('express').Router();
///Need to remove public secret when submit
const {JWT_SECRET} = process.env || 'notSoSecret';

const jwt = require('jsonwebtoken');

const {getUserById} = require('../db/users')

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
          const { id } = jwt.verify(token, JWT_SECRET);
  
          if (id) {
              req.user = await getUserById(id);
              next();
          }
      } catch ({ name, message }) {
          next({ name, message });
      }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
      });
  }

});

apiRouter.use((req, res, next) => {
  if(req.user) {
      console.log("User is set:", req.user)
  }
  next();
})


/* This will be edited */
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

/* ROUTING FOR /api/products */

  apiRouter.use('/products', require('./products'));
  apiRouter.use('/orders', require('./orders'));
  apiRouter.use('/users', require('./users'));
  apiRouter.use('/order_products', require('./order_products'));
  apiRouter.use('/reviews', require('./reviews'));

module.exports = apiRouter;
