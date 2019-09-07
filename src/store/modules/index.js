import { createModule } from 'vuex-toast';

import loan from './loan';
import form from './form';

export default {
  loan,
  form,
  toast: createModule({ dismissInterval: 8000 }),
};
