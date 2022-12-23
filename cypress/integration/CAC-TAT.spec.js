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
        cy.get('#phone-checkbox').check()
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

    it('seleciona um produto (youtube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (mentoria) pelo seu valor', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (blog) pelo seu indice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
         
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
                     
    })

    it('seleciona o arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        
        cy.fixture('example.json').as('sampleFile')

        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })


    })

    it('verifica que a politica de privacidade abre outra abasem a necessidade de um clique', function() {

        cy.get('#privacy a').should('have.attr','target', '_blank')

    })

    it('acessa a pagina de politica de privacidade removendo o target e então clicando no link', function() {
        
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    

    })

    

})