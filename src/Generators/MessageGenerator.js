import { getRandomInt } from '../utils';

export default class {
  getFirstNameSyllables() {
    const firstNameSyllables = [];
    firstNameSyllables.push('mon');
    firstNameSyllables.push('fay');
    firstNameSyllables.push('shi');
    firstNameSyllables.push('zag');
    firstNameSyllables.push('blarg');
    firstNameSyllables.push('rash');
    firstNameSyllables.push('izen');
    return firstNameSyllables;
  }
  getLastNameSyllables() {
    const lastNameSyllables = [];
    lastNameSyllables.push('malo');
    lastNameSyllables.push('zak');
    lastNameSyllables.push('abo');
    lastNameSyllables.push('wonk');
    return lastNameSyllables;
  }

  generateRandomName() {
    const firstNameSyllables = this.getFirstNameSyllables();
    // Creates a first name with 2-3 syllables
    let firstName = '';
    const numberOfSyllablesInFirstName = getRandomInt(2, 4);
    for (let i = 0; i < numberOfSyllablesInFirstName; i += 1) {
      firstName = `${firstName}${firstNameSyllables[getRandomInt(0, firstNameSyllables.length - 1)]}`;
    }
    let firstNameLetter = '';
    firstNameLetter = firstName.charAt(0);
    firstName = firstName.substring(1);
    firstNameLetter = firstNameLetter.toUpperCase();
    firstName = `${firstNameLetter}${firstName}`;

    const lastNameSyllables = this.getLastNameSyllables();

    let lastName = '';
    const numberOfSyllablesInLastName = getRandomInt(2, 3);
    for (let i = 0; i < numberOfSyllablesInLastName; i += 1) {
      lastName = `${lastName}${lastNameSyllables[getRandomInt(0, lastNameSyllables.length - 1)]}`;
    }
    let lastNameLetter = '';
    lastNameLetter = lastName.charAt(0);
    lastName = lastName.substring(1);
    lastNameLetter = lastNameLetter.toUpperCase();
    lastName = `${lastNameLetter}${lastName}`;

    return `${firstName} ${lastName}`;
  }
}
