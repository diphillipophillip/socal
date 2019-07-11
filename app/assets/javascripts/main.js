
document.addEventListener('turbolinks:load', () => {

    
    let modalBtn = document.getElementById('modalBtn')
    let simpleModal = document.getElementById('simpleModal')
    let closeBtn = document.getElementById('closeBtn')
    let prevent = document.getElementById('prevent')

    modalBtn.addEventListener('click', (e) => {
       openModal() 
        
    })

    closeBtn.addEventListener('click', (e) => {
        closeModal()
    })

    prevent.addEventListener('click'), (e) => {
        e.preventDefault();
    }
})

const openModal = () => {
    simpleModal.style.display = 'block';
}

const closeModal = () => {
    simpleModal.style.display = 'none';
}

