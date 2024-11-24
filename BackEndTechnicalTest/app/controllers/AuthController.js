const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');
const { getToken } = require('../../utils/index');

const register = async (req, res, next) => {
  try {
    const payload = req.body;

    // Hash password sebelum menyimpan
    const salt = await bcrypt.genSalt(10);
    payload.us_password = await bcrypt.hash(payload.us_password, salt);

    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};
const localStrategy = async (us_email, password, done) => {
  try {
    let user = await User.findOne({ us_email }).select(
      '-__v -createdAt -updatedAt',
    );

    if (!user) return done(null, false, { message: 'User Not Found' });
    const isMatch = bcrypt.compareSync(password, user.us_password);
    if (!isMatch) {
      return done(null, false, { message: 'Password incorrect' }); // Mengembalikan pesan jika password tidak cocok
    } else {
      return done(null, user.toJSON());
    }

    // if (bcrypt.compareSync(password, user.us_password)) {
    //   ({ password, ...userWithoutPassword } = user.toJSON());
    //   return done(null, userWithoutPassword);
    // }
  } catch (err) {}
};

const login = (req, res, next) => {
  // console.log(req);
  passport.authenticate('local', async function (err, user, info) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user)
      return res.status(500).json({
        error: 1,
        message: info.message || 'Email or password incorrect',
      });
    let signed = jwt.sign(user, secretKey);
    // await User.findByIdAndUpdate(user._id, { $push: { token: signed } });
    res.json({
      message: 'Login Successfully',
      user,
      token: signed,
    });
  })(req, res, next);
};

const logout = async (req, res, next) => {
  let token = getToken(req);
  console.log(token);
  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token: token } },
    { new: true, useFindAndModify: false },
  );

  if (!token || !user) {
    res.json({
      error: 1,
      message: 'No user found',
    });
  }

  return res.json({
    message: 'Logout Berhasil',
  });
};

const me = (req, res, next) => {
  if (!req.user) {
    res.json({
      err: 1,
      message: 'You are not Login or token expired',
    });
  }

  res.json(req.user);
};

module.exports = {
  register,
  login,
  localStrategy,
  logout,
  me,
};
