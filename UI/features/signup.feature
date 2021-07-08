Feature: Signup UI automated feature for QA MOP task

  Background: Open signup page
    Given I am on the signup page

  Scenario Outline: User is able to signup to the website
    When User submits a valid registration form
    And User submits a valid phone number authentication code
    Then User is successfully registered to the website

