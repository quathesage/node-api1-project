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

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" })
    } else {
      const user = await Users.findById(id)
      res.json(user)
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" })
  }
})

server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" })
    } else {
      const rmUser = await Users.remove(id)
      res.json(rmUser)
    }
  } catch {
    res.status(500).json({ message: "The user could not be removed" })
  }
})

module.exports = server
