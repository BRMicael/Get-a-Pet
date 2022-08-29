const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


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

    static async login (req, res) {
        const {email, password} = req.body

        if(!email) {
            res.status(422).json({message: 'Preencha o campo de email'})
        }

        if(!password) {
            res.status(422).json({message: 'Preencha o campo de senha'})
            return
        }

        const user = await User.findOne({email: email})

        if(!user) {
            res.status(422).json({message: 'Este email não está cadastrado'})
            return
        }

        const checkPassowd = await bcrypt.compare(password, user.password)
        
        if(!checkPassowd) {
            res.status(422).json({message: 'Senha inválida'})
            return
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res) {
        let currentUser
        //console.log(req.headers.authorization)

        if(req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await user.findById(id)

        if(!user) {
            res.status(422).json({
                message: 'Usuário não encontrado'
            })
            return
        }

        res.status(200).json({user})
    }

    static async getUserById(req, res){

        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({
                message: 'Usuário não encontrado'
            })
            return
        }

        res.status(200).json({user})
    }

    static async editUser(req, res) {
        
        //const id = req.params.id

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmpassword} = req.body
        
        let image = ''
        if (req.file) {
            user.image = req.file.filename
            console.log(image)
        }

        //validations
        if(!name) {
            res.status(422).json({message: 'Preencha o campo de nome'})
            return
        }

        user.name = name

        if(!email) {
            res.status(422).json({message: 'Preencha o campo de email'})
            return
        }

        //check if email has already been register
        const userExists = await User.findOne({email: email})
        if(user.email !== email && userExists){
            res.status(422).json({
                message: 'Email já cadastrado, utilize outro email'
            })
            return
        }

        user.email = email


        if(!phone) {
            res.status(422).json({message: 'Preencha o campo de telefone'})
            return
        }

        user.phone = phone


        if(password !== confirmpassword) {
            res.status(422).json({message: 'As senham precisam ser iguais'})
            return
        }else if(password === confirmpassword && password != null){

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            await User.findByIdAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Usuário atualizado com sucesso'
            })
        } catch(err) {
            res.status(500).json({message: err})
        }

    }
}