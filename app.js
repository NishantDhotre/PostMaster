console.log('Working');

// converting string into DOM element which is div
function getDomEle(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// hiding parameterBox initially
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';


// hiding json and showing parameterBox after chossing for custom parameters
let paramsRadio = document.getElementById('custom');
paramsRadio.addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';

});

// hiding parameterBox and showing jsonBox after chossing for custom parameters
let jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'block';
    document.getElementById('parameterBox').style.display = 'none';

});
let count = 1;
// adding moer parameter input box after clicking + button 
let addBox = document.getElementById('addBox');
addBox.addEventListener('click', () => {
    let parameterBox = document.getElementById('parameterBox');
    let string = `<div class="row g-3 my-2 " id="box${count + 1}">
                <label for="key" class="col"><br>Parameter ${count + 1}</label>
                <div class="col">
                    <input type="text" class="form-control" id="key${count + 1}" placeholder="key" aria-label="First name">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="value${count + 1}" placeholder="value" aria-label="Last name">
                </div>
                <div class="col">
                    <buttto class="btn btn-primary deletxBox" id="${count + 1}" >-</buttto>
                </div>
            </div>`;
    count++;
    let domEle = getDomEle(string);
    parameterBox.appendChild(domEle);

    // adding an addEventListener to remove the unwanted box from DOM 
    let deletBox = document.getElementsByClassName('deletxBox');
    for (item of deletBox) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        })

    }
});



// after clicking submit btn things here 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    // showing pleas wait line in DOM
    // document.getElementById('responsejsonText').value = `Please Wait ,Featching response...`;
    document.getElementById('responsejsonText').innerHTML = `Please Wait ,Featching response...`;
    Prism.highlightAll();

// getting url and request and content type 
    let url = document.getElementById('urlField').value;
    let requesType = document.querySelector("input[name='btnradio']:checked").value;
    let contentType = document.querySelector("input[name='btnradio1']:checked").value;


    // collecctign all keys and values if user wants to give custom parameters 

    if (contentType == `custom`) {
        data = {};
        for (let i = 0; i < count + 1; i++) {
            if (document.getElementById('key' + (i + 1)) != undefined) {

                let key = document.getElementById('key' + (i + 1));
                let value = document.getElementById('value' + (i + 1));
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else {
        data = document.getElementById('jsonText').value;
    }

    // making GET request 
    if (requesType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(Response => Response.text())
            .then((text) => {
                // document.getElementById('responsejsonText').value = text;
                document.getElementById('responsejsonText').innerHTML = text;
                Prism.highlightAll();

            });
    }
    else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById('responsejsonText').value = text;
            });

    }

});



