const router = require("express").Router();

const connection = require("../../database/index");


router.patch("/vote", (req, res) => {
  console.log("vote", req.body);
  //   console.log(req.body.id);
  //   console.log("vote", req.body.value);
  //   console.log(req.body.values.dances);
  let idUser = req.body.id;
  let dance_choice = req.body.values.dances;
  let sqlDance = `UPDATE users SET idDance = ? WHERE idUser = ?`;
  const valueDance = [dance_choice, idUser];
  connection.query(sqlDance, valueDance, (err, result) => {
    if (err) throw err;
  });
  let asVoted = {
    messageGood: "Votre vote a été pris en compte",
  };
  res.send(asVoted);
});

// Route Express avec PATCH pour réinitialiser les votes
router.patch('/resetVotes', (req, res) => {
  const resetVotesSql = "UPDATE users SET idDance = NULL";
  connection.query(resetVotesSql, (err, result) => {
    console.log("resetvote", result);
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur lors de la réinitialisation des votes" });
    }
    return res.json({ message: "Réinitialisation des votes réussie" });
  });
});



module.exports = router;