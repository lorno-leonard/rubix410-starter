import { pushData,update,addData,getData,removeData} from './data';


export function push(data){
  return pushData('location-areas', data);
}

export function set(id, data){

  console.log('Setting Location for areas', data);
  return addData(`location-areas/${id}`, data);
}

export function remove(id){
  return removeData('location-areas', id);
}

export function load(locationId){
  console.log('load location areas for location', locationId);
  return getData(`location-areas/${locationId}`);
}