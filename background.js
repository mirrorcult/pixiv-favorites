browser.pageAction.onClicked.addListener(openAll);

async function openAll() {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        var id = tabs[0].id;

        var balls = `
        var all = [];
    
        var elems = document.querySelectorAll("ul")[0].getElementsByTagName("li");
    
        for(let e of elems) {
            var parent = e.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0];
            var anchor = parent.getElementsByTagName("a")[0];
            var heart = parent.getElementsByTagName("svg")[0];
            var heartEnabled = heart.classList.contains("bXjFLc")
    
            if (heartEnabled) {
                break;
            }
    
            all.push(anchor.href);
        }
    
        all.reverse();    
        all;`

        browser.tabs.executeScript(id, {
            code: balls
        }).then((results) => {
            var first = true;

            results[0].forEach(p => {
                browser.tabs.create({
                    active: first,
                    url: p
                });
                first = false;
            });
        });
    });
}
