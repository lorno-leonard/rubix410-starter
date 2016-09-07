import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';


export function push(data){
  console.log('Pushing location', data);
  let locationId = pushData('locations', data);
  addTranslation('locations/' + locationId, {title: data.title});

  return locationId;
}

export function loadLocation(locationId){
  let data = getData(`locations/${locationId}`);

  console.log(data);
}


export function remove(locationId){
  return removeData(`locations/${locationId}`);
}