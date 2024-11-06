export class NotFoundError extends Error {
  constructor(message = "The requested resource could not be found.") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "You do not have permission to access this resource.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class InternalServerError extends Error {
  constructor(
    message = "An unexpected error occurred while processing your request."
  ) {
    super(message);
    this.name = "InternalServerError";
  }
}

export class BadRequestError extends Error {
  constructor(message = "Your request is invalid.") {
    super(message);
    this.name = "BadRequestError";
  }
}
