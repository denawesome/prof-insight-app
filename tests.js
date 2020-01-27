class ProfTest {
    constructor(obj) {
        this.testData = obj;
    }

    init() {
        console.log(this.testData);
    }
}

async function getTestsData() {
    let response = await fetch('http://wp/prof-insight/wp-content/themes/kava/assets/js/testsData.json')
    let data = await response.json()

    return data
}

(async () => {
    let testData = await getTestsData();

    const testOnTypesOfIntelligence = new ProfTest(testData);
    testOnTypesOfIntelligence.init(testData);
})();

