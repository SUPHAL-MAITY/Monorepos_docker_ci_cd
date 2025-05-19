import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  console.log("this is user api")
  prismaClient.user.findMany()
    .then(users => {
      res.json({users});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  console.log(username,password)
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  console.log("before user creation")
  prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
     console.log(" user creation sucessful")
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message });
    });
    

})

console.log("Hello via Bun!");

app.listen(8080);

