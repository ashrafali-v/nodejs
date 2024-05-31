const router = require("express").Router();
const User = require("../app/model/User");

router.get("/", async (req, res) => {
  //res.send("hiiii12345");
  try {
    console.log('search user');
    const users = await User.find();
    console.log('finish search user');
    res.json(users);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/:userId", async (req, res) => {
  //res.send(`User Id is: ${req.params.userId}`)
  try {
    const user = await User.findById(req.params.userId);
    console.log(user);
    let c = res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/:userId", async (req, res) => {
  //res.send("hiiii");
  try {
    const user = await User.deleteOne(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.patch("/:userId", async (req, res) => {
  //res.send("hiiii");
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { name: req.body.name } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
