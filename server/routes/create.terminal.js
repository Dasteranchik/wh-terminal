const Router = require("express");
const Terminal = require("../models/Terminal")
//const {check, validationResult} = require("express-validator")
const router = new Router()

router.post('/AdminCreateTerminalPage', 
    /* [
        check('description', 'Password must be longer than 3 and shorter than 12').isLength({min:1, max:12})
    ], */
    async (req, res) => {

    try {
        console.log(req.body)
        //const errors = validationResult(req)

        /* if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        } */

        const {title, description} = req.body;

        const terminal = new Terminal({title, description})
        await terminal.save()
        return res.json({message: "Terminal was created"})
    } catch (e) {
        
    }
})


module.exports = router