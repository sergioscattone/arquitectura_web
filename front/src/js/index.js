import store from './store/index';
import { addMateria } from './actions/index';

window.store = store;
window.addMateria = addMateria;

/*
En la consola del browser:
store.dispatch( addMateria({nombre:'sarasa'}))

*/