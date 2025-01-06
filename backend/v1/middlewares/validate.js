const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).json({ error: error.details[0].message });
    }
    
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);
    res.status(500).json({ error: "Server error during validation." });
  }
};

module.exports = validate;
