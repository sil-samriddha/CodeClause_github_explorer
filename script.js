const btn = document.querySelector('#search');
const content = document.querySelector('.content');

btn.addEventListener('click', async function(e){
    let username = document.querySelector('.input-search').value;
    
    content.innerHTML = 
    `
        <div class="body">
            <center>
                <img src="./src/loading.svg" alt="">
            </center>
        </div>
    `

    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
    });

    try{
        let response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();

        let response2 = await fetch(data.repos_url);
        let data2 = await response2.json();

        let tableList = ``;
        
        data2.forEach(e => {
            tableList+= 
        `
            <tr>
                <td>
                    <a href=${e.html_url} target="_blank">
                        ${e.name}
                    </a>
                </td>
                <td><img src='./src/fork-icon.png' width='20px'> ${e.forks} </td>
                <td><img src='./src/issue-icon.png' width='20px'> ${e.open_issues}</td>
                <td><img src='./src/watch-icon.png' width='20px'> ${e.watchers}</td>
            </tr>
        `
            
        });
        

        content.innerHTML = `
    <div class="body">
    <div class="sidenav">
        <div class="profile">
            <img src=${data.avatar_url} alt="avatar" width="100" height="100">

            <div class="name">
                ${data.name}
            </div>
            <div class="job">
                ${data.company}
            </div>
        </div>

        <div class="sidenav-url">
            <div class="url">
                <a href=${data.html_url} target="_blank" class="active">Profile</a>
                <hr>
            </div>
            <div class="bio">
                ${data.bio}
            </div>
            <div class="url">
                <hr>
                <p>Followers : ${data.followers}</p>
                <p>Following : ${data.following}</p>
            </div>
        </div>
    </div>
    <div class="main">
        <h2>${data.type} INFORMATION</h2>
        <div class="card">
            <div class="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>${data.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>${data.email}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>${data.location}</td>
                        </tr>
                        <tr>
                            <td>Created at</td>
                            <td>:</td>
                            <td>${data.created_at.split("T")[0]}</td>
                        </tr>
                        <tr>
                            <td>Updated at</td>
                            <td>:</td>
                            <td>${data.updated_at.split("T")[0]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h2>REPOSITORIES (Total : ${data.public_repos})</h2>
        <div class="card">
            <div class="list">
                <table>
                    ${tableList}
                </table>
            </div>
        </div>
    </div>
        </div>
    `


    }
    catch(e){
        alert(e.message);
    }

});