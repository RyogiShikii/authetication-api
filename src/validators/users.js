import { body, validationResult } from 'express-validator';

export const userRegisterSchema = [
    body('username')
      .exists({checkFalsy: true})                   //uesrname cannot be null, undefined, empty string
      .bail()
      .trim()                                       //trim characters from both sides
      .isLength({min: 5})                           //Minimum length 5
      .withMessage('username must be at least 5 characters long')
      .bail()
      .isLength({max: 32})                          //Maximum length 32
      .withMessage('username must be at most 32 characters long')
      .bail(),
    body('email')
      .trim()
      .isEmail()                                    //check if input is an email
      .normalizeEmail()                             //canonicalizes an email address
      .withMessage('email must contain a valid email address'),
    body('password')
      .exists()
      .withMessage('please input a password')
      .bail()
      .trim()
      .isStrongPassword()                           //check if a password is strong or not. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
      .withMessage('password must be at least 8 characters long and contains at least one lowercase letter, one uppercasw letter, one number, one symbol')
      .bail(),
  ];
  
  export const userLoginSchema = [
      body('username')
        .exists({checkFalsy: true})                   //uesrname cannot be null, undefined, empty string
        .bail()
        .trim()                                       //trim characters from both sides
        .isLength({min: 5})                           //Minimum length 5
        .withMessage('username must be at least 5 characters long')
        .bail()
        .isLength({max: 32})                          //Maximum length 32
        .withMessage('username must be at most 32 characters long')
        .bail(),
      body('password')
        .trim()
        .isStrongPassword()
        .withMessage('password must be at least 8 characters long and contains at least one lowercase letter, one uppercasw letter, one number, one symbol'),
  ];

export const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

