const User = require('../../schemas/userSchema');
const { logError } = require('../common/util');

/*
 *  Given user account (email or username) returns the user if exists.
 *  Return: JSON
 *  {
 *     result: {},
 *     msg: ""
 *  }
 * if error exists, error returned as string and result returns null.
 * o/w error as "success", result as { result: {...} }
 */
async function getUser(account, onLogin = false) {
    const regEmail =
	    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    try {
        let user = null;
        if (!onLogin) {
            user = await User.findById(account).select('-password');
        } else {
            var accountType = "userName"
            if (regEmail.test(account)) {
                accountType = "email"
            } 
            user = await User.findOne({ [accountType]: account })
        }

        if(user) {
            return {
                result: user,
                msg: "success"
            };
        } else {
            let error_msg = `User with account ${account} not found in database.`;
            logError(error_msg);
            return {
                result: null,
                msg: error_msg,
                code: 404
            }
        }
    } catch (error) {
        let error_msg = `Server error getting user with account ${account} : ${error}`
        logError(error_msg)
        return {
            result: null,
            msg: error_msg,
            code: 500
        };
    }
}

/*
 *  Given user object, updates user timezone with given timezone in IAPA.
 *  Return: JSON
 *  {
 *     msg: ""
 *  }
 * if error exists, error returned as string.
 * o/w error as "success", result as { result: {...} }
 */
async function updateTimezone(user, timezone){
    try {
        if(user!=null) {
            user.timezone = timezone;
            user.save();
            return {
                msg: "success"
            }
        } else {
            let error_msg = `User passed in is null.`
            logError(error_msg)
            return {
                msg: error_msg
            };
        }
    } catch (error) {
        let error_msg = `Server error updating user with id ${user._id} : ${error}`
        logError(error_msg)
        return {
            msg: error_msg
        };
    }
}

exports.getUser = getUser;
exports.updateTimezone = updateTimezone;