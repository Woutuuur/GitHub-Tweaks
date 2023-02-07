const clipboardCopyHtmlUrl = browser.runtime.getURL("html/clipboard-copy.html")

function createCopyButtonHtml(filename) {
    return (
        `<clipboard-copy data-copy-feedback="Copied!" aria-label="Copy" value="${filename}" data-view-component="true" class="Link--onHover color-fg-muted ml-2 mr-2" tabindex="0" role="button">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
                <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
                <path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
            </svg>
            <svg style="display: none;" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check color-fg-success">
                <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
            </svg>
        </clipboard-copy>`
    )
}

function createCopyButton(filename) {
    const copyButton = document.createElement("span");
    
    copyButton.innerHTML = createCopyButtonHtml(filename)
    copyButton.setAttribute("class", "copy-button")

    return copyButton
}

function addFilenameCopyButtonFilePage() {
    const filenameElements = document.getElementsByClassName("final-path");

    console.log("FILE PAGE MATCH")

    if (!filenameElements || filenameElements.length == 0) {
        return
    }

    const filename = filenameElements[0].innerHTML
    const filePathElements = document.querySelector("#blob-path");
    const copyButton = createCopyButton(filename)
    copyButton.style.transformOrigin = "50% 50%"
    copyButton.style.transformBox= "fill-box"
    copyButton.style.transform = "scale(2)"
    
    filePathElements.querySelectorAll(".copy-button").forEach(el => el.remove())
    filePathElements.appendChild(copyButton, null)
}

function addFilenameCopyButtonPullRequestMentions() {
    const filenameLinks = document.querySelectorAll(".review-thread-component summary span > a");

    console.log("PULL REQUEST MATCH")

    if (!filenameLinks || filenameLinks.length == 0) {
        return
    }

    filenameLinks.forEach(a => {
        const filename = a.innerHTML
        const copyButton = createCopyButton(filename)
        const parent = a.parentElement
        const parentParent = a.closest("details")

        parent.querySelectorAll(".copy-button").forEach(el => el.remove())

        copyButton.addEventListener("click", e => {
            if (parentParent.hasAttribute("open")) {
                parentParent.removeAttribute("open", "")
            } else {
                parentParent.setAttribute("open", "")
            }
        })

        a.insertAdjacentElement('afterend', copyButton)


    })
}

function addFilenameCopyButton(request, sender, sendResponse) {
    const filePagePattern = /^https:\/\/github\.com\/(.+\/)+(.+\.[^\/]+)$/;
    const pullRequestPattern = /^https:\/\/github.com\/(.+\/)+pull\/\d+$/
    
    if (request.type !== "tabUpdateEvent") {
        return
    }

    if (request.tab.url.match(filePagePattern)){
        return addFilenameCopyButtonFilePage();
    }

    if (request.tab.url.match(pullRequestPattern)) {
        return addFilenameCopyButtonPullRequestMentions();
    }
}

browser.runtime.onMessage.addListener(addFilenameCopyButton);
