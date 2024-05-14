Cypress.Commands.add('createTask', (taskName = '')=> {
    cy.visit('http://localhost:3000/')

    if (taskName !== '') {
        cy.get('input[placeholder="Add a new Task"]')
        .type(taskName)
    }
    
    cy.contains('button', 'Create').click()
    
})

Cypress.Commands.add('removeTaskByName', (taskName)=> {
    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.eql(204)
    })

})

Cypress.Commands.add('postTask', (task)=> {
    cy.request({
        url: 'http://localhost:3333/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eql(201)
    })

})