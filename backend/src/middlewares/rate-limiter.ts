import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 75,
  handler: (req, res, next, options) =>
    res.status(options.statusCode).json({ message: options.message }),
});

export default limiter;
