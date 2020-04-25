const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const User = require("./models/Users");
const File = require("./models/File");

routes.get("/files", async (req, res) => {
  const files = await File.find();
  const users = await User.find();
  return res.json({ files, users });
});

routes.post("/files", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, key, location: url = "" } = req.file;

  const file = await File.create({
    name,
    key,
    url,
  });

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    csv_url: url,
  });

  return res.json({ file, user });
});

routes.delete("/files/:id", async (req, res) => {
  const file = await File.findById(req.params.id);
  await file.remove();
  return res.send();
});

module.exports = routes;
