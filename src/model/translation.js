import { pushData, update,addData, removeData} from './data';
import _ from 'lodash';

const langs = ['ar', 'en'];
const defaultLang = 'en';

export function addTranslation(ref, data){
  console.log('adding translation for default lang', defaultLang);
  addData(`translations/${ref}/${defaultLang}`, data);
}
