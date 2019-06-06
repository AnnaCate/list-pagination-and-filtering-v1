/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Define global variables
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
   const searchDiv = document.createElement('div');
   const searchForm = document.createElement('form');
   const searchFormInput = document.createElement('input');
   const searchFormButton = document.createElement('button');

   // create <a> to clear search results
   const a = document.createElement('a');
   // a.setAttribute = ('id', 'reset');
   a.textContent = 'X Clear Search';
   a.href = '#';

   // create indicator variable to indicate whether a search is active
   let indicator = 'off';

   // add class to search div
   searchDiv.className = 'student-search';
   // add text to input and button
   searchFormInput.placeholder = 'Search for students...';
   searchFormButton.textContent = 'Search';
   // add default search elements to DOM
   header.appendChild(searchDiv);
   searchDiv.appendChild(searchForm);
   searchForm.appendChild(searchFormInput);
   searchForm.appendChild(searchFormButton);

   // write fn to perform search when button is clicked
   // adapted from: https://www.w3schools.com/howto/howto_js_filter_lists.asp
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
   
   // add performSearch event listener to button when clicked
   searchFormButton.addEventListener('click', (e) => {
      if (indicator === 'on') {
         return;
      }
      performSearch();
      createClearSearchLink();
   });

   // add performSearch event listener to button when user presses 'enter' key
   // adapted from: https://stackoverflow.com/questions/14542062/eventlistener-enter-key
   searchFormButton.addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
         if (indicator === 'on') {
            return;
         }
        performSearch();
        createClearSearchLink();
      }
   });

   // create 'Clear search' link
   const createClearSearchLink = () => {

      // append <a> element created above
      searchDiv.appendChild(a);
      // set indicator to 'on' to indicate an active search
      indicator = 'on';

      // create fn to clear search results
      const clearSearch = () => {
         // get "active" <a> pagination element
         const activeA = document.querySelector('.active');
         // get current page num
         const currPage = activeA.textContent;
         // reset to previous display
         showPage(studentList, currPage);
         // clear search box
         searchFormInput.value = '';
         // remove "Clear search" <a>
         searchDiv.removeChild(a);
         // set indicator to 'off'
         indicator = 'off';
      }
      // add event listener to "Clear search" <a> 
      a.addEventListener('click', (e) => {
         clearSearch();
      });
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
   const pageOne = document.querySelector('div.pagination > ul > li > a');
   setActiveClass(pageOne)
}

// adapted from Spencer May's answer on Stack Overflow: 
// https://stackoverflow.com/questions/4842590/how-to-run-a-function-when-the-page-is-loaded
document.addEventListener('DOMContentLoaded', onLoad(), false);

