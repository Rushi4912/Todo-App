const express = require('express');
const { createTodo } = require('./types');
const { todo } = require('./mongo');
const cors = require("cors");
const app = express();

app.use(express.json());

app.post('/todo',  async function (req, res) {
     const createPayload = req.body;
     const parsePayload = createTodo.safeParse(createPayload);
     if (!parsePayload.success) {
          res.status(401).json({
               msg: "you send wrong inputs"
          });
          return;
     }
     // put in mongodb
     await todo.create({
          title: createPayload.title,
          description: createPayload.description
     });

     res.json({
          msg: "todo added successfully"
     })

});

app.get('/todo',  async function (req, res) {
     
     const response = await todo.find({});
     res.json({
          response
     })

});

app.listen(3000);