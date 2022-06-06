/// <reference types="cypress" />

describe('Website test', () => {

    it('should visit website', () => {
        cy.visit('https://calculation-game-77777.web.app/')
    })

    describe('check for `enter value` message', () => {
        it('should click input', () => {
            cy.get("[data-cy=input]").focus()
                .should('have.class', 'ng-invalid');

        });
        it('input should keep class touched if clicked away', () => {
            cy.get('body').click(0, 0, { multiple: true }); //click away

            cy.get("[data-cy=input]")
                .should('have.class', 'ng-invalid')
                .should('have.class', 'ng-touched')

        });
        it('should display `enter value` if empty and clicked away', () => {
            cy.get("[data-cy=errorMessage]").should('be.visible')
        });
    })

    describe('submitting correct result', () => {

        it('should get numbers from equation',()=>{
            cy.saveEquationValues()
        })

        it('should input correct result', () => {

            cy.readFile('../fixtures/numbers.json').then(number=>{
                cy.get("[data-cy=input]")
                .type(number.correctResult)
                .invoke('val')
                .then(value => expect(Number(value)).to.equal(number.correctResult));
            })
            
        });

        it('should submit', () => {
                cy.get("[data-cy=input]")
                .type('{enter}')     
        });
        
        describe('after correct answer is submited',()=>{

            it('should show check mark next to input',()=>{
                cy.get("[data-cy=resultGreenCheck]").should('be.visible')
            })

            it('should not let you submit answer for 1 seconds',()=>{
                cy.get("[data-cy=input]")
                .clear()
                .type(100)
                .type('{enter}')
                .invoke('val')
                .then(value => expect(value).to.equal('100'));
                
            })

            it('should clear input after 1s',()=>{
                cy.wait(1000)
                cy.get("[data-cy=input]")
                .invoke('val')
                .then(value => expect(value).to.equal(''));
            })
            
            it('should remove check mark next to input',()=>{
                cy.get("[data-cy=resultGreenCheck]").should('not.exist')
            })
        });
        
        describe('should add equation to historyList',()=>{

            it('added equation to historyList',()=>{
                cy.get("[data-cy=item0]").should('be.visible');
            })
    
            it('equation should have check mark',()=>{
                cy.get("[data-cy=itemCheck0]").should('be.visible');
            })
        })
       
    })

    describe('submitting incorrect result', () => {

        it('should get numbers from equation',()=>{
            cy.saveEquationValues()
        })

        it('should input incorrect result', () => {

            cy.readFile('../fixtures/numbers.json').then(number=>{
                cy.get("[data-cy=input]")
                .type(number.incorrectResult)
                .invoke('val')
                .then(value => expect(Number(value)).to.equal(number.incorrectResult));
            })
            
        });

        it('should submit', () => {
                cy.get("[data-cy=input]")
                .type('{enter}')     
        });

        it('should show X next to input',()=>{
            cy.get("[data-cy=resultRedX]").should('be.visible')
        })

        it('should clear input',()=>{
            cy.get("[data-cy=input]")
            .invoke('val')
            .then(value => expect(value).to.equal(''));
        })
        
        describe('should add equation to historyList',()=>{

            it('added equation to historyList',()=>{
                cy.get("[data-cy=item1]").should('be.visible');
            })
    
            it('equation should have X',()=>{
                cy.get("[data-cy=itemX1]").should('be.visible');
            })

            
        })

        it('should remove X next to input if it is clicked',()=>{
            cy.get("[data-cy=input]").click();
            cy.get("[data-cy=resultRedX]").should('not.exist')
        })
       
    })

})