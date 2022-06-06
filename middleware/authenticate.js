const passport=require('passport');

const {displayCustomError,displayError}=require('../helpers/display');

const  passport_authenticate_jwt= (callback) => {
	function hack(req, res, next) {
		passport.authenticate('jwt', {session:false},function(err, user, info) {
			if (err) return displayError(res,500,false,"Something went wrong",err)
			if (!user) return  displayCustomError(res,401,false,"User is unauthorized");
			req.user = user
			return callback(req, res, next);
		})(req, res, next);
	}

	return hack
}



module.exports=passport_authenticate_jwt