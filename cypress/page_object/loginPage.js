class LoginPage{
    get emailInputField(){
        return cy.get('input[type="email"]');

    }
    get passwordInputField(){
        return cy.get('input[type="password"]');
    }
    get loginButton(){
        return cy.get('button[type="submit"]');
    }
    loginUser(userEmail, password){
        this.emailInputField.type(userEmail);
        this.passwordInputField.type(password);
        this.loginButton.click();
    }
}


export const loginPage = new LoginPage();