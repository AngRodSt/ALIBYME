// Test suite for the Home Page
describe("Home Page", () => {
  it("should display the ALIBYME logo on successful visit", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("ALIBYME").should("be.visible");
  });

  // Test: Check if the trending anime carousel is displayed with at least one anime card
  it("should display the trending anime carousel", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid='anime-carousel']").should("exist");
    cy.get("[data-testid='anime-card']").should("have.length.greaterThan", 0);
  });

  // Test: Clicking an anime card should redirect to the correct anime page
  it("should redirect to the anime page when an anime card is clicked", () => {
    cy.visit("http://localhost:3000/");

    // Get the first anime card in the carousel
    cy.get("[data-testid='anime-carousel'] [data-testid='anime-card']")
      .first()
      .as("firstAnimeCard");

    // Extract the href from the first anime card's link and verify redirection
    cy.get("@firstAnimeCard")
      .find("a")
      .invoke("attr", "href")
      .then((href) => {
        // Check that the href matches the expected anime page pattern
        cy.wrap(href).should("match", /^\/anime\/\d+/);
        // Click the link and verify the URL changes to the anime page
        cy.get("@firstAnimeCard").find("a").click({ force: true });
        cy.location("pathname", { timeout: 10000 }).should("eq", href);
      });
  });
});
