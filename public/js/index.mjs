/* eslint-disable */
import '@babel/polyfill';
import { login } from './login.mjs';

// DOM ELEMENTS
const loginForm = document.querySelector('.form');

// VALUES

//DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

/*
  index.mjs is responsible for getting data from user interface and perform the respective task
*/
