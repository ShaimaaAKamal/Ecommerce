const validatePassword = function(password) {
    var re =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password)
};


module.exports=validatePassword 
