document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim(); // Use .trim() to remove any leading/trailing spaces
        if (query) {
            searchUsers(query);
        } else {
            alert('Please enter a search term.');
        }
    });

    function searchUsers(query) {
        const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                displayUsers(data.items);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                alert('Error fetching users. Please try again later.');
            });
    }

    function displayUsers(users) {
        clearResults();
        if (users.length === 0) {
            userList.innerHTML = '<li>No users found.</li>';
            return;
        }
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.classList.add('result-item');
            userItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
                <button onclick="fetchUserRepos('${user.login}')">Show Repos</button>
            `;
            userList.appendChild(userItem);
        });
    }

    function fetchUserRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                displayRepos(data);
            })
            .catch(error => {
                console.error('Error fetching user repos:', error);
                alert('Error fetching user repos. Please try again later.');
            });
    }

    function displayRepos(repos) {
        clearResults();
        if (repos.length === 0) {
            reposList.innerHTML = '<li>No repositories found.</li>';
            return;
        }
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.classList.add('result-item');
            repoItem.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description'}</p>
            `;
            reposList.appendChild(repoItem);
        });
    }

    function clearResults() {
        userList.innerHTML = '';
        reposList.innerHTML = '';
    }
});

function fetchUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        })
        .then(data => {
            displayRepos(data);
        })
        .catch(error => {
            console.error('Error fetching user repos:', error);
            alert('Error fetching user repos. Please try again later.');
        });
}

function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
    if (repos.length === 0) {
        reposList.innerHTML = '<li>No repositories found.</li>';
        return;
    }
    repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.classList.add('result-item');
        repoItem.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description'}</p>
        `;
        reposList.appendChild(repoItem);
    });
}
