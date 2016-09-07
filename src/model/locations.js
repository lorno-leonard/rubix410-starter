import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';


export function push(data){
  console.log('Pushing location', data);
  let locationId = pushData('locations', data);
  addTranslation('locations/' + locationId, {title: data.title});

  return locationId;
}

export function loadLocation(locationId){
  return getData(`locations/${locationId}`);
}


export function loadLocations(){
  return getData('locations');
}

export function remove(locationId){
  return removeData(`locations/${locationId}`);
}
