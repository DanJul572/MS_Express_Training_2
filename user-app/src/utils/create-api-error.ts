const createApiError = (
  statusCode: number,
  message: string | undefined,
  isOperational = true,
  stack = '',
) => {
  const error = new Error(message);
  (error as any).statusCode = statusCode;
  (error as any).isOperational = isOperational;

  if (stack) {
    error.stack = stack;
  } else {
    Error.captureStackTrace(error, createApiError);
  }

  return error;
};

export default createApiError;
