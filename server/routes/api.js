const express = require("express");
const bodyParser = require("body-parser");
const Person = require("../models/person");
const Note = require("../models/note");
const User = require("../models/user");
const SuperUser = require("../models/superUser");
const Reason = require("../models/reason");
const passport = require("passport");
const router = express.Router();


// Routes
router.get("/", async (req, res) => {
	await Person.find({}, (err, foundUser) => {
		if (err) {
			console.log("Error while searching for Data -> ", err);
		} else {
			console.log(foundUser);
			res.json(foundUser);
		}
	});
});


/* Quote-Generator */
router.get("/route-to-api:reasons-for-Sarah", async (req, res) => {
	Reason.find({}, (err, foundReasons) => {
		if (err) {
			console.log("Error while searching for Data -> ", err);
		} else {
			res.json(foundReasons);
		}
	});
});


/* VERGISSMEINNICHT Routes */
router.post("/route-to-api:get-magic-key", async (req, res) => {
	const userMagicKey = await req.body.myKey;

	SuperUser.find({ username: "mySecretSuperUserNamee" }, (err, foundUser) => {
		if (err) {
			console.log("Error while searching for Data -> ", err);
		} else {
			if (foundUser[0].magicKey === userMagicKey) {
				res.json({result: "success", message: "Magic Key korrekt"});
			} else {
				res.json({result: "error", message: "Magic Key ist falsch!"});
			}
		}
	});
});

/* REGISTER ROUTE */
router.post("route-to-api:register", async (req, res) => {
	const userToRegister = req.body.username;
		User.register({ username: userToRegister }, req.body.password, (err, user) => {
			 if (err) {
				 res.json({result: "error", message: "Sie sind schon registriert oder der Username ist schon vergeben. Versuchen Sie es mit einem anderen Namen oder gehen Sie zum Login."});
			 } else {
				Note.create({user: userToRegister, title: "Willkommen, "+userToRegister+"!", content: "Hier können Sie all ihre Notizen hinterlegen. Klicken Sie einfach oben auf Notiz erstellen..."}, (err) => {
					if (err) {
						console.log(err);
					}
				});
				res.json({result: "success", message: "Die Registrierung war erfolgreich! Sie können sich nun einloggen."});
			 }
		});	
}); 

router.get("route-to-api:authentication-check", async (req, res) => {
	const userCookie = req.cookies["connect.sid"];
	res.json(userCookie);
});


/* LOGIN ROUTE */
router.post("route-to-api:login", passport.authenticate("local"), (req, res) => {
	req.login(req.user, (err) => {
		if (err) {
			res.json({result: "error" ,message: "Username oder Passwort falsch!"});
		} else {
			res.json({result: "success" ,message: "Ihre Notizen stehen Ihnen nun überall zur Verfügung!", user: req.user.username});
		}
	});
});


router.get("route-to-api:logout", async (req,res) => {
	req.logout();
	res.clearCookie('connect.sid', {path: '/'});
	res.json({result: "success", message: "Sie haben sich erfolgreich ausgeloggt!"});
});


router.post("route-to-api:delete-Account", async (req,res) => {
	const userToDelete = req.body.username;
	console.log("delete request from: ", userToDelete);
	try {
		User.deleteOne({ username : userToDelete}, (err, deletedUser) => {
			if (err) {
				console.log("ERROR while deleting User in DB -> ", err);
				res.json({result: "error", message: "Es gab ein Problem beim Löschen Ihres Accounts.", error: err});
			} else {
				Note.deleteMany({user : userToDelete}, (err) =>{
					if (err) {
						console.log("Error while DELETING deletedUserNotes ", err);
					} else {
						console.log("deletedUserNotes SUCCESSFULLY deleted!");
					}
				});
				console.log("User successfully deleted!"); 
				res.json({result: "success", message: "Ihr Account wurde erfolgreich gelöscht!"});
			}
		});
	} catch (err) {
		console.log("ERROR while POST_deleting User -> ", err);
	}
	
})

/* GET NOTES FROM DATABASE */
router.post("/route-to-api:get-user-notes", async (req, res) => {
	Note.find({user: req.body.username}, (err, foundNotes) => {
		if (err) {
			console.log("ERROR while searching for NOTES -> ", err)
		} else {
			res.json({foundNotes});
		}
	}); 
});


router.post("/route-to-api:add-user-notes", async (req, res) => {
	try {
		const newNote = req.body;
		Note.create({user: newNote.user, title: newNote.title, content: newNote.content}, (err, savedNote) => {
			if (err) {
				console.log(err);
			} else {
				res.json(savedNote);
			}
		});
	} catch (err) {
		console.log("Add Note ERROR: ",err);
	}
});


router.post("/route-to-api:edit-user-notes", async (req, res) => {
	try {
		const updatedNoteID = req.body._id;
		console.log(req.body.title);
		Note.updateOne({ _id: updatedNoteID }, { title: req.body.title, content: req.body.content }, (err, updatedNote) => {
			if (err) {
				console.log(err);
			} else {
				console.log(updatedNote);
			}
		});
	} catch (err) {
		console.log("Update Note ERROR: ",err);
	}
});


router.post("/route-to-api:delete-user-notes", async (req, res) => {
	try {
		const deletedNoteID = req.body._id;
		Note.deleteOne({_id: deletedNoteID}, (err, deletedNote) => {
			if (err) {
				console.log(err);
			} else {
				console.log("DELETED NOTE RES: ", deletedNote);
				res.json(deletedNote);
			}
		});
	} catch (err) {
		console.log("Add Note ERROR: ",err);
	}
});


module.exports = router;
