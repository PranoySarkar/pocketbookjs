let gobalBook=null;
function getBooks() {
    fetch('./assets/book.json')
        .then(res => res.json())
        .then(data => {
            if(Router.isRoot() || false){
                let firstBook=data;
                Render.renderBook(firstBook);
            }
            
        })
        .then(_ => {
            document.querySelectorAll('.lesson').forEach(leasonElement=>{
                leasonElement.addEventListener('click',($event)=>{
                   let lessonId=$event.target.getAttribute('id');
                   let chapterId=$event.target.parentNode.parentNode.getAttribute('id');
                   Router.update(null,'',`${chapterId}/${lessonId}`)
                })
            })
        });

}

getBooks();



