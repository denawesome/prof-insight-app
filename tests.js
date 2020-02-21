class ProfTest {
    constructor(options) {
        this.data = options.data;
        this.type = options.type;
        this.progress = null;
    }

    init() {
        this.renderTest();
    }

    renderTest() {
        switch (this.type) {
            case 'intelligence':
                this._renderIntelligenceTest();
                break;
            default:
                break;
        }
    }

    _renderIntelligenceTest() {
        let max = this.data.length;
        let passButton = document.createElement('button');
        let testWrapper = document.querySelector('#' + this.type + 'Test');

        for (let i = 0; i < max; i++) {
            let listWrapper = document.createElement('ul');
            let titleElement = document.createElement('h3');

            titleElement.innerHTML = i + 1 + '. ' + this.data[i].title;
            listWrapper.appendChild(titleElement);
            let postfix = 0;
            for (let j = 0; j < this.data[i].data.length; j++) {
                let singleElement = document.createElement('li');

                singleElement.innerHTML = `<span>${j + 1}. ${this.data[i].data[j].answer}</span>`;
                singleElement.insertAdjacentHTML(
                    'afterbegin',
                    `<div class="check-wrapper">
                        <input id="answer${i}${j}_${postfix}" type="radio" value="1" name="answer${i}${j}">
                        <label for="answer${i}${j}_${postfix}" class="check"></label>
                    </div>
                    <div class="check-wrapper">
                        <input id="answer${i}${j}_${postfix+1}" type="radio" value="0" name="answer${i}${j}">
                        <label for="answer${i}${j}_${postfix+1}" class="check"></label>                        
                    </div>
                    `
                );
                postfix + 1;
                    
                listWrapper.appendChild(singleElement);
            } 

            testWrapper.appendChild(listWrapper);
        }

        passButton.setAttribute('id', 'passIntelligenceTest');
        passButton.innerHTML = 'Завершить';
        testWrapper.appendChild(passButton);
    }
}

async function getIntelligenceTestsData() {
    let response = await fetch('http://wp/prof-insight/wp-content/themes/kava/assets/js/intelligenceTestData.json')
    let data = await response.json()

    return data
}

(async () => {

    const intelligenceTest = new ProfTest({
        type: 'intelligence',
        data: await getIntelligenceTestsData()
    });
    
    intelligenceTest.init();
})();
