exports.toResJson = ({
  status = "SUCCESS",
  message = "",
  data,
  code = 200,
  total,
  limit,
  page,
}) => {
  return {
    status,
    message,
    data,
    code,
    total,
  };
};
