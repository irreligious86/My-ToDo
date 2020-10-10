"use strict";

//import uuid from 'uuid';
//localStorage.clear();

let allUsers = [];
let currentTodos = [];
let finishedTodos = [];

// add new user
const user = name => ({
    name, 
    id: Math.ceil(Math.random()*10e8),
    portfolio: [], 
    rating: null ,
    createDate: Date.now()
}
);

// push new user to array
const pushNewUserToAllUsers = name => {
  allUsers.push(user(name))
};

// create new todo
const todo = title => ({
    title, 
    id: Math.ceil(Math.random()*10e4), 
    in_work: false, 
    is_ready: false, 
    importance: Math.ceil(Math.random()*9), 
    start: function() {
        this.in_work = true;
      },
    finish: function() { 
        this.is_ready = true;
      },
      createDate: Date.now()
});

// push new todo to array
const pushTodoToCurrentTodos = title => {
  currentTodos.push(todo(title))
};

user('vasia');
user('joshka');
user('pepo');
user('honzik');
user('sasha');

pushTodoToCurrentTodos('task N1');
pushTodoToCurrentTodos('task N2');
pushTodoToCurrentTodos('task N3');
pushTodoToCurrentTodos('task N4');
pushTodoToCurrentTodos('task N5');
pushTodoToCurrentTodos('task N6');
pushTodoToCurrentTodos('task N7');

pushNewUserToAllUsers('vasia');
pushNewUserToAllUsers('joshka');
pushNewUserToAllUsers('pepo');
pushNewUserToAllUsers('honzik');
pushNewUserToAllUsers('noname');




// user start do task 
const userStartDoTask = (name, title) => {
  let currentUser = allUsers.find( item => item.name === name) ;
  let currentUserTask = currentTodos.find (item => item.title === title) ;
currentUserTask.in_work = true;
currentUserTask.who_do_it = currentUser;
currentUser.what_is_doing = currentUserTask;
currentUser.rating++;
//localStorage.setItem('currentUser.rating', currentUser.rating);
};


// user finish do task
const userFinishDoTask = (name, title) => {
let currentUser = allUsers.find ( item => item.name === name) ;
let currentUserTask = currentTodos.find (item => item.title === title) ;
let finishedUserTask ;
if ( currentUserTask.who_do_it == currentUser ) {
currentUser.portfolio.push ( currentUserTask ) ;
currentUser.rating += currentUserTask.importance ;
finishedTodos.push( currentUserTask ) ;
finishedUserTask = finishedTodos.find (item => item.title === title) ;
currentTodos.splice ( currentTodos.indexOf ( currentUserTask ), 1) ;
finishedUserTask.is_ready = true;
finishedUserTask.author = currentUser;
finishedUserTask.finishDate = Date.now();
delete currentUserTask.in_work;
delete currentUserTask.start; 
} else { console.log( name+': Error of conformity ' + title )}
};


userStartDoTask('joshka', 'task N7');
userStartDoTask('pepo', 'task N1');
userStartDoTask('noname', 'task N2');
userStartDoTask('pepo', 'task N4');

userFinishDoTask('pepo', 'task N4');
userFinishDoTask('pepo', 'task N1');
userFinishDoTask('joshka', 'task N7');
userFinishDoTask('joshka', 'task N3');

console.log(currentTodos);
console.log(finishedTodos);
console.log(allUsers);

// random from Denis
// function random (fr, to) {
//  return ~~(Math.random() * (to - fr) + fr)
//}