const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {accounts} = require("../accounts/src/accounts")

app.use(cors());
app.use(express.json());

const balances = new Map()
    .set(accounts[0].address, accounts[0].initialAmount)
    .set(accounts[1].address, accounts[1].initialAmount)
    .set(accounts[2].address, accounts[2].initialAmount)

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  const balance = balances.get(address) | 0

  console.log('balance:', balance)
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const senderBalance = balances.get(sender)
  const recipientBalance = balances.get(recipient)

  console.log('senderBalance:', senderBalance)
  console.log('recipientBalance:', senderBalance)

  if (senderBalance < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, senderBalance - amount);
    balances.set(recipient, recipientBalance + amount);

    console.log('senderBalance:', balances.get(sender))
    console.log('recipientBalance:', balances.get(recipient))

    res.send({ balance: senderBalance - amount });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}