// style
document.querySelectorAll(".text-input").forEach( (element) => {
    element.addEventListener('blur', (e) => {
        if ( e.target.value != "") {
            e.target.classList.add('filled');
        } else {
            e.target.classList.remove('filled');
        }
    });
});
        
let search = document.querySelector('.search');
search.addEventListener('blur', (e) => {
    if ( e.target.value != "") {
        e.target.classList.add('filled');
    } else {
        e.target.classList.remove('filled');
    }
});
