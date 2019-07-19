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
            e.target.style.display = 'none'
            
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
    editData['data']['name'] = postEdit.querySelector('#edit_name').value 
    
    editData['data']['edit_pretty_start'] = postEdit.querySelector('#edit_pretty_start').value 
    editData['data']['edit_pretty_end'] = postEdit.querySelector('#edit_pretty_end').value
    editData['data']['edit_description'] = postEdit.querySelector('#edit_description').value 
    editData['data']['edit_platform'] = postEdit.querySelector('#edit_platform').value 
    
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
        Name: <input type="text" value="${this.name}" id="edit_name"> <br>
        Start Time: <input type="text" value="${this.pretty_start}" id="edit_pretty_start"> <br> 
        End Time: <input type="text" value="${this.pretty_end}" id="edit_pretty_end"> <br> 
        Description: <input type="text" value="${this.description}" id="edit_description"> <br>
        Platform: <input type="text" value="${this.platform.name}" id="edit_platform"> <br>
        <input name="authenticity_token" value="authenticity_token" type="hidden">
        <input type="button" name="submit" value="submit" onclick="postEdit()">
        </form> 
        `
    }
    
    
}







