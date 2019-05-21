var Router = {};
Router.isRoot = function () {
    let onRoot = false;
    if (document.location.pathname === '/') {
        onRoot = true;
    }
    return onRoot;
}


Router.update = function (state, title, url) {
    bookId = document.querySelector('.bookName').getAttribute('id');
    //history.pushState(state, title, encodeURI('/' + bookId + '/' + url));
    Router.route(url);
    document.title = title;
}

Router.route = function (routePath) {
    return new Promise((resolve, reject) => {
        let bookId = document.querySelector('.bookName').getAttribute('id');
        let chapterId = routePath.split('/')[0];
        let lessonId = routePath.split('/')[1];
        console.log(bookId, chapterId, lessonId);
        if (gobalBook.id == bookId) {
            getContentFromBook(gobalBook, chapterId, lessonId)
                .then(content => Render.renderPage(content))
                .then(_=> Render.addStyles(gobalBook.styles));
        }

    });
}

function getContentFromBook(book, chapterId, lessonId) {
    return new Promise((resolve, reject) => {
        book.chapters.forEach(chapter => {
            if (chapter.id == chapterId) {
                chapter.lessons.forEach(lesson => {
                    if (lesson.id == lessonId) {
                        if (lesson.linkToContent) {
                            resolve(fetch(`${lesson.linkToContent}`)
                                .then(res => {
                                    return res.json();
                                })
                                .catch(err => reject(err)));
                        }
                        else if (lesson.content) {
                            return resolve(lesson.content);
                        }
                        else {
                            reject('no content');
                        }
                    }
                });
            }
        });
    });
}

