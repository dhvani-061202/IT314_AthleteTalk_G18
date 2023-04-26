import 'cypress-file-upload';
describe('GUI-Testing BY KP18', () => {

  beforeEach(() => { 
    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.get('[id="email"]').type('khush@admin.com')

// Enter password
cy.get('[id="password"]').type('12345678')

// Click sign in button
cy.get('[class = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-1vhaqj4-MuiButtonBase-root-MuiButton-root"]').click()

cy.wait(2000)
  })

//test1
  it('should visit dashboard as soon as user log in', () => {
    cy.contains('Dashboard').should('be.visible')
  })

//test2
  it('if you taken any plan from browse plans then it should be added into the My plans', () => {
    
    cy.contains('Browse Plans').click()
    //click on 3rd view details button on the pag 
    cy.wait(2000)

    
    const viewDetailsButtons = cy.findAllByText('View Details')
    
    // Click the third button in the collection
    viewDetailsButtons.eq(1).click()
    cy.contains('ALREADY TAKEN!',{matchCase: false})

    // Navigate to the second page and retrieve the text to compare
    cy.contains('My Plans',{matchCase: false}).click();
    cy.contains('Cope with Anxiety 5 day plan',{matchCase: false}).should('be.visible')

  })

  //test3
  it('Create plan basic workflow', () => {
    // Click on create plan
    cy.contains('Create Plan',{matchCase: false}).click()

    // Enter plan details
    cy.get('#name').type('Test Plan-ByKP18')
    cy.get('#description').type('Test Description-ByKP18')
    cy.get('#demo-multiple-chip').click()
    cy.findByText('Anxiety').click()
    cy.findByText('Depression').click()
    // cy.get('[class = "MuiTypography-root MuiTypography-h3 css-lnlxph-MuiTypography-root"]').click({ force: true })
    cy.wait(1000)
    cy.contains('NEXT', {matchCase: false}).click({ force: true })
    cy.wait(2000)
    // Add videos
    cy.findByText('Mindfulness Meditation').click()
    cy.findByText('Best Exercise for mind.').click()
    cy.findByText('Yoga To Calm Your Mind').click()
    cy.contains('NEXT', {matchCase: false}).click({ force: true })
    cy.contains('Summary', {matchCase: false}).should('be.visible')
    cy.contains('SUBMIT',{matchCase: false}).click()
  })

  //test4
  it('basic workflow for upload video', () => {
    cy.contains('Upload Video',{matchCase : false}).click()
    cy.get('[data-testid="title"]').type('Test Video-ByKP18')
    cy.get('[data-testid="description"]').type('Test Description-ByKP18')
    cy.get('#demo-multiple-chip').click()
    cy.findByText('Anxiety').click()
    cy.findByText('Depression').click()

    cy.fixture('testVid.mp4', 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then((videoBlob) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: videoBlob,
        fileName: 'testVid.mp4',
        mimeType: 'video/mp4'
      });
    });
    cy.wait(2000)
    cy.contains('SUBMIT',{matchCase: false}).click({force: true})


  })
  //'C:\Users\khush\OneDrive\Desktop\SEM6\SE\SEProjectTest\Videos\testVid.mp4'

  //test5
  it('using communnity chat to create new group and message some thing', () => {
    cy.contains('community chat',{matchCase: false}).click()
    cy.contains('New Group Chat',{matchCase: false}).click()
    cy.get('[data-testid="Group Name"]').type('War Room')
    cy.get('[data-testid="Add People"]').type('k')
    cy.get('[data-testid="Peter Parker"]').click()
    cy.get('[data-testid="Peter Parker 2"]').click()
    cy.get('[data-testid="Iron Man"]').click()
    cy.get('[data-testid="CreateMe"]').click()
    cy.contains('War Room',{matchCase: false}).should('be.visible')
    cy.contains('War Room',{matchCase: false}).click()
    cy.get('[data-testid="message"]').type('Love you 3000{enter}')

  })


})