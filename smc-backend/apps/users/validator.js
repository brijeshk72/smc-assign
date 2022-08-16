const { check } = require("express-validator");

exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name must be required").notEmpty();
  req.check("name", "Name must be between 4 to 150 character").isLength({
    min: 4,
    max: 150,
  });

  req
    .check("email", "Email must be required")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must be contain @")
    .isLength({
      min: 4,
      max: 100,
    });

  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  // Handle Error And Throw Message

  const errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    console.log("First Error", firstError);
    return res.status(400).json({ error: firstError });
  }

  // Procced to next Middleware
  next();
};
