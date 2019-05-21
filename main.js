let gobalBook=null;
function getBooks() {
    fetch('./book.json')
        .then(res => res.json())
        .then(data => {
            if(Router.isRoot()){
                let firstBook=data;
                renderBook(firstBook);
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

function renderBook(book) {
    return new Promise((resolve, reject) => {
        document.querySelector('.bookName').innerHTML = Utils.getSenitizedText(book.name);
        document.querySelector('.bookName').setAttribute('id',book.id);
        document.querySelector('.subHeading').innerHTML = Utils.getSenitizedText(book.subHeading);
        let chapterContainer = document.querySelector('.chapterContainer');
        for (let chapter of book.chapters) {
            let renderedChapter = buildChapter(chapter);
            chapterContainer.appendChild(renderedChapter)
        }
        gobalBook=book;
        Router.update(null,book.name,'')
        resolve();
    });
}




getBooks();

function buildChapter(chapterContent) {
    let html = new DOMParser().parseFromString(chapterTemplate, 'text/html');
    let renderedChapter = html.body.childNodes[0];
    renderedChapter.setAttribute('id',chapterContent.id);
    renderedChapter.querySelector('.chapterTitile').innerHTML = Utils.getSenitizedText(chapterContent.chapterTitile);
    for (let lesson of chapterContent.lessons) {
        let renderedLesson = buildLeason(lesson);
        renderedChapter.appendChild(renderedLesson);
    }
    return renderedChapter;
}

function buildLeason(lessonContent) {
    let html = new DOMParser().parseFromString(lessonTemplate, 'text/html');
    let renderedLesson = html.body.childNodes[0];
    renderedLesson.querySelector('.lesson').innerHTML = Utils.getSenitizedText(lessonContent.name);
    renderedLesson.querySelector('.lesson').innerHTML = Utils.getSenitizedText(lessonContent.name);
    renderedLesson.querySelector('.lesson').setAttribute('id',lessonContent.id);
    return renderedLesson;
}

function Utils.getSenitizedText(nonSanitaizedText) {
    let temp = document.createElement('div')
    temp.textContent = nonSanitaizedText;
    return temp.innerHTML;
}


let chapterTemplate = `
    <ul class="chapter">
        <li class="chapterTitile"></li>
    </ul>
    `;
let lessonTemplate = `<li><a class="lesson" href="#"></a></li>`