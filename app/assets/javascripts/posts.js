// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener('turbolinks:load', () => {
    
        attachListeners()
        getIndex()
        
        let createPost = document.getElementById('create-post')
        let publishedPostsButton = document.getElementById('published-posts')
        let insta = document.getElementById('instagram_button')
        let youtube = document.getElementById('youtube_button')
        let twitter = document.getElementById('twitter_button')

        insta.addEventListener('click', (e) => {

            e.preventDefault()
            return fetch('http://localhost:3000/platforms/2.json')
            .then(results => results.json())
            .then(response => {
                let html = response.map(postData => new Post(postData).render()).join('')
                document.getElementById('posts').innerHTML = html
                attachListeners()
            })
        })
    
        youtube.addEventListener('click', (e) => {
            e.preventDefault()
            return fetch('http://localhost:3000/platforms/3.json')
            .then(res => res.json())
            .then(results => {
                let html = results.map(postData => new Post(postData).render()).join('')
                document.getElementById('posts').innerHTML = html
                attachListeners()
            })
        })
    
        twitter.addEventListener('click', (e) => {
            e.preventDefault()
            return fetch('http://localhost:3000/platforms/1.json')
            .then(res => res.json())
            .then(results => {
                let html = results.map(postData => new Post(postData).render()).join('')
                document.getElementById('posts').innerHTML = html
                attachListeners()
            })
        })

        publishedPostsButton.addEventListener('click', (e) => {
            getPublished()
            .then(res => res.json())
            .then(results => displayPublished(results))
            .catch(error => displayError(error))
            e.target.style.display = 'none'
            
        })


        let closeBtn = document.getElementById('closeBtn')
        closeBtn.addEventListener('click', (e) => {
            closeModal()
        })
    }) 




const getIndex = () => {
    return myFetch('http://localhost:3000/posts.json')
        .then(res => res.json())
        .then(results => displayIndex(results))

}

const displayIndex = (results) => {
    let html = results.map(postData => new Post(postData).render()).join('')
    document.getElementById('posts').innerHTML = html
    attachListeners()
}



const getPublished = () => {
    return myFetch('http://localhost:3000/published.json')
}

const displayPublished = (results) => {
    let html = results.map(postData => new Post(postData).render()).join('')
    document.getElementById('posts').innerHTML = html
    attachListeners()
}

const displayError = (error) => {
    document.getElementById('posts').innerHTML = error
}


const displayShow = (results) => {
    console.log(results)
}

const attachListeners = () => {
    let ajaxShow = [].slice.call(document.getElementsByClassName('ajaxShow'))
    const handleClick = (e) => {
        e.preventDefault()
        return myFetch(e.target.href, {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(results => {
                renderShow = new Post(results).renderShow()
                document.getElementById('postData').innerHTML = renderShow 
                openModal()
                
            })
    }
    ajaxShow.forEach(function(item) {
        item.addEventListener('click', handleClick)
    })
}

const getEdit = () => {
    
    let edit = document.getElementById('edit')
    let number = parseInt(edit.getAttribute('data-id'), 10)
    fetch(`http://localhost:3000/posts/${number}/edit.json`) 
    .then(res => res.json())
    .then(results => {
        renderEdit = new Post(results).renderEdit()
        document.getElementById('postData').innerHTML = renderEdit 
        openModal()
    })
        
    }


const postEdit = () => {
    let postEdit = document.getElementById('editForm') 
    let thisNumber = parseInt(postEdit.getAttribute('data-id'), 10)
    let html = document.getElementById('token')
    let token = html.querySelector('#auth_token').value

    let editData = {data: {}}
    editData['data']['name'] = postEdit.querySelector('#name').value 
    
    editData['data']['edit_pretty_start'] = postEdit.querySelector('#start_time').value 
    editData['data']['edit_pretty_end'] = postEdit.querySelector('#end_time').value
    editData['data']['edit_description'] = postEdit.querySelector('#description').value 
    editData['data']['edit_platform'] = postEdit.querySelector('#platform_id').value 
    editData['data']['edit_published'] = postEdit.querySelector('#published').value
    
    fetch(`http://localhost:3000/posts/${thisNumber}.json`, {
        method: 'PATCH', 
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-token': token
             }, 
                body: JSON.stringify(editData) 
        })
        
        .then(res => res.json())
        .then(results => {
           console.log(results)
        }) 
    
}





class Post {
    constructor(attributes) {
        this.id = attributes.id 
        this.name = attributes.name 
        this.pretty_start = attributes.pretty_start 
        this.pretty_end = attributes.pretty_end
        this.description = attributes.description
        this.platform = attributes.platform
        this.formatted_start_time = attributes.formatted_start_time 
        this.formatted_end_time = attributes.formatted_end_time
        
    }
    render() {
        return `           
    <tr>
      <td><div><a class="ajaxShow" href="/posts/${this.id}">${this.name}</a></div> </td>
      <td><div>${this.pretty_start}</div></td>
      <td><div>${this.pretty_end}</div></td>
    </tr>
        `
    }

    renderShow() {
        return `
            <div>
            <div class="showInfo">Name: ${this.name}</div>
            <div class="showInfo">Start Time: ${this.pretty_start}</div>
            <div class="showInfo">End Time: ${this.pretty_end}</div> 
            <div class="showInfo">Description: ${this.description}</div> 
            <div class="showInfo">Platform: ${this.platform.name}</div>
            <button id='edit' data-id=${this.id} onclick='getEdit()' >Edit</button>
           </div>
           
           `
    }


    renderEdit() {
        return `
        <form onsubmit="postEdit()" id="editForm" data-id=${this.id}> 
        Name: <input type="text" value="${this.name}" name="post[name]" id="name"> <br>
        Start Time: <input type="datetime-local" value="${this.formatted_start_time}" name="post[start_time(1i)] id="start_time"> <br> 
        End Time: <input type="datetime-local" value="${this.formatted_end_time}" id="end_time"> <br> 
        Description: <input type="text" name="${this.description}" id="description"> <br>
        Platform: <input type="text" name="${this.platform.name}" id="platform_id"> <br>
        Published: <input type="checkbox" name="${this.published}" id="published"> <br>
        <input name="authenticity_token" value="authenticity_token" type="hidden">
        <input type="button" name="submit" value="submit" onclick="postEdit()">
        </form> 
        `
    }

    
    
    
}







