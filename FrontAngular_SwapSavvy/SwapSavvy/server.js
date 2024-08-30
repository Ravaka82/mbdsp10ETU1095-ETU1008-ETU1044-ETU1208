//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, "FrontAngular_SwapSavvy/SwapSavvy/dist/swap-savvy/browser")));

app.get("/*", function (req, res) {
 res.sendFile(path.join(__dirname + "FrontAngular_SwapSavvy/SwapSavvy/dist/swap-savvy/browser/index.html"));
});
// Start the app by listening on the default Heroku/Render port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});