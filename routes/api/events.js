const router = require("express").Router()

const connection  = require("../../database")

router.get("/getEvents", (req, res) => {
    const sql = "SELECT * FROM events"
    connection.query(sql, (err, result) => {
        if (err) throw err
        console.log("events récupérés");
        res.send(JSON.stringify(result))
    })
})

router.delete("/deleteEvent/:idEvent", (req, res) => {
    console.log(req.params);
    const id = req.params.idEvent;
    const deleteSql = "DELETE FROM events WHERE idEvent= ?";
    connection.query(deleteSql, [id], (err, result) => {
      if (err) throw err;
    });
    res.sendStatus(200);
  });

  router.post("/addEvent", (req, res) => {
    console.log(req.body);
    const { date, title, duration, price, poster } = req.body;
    const insertSql =
      "INSERT INTO events (date_hour, title, duration, price ,imgBlob) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      insertSql,
      [date, title, duration, price, poster],
      (err, result) => {
        console.log("resultInsert", result);
        if (err) throw err;
        let lastInsertId = result.insertId;
        let sqlLastOne = "SELECT * FROM events WHERE idEvent = ?";
        connection.query(sqlLastOne, [lastInsertId], (err, result) => {
          console.log("resultAdd", result);
          res.send(JSON.stringify(result));
        });
      }
    );
  });

module.exports = router;