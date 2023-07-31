import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

const port = 3000;

const clientToken = process.env.API_KEy;

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
      const response = await axios.get(`https://api.football-data.org/v4/competitions/PL/standings/?season=${year}`, req.body, header);
      const result = JSON.stringify(response.data); 
      console.log(result);
      res.render("index.ejs", {data:result});
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})


