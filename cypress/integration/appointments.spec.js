describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("Should book interview", () => {
    cy.visit('/').get("[alt=Add]").first().click()
    cy.get("[data-testid=student-name-input]")
    .type('Lydia Miller-Jones')
    .get('[alt="Sylvia Palmer"]').click();
    cy.get('button').contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("Should edit an interview", () => {
    cy.visit('/').get('[alt=Edit]').first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("Should cancel an interview", () => {
    cy.visit('/').get('[alt=Delete]').first().click({ force: true });
    cy.get('button').contains('Confirm').click();

    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });

});