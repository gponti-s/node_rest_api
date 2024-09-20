export class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message);
    this.name = 'ConflictError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation Error') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class InternalServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
  }
}
