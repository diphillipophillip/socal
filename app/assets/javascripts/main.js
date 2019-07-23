
document.addEventListener('turbolinks:load', () => {

    let modalBtn = document.getElementById('modalBtn')
    let simpleModal = document.getElementById('simpleModal')
    let secondModalButton = document.getElementById('secondModalBtn')
    let closeSecondModal = document.getElementById('closeSecondBtn')

    secondModalButton.addEventListener('click', (e) => {
        openSecondModal()
    })

    closeSecondModal.addEventListener('click', (e) => {
        closeTheSecondModal()
    })
   
    document.getElementById('form_with_modal').addEventListener('submit', function(e) {
        
        e.preventDefault();
        let render = document.getElementById('form_with_modal')
        let token = document.querySelector('#auth_token').value
        let newData = {post: {}}
        newData['post']['name'] = render.querySelector('#post_name').value
        newData['post']['description'] = render.querySelector('#post_description').value 
        newData['post']['start_time'] = render.querySelector('#post_start_time').value 
        newData['post']['end_time'] = render.querySelector('#post_end_time').value 
        render.querySelector('#post_published').value === "on" ? newData['post']['published'] = true : newData['post']['published'] = false
        if (render.querySelector('#post_platform_id').value === "Twitter") {
            newData['post']['platform_id'] = 1
        } else if (render.querySelector('#post_platform_id').value === "Instagram") {
            newData['post']['platform_id'] = 2
        } else {
            newData['post']['platform_id'] = 3
        }
        fetch('/posts', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-token': token
            }, 
            body: JSON.stringify(newData)
        })
            .then(response => response.json())
            .then(function(json) {
                debugger
            })
            .catch(error => console.log(error))
    })
})



const openModal = () => {
    simpleModal.style.display = 'block';

}

const closeModal = () => {
    simpleModal.style.display = 'none';
}



const openSecondModal = () => {
    secondSimpleModal.style.display = 'block';
}

const closeTheSecondModal = () => {
    secondSimpleModal.style.display = 'none'; 
}




      
