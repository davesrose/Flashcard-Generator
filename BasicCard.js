var inquirer = require("inquirer"); //require inquirer npm module
var fs = require("fs"); //require fs to write to BasicCards.json

var cardData = require("./basicCards.json"); //require clozeCards.json file

var BasicCard = function(frontSide, backSide) { //create BasicCard constructor with front and back
	this.front = frontSide;
	this.back = backSide;
} //end BasicCard constructor

function createNewCard() { //a create card function
	inquirer.prompt([{
		type:"input",
		name: "frontSide",
		message:"What is the question you want to ask?" //the front side asks the question
	},{
		type:"input",
		name: "backSide",
		message: "What is the answer to the above question?" //the back side asks the answer
	}]).then(function(inputs) {
		var card = new BasicCard(inputs.frontSide, inputs.backSide); //new BasicCard instance
		cardData.push(card); //push instance to array

		var newCardData = JSON.stringify(cardData, null, "\t"); //format flash card to JSON
		fs.writeFile("./BasicCards.json", newCardData, function(error) { //write new instance data to JSON
			if(error)throw error; //if error, throw
			console.log("Done"); //else report "Done"
		}) //end fs writeFile

	}) //end inquirer prompt
} //end createNewCard

// createNewCard();

module.exports = createNewCard; //export createNewCard for use with flashCard.js