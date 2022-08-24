const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController {

    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if(!name) {
            res.status(422).json({message: 'Preencha o campo de nome'})
            return
        }

        if(!email) {
            res.status(422).json({message: 'Preencha o campo de email'})
            return
        }
        
        if(!phone) {
            res.status(422).json({message: 'Preencha o campo de telefone'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'Preencha o campo de senha'})
            return
        }

        if(!confirmpassword) {
            res.status(422).json({message: 'Preencha o campo de confirmação de senha'})
            return
        }

        if(password !== confirmpassword) {
            res.status(422).json({message: 'As senham precisam ser iguais'})
            return
        }

        const userExists = await User.findOne({email: email})

        if(userExists) {
            res.status(422).json({message: 'Este email já está cadastrado, utilize outro email'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name, email, phone, password: passwordHash
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)
        } catch(error) {
            res.status(500).json({message: error})
        }




    }

}