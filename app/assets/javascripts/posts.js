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
        debugger

        let closeBtn = document.getElementById('closeBtn')
        closeBtn.addEventListener('click', (e) => {
            closeModal()
        })
    } else if (window.location.pathname === '/posts/new') {
        
        let newPostForm = document.getElementById('new_post')
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let data = {post: {}}; 
            //let start_time = new Date('12 20, 1995 2:30')
            
            let start_time = ""
            start_time += e.target.querySelector('#post_start_time_2i').value
            start_time += " "
            start_time += e.target.querySelector('#post_start_time_3i').value
            start_time += ", "
            start_time += e.target.querySelector('#post_start_time_1i').value
            start_time += " "
            start_time += e.target.querySelector('#post_start_time_4i').value
            start_time += ":"
            start_time += e.target.querySelector('#post_start_time_5i').value
            let start = new Date(start_time)
            
            let end_time = ""
            end_time += e.target.querySelector('#post_start_time_2i').value
            end_time += " "
            end_time += e.target.querySelector('#post_start_time_3i').value
            end_time += ", "
            end_time += e.target.querySelector('#post_start_time_1i').value
            end_time += " "
            end_time += e.target.querySelector('#post_start_time_4i').value
            end_time += ":"
            end_time += e.target.querySelector('#post_start_time_5i').value
            let end = new Date(end_time)
            
            data['post']['start_time'] = start
            data['post']['end_time'] = end
            
            data['post']['name'] = e.target.querySelector('#post_name').value
            data['post']['description'] = e.target.querySelector('#post_description').value 
            
            data['post']['published'] = e.target.querySelector('#post_published').value 
            data['post']['platform_id'] = e.target.querySelector('#post_platform_id').value 
            data['post']['images'] = e.target.querySelector('#post_images').value 

            let token = e.target.querySelector('input[name=authenticity_token]').value
            
            fetch(`${e.target.action}`, { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-token': token
                }, 
                body: JSON.stringify(data)
                
            })  
                .then(res => res.json()) 
                .then(function(results) {
                    console.log(results)
                    window.location.pathname = '/posts'
                })
                .catch(error => console.log(error))
                
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
        this.platform = attributes.platform
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

           </div>
           
           `
    }
    
}





