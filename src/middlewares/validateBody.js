export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return res.status(400).json({
        status: 400,
        message: 'Validation error',
        data: errorMessage,
      });
    }
    next();
  };
}; 