// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener('turbolinks:load', () => {

    attachListeners()
   
    let publishedPostsButton = document.getElementById('published-posts')

    publishedPostsButton.addEventListener('click', (e) => {
       getPublished()
        .then(res => res.json())
        .then(results => displayPublished(results))
        .catch(error => displayError(error))
    })

})



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
           </div>
           `
    }
    
}





