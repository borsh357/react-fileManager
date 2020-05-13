import { filemanagerStrusture } from './store';

export async function fetchFiles() {
  let data = await getdata();
  filemanagerStrusture.entries = data;
}

async function getdata() {
  return await fetch('http://localhost:3001/files')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (ex) {
      console.log('Fetch dailed! ', ex);
    });
}
