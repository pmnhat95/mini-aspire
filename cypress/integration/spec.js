// cypress/integration/spec.js
describe('Aspire App Test Suite', () => {
	// before each test, make sure to visit the home page of the app
const loanForm = {
		"firstName": "Test",
		"lastName": "Last Name",
		"address": "08 Panama",
		"phone": "11190882",
		"email": "Obama@gmail.com",
		"amount": 19000,
		"loanTerm": "24",
		"repayment": 228,
		"approved": false,
		"id": 9
	}

	beforeEach(() => {
		cy.visit("http://localhost:8080/"); // "baseUrl" is defined in cypress.json file
		cy.contains('Get up to $25,000 fast')
	});

	context("Click 'Get a personal loan' button", () => {
		it('loads', () => {
		    cy.get('.get-personal-loan')
			    .first().find('.hide-menu')
			    .click()
	  	})
	});

	context('HTML form create personal loan', function () {
    beforeEach(function () {
      cy.visit('http://localhost:8080/create-personal-loans')
    });

    it('displays errors on create form', function () {
      // incorrect info on purpose
			cy.get('input[id=amount]').type(1500)
      cy.get('select[id=loanTerm]').select("24")
      cy.get('input[id=firstName]').type('Test')
      cy.get('input[id=lastName]').type('Last Nam')
			cy.get('input[id=email]').type('Obam1a@')
			cy.get('input[id=phone]').type('1111111d')
			cy.get('input[id=address]').type('address')
			cy.get('.create-info-loan')
			.find('button[type=submit]')
			.click()

      // and still be on the same URL
      cy.url().should('include', '/create-personal-loans')
    })
		//
    it('redirects to /appove on success', function () {
			// Correct info on purpose
			cy.get('input[id=amount]').type(loanForm.amount)
      cy.get('select[id=loanTerm]').select(loanForm.loanTerm)
      cy.get('input[id=firstName]').type(loanForm.firstName)
      cy.get('input[id=lastName]').type(loanForm.lastName)
			cy.get('input[id=email]').type(loanForm.email)
			cy.get('input[id=phone]').type(loanForm.phone)
			cy.get('input[id=address]').type(loanForm.address)
			cy.get('.create-info-loan')
			.find('button[type=submit]')
			.click()

      // we should be redirected to /appove
      cy.url().should('include', '/approve')
    })
  })

	context('Approve page', function () {
    beforeEach(function () {
      cy.visit('http://localhost:8080/approve')
    });

    it('Update approve for the loan', function () {
			cy.get('.approve-list tbody tr:first-child')
			.find('.btn-approve')
			.click()

      // and still be on the same URL
      cy.url().should('include', '/approve')
    })
  })

	context('Repayment page', function () {
    beforeEach(function () {
      cy.visit('http://localhost:8080/repayment')
    });

    it('Displays errors on repayment form', function () {
			cy.get('.repayment-list tbody tr:first-child')
			.find('.btn-repay')
			.click()

			cy.get('input[id=money]').type('11')
			cy.get('.submit-repayment')
			.click()

      // and still be on the same URL
      cy.url().should('include', '/repayment')
    })

		it('Correct info on repayment form', function () {
			cy.get('.repayment-list tbody tr:first-child')
			.find('.btn-repay')
			.click()

			cy.get('input[id=money]').type('321')
			cy.get('.submit-repayment')
			.click()

      // and still be on the same URL
      cy.url().should('include', '/repayment')
    })

  })

});
