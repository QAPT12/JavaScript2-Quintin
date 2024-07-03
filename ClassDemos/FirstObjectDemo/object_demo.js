"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);

const People = [];

function Person(name, phone) {
  this.name = name;
  this.phone = phone;
  this.prov = "NL";
}

const displayList = () => {
  const ul = document.createElement("ul");
  ul.classList.add("messages");

  for (let pers of People) {
    const li = document.createElement("li");
    const newText = `Name ${pers.name} Phone ${pers.phone} Prov ${pers.prov}`;
    const text = document.createTextNode(newText);
    li.appendChild(text);
    ul.appendChild(li);
  }

  const node = $("ul");
  if (node == null) {
      // get the form element 
      const form = $("form");

      // add ul to parent of form, before the form
      form.parentNode.insertBefore(ul, form.nextElementSibling);
  } else {
      // replace existing ul node
      node.parentNode.replaceChild(ul, node);
  }  



}


const process_btn = () => {

  //const personA = new Person("AAA", "111");
  //const personB = new Person("AAA", "111");

  //People[0] = personA;
  //People[1] = personB;

  //const personC = People[0];
  //personC.prov = "BC";
  //console.log( personA.prov);
  //console.log( personB.prov);
  //console.log( personC.prov);

  const nameText = $("#name_id");
  const phoneText = $("#phone_id");
  const personX = new Person(nameText.value, phoneText.value);
  People[People.length]=personX;
  
  const statusText = $("#status_id");
  statusText.value = `Record Count ${People.length}`;
}

const display_btn = () => {
  displayList();
}

const reset_btn = () => {
  alert("Process Pressed");
  do {
    People.shift();
  }
  while (People.length > 0);
  const statusText = $("#status_id");
  statusText.value = `Record Count ${People.length}`;
}


document.addEventListener("DOMContentLoaded",
  () => {
    const msg = "The DOM is Ready!";
    // alert (msg);

    $("#process_btn").addEventListener("click", process_btn);
    $("#display_btn").addEventListener("click", display_btn);
    $("#reset_btn").addEventListener("click", reset_btn);
     
  });
