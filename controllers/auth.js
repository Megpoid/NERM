const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/keys')

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
			errorMessage: 'Something `em wrong on the server.'
		})
	}
};

exports.signinController = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if(!user) {
			return res.status(400).json({ errorMessage: 'there are no email with such ' + email + ' ,Please Resgiter.' })
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if(!isMatch) {
			return res.status(400).json({ errorMessage: 'Password is incorrect with the current.' })
		}
		const payload = { user: { _id: user._id } }
		await jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
			if(err) console.error('jwt error: ', err)
			const { _id, username, email, role } = user

			return res.status(201).json({
				token, user: { _id, username, email, role }
			})
		})
	} catch (err) {
		return res.status(500).json({
			errorMessage: 'Something `em wrong on the server.'
		})
	}
};