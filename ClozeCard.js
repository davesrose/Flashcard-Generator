var inquirer = require("inquirer");
var fs = require("fs");

var cardData = require("./clozeCards.json"); //require clozeCards.json file

function ClozeCard(fullText, answer) {
	var clozePositions = clozeDelete(fullText, answer); //variable calling clozeDelete with the full text side and answer side of card

	this.partial = getPartial(fullText, clozePositions); //partial text from taking full text and answer arguments

	this.answer = answer; //answer text

	function clozeDelete(fullText, answer) { 
		var start = fullText.indexOf(answer); //take full text and find area of string that contains the answer
		if(start !== -1) {
			return [start, start+answer.length]; //find location of answer and then also record answer length
		}
		throw new Error("Could not find answer in fullText"); //report error that answer wasn't in full text
	} //end clozeDelete

	function getPartial(fullText, clozePositions) {
		var start = fullText.slice(0, clozePositions[0]); //create start slice that goes from the first letter to the start of answer
		var end = fullText.slice(clozePositions[1], fullText.length); //create end slice that goes from end of answer to end of full text
		return start+" .... "+end; //return the start text, replaced " ... ", and end text
	} // end getPartial
} // end ClozeCard

ClozeCard.prototype.displayCard = function displayCard() { //create prototype for displaying answer
	console.log(this.partial.replace(" .... ", this.answer)); //replace " .... " with answer
} // end ClozeCard prototype

function createNewClozeCard() { //createNewClozeCard method
	inquirer.prompt([{
		type: "input",
		name: "fullText",
		message: "What is the the full text of the flashcard you want to make?" //use inquirer prompt to ask for the full text
	},{
		type: "input",
		name: "answer",
		message: "What is the answer to the flashcard" //use inquirer prompt to ask for answer
	}]).then(function(inputs) {
		var card = new ClozeCard(inputs.fullText,inputs.answer);  //new instance with full text and answer
		card.displayCard(); //displayCard from prototype
		console.log(card); //disply new instance
		cardData.push(card); //push instance to cardData object
		var newCardData = JSON.stringify(cardData, null, "\t"); //format cardData
		fs.writeFile("./clozeCards.json", newCardData, function(error) { //write formatted instance to clozeCards.json
			if(error)throw error; //if error, throw error
			console.log("Done"); //else display "Done"
		})
	})
}

module.exports = createNewClozeCard; //export createNewClozeCard