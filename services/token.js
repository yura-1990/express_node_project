import jwt from "jsonwebtoken";

const generateJWTToken = (userId) => {
  const accesstoken = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return accesstoken;
};

export { generateJWTToken };
