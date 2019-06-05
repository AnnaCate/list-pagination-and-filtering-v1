/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Define global variables that store the DOM elements used later in the script
const studentList = document.querySelectorAll('li.student-item');
const divPage = document.querySelector('div.page');
const perPage = 10;

// Create the `showPage` function to hide all of the items in the list except for the 10 you want to show.
const showPage = (list, page) => {
   const start = (page - 1) * perPage;
   const end = start + 9;

   for (let i = 0; i < list.length; i++) {
      if (i >= start && i <= end) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}

const clearActiveClass = list => {
   for (i = 0; i < list.length; i++) {
   list[i].className = "";
   }
}

const setActiveClass = el => {
   el.className = "active";
}

// Create the `appendPageLinks function` to generate, append, and add functionality to the pagination buttons.
const appendPageLinks = () => {
   // create pagination div element to hold the ul/li elements, and append it to the page div
   const divPagination = document.createElement('div');
   divPagination.className = 'pagination';
   divPage.appendChild(divPagination);

   // create the ul element to hold the li pagination elements, and append it to the pagination div
   const ulPagination = document.createElement('ul');
   divPagination.appendChild(ulPagination);

   // calculate how many li elements will needed
   const maxPages = Math.ceil(studentList.length / perPage);

   // generate pagination buttons (li elements) and append them to the ul
   for (let i = 0; i < maxPages; i++) {
      // create li element
      let li = document.createElement('li');
      // add html to li element (including page number as text)
      li.innerHTML = `<a href="#">${i + 1}</a>`;
      // append li element to parent node (ul)h
      ulPagination.appendChild(li);
   }  

   // loop over pagination links to remove "active" class from all links
   const aList = ulPagination.querySelectorAll('a');
   clearActiveClass(aList);

   // add event listener to <a> elements
   divPagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
         currPage = e.target.parentNode.textContent
         showPage(studentList, currPage);
         clearActiveClass(aList);
         // e.target.className = "active";
         setActiveClass(e.target);
      }
   })   
}

// create search bar
const createSearchBar = () => {
   // get parent element
   const header = document.querySelector('div.page-header');

   // create div, form, input, and button
   const searchDiv = document.createElement('div');
   const searchForm = document.createElement('form');
   const searchFormInput = document.createElement('input');
   const searchFormButton = document.createElement('button');

   // create <a> to clear search results
   const a = document.createElement('a');
   a.setAttribute = ('id', 'reset');
   a.textContent = 'X Clear Search';
   a.href = '#';

   // create variable to indicate whether a search is active
   let indicator = 'off';

   // add class
   searchDiv.className = 'student-search';
   // add text
   searchFormInput.placeholder = 'Search for students...';
   searchFormButton.textContent = 'Search';
   // add to DOM
   header.appendChild(searchDiv);
   searchDiv.appendChild(searchForm);
   searchForm.appendChild(searchFormInput);
   searchForm.appendChild(searchFormButton);

   // write fn to perform search when button is clicked
   const performSearch = () => {
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
   }
   
   // add event listener to button when clicked
   searchFormButton.addEventListener('click', (e) => {
      if (indicator === 'on') {
         return;
      }
      performSearch();
      reset();
   });

   // add event listener to button when user presses 'enter' key
   searchFormButton.addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
         if (indicator === 'on') {
            return;
         }
        performSearch();
        reset();
      }
   });

   // create 'Clear search' button
   const reset = () => {
      searchDiv.appendChild(a);
      indicator = 'on';
      const clearSearch = () => {
         const activeA = document.querySelector('.active');
         const currPage = activeA.textContent;
         showPage(studentList, currPage);
         searchFormInput.value = '';
         searchDiv.removeChild(a);
         indicator = 'off';
      }
      a.addEventListener('click', (e) => {
         clearSearch();
      })
   }
}

// set default view to first 10 students on page load
// call function to create search bar
// call function to create pagination links on page load
// set page 1 to active class on page load
const onLoad = () => {
   showPage(studentList, 1);
   createSearchBar();
   appendPageLinks();
   const pageOne = document.querySelector('a');
   setActiveClass(pageOne)
}

document.addEventListener('DOMContentLoaded', onLoad(), false);

