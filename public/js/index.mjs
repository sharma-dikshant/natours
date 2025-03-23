/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login.mjs';
import { updateData } from './updateSettings.mjs';

// DOM ELEMENTS
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');

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

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    updateData(name, email);
  });
}

/*
  index.mjs is responsible for getting data from user interface and perform the respective task
*/
