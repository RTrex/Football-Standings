import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';
const app = express();

const port = 3000;

const clientToken =process.env.API_KEY;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

if (clientToken) {
  axios.defaults.headers.common["X-Auth-Token"] = clientToken;
} else {
  delete axios.defaults.headers.common["X-Auth-Token"];
}

const header = {
   headers: {
     "content-type": "application/json"
      }
};
  
app.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const year = req.body.year;
      const code = req.body.code;
      const response = await axios.get(`https://api.football-data.org/v4/competitions/${code}/standings/?season=${year}`, req.body, header);
      const result = response.data.standings[0].table;
      const name = response.data.competition.name;
      const logo = response.data.competition.emblem;
      res.render("app.ejs", {why:result, league:name, pic:logo});
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})


