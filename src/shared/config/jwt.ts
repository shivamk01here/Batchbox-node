export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'defaultsecret',
    expiresIn: '7d',
  };
  