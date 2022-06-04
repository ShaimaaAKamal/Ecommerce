const validatePassword = function(password) {
    var re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(password)
};


module.exports=validatePassword 
