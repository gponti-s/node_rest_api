import { NotFoundError, BadRequestError, ConflictError, ValidationError } from './customErrors.js';

export const errorHandler = (error, res) => {
  console.error("Error:", error);
  
  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  } else if (error instanceof BadRequestError) {
    return res.status(400).json({ message: error.message });
  } else if (error instanceof ConflictError) {
    return res.status(409).json({ message: error.message });
  } else if (error instanceof ValidationError) {
    return res.status(422).json({ message: error.message });
  } else {
    return res.status(500).json({ message: error.message });
  }
};

export default errorHandler
