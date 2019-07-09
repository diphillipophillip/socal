// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener('turbolinks:load', () => {
    console.log('test')
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
}

const displayError = (error) => {
    document.getElementById('posts').innerHTML = error
}

class Post {
    constructor(attributes) {
        this.id = attributes.id 
        this.name = attributes.name 
        this.pretty_start = attributes.pretty_start 
        this.pretty_end = attributes.pretty_end
    }
    render() {
        return `           
    <tr>
      <td><div><a href="/posts/${this.id}">${this.name}</a></div> </td>
      <td><div>${this.pretty_start}</div></td>
      <td><div>${this.pretty_end}</div></td>
    </tr>
        `
    }
    renderShow() {

        
    }
}

