/// <reference types="Cypress" />
const user = require('../fixtures/user.json')
import {loginPage} from '../page_object/loginPage'

describe('Login', () => {
    it('Successful login', () => {
        cy.visit('/login');
        loginPage.emailInputField.should('be.visible').type(user.userEmail);
        loginPage.passwordInputField.type(user.password)
        loginPage.passwordInputField.should('exist')
        .and('have.css', 'border-radius','0px')
        .and('have.value', user.password);
        loginPage.loginButton.click().should('not.exist');
    });
    it('Create organization', () => {
        cy.visit('/login');
        loginPage.loginUser(user.userEmail, user.password);
        cy.contains('Add New').click();
        cy.contains('Add Organization').click();
        cy.get('input[name="name"]').type('NestoNovo');
        cy.get('[name="next_btn"]').click();
        cy.get('[name="next_btn"]').contains('Create').click();
        cy.url().should('contains', '/organizations');
        //cy.get('i[class="el-icon-close"]').clear();
        cy.get('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button"]').click();
    });

    it('Create login via API', () => {
        cy.request({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login',
            body: {
                email:"radic.natalija+new01@gmail.com",
                password:"Naftalija1986",
                "g-recaptcha-response": ""
            
            }
        }).then((probaLog) => {
            cy.log()
            expect(probaLog.status).eq(200);
            expect(probaLog.token).eq();
        
        })
    })
})
