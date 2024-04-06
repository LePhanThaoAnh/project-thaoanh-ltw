const constants = require("../constants/index");
const { CookieProvider } = require("../helper/cookies");
class Middleware{
    async authenticate(req, res, next){
        let cookies = new CookieProvider(req, res);
        let userString = cookies.getCookie(constants.user_info);
        if(userString ){
            req.user = JSON.parse(userString);
        }
        await next();
    }

    async ensureAuthenticated(req, res, next){
        try {
            if (req.isAuthenticated()) {
              return next(); 
            }
            // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            res.redirect('/login');
          } catch (error) {
            // Xử lý bất kỳ lỗi nào ở đây
            console.error('Error in ensureAuthenticated middleware:', error);
            res.status(500).send('Internal Server Error');
          }
    }

}module.exports = { Middleware };