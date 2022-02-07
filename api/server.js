const express = require("express")
const server = express()
const Users = require("./users/model")

server.use(express.json())

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" })
    } else {
      const newUser = await Users.insert({ name, bio })
      console.log(newUser)
      res.json(newUser)
    }
  } catch {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    })
  }
})

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" })
  }
})

module.exports = server
