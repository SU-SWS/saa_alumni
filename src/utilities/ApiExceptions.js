export const exceptionMessages = {
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

export const ApiException = (res, { status = 500, data }) =>
  res.status(status).json(data || exceptionMessages[status]);

// Convenience Exception wrappers
export const NotFoundException = (res, data) =>
  ApiException(res, { status: 404, data });
export const MethodNotAllowed = (res, data) =>
  ApiException(res, { status: 405, data });

/**
 * Catch-all exception handler for backend error responses.
 * Automatically responds appropriately so do not execute any code after calling.
 * @param res Connect response object
 * @param err The error to parse and respond for
 * @param options {@link ExceptionHandlerOptions}
 */
export const ExceptionHandler = (res, err) => {
  const status = parseInt(err?.response?.status || err?.status, 10) || 500;
  const data = err?.response?.data?.detail || err?.response?.data || err?.data;

  return ApiException(res, { status, data });
};
