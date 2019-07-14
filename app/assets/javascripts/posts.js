// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener('turbolinks:load', () => {
    if (window.location.pathname === '/posts') {
        attachListeners()
        getIndex()
        
        let createPost = document.getElementById('create-post')
        let publishedPostsButton = document.getElementById('published-posts')

        publishedPostsButton.addEventListener('click', (e) => {
            getPublished()
            .then(res => res.json())
            .then(results => displayPublished(results))
            .catch(error => displayError(error))
        })

        let closeBtn = document.getElementById('closeBtn')
        closeBtn.addEventListener('click', (e) => {
            closeModal()
        })
    } else if (window.location.pathname === '/posts/new') {
        
        let newPostForm = document.getElementById('new_post')
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let data = {post: {}}; 
            data['post']['name'] = e.target.querySelector('#post_name').value
            data['post']['description'] = e.target.querySelector('#post_description').value 
            data['post']['start_time_1i'] = e.target.querySelector('#post_start_time_1i').value
            data['post']['start_time_2i'] = e.target.querySelector('#post_start_time_2i').value
            data['post']['start_time_3i'] = e.target.querySelector('#post_start_time_3i').value
            data['post']['start_time_4i'] = e.target.querySelector('#post_start_time_4i').value
            data['post']['start_time_5i'] = e.target.querySelector('#post_start_time_5i').value

            data['post']['end_time_1i'] = e.target.querySelector('#post_end_time_1i').value
            data['post']['end_time_2i'] = e.target.querySelector('#post_end_time_2i').value
            data['post']['end_time_3i'] = e.target.querySelector('#post_end_time_3i').value
            data['post']['end_time_4i'] = e.target.querySelector('#post_end_time_4i').value
            data['post']['end_time_5i'] = e.target.querySelector('#post_end_time_5i').value
            data['post']['published'] = e.target.querySelector('#post_published').value 
            data['post']['platform_id'] = e.target.querySelector('#post_platform_id').value 
            data['post']['images'] = e.target.querySelector('#post_images').value 
            let token = e.target.querySelector('input[name=authenticity_token]').value
            myFetch(e.target.action, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': token
                }, 
                body: JSON.stringify(data)
                
            })
        })
    }
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



class Post {
    constructor(attributes) {
        this.id = attributes.id 
        this.name = attributes.name 
        this.pretty_start = attributes.pretty_start 
        this.pretty_end = attributes.pretty_end
        this.description = attributes.description
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
            <button id="create-post">Create Post</button>
           </div>
           `
    }
    
}





