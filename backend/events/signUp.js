const users = require('../models/user'),
  { nanoid } = require('nanoid'),
  log = require('../utils/logging'),
  fs = require('fs');

module.exports = (socket) => {
  // On the socket event: signUp, run a function
  socket.on(
    'signUp',
    async ({ email, password, username, name, pfp }, callback) => {
      // If the callback is undefined, or isn't a function, make it an empty function
      callback = typeof callback === 'function' ? callback : () => {};

      // If any of the required arguments don't exist, return an error
      if (!name || !username || !email || !password)
        return callback({
          message: 'Missing Required Arguments!',
          created: false
        });

      // Find a user with the provided email, then run a function with the user
      await users.findOne(
        {
          email
        },
        async (err, data) => {
          // If the user exists, return an error
          if (data)
            return callback({
              message: `Email Is Already Connected To An Account!`,
              created: false
            });

          // If there is an error, return the error
          if (err)
            return callback({
              message: err,
              created: false
            });

          // If the user doesn't exit, create the user with the info provided
          if (!data) {
            const user = await users.create({
              name,
              username: username.replace(/\</g, '&lt;'),
              email,
              password,
              pfp:
                pfp ||
                fs.readFileSync(
                  `${__dirname}/../../frontend/images/watermelon.png`,
                  { encoding: 'base64' }
                ),
              id: nanoid(64),
              userId: (await users.countDocuments({}).exec()) + 1
            });

            callback({
              message: 'User Successfully Created.',
              created: true,
              user
            });

            log.info(`Created User: ${user.username}`);
          }
        }
      );
    }
  );
};
