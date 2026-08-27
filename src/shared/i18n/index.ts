import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import authEn from './locales/en/auth.json';
import commonEn from './locales/en/common.json';
import componentsEn from './locales/en/components.json';
import delegationEn from './locales/en/delegation.json';
import modulesEn from './locales/en/modules.json';
import orgStructureEn from './locales/en/org-structure.json';
import permissionsEn from './locales/en/permissions.json';
import personnelEn from './locales/en/personnel.json';
import processesEn from './locales/en/processes.json';
import rolesEn from './locales/en/roles.json';
import stageEn from './locales/en/stages.json';
import tasksEn from './locales/en/tasks.json';
import userEn from './locales/en/user.json';
import workflowEn from './locales/en/workflows.json';
import authVi from './locales/vi/auth.json';
import commonVi from './locales/vi/common.json';
import componentsVi from './locales/vi/components.json';
import delegationVi from './locales/vi/delegation.json';
import modulesVi from './locales/vi/modules.json';
import orgStructureVi from './locales/vi/org-structure.json';
import permissionsVi from './locales/vi/permissions.json';
import personnelVi from './locales/vi/personnel.json';
import processesVi from './locales/vi/processes.json';
import rolesVi from './locales/vi/roles.json';
import stageVi from './locales/vi/stages.json';
import tasksVi from './locales/vi/tasks.json';
import userVi from './locales/vi/user.json';
import workflowVi from './locales/vi/workflows.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    supportedLngs: ['vi', 'en'],
    defaultNS: 'common',
    ns: [
      'common',
      'auth',
      'user',
      'components',
      'personnel',
      'org-structure',
      'roles',
      'permissions',
      'delegation',
      'modules',
      'processes',
      'workflows',
      'stages',
    ],
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    resources: {
      vi: {
        common: commonVi,
        auth: authVi,
        user: userVi,
        components: componentsVi,
        personnel: personnelVi,
        'org-structure': orgStructureVi,
        roles: rolesVi,
        permissions: permissionsVi,
        delegation: delegationVi,
        modules: modulesVi,
        processes: processesVi,
        tasks: tasksVi,
        workflows: workflowVi,
        stages: stageVi,
      },
      en: {
        common: commonEn,
        auth: authEn,
        user: userEn,
        components: componentsEn,
        personnel: personnelEn,
        'org-structure': orgStructureEn,
        roles: rolesEn,
        permissions: permissionsEn,
        delegation: delegationEn,
        modules: modulesEn,
        processes: processesEn,
        tasks: tasksEn,
        workflows: workflowEn,
        stages: stageEn,
      },
    },
  });

export default i18n;
