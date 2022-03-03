describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should navigate to Tuesday", () => {
    cy.visit('/');
    //cy.get('li').contains("Tuesday").click();
    //check to see backgound colour change
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
  });
});