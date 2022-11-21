import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use("/", cors(), express.json());

const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b3bb4e515071d0",
  password: "d87c07aa",
  database: "heroku_6fa3f2eaac603de",
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

app.get("/doctors", (req, res) => {
  const q = "select * from doctor natural join users";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/delete/:rid", (req, res) => {
  console.log(rid);
  const q = "select * from record where id = 50";

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

app.put("/updateD/:email", (req, res) => {
  const emailD = req.params.email;
  const q =
    "update doctor natural join users set `name` =?, `surname`=?, `salary` = ? , `phone`= ?, `cname`= ?,`degree` = ? where email= ?";
  const values = [
    req.body.name,
    req.body.surname,
    req.body.salary,
    req.body.phone,
    req.body.cname,
    req.body.degree,
  ];

  console.log(values);
  db.query(q, [...values, emailD], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/doctors/:email", (req, res) => {
  const docId = req.params.email;
  const q = "delete from doctor where email= ?";
  db.query(q, [docId], (err, data) => {
    console.log(err);
    if (err) return res.json(err);
    return res.json(data);
  });
});
