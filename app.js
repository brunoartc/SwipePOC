const express = require("express");
const app = express();
const Swipe = require('@swp/swipe-sdk')


// Inicia no ambiente de Sandbox, utilizando 'en-US'
const swp = Swipe.init({
  apiKey: "5648d393f37d621b4b4e1865f8cb91ae23558983de2d97db98c7807420982bc2",
  secret: "4994225b95368f93ce6502011c0d6b7496c41c11f9b9d6c46ea84ac591c57a59",
  sandbox: true,
  //id: a311d3cf4edc088b87d7fb9c7142ec518eff01c3de1db5e104820713d58e8d97
})

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));









swp.makePayment({ //----------------------------------------
  //     from: "a311d3cf4edc088b87d7fb9c7142ec518eff01c3de1db5e104820713d58e8d97",
  from: "9efc336fba388a31be37ff897de1267e46b0b7f2b1f9255d5045042a02173a66",
  to: "36df6a4363ae9a5bb8da8dd07df34e184fa1f6626c197976a07e609588fa8b71",
  asset: "2db474631d2df7d84f463ad02756356ce13480ad9040869f749acea627dab318",
  amount: 1000,
})
  .then(data => {
    console.log("data1",data);
    data.payment.operations.forEach(op => {
      console.log(123,op.amount)
    })
  })
  .catch(({data, error}) => {
    console.log(error)
    console.log(data)

    // exibir índice e código de erro dos pagamentos que falharam
    // data.payment.operations
    //   .filter(op => op.op_code !== "ok")
    //   .forEach((op, i) => {
    //     console.log(i, op.op_code)
    //   })
  })


//   swp.makePayment({
//     from: "a311d3cf4edc088b87d7fb9c7142ec518eff01c3de1db5e104820713d58e8d97",
//     to: "9efc336fba388a31be37ff897de1267e46b0b7f2b1f9255d5045042a02173a66",
//     asset: "2db474631d2df7d84f463ad02756356ce13480ad9040869f749acea627dab318",
//     amount: 100,
// })
//   .then(data => {
//     data.payment.operations.forEach(op => {
//       console.log(op.amount)
//     })
//   })
//   .catch(({data, error}) => {
//     console.log(error)
//   })












app.get("/orgInfo", (req, res) => {
  swp.getOrganization()
    .then(data => {
      console.log(data.organization)
      res.send(data.organization)
    })
    .catch(({data, error}) => {
      console.log(error)
    })

});















app.post("/submitScore", (req, res) => {

 console.log("body",req.body)

 let toAccount = req.body.toAccount
 let score = req.body.newScore


// console.log("tenta getAccount");
//  swp.getAccount(toAccount)
//    .then(data => {
//      console.log(data.account)
//      console.log("!!!!!!!!!!!!!!!!!!!!!!balance",data.account.balances[0].balance)
//    })
//    .catch(({data, error}) => {
//      console.log(error)
//    })



 resp = []

 // swp.getAccount(toAccount)
 //   .then(data => {
 //     console.log(data.account)
 //     console.log("!!!!!!!!!!!!!!!!!!!!!!balance",data.account.balances[0].balance)
 //     swp.makePayment({ // make function
 //       from: toAccount,
 //       to: "a311d3cf4edc088b87d7fb9c7142ec518eff01c3de1db5e104820713d58e8d97",
 //       asset: "2db474631d2df7d84f463ad02756356ce13480ad9040869f749acea627dab3",
 //       amount: data.account.balances[0].balance,
 //     })
 //       .then(data => {
 //         data.payment.operations.forEach(op => {
 //           console.log(op.amount)
 //         })
 //       })
 //       .catch(({data, error}) => {
 //         console.log(error)
 //
 //         // exibir índice e código de erro dos pagamentos que falharam
 //         data.payment.operations
 //           .filter(op => op.op_code !== "ok")
 //           .forEach((op, i) => {
 //             console.log(i, op.op_code)
 //             //resp.push({i, op.op_code})
 //           })
 //       })
 //
 //   })
 //   .catch(({data, error}) => {
 //     console.log(error)
 //   })


//score save in blockchain and Top is balance
 //getBalance

  swp.makePayment({ // make function
    from: "a311d3cf4edc088b87d7fb9c7142ec518eff01c3de1db5e104820713d58e8d97",
    to: toAccount,
    asset: "2db474631d2df7d84f463ad02756356ce13480ad9040869f749acea627dab318",
    amount: score,
  })
    .then(data => {
      data.payment.operations.forEach(op => {
        console.log(op.amount)
      })
    })
    .catch(({data, error}) => {
      console.log(error)

      // exibir índice e código de erro dos pagamentos que falharam
      data.payment.operations
        .filter(op => op.op_code !== "ok")
        .forEach((op, i) => {
          console.log(i, op.op_code)
          //resp.push({i, op.op_code})
        })
        res.send(resp)
    })


});


app.get("/createAccount", (req, res) => {
  swp.createAccount()
  .then(data => {
    res.send({ hello: data.account.id });
    console.log(data.account.id)
  })
  .catch(({data, error}) => {
    console.log(error)
  })
});








app.get("/getAccounts", (req, res) => {
  let resp = []
  swp.getAllAccounts()
    .then(data => {
      data.forEach(accountReceipt => {
        console.log(accountReceipt.account)
        resp.push(accountReceipt.account)
      })
      res.send(resp)
    })
    .catch(({data, error}) => {
      console.log(error)
      resp.push(error)
      res.send(resp)
    })
});


app.get("/getLeaderboard", (req, res) => {
  let resp = {}
  swp.getAllAccounts()
    .then(data => {
      data.forEach(accountReceipt => {
        console.log(accountReceipt.account.id)
        resp[accountReceipt.account.id] = 0
      })
      res.send(resp) //fazer um bubble sort
    })
    .catch(({data, error}) => {
      console.log(error)
      resp.push(error)
      res.send(resp)
    })





});


app.use('/static', express.static('static'));

app.listen(process.env.PORT || 4000, function() {
  console.log('Example app listening on port 4001!');
});
