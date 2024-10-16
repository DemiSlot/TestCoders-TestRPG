import 'cypress-plugin-multiple-click';

describe("Playthrough", () => {
    beforeEach(() => {
        cy.visit("/play")
    })
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
    it("should be able to play and win with each role", () => {
        //create a character:
        cy.fixture("character-data.json").then((charData) => {
            charData.roles.forEach((character) => {
                cy.get('[name="name"]').type(character.name)
                cy.get('[role="combobox"]').click();
                cy.get("select").select(character.role, {force: true})
                cy.get('.inline-flex').contains("Start!").click();
                //play the game:
                cy.get("button").contains("Click me").clicks(5);
                cy.get('input[type=file]').selectFile({
                    contents: Cypress.Buffer.from('file contents'),
                    fileName: 'file.txt',
                    lastModified: Date.now(),
                })
                cy.get('input').eq(1).type("Lorem Ipsum");
                cy.get('[role="slider"]').click().type("{rightarrow}".repeat(100));
                cy.get('.text-lg').contains("You've reached the highest level!");
                cy.get("button").contains("Play again").click();
            })
        })
    })
})