import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

const config = {
    headers: { "X-Auth-Token":process.env.API_KEY},
  };
  
  app.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const year = req.body.year;
      const result = await axios.get(`https://api.football-data.org/v4/competitions/PL/standings/?season=${year}`, config);
      res.render("index.ejs", { });
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})


