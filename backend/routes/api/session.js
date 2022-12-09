// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();


// backend/routes/api/session.js
// ...

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .withMessage('Email or username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];



// backend/routes/api/session.js
// ...

// Log in
//
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      if(!credential || !password){
        return res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            credential: "Email or username is required",
            password: "Password is required"
          }
        })
      }


      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        // err.title = 'Login failed';
        err.errors = ['Invalid credentials'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user: {
          id: user.dataValues.id,
          firstName: user.dataValues.firstName,
          lastName: user.dataValues.lastName,
          email: user.dataValues.email,
          username: user.dataValues.username
        }
      });
    }
  );

// backend/routes/api/session.js
// ...

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // ...

  /*

// backend/routes/api/session.js
// ...

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

  // ...


  */

  // backend/routes/api/session.js
  // ...

  // Get the Current User
  router.get(
    '/',
    restoreUser,
    // requireAuth,
    (req, res) => {
      const { user } = req;
      
      if (user) {
        // const { id, firstName, lastName, email, username } = user

        return res.json({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
          }
        })

      } else return res.json({
        user: null
      });
    }
  )

  // ...



module.exports = router;
