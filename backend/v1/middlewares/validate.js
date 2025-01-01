const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  } catch (error) {
    console.error("Validation Middleware Error:", err);
    res.status(500).json({ error: "Server error during validation." });
  }
};

module.exports = validate;
