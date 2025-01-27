let entered = document.querySelector('#submit').addEventListener('click', searchForUser)

function searchForUser(e) {
    let username = document.getElementById('username').value
    doFetch(username)
}

async function doFetch(username) {
    let response = await fetch(`https://api.github.com/users/${username}`)
    let responseJSON = await response.json()

    if (!checkIfUserExists(responseJSON)) {
        return
    } else {
    extractData(responseJSON)
    }
}

function checkIfUserExists(response) {
    if (response.status == '404') {
        let h3 = document.createElement('h3')
        h3.id = "error"
        let newTextNode = document.createTextNode('User does not exist')
        h3.append(newTextNode)

        let container = document.querySelector("main")
        let child = document.querySelector("#child")

        container.insertBefore(h3, child)

        return false
    }
    return true
}

// user exists, continute processing response
function extractData(JSONResponse) {
    let name = JSONResponse.name
    let location = JSONResponse.location
    let bio = JSONResponse.bio
    let blog = JSONResponse.blog
    let hireable = JSONResponse.hireable
    let accountBirthday = JSONResponse.created_at
    let followers = JSONResponse.followers
    let following = JSONResponse.following
    let email = JSONResponse.email
    let public_gists = JSONResponse.public_gists
    let public_repos = JSONResponse.public_repos
    let last_updated = JSONResponse.updated_at
    let dataArray = [name, location, bio, blog, hireable, accountBirthday, followers, following, email, public_gists, public_repos,last_updated]

    createNewElements(dataArray)
}

function createNewElements(data) {

    let fieldArray = ["NAME: ", "LOCATION: ", "BIO: ", "BLOG: ", "HIREABLE: ", "ACCOUNT CREATION DATE: ", "FOLLOWERS: ", "FOLLOWING: ", "EMAIL: ", "PUBLIC GISTS: ", "PUBLIC REPOSITORIES: ", "LAST UPDATED: "]

    let newDiv = document.createElement('div')
    newDiv.id = "profileInfo"
 
    for (let i = 0; i < data.length; i++) {
        let p = document.createElement('p')
        let newFieldNode = document.createTextNode(fieldArray[i])
        let newValueNode = document.createTextNode(data[i])
        p.appendChild(newFieldNode)
        p.appendChild(newValueNode)
        newDiv.appendChild(p)
    }

    postToWeb(newDiv)
}

function postToWeb(div) {

    document.querySelector('h3').remove()
    document.querySelector('#container').remove()

    let container = document.querySelector('main')
    let child = document.querySelector('#child')

    let h3 = document.createElement('h3')
    let refreshTextNode = document.createTextNode('Refresh page to re-new search')
    refreshTextNode.id = "refreshText"
    h3.appendChild(refreshTextNode)

    container.insertBefore(div, child)
    container.insertBefore(h3, div)
}


