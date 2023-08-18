declare namespace Express {
  interface Request {
    user: {
      id: string;
      refreshToken: string;
    };
  }
}
