describe("Blog post", () => {
  context("1080px res", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });
    describe("When you visit home", () => {
      it("Should navigate to home page", () => {
        cy.visit("/");
      });

      describe("post", () => {
        it("Should navigate to Blog page", () => {
          cy.get("[data-cy=post-title]")
            .contains("更換了域名" || "Change domain")
            .click({ force: true });
          cy.url().should("include", "/blog/change-domain");
        });
      });
    });
  });
});
