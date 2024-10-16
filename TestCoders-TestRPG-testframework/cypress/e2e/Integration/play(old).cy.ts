import 'cypress-plugin-multiple-click';

describe("Play the game", () => {
    beforeEach(() => {
        cy.visit("/play")
    })

    //Deze file is optioneel. Hierin laat ik zien hoe mijn werkwijze was om tot de oplossing te komen die ik bedacht heb.

    it("should have a valid character name", () => {
        cy.fixture("character-data.json").then((charData) => {
            charData.names.forEach((character) => {
                cy.get('[name="name"]').type(character.name)
                cy.get('.inline-flex').contains("Start!").click();
                if (character.name === "Chaotic Dominatrix") {
                    cy.get('.text-2xl').contains("Adventure time");
                    cy.reload();
                } else {
                    cy.get('[class="text-sm font-medium text-destructive"]').invoke("text").should("be.oneOf",[
                        "Name must be at least 3 characters",
                        "Name cannot be longer than 20 characters"])
                    cy.reload();
                }

            })
        })
    })
    it("should be able to create a char with each role", () => {
        cy.fixture("character-data.json").then((charData) => {
            charData.roles.forEach((character) => {
                cy.get('[name="name"]').type(character.name)
                cy.get('[role="combobox"]').click();
                cy.get("select").select(character.role, {force: true})
                cy.get('.inline-flex').contains("Start!").click();
                cy.get('.text-2xl').contains("Adventure time");
                cy.reload();
            })
        })
    })
    it("should be able to win the game", () => {
        cy.get('[name="name"]').type("name")
        cy.get('.inline-flex').contains("Start!").click();
        cy.get("button").contains("Click me").clicks(5);
        cy.get('input[type=file]').selectFile({
            contents: Cypress.Buffer.from('file contents'),
            fileName: 'file.txt',
            lastModified: Date.now(),
        })
        cy.get('input').eq(1).type("Lorem Ipsum");

        /* cy.get('[role="slider"]').click()
             .invoke("attr", "style", "left: calc(100%-10px)").trigger("input").trigger('change').click({ force: true })
             .invoke("attr", "aria-valuenow", "100").trigger("input").trigger('change').click({ force: true })
         cy.get('[role="slider"]').should("have.attr", "aria-valuenow", "100").should("have.attr", "style", "left: calc(100%-10px)") */

        // lijkt alsof de wijzigingen wel plaatsvinden in de DOM maar niet zichtbaar zijn op de pagina, zie bugmelding https://github.com/cypress-io/cypress/discussions/9203

        cy.get('[role="slider"]').click().type("{rightarrow}".repeat(100));
    })
})