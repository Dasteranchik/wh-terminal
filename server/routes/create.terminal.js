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

router.post('/AdminEditTerminalPage', 
    

    async (req, res) => {
    try {
        const {terminals} = req.body

        const terminal = new Terminal(terminals)
        await Terminal.deleteOne({ title: terminals.title })
        await terminal.save()
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

        //числовой вариант
        /* const result = (secret, guess) => {
            let bulls = 0;
            let cows = 0;
            const numbers = new Array(10);
            for (let i=0; i<10; i++){
              numbers[i] = 0;
            }
            for (let i = 0; i<secret.length; i++) {
              const s = secret.charCodeAt(i) - 48;
              const g = guess.charCodeAt(i) - 48;
              if (s == g) bulls++;
              else {
                if (numbers[s] < 0) cows++;
                if (numbers[g] > 0) cows++;
                numbers[s] ++;
                numbers[g] --;
              }
            }
            return bulls + "A" + cows + "B";
        } */

        const result = (secret, guess) => {
            let bulls = 0
            let cows = 0
            const numbers = new Array(10)
            for (let i=0; i<33; i++){
              numbers[i] = 0
            }
            for (let i = 0; i<secret.length; i++) {
              const s = secret.toLowerCase().charCodeAt(i) - 1072
              const g = guess.toLowerCase().charCodeAt(i) - 1072
              if (s == g) bulls++
              else { 
                if (numbers[s] < 0) cows++
                if (numbers[g] > 0) cows++
                numbers[s] ++
                numbers[g] --
              }
            }
            return bulls + " - Быки" + "\n" + cows + " - Коровы";
        }

        const resultGame = await result(command[0].password, guess)
        console.log(resultGame)
        res.send({
            command, 
            resultGame
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})        
    }
})

router.post('/ReturnAllTerminals', async (req, res) => {
  try {
      const terminals = await Terminal.find()
      console.log("Терминалы выведены")
      return res.json(terminals)
  } catch (e) {
      console.log(e)
      res.send({message: "Server error"})        
  }
})

router.post('/ReturnFindOneTerminal', async (req, res) => {
  try {
    const {title} = req.body
    const terminal = await Terminal.findOne({ title: title })
    console.log("Терминал пришёл")
    return res.json(terminal)
  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})        
  }
})

router.post('/DeleteTerminal', async (req, res) => {
  try {
    const {title} = req.body
    await Terminal.findOneAndDelete({ title: title })

    return res.json({message: "Терминал удалён"})
  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})        
  }
})

router.post('/ChangeTerminalFlag', async (req, res) => {
  try {
    const {title, command, subCommand} = req.body
    let terminal = await Terminal.findOne({ title: title })

    terminal.commands[command].commands[subCommand].flag = !terminal.commands[command].commands[subCommand].flag

    console.log(terminal.commands[command].commands[subCommand].flag)

    await terminal.save(title)

    console.log('Терминал обновлён')
    return res.json({message: "Терминал обновлён"})
  } catch (e) {
    console.log(e)
    console.log('Терминал не обновлён, ошибка')
    res.send({message: "Server error"})        
  }
})

module.exports = router