// <reference types= cypress />

describe('Validação da aplicação MarkL, criação de tarefas', () => {

    it('deve cadastrar uma nova tarefa', () => {

        const taskName = 'Ler um livro de Js'

        cy.removeTaskByName(taskName)
        cy.createTask(taskName)

        cy.get('main div p')
            .should('be.visible')
            .should('have.text', taskName)

        cy.contains('main div p', taskName)

    })

    it('não deve permitir tarefas duplicadas', () => {

        const task = {
            name: 'Ler um livro de Js',
            is_done: false
        }
        
        cy.removeTaskByName(task.name)
        cy.postTask(task)
        cy.createTask(task.name)

        cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!')
    })

    it('campo obrigatorio', ()=> {
        cy.createTask()
        cy.get('input[placeholder="Add a new Task"]')
            .invoke('prop', 'validationMessage')
            .should((text) => {
                expect(
                    'Thi is a required field'
                )
            })
    })

})