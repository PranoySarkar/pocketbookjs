var Render={};

Render.renderBook=function(book) {
    return new Promise((resolve, reject) => {
        document.querySelector('.bookName').innerHTML = Utils.getSenitizedText(book.name);
        document.querySelector('.bookName').setAttribute('id',book.id);
        document.querySelector('.subHeading').innerHTML = Utils.getSenitizedText(book.subHeading);
        let chapterContainer = document.querySelector('.chapterContainer');
        let i=0;
        for (let chapter of book.chapters) {
            
            let renderedChapter = buildChapter(chapter);
            if(i==0){
                renderedChapter.classList.add('activeChapter');
                i++;
            }
            chapterContainer.appendChild(renderedChapter)
        }
        gobalBook=book;
        Router.update(null,book.name,'')
        resolve();
    });
}

Render.renderPage=function (content) {
    return new Promise((resolve, reject) => {
        let pageContainer = document.querySelector('.page');
        pageContainer.innerHTML = "";
        content.sections.forEach(eachSection => {
            switch (eachSection.type) {
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    let h1 = document.createElement(eachSection.type);
                    h1.innerHTML = Utils.getSenitizedText(eachSection.content);
                    pageContainer.appendChild(h1);
                    break;
                case 'para':
                default:
                    let p = document.createElement('p');
                    p.classList.add('section');
                    if (eachSection.styles) {
                        eachSection.styles.forEach(style => {
                            p.classList.add(`${style}`)
                        })
                    }
                    p.innerHTML = Utils.getSenitizedText(eachSection.content);
                    pageContainer.appendChild(p);
                    break;

            }
            resolve('rendering done');
        })
    });
}

Render.addStyles=function (styles) {
    return new Promise((resolve, reject) => {
        console.log(styles);
        let style = document.createElement('style');
        let head = document.head || document.getElementsByTagName('head')[0];
        let cssText='';
        styles.forEach(style=>{
            if(style.name!='' && style.name.match(/^\w+$/)){
                let meeseeks=`.pageContainer .page .${style.name} { `;
                Object.keys(style.properties).forEach(eachProperty=>{
                    meeseeks+=`${eachProperty}:${style.properties[eachProperty]};`
                })
                meeseeks+='}';
                cssText+=meeseeks;
            }
        });
        if (style.styleSheet){
            style.styleSheet.cssText = cssText;// ie 8
          } else {
            style.appendChild(document.createTextNode(cssText));
          }
        head.appendChild(style);
        resolve();
    });
}

function buildChapter(chapterContent) {
    let html = new DOMParser().parseFromString(chapterTemplate, 'text/html');
    let renderedChapter = html.body.childNodes[0];
    renderedChapter.setAttribute('id',chapterContent.id);
    renderedChapter.querySelector('.chapterTitile').innerHTML = Utils.getSenitizedText(chapterContent.chapterTitile);
    let i=0;
    for (let lesson of chapterContent.lessons) {
        let renderedLesson = buildLeason(lesson);
        if(i==0){
            renderedLesson.classList.add('activeLesson');
            i++;
        }
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




let chapterTemplate = `
    <ul class="chapter">
        <li class="chapterTitile"></li>
    </ul>
    `;
let lessonTemplate = `<li><a class="lesson" href="#"></a></li>`
