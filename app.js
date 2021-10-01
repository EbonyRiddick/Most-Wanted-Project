"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// * app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNoValidation).toLowerCase();
  let attributeArray = ['gender', 'eye color', 'height', 'weight', 'occupation']
  let searchResults = people;
  let contSearch = true;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(searchResults);
      break;
    case 'no':
      // TODO: search by traits searchResults = searchByEyeColor(people)
      while (contSearch) {
        searchType = promptFor("Do you want to search by 'gender', 'eye color', 'occupation','Height', or 'Weight? Type quit to retrieve results.", searchTypeValidation).toLowerCase();
        switch (searchType) {
          case 'gender':
            searchResults = searchByGender(searchResults);
            break;
          case 'eye color':
            searchResults = searchByEyeColor(searchResults);
            break;
          case 'occupation':
            searchResults = searchByOccupation(searchResults);
            break;
          case 'height':
            searchResults = searchByHeight(searchResults);
            break;
          case 'weight':
            searchResults = searchByWeight(searchResults);
            break;
          default:
            contSearch = !contSearch;
            break;
        }
      }
      break;
    default:
      app(people); // restart app
      break;
  }
  if (searchResults.length > 1) {
    displayPeople(searchResults);
  }
  else {
    mainMenu(searchResults[0], people);
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      displayPerson(person)
      break;
    case "family":
      // TODO: get person's family
      displayFamily(person, people)
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson

}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
//TODO: add other trait filter functions here.

function searchByEyeColor(people) {
  let eyeColor = promptFor("What color are their eyes?", eyeColorValidation);

  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByGender(people) {
  let gender = promptFor("What gender is the person your looking for?", genderValidation);

  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByOccupation(people) {
  let occupation = promptFor("What is the occupation of the person your looking for?", occupationValidation);

  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByHeight(people) {
  let height = prompt("How tall is the person you are looking for? Please enter number for inches");

  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.height === parseInt(height)) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByWeight(people) {
  let weight = prompt("How much does the person you are looking for weigh? Please enter number for lbs");

  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.weight === parseInt(weight)) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}


function getMemberRecord(id, people) {
  // access data 
  // let memberData = "ID: " + person.id + "\n";
  let foundPeople = people.filter(function (potentialMatch) {
    if (potentialMatch.id === id) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople[0];
  // return member data
}
// put displayPerson in getMemberRecord

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function displayFamily(person, people) {
  let parents = []
  for (let i = 0; i < person.parents.length; i++) {
    let parent = getMemberRecord(person.parents[i], people)
    parents.push(parent)
  }
  // let rtvSpouse = getMemberRecord(person.currentSpouse)
  let personInfo = "Parents: \n";
  for (let i = 0; i < parents.length; i++) {
    personInfo += `${parents[i].firstName} ${parents[i].lastName} \n`
  }
  // TODO: get family members record 
  // let rtvSpouse = getMemberRecord(person.currentSpouse)
  // Loop  to display all members (spouse, parents, siblings)
  personInfo += "Current Spouse: " + person.currentSpouse + "\n"
  // alert(rtvSpouse)
  alert(personInfo);
}
//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  do {
    var response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNoValidation(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  }
  else {
    return false;
  }
}

function genderValidation(input) {
  if (input.toLowerCase() == "male" || input.toLowerCase() == "female") {
    return true;
  }
  else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(_input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function eyeColorValidation(input) {
  if (input.toLowerCase() == "brown" || input.toLowerCase() == "black" || input.toLowerCase() == "blue" || input.toLowerCase() == "hazel" || input.toLowerCase() == "green") {
    return true;
  }
  else {
    return false;
  }
}

function searchTypeValidation(input) {
  if (input.toLowerCase() == "height" || input.toLowerCase() == "gender" || input.toLowerCase() == "eye color" || input.toLowerCase() == "occupation" || input.toLowerCase() == "weight" || input.toLowerCase() == "quit") {
    return true;
  }
  else {
    return false;
  }
}

// function heightValidation(input){
//   if(input.tolowerCase() == parseInt("")){
//     return true;
//   }
//   else{
//     return false;
//   }
// }

function occupationValidation(input) {
  if (input.toLowerCase() == "programmer" || input.toLowerCase() == "assistant" || input.toLowerCase() == "landscaper" || input.toLowerCase() == "nurse" || input.toLowerCase() == "student" || input.toLowerCase() == "architect" || input.toLowerCase() == "doctor" || input.toLowerCase() == "politician") {
    return true;
  }
  else {
    return false;
  }
}
//#endregion