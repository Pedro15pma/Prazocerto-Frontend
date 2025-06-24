describe("Login", () => {
  it("should display login form", () => {
    cy.visit("login.html");
    cy.get("#login-form").should("be.visible");
  });
});

