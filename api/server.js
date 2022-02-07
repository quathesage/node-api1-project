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
      res.status(201).json(newUser)
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
    const user = await Users.findById(id)
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" })
    } else {
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
    const rmUser = await Users.remove(id)
    if (!rmUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" })
    } else {
      res.json(rmUser)
    }
  } catch {
    res.status(500).json({ message: "The user could not be removed" })
  }
})

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params
  const { name, bio } = req.body
  try {
    const updatedUser = await Users.update(id, { name, bio })
    if (!updatedUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" })
    } else if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" })
    } else {
      res.status(200).json(updatedUser)
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" })
  }
})

module.exports = server
