routes = require('./routes');

module.exports = function(req, res, next) {
  if(   req.originalUrl==='/'
      ||req.originalUrl==='/registration'
      ||req.isAuthenticated()
      ||req.method === "POST"
  ) {
    return routes(req, res, next)
  }
  else if(!req.isAuthenticated()){
        req.flash('error', [{msg:'Сначала ввойдите в систему'}]);
        return res.redirect('/')
  }
};
