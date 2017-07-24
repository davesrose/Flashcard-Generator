var BasicCard = require("./BasicCard.js"); //require BasicCard.js (and use its constructors)
var ClozeCard = require("./ClozeCard.js"); //require ClozeCard.js (and use its constructors)

var inquirer = require("inquirer"); //require inquirer
var fs = require("fs"); //require fs

var action = process.argv[2]; //create action variable for 3rd argument

function CreateCard() { //function for creating a flash card
	inquirer.prompt([{
		type: "list",
		name: "cardType",
		message: "What type of Flashcard do you want to make (basic or cloze)?",
		choices: ["Basic", "Cloze"] //inquirer prompt with option for creating basic or cloze card
	}]).then(function(inputs) {
		if (inputs.cardType === "Basic") { //if option is Basic
			BasicCard(); //run BasicCard method (from BasicCard.js)
		} else {
			ClozeCard(); //else run ClozeCard method (from ClozeCard.js)
		}
	})	
}

var cardBasicData = require("./basicCards.json"); //require basicCards.json to read basic flash cards

var cardClozeData = require("./clozeCards.json"); //require clozeCards.json to read cloze flash cards

function logCard() { //function for reading each flash card log
	inquirer.prompt([{
		type: "list",
		name: "cardType",
		message: "What type of Flashcard file do you want to read (basic or cloze)?",
		choices: ["Basic", "Cloze"] //select which card type to display
	}]).then(function(inputs) {
		if (inputs.cardType === "Basic") {
			console.log(cardBasicData); //display basic card log
		} else {
			console.log(cardClozeData); //display cloze card log
		}
	})
}

var basicLength = cardBasicData.length; //create variable for the basic card JSON entry lengths
var clozeLength = cardClozeData.length; //create variable for the cloze card JSON entry lengths

var basicQuestArr = []; //create a basic card question array
var basicAnsArr = []; //create a basic card answer array

for (var i = 0; i < basicLength; i++) { //create a basic card loop
	basicQuestArr.push(cardBasicData[i].front); //push front questions from JSON file into question array
	basicAnsArr.push(cardBasicData[i].back); //push back answers from JSON file into answer array
}
basicQuestArr.push("Exit"); //push the Exit option to be the last in the question array: so user can chose to exit program

var clozeQuestArr = []; //create a cloze card question array
var clozeAnsArr = [];  //create a cloze card answer array

for (var i = 0; i < clozeLength; i++) { //create a cloze card loop
	clozeQuestArr.push(cardClozeData[i].partial); //push front partial objects from JSON file into cloze question array
	clozeAnsArr.push(cardClozeData[i].answer); //push back answers from JSON file into answer array
}
clozeQuestArr.push("Exit"); //push the Exit option to be the last in the question array: so user can chose to exit program

function useCard() { //use card method for user to use flash cards
	inquirer.prompt([{
		type: "list",
		name: "cardType",
		message: "What type of Flashcard file do you want to use (basic or cloze)?",
		choices: ["Basic", "Cloze", "Exit"] //inquirer prompt with basic or cloze card type or exit
	}]).then(function(inputs) {
		if (inputs.cardType === "Basic") { //if Basic is input
			function basic() { //create basic function
				inquirer.prompt([{
					type: "list",
					name: "choseQuestion",
					message: "Pick the question to answer",
					choices: basicQuestArr	//choices are generated from basicQuestArr array		
				}]).then(function(answers) { //pass answers as argument
					if (answers.choseQuestion!=="Exit") { //if Exit isn't selected
						for (var z = 0; z < basicLength; z++) { //run loop for matching question selected with what's in array
							if (answers.choseQuestion === cardBasicData[z].front) { //if the selected question is equal to the card's front question
								console.log(cardBasicData[z].back); //display the back answer
								basic(); //then go back to basic function					
							} //end if statement
						}// end for loop
					} else { //else Exit was selected and return
						return;
					} 
				}) //end inquirer
			} //end basic function
			basic(); //run basic function when basic card type is selected
		} else if (inputs.cardType === "Cloze") { //else if Cloze is selected for card type
			function cloze() { //create cloze function
				inquirer.prompt([{
					type: "list",
					name: "choseQuestion",
					message: "Pick the statement to fill",
					choices: clozeQuestArr	//choices are generated from clozeQuestArr array			
				}]).then(function(answers) { //pass answers as argument
					if (answers.choseQuestion!=="Exit") { //if Exit isn't selected
						for (var z = 0; z < clozeLength; z++) { //run loop for matching question selected with what's in array
							if (answers.choseQuestion === cardClozeData[z].partial) { //if selected partial statement is equal to the card's front partial statement
								console.log(cardClozeData[z].answer); //display the card's answer
								cloze(); //rerun cloze function
							} //end if statement
						} //end for loop
					} else { //else Exit was selected and return
						return;
					}
				}) //end inquirer
			} //end cloze function
			cloze(); //run cloze function when Cloze is selected
		} else { //else Exit chosen and return
			return;
		}
	})	//end inquirer function for chosing card type
} //end use card function

if (action === "new") { //if action argument is new
	CreateCard(); //run CreateCard
} else if (action === "read") { //if action is read
	logCard(); //run logCard
} else if (action === "use") { //if action is use
	useCard(); //run useCard
} else { //else display valid options
	console.log("please use new, read, or use arguments")
}