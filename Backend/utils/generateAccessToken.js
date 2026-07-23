import jwt from "jsonwebtoken";

export const generateAccessTokenutil = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return accessToken;
};
