const validUsers = require('../utils/users');

const login = (req, res) => {
    const { email, password} = req.query;

    const findUser = validUsers.find( (user) => user.email === email && user.password === password)

    if(findUser) {
        res.status(200).json({access:true});
    } else {
        res.status(200).json({access:false});
    }
    
}

module.exports =  login;