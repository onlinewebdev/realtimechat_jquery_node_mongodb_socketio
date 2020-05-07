module.exports = (req, res, next) => {
  req.user = null;
  try {
    if(req.session.user != null) {
      req.user = req.session.user;
    }
  } catch {
  }
  
  next();
};