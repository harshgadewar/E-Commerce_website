
import jwt from 'jsonwebtoken'

export const generateRefreshToken = (userId) => {
    console.log(
 process.env.REFRESH_TOKEN_SECRET
);
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

 