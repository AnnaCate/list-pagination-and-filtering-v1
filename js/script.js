/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Define global variables
const studentList = document.querySelectorAll('li.student-item');
// create indicator variable to indicate whether a search is active
let searchActive = false;

// Create the `showPage` function to hide all of the items in the list except for the 10 you want to show.
const showPage = (list, page) => {
   const start = (page - 1) * 10;
   const end = start + 9;

   for (let i = 0; i < list.length; i++) {
      if (i >= start && i <= end) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}

// Create fn to clear the "active" class from a list of elements
const clearActiveClass = list => {
   for (i = 0; i < list.length; i++) {
   list[i].className = "";
   }
}

// Create a fn to set the "active" class to an element
const setActiveClass = el => {
   el.className = "active";
}

// create fn to create element and add attributes/text
const createElement = (elementName, property, value) => {
   const element = document.createElement(elementName);
   element[property] = value;
   return element;
}

// Create the `appendPageLinks function` to generate, append, and add functionality to the pagination buttons.
const appendPageLinks = () => {
   // get parent element
   const divPage = document.querySelector('div.page');

   // create pagination div element to hold the ul/li elements, and append it to the page div
   const divPagination = createElement('div', 'className', 'pagination');
   divPage.appendChild(divPagination);

   // create the ul element to hold the li pagination elements, and append it to the pagination div
   const ulPagination = document.createElement('ul');
   divPagination.appendChild(ulPagination);

   // calculate how many li elements will needed
   const maxPages = Math.ceil(studentList.length / 10);

   // generate pagination buttons (li elements) and append them to the ul
   for (let i = 0; i < maxPages; i++) {
      // create li elements
      let li = createElement('li', 'innerHTML', `<a href="#">${i + 1}</a>`)
      // append li element to parent node (ul)h
      ulPagination.appendChild(li);
   }  

   // create nodeList of <a> pagination elements
   const aList = ulPagination.querySelectorAll('a');

   // add event listener to <a> pagination elements
   divPagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
         const currPage = e.target.textContent;
         showPage(studentList, currPage);
         clearActiveClass(aList);
         setActiveClass(e.target);
      }
   });
}

// create search bar
const createSearchBar = () => {
   // get parent element
   const header = document.querySelector('div.page-header');
   // create div, form, input, and button
   const searchDiv = createElement('div', 'className', 'student-search');
   const searchForm = document.createElement('form');
   const searchFormInput = createElement('input', 'placeholder', 'Search for students...');
   const searchFormButton = createElement('button', 'textContent', 'Search');
   // add attributes to input and button
   searchFormInput.setAttribute('id', 'search-input');
   searchFormButton.setAttribute('type', 'button');
   // add default search elements to DOM
   header.appendChild(searchDiv);
   searchDiv.appendChild(searchForm);
   searchForm.appendChild(searchFormInput);
   searchForm.appendChild(searchFormButton);
   
   // add performSearch event listener to button when clicked
   searchFormButton.addEventListener('click', () => {
      if (searchActive) {
         return;
      } else {
         performSearch();
      }
   });

   // add performSearch event listener to button when user presses 'enter' key
   // adapted from: https://stackoverflow.com/questions/14542062/eventlistener-enter-key
   // document.addEventListener('keypress', (e) => {
   //    const key = e.which || e.keyCode;
   //    if (key === 13 && searchFormInput !== '') {
   //       if (searchActive) {
   //          return;
   //       } else {
   //          performSearch();
   //       }
   //    }
   // });
}

// write fn to perform search when button is clicked
// adapted from: https://www.w3schools.com/howto/howto_js_filter_lists.asp
const performSearch = () => {
   const searchFormInput = document.querySelector('#search-input')
   const filter = searchFormInput.value.toUpperCase();
   let h3;
   let txtValue;
   for (let i = 0; i < studentList.length; i++) {
      h3 = studentList[i].getElementsByTagName('h3')[0];
      txtValue = h3.textContent;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         studentList[i].style.display = "block";
      } else {
         studentList[i].style.display = "none";
      }
   } 

   // create <a> to clear search results
   const anchor = createElement('A', 'href', '#');
   anchor.textContent = 'X Clear Search';
   anchor.setAttribute('id', 'search-anchor');
   // append <a> element created above
   const searchDiv = document.querySelector('div.student-search');
   searchDiv.appendChild(anchor);

   // set indicator to true to indicate an active search
   searchActive = true;

   // add event listener to "Clear search" link 
   searchDiv.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
         clearSearch();
      }
   });
}

// create fn to clear search results
const clearSearch = () => {
   // get "active" <a> pagination element
   const activeA = document.querySelector('.active');
   // get current page num and studentList
   const currPage = activeA.textContent;
   // reset to previous display
   showPage(studentList, currPage);
   // clear search box
   const searchFormInput = document.querySelector('#search-input')
   searchFormInput.value = '';
   // remove "Clear search" <a>
   const searchDiv = document.querySelector('div.student-search');
   const anchor = document.querySelector('#search-anchor');
   searchDiv.removeChild(anchor);
   
   // set indicator to 'off'
   searchActive = false;
}

// set default view to first 10 students on page load
// call function to create search bar
// call function to create pagination links on page load
// set page 1 to active class on page load

const onLoad = () => {
   showPage(studentList, 1);
   createSearchBar();
   appendPageLinks();
   const pageOne = document.querySelector('div.pagination > ul > li > a');
   setActiveClass(pageOne)
}

// adapted from Spencer May's answer on Stack Overflow: 
// https://stackoverflow.com/questions/4842590/how-to-run-a-function-when-the-page-is-loaded
document.addEventListener('DOMContentLoaded', onLoad(), false);
