


//real-time listener
db.collection('contacts').onSnapshot((snapshot) => {
    snapshot.doChanges().forEach(change => {
        if (change.type === 'added') {
            renderContact(change.doc.data(), change.doc.id);
        }

        if (change.type === 'removed') {
            removeContact(change.doc.id);   
        }
    })
})


//add new contact
const form = document.querySelector('form');

form.addEventListener('submit', evt => {
 
    evt.preventDefault();

    const contact = {
        name: form.name.value,
        number: form.numbers.value
    };

    db.collection('contacts').add(contacts)
        .catch(err => {
            console.log(err);
        })
        
    form.name.value = '';
    form.numbers.value = '';

})


// delete contact
const contactContainer = document.querySelector('.contacts');

contactContainer.addEventListener('click', evt => {
    console.log(evt);
    if (evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        db.collection('contacts').doc(id).delete();
    }
})