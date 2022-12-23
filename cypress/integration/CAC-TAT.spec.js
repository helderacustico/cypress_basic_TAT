/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        const longText = 'Teste de descrição, Teste de descrição, Teste de descrição, Teste de descrição, Teste de descrição, Teste de descrição, Teste de descrição, Teste de descrição'

        cy.get('#firstName').type('Helder')
        cy.get('#lastName').type('Lima Soares')
        cy.get('#email').type('helder@teste.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {
        
        cy.get('#firstName').type('Helder')
        cy.get('#lastName').type('Lima Soares')
        cy.get('#email').type('helder@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function(){

        cy.get('#firstName').type('Helder')
        cy.get('#lastName').type('Lima Soares')
        cy.get('#email').type('helder@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('#firstName')
            .type('Helder')
            .should('have.value', 'Helder')
            .clear()
            .should('have.value', '')
        
        cy.get('#lastName')
            .type('Lima Soares')
            .should('have.value', 'Lima Soares')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('helder@teste.com')
            .should('have.value', 'helder@teste.com')
            .clear()
            .should('have.value', '')
        
        cy.get('#open-text-area')
            .type('77991364331')
            .should('have.value', '77991364331')
            .clear()
            .should('have.value', '')


    })

    it('exibe mensagem de erro ao submeter o furmulário sem preencher os campos obrigatórios', function() {
        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSumbmit()

        cy.get('.success').should('be.visible')
    })    

})