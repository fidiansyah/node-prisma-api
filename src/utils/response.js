export const successResponse = (res, message, data = null, status = 200) => {
  const response = {
    status: 'success',
    message: message,
  };
  if (data !== null) {
    response.data = data;
  }
  return res.status(status).json(response);
};

export const errorResponse = (res, message, status = 500) => {
  return res.status(status).json({
    status: 'error',
    message: message,
  });
};
