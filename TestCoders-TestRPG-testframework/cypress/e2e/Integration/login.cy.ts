describe("Login and Logout", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should try to log in with all users", () => {
    cy.fixture("login-data.json").then((loginData) => {
      loginData.users.forEach((user) => {
        cy.get('[data-testid="login-button"]').click()
        cy.get('[name="email"]').type(user.email)
        cy.get('[name="password"]').type("{backspace}" + user.password)
        //cy.get('[name="password"]').invoke('attr', 'value', user.password) // voordat je begint met typen is attribuut value niet zichtbaar
        cy.get('[type="submit"]').click()
        if (user.email === "awesometester@testcoders.com") { // de warning die verschijnt kan ik niet terugvinden in de HTML, daarom zo gedaan
          cy.get('[data-testid="logout-button"]').should('be.visible').click()

        } else {
          cy.get('[data-testid="logout-button"]').should('not.exist')
          cy.reload()
        }
      })
    })
  })
})