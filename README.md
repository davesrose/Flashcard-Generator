To follow the basic instructions for the homework, I've created a clozecard.js file with constructor as well as a basic one.  They will export either a createBasicCard or createClozeCard.  Within the create constructor, new flash cards get written to json files.  I thought all the user interaction can be done with a flashCard.js (which requires createNewClozeCard, createNewCard, basicCards.json, and clozeCards.json).

The user types node flashCard.js <"new", "read", "use"> and recieves nessary prompts.  The new argument lets the user create a new basic or cloze card.  The read argument lets the user view the whole basic or cloze json data.  Or the use argument allows the user to chose which flash card question they want answered.