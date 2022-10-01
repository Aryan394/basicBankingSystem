const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const User = require(__dirname + "/models/user");
const History = require(__dirname + "/models/transaction");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/BasicBankingSystem");

var today = new Date();
var options = {
	weekday: "long",
	day: "numeric",
	month: "long",
};

let day = today.toLocaleDateString("en-us", options);

let hSName = [];
let hSEmail = [];
let hRName = [];
let hREmail = [];
let hAmount = [];
let historyLength = 0;

app.get("/createuser", function (req, res) {
	res.render("newuser.ejs", { kindOfDay: day, success: "" });
});
app.get("/transfermoney", function (req, res) {
	res.render("transfermoney", { kindOfDay: day, message: "" });
});
app.get("/viewcustomer", function (req, res) {
	User.find({}, function (err, users) {
		if (err) {
			console.log(err);
		} else {
			res.render("customerlist", { kindOfDay: day, user: users, c: 0 });
		}
	});
});

app.get("/transactionhistory", function (req, res) {
	res.render("history", {
		kindOfDay: day,
		t: [],
		m: "",
		flag: 1,
		sendersName: hSName,
		sendersEmail: hSEmail,
		recieversName: hRName,
		recieversEmail: hREmail,
		Amt: hAmount,
		l: historyLength,
	});
});
app.get("/", function (req, res) {
	res.render("home", { kindOfDay: day });
});
app.post("/viewcustomer", function (req, res) {
	User.find({}, function (err, users) {
		if (err) {
			console.log(err);
		} else {
			res.render("customerlist", { kindOfDay: day, user: users, c: 0 });
		}
	});
});
app.post("/createuser", function (req, res) {
	res.render("newuser", { kindOfDay: day, success: "" });
});
app.post("/updateform", function (req, res) {
	const temp = [
		{
			name: req.body.newuser[0],
			mnumber: req.body.newuser[2],
			email: req.body.newuser[1],
			credits: req.body.newuser[3],
		},
	];
	User.insertMany(temp, function (err, res) {
		if (err) {
			console.log(err);
		}
	});
	res.render("newuser", {
		kindOfDay: day,
		success: "user registered successfully!",
	});
});
app.post("/transfermoney", function (req, res) {
	res.render("transfermoney", { kindOfDay: day, message: "" });
});

app.post("/sendmoney", function (req, res) {
	const sendername = req.body.sendername;
	const senderemail = req.body.senderemail;
	const receivername = req.body.receivername;
	const receiveremail = req.body.receiveremail;
	const amount = parseInt(req.body.money);
	hSName.push(sendername);
	hSEmail.push(senderemail);
	hRName.push(receivername);
	hREmail.push(receiveremail);
	hAmount.push(amount);
	historyLength++;
	// console.log(hSName,hSEmail,hREmail,hAmount);
	User.find({ name: sendername, email: senderemail }, function (err, resp) {
		if (err) {
			console.log(err);
		} else if (resp[0] == undefined) {
			// console.log(resp);
			res.render("transfermoney", {
				kindOfDay: day,
				message: "user does not exist!.Please enter valid details.",
			});
		} else {
			var check = parseInt(resp[0].credits);
			User.find(
				{ name: receivername, email: receiveremail },
				function (err, r) {
					if (err) {
						console.log(err);
					} else if (r[0] == undefined) {
						// console.log(2);
						res.render("transfermoney", {
							kindOfDay: day,
							message: "user does not exist!.Please enter valid details.",
						});
					} else if (check < amount) {
						res.render("transfermoney", {
							kindOfDay: day,
							message: "Sorry! Insufficient Balance",
						});
					} else {
						// console.log(r);
						// console.log(resp);
						var updatedamt1 = parseInt(resp[0].credits) - amount;
						User.findByIdAndUpdate(
							{ _id: resp[0]._id },
							{ credits: updatedamt1 },
							function (err, result) {
								if (err) {
									// console.log(3);
									res.render("transfermoney", {
										kindOfDay: day,
										message: "user does not exist!.Please enter valid details.",
									});
								}
							}
						);
						var updatedamt2 = parseInt(r[0].credits) + amount;
						User.findByIdAndUpdate(
							{ _id: r[0]._id },
							{ credits: updatedamt2 },
							function (err, result) {
								if (err) {
									res.render("transfermoney", {
										kindOfDay: day,
										message: "user does not exist!.Please enter valid details",
									});
								} else {
									console.log("updated");
								}
							}
						);
						res.render("transfermoney", {
							kindOfDay: day,
							message: "Congratulations! Transaction Successful",
						});
						let date = new Date();
						const currdate = date.toLocaleDateString("en-GB");
						const currtime = date.toLocaleTimeString("en-US");
						const th1 = new History({
							fromname: sendername,
							fromemail: senderemail,
							toname: receivername,
							toemail: receiveremail,
							details: [
								{
									from: sendername,
									to: receivername,
									amount: amount,
									date: currdate,
									time: currtime,
								},
							],
						});
						th1.save();
					}
				}
			);
		}
	});
});

app.post("/showcustomer", function (req, res) {
	customer_id = req.body.view;
	User.findById(customer_id, function (err, resp) {
		if (err) {
			console.log(err);
		} else {
			res.render("customerdetails", {
				kindOfDay: day,
				name: resp.name,
				mn: resp.mnumber,
				email: resp.email,
				b: resp.credits,
			});
		}
	});
});
app.listen(3000, function (req, res) {
	console.log("server running on port 3000");
});
