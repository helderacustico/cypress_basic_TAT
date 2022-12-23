Cypress.Commands.add('fillMandatoryFieldsAndSumbmit', function() {
    
    cy.get('#firstName').type('Helder')
    cy.get('#lastName').type('Lima Soares')
    cy.get('#email').type('helder@teste.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})