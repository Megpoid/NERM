const User = require('../models/User');
const bcrypt = require('bcryptjs')

exports.signupController = async (req, res) => {
	const { username, email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if(user) {
			return res.status(400).json({ errorMessage: 'Email already exist.'})
		}
		const newUser    = new User()
		newUser.username = username
		newUser.email    = email
		const salt       = await bcrypt.genSalt(10)
		newUser.password = await bcrypt.hash(password, salt)

		await newUser.save();

		return res.status(201).json({
            message: "Register Success, Please Login."
        })
	} catch (err) {
		return res.status(500).json({
			errorMessage: 'Something `em wrong'
		})
	}
};

exports.signinController = async (req, res) => {
	const { email, password } = req.body
	console.log('Inside Controller is ' + JSON.stringify(req.body))
	return res.status(201).json({
		message: "Login Success, Please Login."
	})
};