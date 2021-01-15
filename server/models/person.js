const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const PersonSchema = new Schema({
	name: String,
	gender: String,
	age: Number,
	language: String,
});

// Model
const Person = mongoose.model("person", PersonSchema, "persons");

module.exports = Person;