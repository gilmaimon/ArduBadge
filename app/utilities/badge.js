module.exports = function getBadgeResourcePath(base64Logo, repoName, library) {
    repoName = repoName.replace('-', '--');
    let version = library? library.version.replace('-', '--'): null;

    let baseUrl = `https://img.shields.io/badge/Library Manager-`;

    let leftLink = `https://www.arduino.cc/en/guide/libraries`; //url
    let rightLink = library? library.url: 'https://github.com/arduino/Arduino/wiki/Library-Manager-FAQ%23how-can-i-add-my-library-to-library-manager';
    commonParms = `link=${leftLink}&link=${rightLink}&logoWidth=17&logo=data:image/png;base64,${base64Logo}`;
    if(library) {
        return baseUrl + repoName + ' ' + version + `-brightgreen.svg?${commonParms}`
    } else {
        return baseUrl + repoName + `-lightgrey.svg?${commonParms}`
    }
};