import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://sparkling-caramel-33e27b.netlify.app",
  })
);

const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "bfb0dce41cbf73",
  password: "e694b1be",
  database: "heroku_3672b2fc917a5a6",
});
app.set("port", process.env.PORT || 8800);

app.get("/diseases" || "/", (req, res) => {
  const q = "select * from disease";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/records", (req, res) => {
  const q = "select * from record";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/diseases", (req, res) => {
  const q =
    "insert into disease (`disease_code`, `pathogen`, `descr`, `id`) values(?)";
  const values = [
    req.body.disease_code,
    req.body.pathogen,
    req.body.descr,
    req.body.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Connected to ${port}`);
});

app.delete("/records/:id", (req, res) => {
  console.log(req.params.id);
  const recordId = req.params.id;
  const q = "delete from record where id= ?";
  db.query(q, [recordId], (err, data) => {
    console.log(err);
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.put("/records/:id", (req, res) => {
  const recordId = req.params.id;

  const q =
    "update record set `email` = ?, `cname` =?, `disease_code`=?, `total_deaths` = ? , `total_pat`= ? where id= ?";
  const values = [
    req.body.email,
    req.body.cname,
    req.body.disease_code,
    req.body.total_deaths,
    req.body.total_pat,
  ];
  console.log(values);
  db.query(q, [...values, recordId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
