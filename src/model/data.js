import firebase from 'firebase';

export function addData(ref, data){
  return firebase.database().ref(ref).set(data);
}

export function pushData(ref, data){
  console.log('Pushing Data to REF ' + ref, data);
  return firebase.database().ref(ref).push(data).key;
}

export function update(ref, data){
  return firebase.database().ref(ref).update(data);
}

export function getData(ref){
  console.log('Retrieving', ref);
  return firebase.database().ref(ref).remove();
}

export function removeData(ref){
  return firebase.database().ref(ref).remove();
}