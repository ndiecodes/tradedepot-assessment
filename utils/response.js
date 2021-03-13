Response = ({ res, code = 200, data, message = null }) => {
  const responseData = {
    status: "sucess",
    message,
    data: data,
  };
  return res.status(code).json(responseData);
};

ErrResponse = ({ res, error }) => {
  const data = {
    status: "failed",
    data: null,
  };
  let code = 500;
  // see "./utils/exception"
  if (error.name == "Exception") {
    data.message = error.message;
    code = error.code;
  } else {
    data.message = "Server Error";
  }
  return res.status(code).json(data);
};

module.exports = {
  Response,
  ErrResponse,
};
