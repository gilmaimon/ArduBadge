module.exports = function getBadgeResourcePath(base64Logo, repoName, available, version = null) {
    repoName = repoName.replace('-', '--');
    version = version? version.replace('-', '--'): null;
    baseUrl = `https://img.shields.io/badge/Library Manager-`;
    if(available) {
        return baseUrl + repoName + ' ' + version + `-brightgreen.svg?logo=data:image/png;base64,${base64Logo}`
    } else {
        return baseUrl + repoName + `-lightgrey.svg?logo=data:image/png;base64,${base64Logo}`
    }
};