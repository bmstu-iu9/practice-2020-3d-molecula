
//Обращение к серверу
var status = function (response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText))
  }
  return Promise.resolve(response)
}
var json = function (response) {
  return response.json()
}

var link = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/" + current_molecula + "/JSON";

//Скачивание по ссылке 
fetch(link)
  .then(status)
  .then(json)
  .then(function (data) {
    console.log('data', data)
  })
  .catch(function (error) {
    console.log('error', error)
  })
