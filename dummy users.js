const mongoose = require("mongoose");
const User = require(__dirname + "/models/user");

mongoose.connect("mongodb://localhost:27017/BasicBankingSystem");

const dummyUsers = [
	{
        name: "Aryan",
        email: "singharyan@gmail.com",
        amount: 100000,
        phone: 7409123244,
      },
      {
        name: "Chandan",
        email: "chandangupta@gmail.com",
        amount: 200000,
        phone: 9992274535,
      },
      {
        name: "Mankaran",
        email: "mankaransr@gmail.com",
        amount: 90000000,
        phone: 9094227453,
      },
      {
        name: "Manish",
       email: "maniss@gmail.com",
        amount: 90000,
        phone: 737422543,
      },
      {
        name: "Akshay",
        email: "akshay2402@gmail.com",
        amount: 70000,
        phone: 90945252523,
      },
      {
        name: "Aniket",
        email: "amananiketnanda@gmail.com",
        amount: 40000,
        phone: 990840928,
      },
      {
        name: "Harsh",
        email: "harsh@gmail.com",
        amount: 43300,
        phone: 4818415531,
      },
      {
        name: "Rupali",
        email: "ru@gmail.com",
        amount: 95400,
        phone: 8057255252,
      },
      {
        name: "Abhishek",
       email: "abhishake@gmail.com",
        amount: 696969,
        phone: 7394693634,
      },
      {
        name: "Anmol",
        email: "anmolratna@gmail.com",
        amount: 50000,
        phone: 4781749522,
      },
];

User.insertMany(dummyUsers, function (err, res) {
	if (err) {
		console.log(err);
	} else {
		console.log(res);
	}
});
