import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';
import q from 'q';
import _ from 'lodash';

export function push(areas){
  let Ids = [];
  let promises = [];
  let deferAreas = q.defer();


  console.log('Pushing areas', areas);

  _.forEach(areas, (title, k) =>{
    let deferred = q.defer();
    let areaId = pushData('areas', {title});
    addTranslation('areas/' + areaId, {title});

    Ids.push({areaId: {title}});
    deferred.resolve(areaId);

    promises.push(deferred.promise);
  });

  console.log(Ids);

  q.all(promises).then(()=>{
    deferAreas.resolve(Ids)
  }).catch(e=>deferAreas.reject());

  return deferAreas.promise;
}

export function load(areasIds){
  let promises = [];
  let areas = [];
  let defered = q.defer();

  _.forEach(areasIds, (areaId, k) =>{
    let defer = q.defer();
    getData(`areas/${areaId}`).then((area)=>{
      defer.resolve(area);
      areas.push(area);
    }).catch(e => defer.reject());

    promises.push(defer.promise);
  });

  q.all(promises).then(()=>defered.resolve(areas)).catch(e=> defered.reject())

  return defered.promise;
}

