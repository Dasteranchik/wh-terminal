const Router = require("express");
const Terminal = require("../models/Terminal")
//const {check, validationResult} = require("express-validator")
const router = new Router()

router.post('/AdminCreateTerminalPage', 
    
    /*     check('description').isLength({min:3})
    ,  */
    async (req, res) => {

    try {
        console.log(req.body)
        /* const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        } */

        const {title, description, commands} = req.body

        const terminal = new Terminal({title, description, commands})
        await terminal.save()
        return res.json({message: "Terminal was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/PlayerPasswordTerminalPage', async (req, res) => {

    try {
        const {title, commands, guess} = req.body
        const terminal = await Terminal.findOne({title})
        const command = await terminal.commands.filter(
            (value) => value.title === commands
        )

        const result = (secret, guess) => {
            var bulls = 0;
            var cows = 0;
            var numbers = new Array(10);
            for (var i=0; i<10; i++){
              numbers[i] = 0;
            }
            for (var i = 0; i<secret.length; i++) {
              var s = secret.charCodeAt(i) - 48;
              var g = guess.charCodeAt(i) - 48;
              if (s == g) bulls++;
              else {
                if (numbers[s] < 0) cows++;
                if (numbers[g] > 0) cows++;
                numbers[s] ++;
                numbers[g] --;
              }
            }
            return bulls + "A" + cows + "B";
        }

        console.log(result(command[0].password, guess))
        const resultGame = await result(command[0].password, guess)
        res.send({
            command, 
            resultGame
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})        
    }
})


module.exports = router