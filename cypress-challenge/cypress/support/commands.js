// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('saveEquationValues', function(){


        var correctResult = 0;

        cy.get('[data-cy=firstNum]').then((el) => {

            const firstNum = el.text();
            correctResult += Number(firstNum);

            cy.log(correctResult);
        })
        cy.get('[data-cy=secondNum]').then((el) => {
            const secondNum = el.text();
            correctResult += Number(secondNum);
            const incorrectResult= correctResult +1;

            cy.writeFile('../fixtures/numbers.json',{correctResult: correctResult,incorrectResult: incorrectResult})

            cy.log(correctResult);
        })

  
  });