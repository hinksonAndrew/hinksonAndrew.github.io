const list = document.querySelectorAll('ul.student-list li');
const perPageMax = 10;
let searchResults = [];

/*
Extra Credit-
searchList first creates the search bar for the page then takes the
input.value and searchs against the list that is passed to function.
If no matches are found then an element is added stating that. 
Also, I added a keyup listener to search entire list in real time.
*/
const searchList = (list) => {
    const pageDivHeader = document.querySelector('div.page-header');
    const div = document.createElement('div');
    div.classList.add('student-search');
    pageDivHeader.appendChild(div);
    const input = document.createElement('input');
    input.placeholder = 'Search for students...';
    const button = document.createElement('button');
    button.innerText = 'Search';
    div.append(input, button);

    
    const h3 = document.querySelectorAll('h3');
    
    pageDivHeader.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            if (document.querySelector('.pagination') !== null) {
                document.querySelector('.pagination').remove();
            }
            searchResults = [];
            for (let i = 0; i < list.length; i++) {
                list[i].style.display = 'none';
                if (h3[i].textContent.includes(input.value)) {
                    list[i].style.display = '';
                    searchResults.push(list[i]);
                }
            }
            if (searchResults.length !== 0) {
                if (document.querySelector('.data-not-found') !== null) {
                    document.querySelector('.data-not-found').remove();
                }
                showPage(searchResults, 1);
                appendPageLinks(searchResults);
            } else {
                if (document.querySelector('.data-not-found') == null) {
                    const notFound = document.createElement('h2');
                    notFound.textContent = 'Not Found';
                    notFound.classList.add('data-not-found');
                    document.querySelector('div.page').appendChild(notFound);
                }
            }
        }    
    });

    pageDivHeader.addEventListener('keyup', (e) => {
        if (document.querySelector('.pagination') !== null) {
            document.querySelector('.pagination').remove();
        }
        searchResults = [];
        for (let i = 0; i < list.length; i++) {
            list[i].style.display = 'none';
            if (h3[i].textContent.includes(input.value)) {
                list[i].style.display = '';
                searchResults.push(list[i]);
            }
        }
        if (searchResults.length !== 0) {
            if (document.querySelector('.data-not-found') !== null) {
                document.querySelector('.data-not-found').remove();
            }
            showPage(searchResults, 1);
            appendPageLinks(searchResults);
        } else {
            if (document.querySelector('.data-not-found') == null) {
                const notFound = document.createElement('h2');
                notFound.textContent = 'No Results';
                notFound.classList.add('data-not-found');
                document.querySelector('div.page').appendChild(notFound);
            }
        }  
    });
}

/*
showPage takes the list passed and the page that it needs to show. 
It changes the display property for all items and either shows or doesnt
depending on the index of individual list items.
*/
const showPage = (list, page) => {
    const start = (page * perPageMax) - perPageMax;
    const end = page * perPageMax;

    for (let i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
        if (i >= start && i < end) {
            list[i].style.display = '';
        }
    }
}

/*
appendPageLinks takes a given list and dynamically creates links at bottom 
of page so that if clicked it will use showPage function and show correct
page to user. Also highlights current page shown.
*/
const appendPageLinks = (list) => {
    const numberOfPages = list.length / perPageMax;
    const pageDiv = document.querySelector('div.page');
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    pageDiv.appendChild(pagination);
    const ul = document.createElement('ul');
    pagination.appendChild(ul);

    let pageNav = '';
    for (let i = 0; i < numberOfPages; i++) {
        if (i === 0) {
            pageNav += `<li><a href='#' class='active'>${i+1}</a></li>`
        } else {
            pageNav += `<li><a href='#'>${i+1}</a></li>`
        }
    }
    ul.innerHTML = pageNav;
    const anchor = document.querySelectorAll('ul li a');
    anchor[0].classList.add('active');

    pageDiv.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            for (let i = 0; i < list.length; i++) {
                list[i].style.display = 'none';
            }
            for (let i = 0; i < anchor.length; i++) {
                anchor[i].classList.remove('active');
            }
            e.target.classList.add('active');
            if (document.querySelector('input').value === '') {
                showPage(list, e.target.textContent);
            } else {
                showPage(searchResults, e.target.textContent);
            }
        }
    });
}

searchList(list);
showPage(list, 1);
appendPageLinks(list);