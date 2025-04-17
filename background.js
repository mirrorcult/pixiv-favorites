browser.pageAction.onClicked.addListener(openAll);

async function openAll() {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        var id = tabs[0].id;

        var balls = `
        var all = [];
    
        var elems = document.getElementsByClassName("jELUak")[0].getElementsByTagName("li");
    
        console.log(elems)
        for(let e of elems) {
            console.log(e)
            var anchor = e.getElementsByTagName("a")[0];
            var heart = e.getElementsByTagName("svg")[0];

            if (anchor == undefined || heart == undefined) {
                continue;
            }

            var heartEnabled = heart.classList.contains("wQCIS")
    
            if (heartEnabled) {
                break;
            }
    
            all.push(anchor.href);
        }
    
        console.log(all)
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
