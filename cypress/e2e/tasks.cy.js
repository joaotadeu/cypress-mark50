/// <reference types= "cypress" />

describe('Gestão de Tarefas', () => {

    let testData;

    before(()=> {
        cy.fixture('tasks').then(t =>{
            testData = t
        })
    })

    context('Cadastro de tarefas', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler um livro de Js'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            cy.get('main div p')
                .should('be.visible')
                .contains(taskName);
    
            cy.contains('main div p', taskName)
    
        })
    
        it('não deve permitir tarefas duplicadas', () => {
    
            const task = testData.dup
            
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
    
            cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
        })
    
        it('campo obrigatorio', ()=> {
            cy.createTask()
            cy.isRequired('This is a required field')
        })

    })

    context('Atualização de tarefas', () => {
        it('deve concluir uma tarefa', () => {
            const task = {
            name: 'Pagar contas de consumo', 
            is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })

    })

    context('Exclusão de tarefas', () => {
        it('deve excluir tarefa', () => {
            const task = {
            name: 'Estudar cypress', 
            is_done: false
        }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })

    })

})