const _ = require("lodash");

module.exports = (schema) => {
  return (req, res, next) => {
    const file = _.pick(req, "file");
    const input = _(req.body).assign(file).value();

    const { error } = schema.validate(input);

    if (error) return res.status(400).send(error.details[0].message);

    next();
  };
};
