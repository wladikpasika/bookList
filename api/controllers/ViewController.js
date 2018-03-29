module.exports = {

    homepage(req,res,next){

        res.render('homepage');
    },

    registration(req,res,next){

        res.render('registration')
    },

    user(req,res,next){

        res.render('user-page')
    }
};