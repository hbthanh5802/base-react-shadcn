const prefixQueryKey = {
  ADMIN_BUSINESS_MODULES: 'ADMIN_BUSINESS_MODULES',
  ADMIN_BUSINESS_PROCESS: 'ADMIN_BUSINESS_PROCESS',
  ADMIN_BUSINESS_WORKFLOW: 'ADMIN_BUSINESS_WORKFLOW',
  ADMIN_BUSINESS_STAGE: 'ADMIN_BUSINESS_STAGE',
  ADMIN_BUSINESS_TASK: 'ADMIN_BUSINESS_TASK',
  ADMIN_DOC_CHECKLIST_DEFINITION: 'ADMIN_DOC_CHECKLIST_DEFINITION',
  ADMIN_DOC_CHECKLIST_DEFINITION_ITEM: 'ADMIN_DOC_CHECKLIST_DEFINITION_ITEM',
  CASES: 'CASES',
  RELATED_DOCUMENT: 'RELATED_DOCUMENT',
  FILE_UPLOAD: 'FILE_UPLOAD',
  TASK_ASSIGNMENT: 'TASK_ASSIGNMENT',
  TASK_INSTANCE: 'TASK_INSTANCE',
  STAGE_INSTANCE: 'STAGE_INSTANCE',
  COUNCIL_ESTABLISHMENT_DECISION_DRAFT: 'COUNCIL_ESTABLISHMENT_DECISION_DRAFT',
  COUNCIL_ESTABLISHMENT_DECISION: 'COUNCIL_ESTABLISHMENT_DECISION',
  IDENTITY_ROLE: 'IDENTITY_ROLE',
  IDENTITY_PERSON: 'IDENTITY_PERSON',
  APPLICATION_SCOPE: 'APPLICATION_SCOPE',
  PARTY_GROUP: 'PARTY_GROUP',
  PARTY_GROUP_MEMBER: 'PARTY_GROUP_MEMBER',
  PARTY_INVOLVED: 'PARTY_INVOLVED',
  TASK_QUERY: 'TASK_QUERY',
  STATUS_DEFINITION: 'STATUS_DEFINITION',
  CASE_REVISION: 'CASE_REVISION',
  TEST_SETUP: 'TEST_SETUP',
  CASE_STANDARD_REFERENCE: 'CASE_STANDARD_REFERENCE',
  CASE_PRODUCT_DETAIL: 'CASE_PRODUCT_DETAIL',
  ORGANIZATION: 'ORGANIZATION',
  TEST_SAMPLE: 'TEST_SAMPLE',
  TEST_RESULT_EVALUATION: 'TEST_RESULT_EVALUATION',
  TEST_REPORT: 'TEST_REPORT',
  ECABINET: 'ECABINET',
  ECABINET_TASK: 'ECABINET_TASK',
  ECABINET_MEMBER: 'ECABINET_MEMBER',
  ECABINET_DOCUMENT: 'ECABINET_DOCUMENT',
};

export const adminBusinessModuleQueryKey = {
  MODULE_LIST: `${prefixQueryKey.ADMIN_BUSINESS_MODULES}_MODULE_LIST`,
  MODULE_DETAIL: `${prefixQueryKey.ADMIN_BUSINESS_MODULES}_MODULE_DETAIL`,
};

export const adminBusinessProcessQueryKey = {
  PROCESS_LIST: `${prefixQueryKey.ADMIN_BUSINESS_PROCESS}_PROCESS_LIST`,
  PROCESS_DETAIL: `${prefixQueryKey.ADMIN_BUSINESS_PROCESS}_PROCESS_DETAIL`,
};

export const adminBusinessWorkflowQueryKey = {
  WORKFLOW_LIST: `${prefixQueryKey.ADMIN_BUSINESS_WORKFLOW}_PROCESS_LIST`,
  WORKFLOW_DETAIL: `${prefixQueryKey.ADMIN_BUSINESS_STAGE}_WORKFLOW_DETAIL`,
};

export const adminBusinessStageQueryKey = {
  STAGE_LIST: `${prefixQueryKey.ADMIN_BUSINESS_STAGE}_STAGE_LIST`,
  STAGE_DETAIL: `${prefixQueryKey.ADMIN_BUSINESS_STAGE}_STAGE_DETAIL`,
};

export const adminBusinessTaskQueryKey = {
  TASK_LIST: `${prefixQueryKey.ADMIN_BUSINESS_TASK}_TASK_LIST`,
  TASK_DETAIL: `${prefixQueryKey.ADMIN_BUSINESS_TASK}_TASK_DETAIL`,
};

export const adminDocChecklistDefQueryKey = {
  DOC_CHECKLIST: `${prefixQueryKey.ADMIN_DOC_CHECKLIST_DEFINITION}_DOC_CHECKLIST`,
  DOC_CHECKLIST_DETAIL: `${prefixQueryKey.ADMIN_DOC_CHECKLIST_DEFINITION}_DOC_CHECKLIST_DETAIL`,
};

export const adminDocChecklistDefItemQueryKey = {
  DOC_CHECKLIST_ITEM_LIST: `${prefixQueryKey.ADMIN_DOC_CHECKLIST_DEFINITION_ITEM}_DOC_CHECKLIST_ITEM_LIST`,
  DOC_CHECKLIST_ITEM_DETAIL: `${prefixQueryKey.ADMIN_DOC_CHECKLIST_DEFINITION_ITEM}_DOC_CHECKLIST_ITEM_DETAIL`,
};

export const casesQueryKey = {
  PENDING_ASSIGN_LIST: `${prefixQueryKey.CASES}_PENDING_ASSIGN_LIST`,
  MY_CREATED_LIST: `${prefixQueryKey.CASES}_MY_CREATED_LIST`,
  MY_CREATED_STATS: `${prefixQueryKey.CASES}_MY_CREATED_STATS`,
  MY_PROCESSED_LIST: `${prefixQueryKey.CASES}_MY_PROCESSED_LIST`,
  MY_PROCESSED_STATS: `${prefixQueryKey.CASES}_MY_PROCESSED_STATS`,
  MY_JOINED_LIST: `${prefixQueryKey.CASES}_MY_JOINED_LIST`,
  MY_JOINED_STATS: `${prefixQueryKey.CASES}_MY_JOINED_STATS`,
  MY_WATCHED_LIST: `${prefixQueryKey.CASES}_MY_WATCHED_LIST`,
  MY_WATCHED_STATS: `${prefixQueryKey.CASES}_MY_WATCHED_STATS`,
};

export const relatedDocumentQueryKey = {
  RELATED_DOCUMENT_LIST: `${prefixQueryKey.RELATED_DOCUMENT}_RELATED_DOCUMENT_LIST`,
  RELATED_DOCUMENT_DETAIL: `${prefixQueryKey.RELATED_DOCUMENT}_RELATED_DOCUMENT_DETAIL`,
};

export const fileUploadQueryKey = {
  PRESIGNED_URL_BY_FILE_ID: `${prefixQueryKey.FILE_UPLOAD}_PRESIGNED_URL_BY_FILE_ID`,
  PRESIGNED_URL_BY_OBJECT_KEY: `${prefixQueryKey.FILE_UPLOAD}_PRESIGNED_URL_BY_OBJECT_KEY`,
};

export const taskAssignmentQueryKey = {
  TASK_ASSIGNMENT_LIST: `${prefixQueryKey.TASK_ASSIGNMENT}_TASK_ASSIGNMENT_LIST`,
  USER_DELEGATION_LIST: `${prefixQueryKey.TASK_ASSIGNMENT}_USER_DELEGATION_LIST`,
};

export const taskInstanceQueryKey = {
  TASK_INSTANCE_DETAIL: `${prefixQueryKey.TASK_INSTANCE}_TASK_INSTANCE_DETAIL`,
  TASK_INSTANCE_MORE_DETAIL: `${prefixQueryKey.TASK_INSTANCE}TASK_INSTANCE_MORE_DETAIL`,
};

export const stageInstanceQueryKey = {
  STAGE_INSTANCE_DETAIL: `${prefixQueryKey.STAGE_INSTANCE}_STAGE_INSTANCE_DETAIL`,
};

export const councilEstablishmentDecisionDraftQueryKey = {
  LIST: `${prefixQueryKey.COUNCIL_ESTABLISHMENT_DECISION_DRAFT}_LIST`,
  DETAIL: `${prefixQueryKey.COUNCIL_ESTABLISHMENT_DECISION_DRAFT}_DETAIL`,
};

export const councilEstablishmentDecisionQueryKey = {
  LIST: `${prefixQueryKey.COUNCIL_ESTABLISHMENT_DECISION}_LIST`,
  DETAIL: `${prefixQueryKey.COUNCIL_ESTABLISHMENT_DECISION}_DETAIL`,
};

export const identityRoleQueryKey = {
  LIST: `${prefixQueryKey.IDENTITY_ROLE}_LIST`,
};

export const identityPersonQueryKey = {
  LIST: `${prefixQueryKey.IDENTITY_PERSON}_LIST`,
};

export const applicationScopeQueryKey = {
  ACTIVE_LIST: `${prefixQueryKey.APPLICATION_SCOPE}_ACTIVE_LIST`,
};

export const partyGroupQueryKey = {
  LIST: `${prefixQueryKey.PARTY_GROUP}_LIST`,
  DETAIL: `${prefixQueryKey.PARTY_GROUP}_DETAIL`,
};

export const partyGroupMemberQueryKey = {
  LIST: `${prefixQueryKey.PARTY_GROUP_MEMBER}_LIST`,
  DETAIL: `${prefixQueryKey.PARTY_GROUP_MEMBER}_DETAIL`,
};

export const partyInvolvedQueryKey = {
  LIST: `${prefixQueryKey.PARTY_INVOLVED}_LIST`,
  DETAIL: `${prefixQueryKey.PARTY_INVOLVED}_DETAIL`,
};

export const taskQueryKeys = {
  ALL: `${prefixQueryKey.TASK_QUERY}_ALL`,
  TODO: `${prefixQueryKey.TASK_QUERY}_TODO`,
  SUMMARY: `${prefixQueryKey.TASK_QUERY}_SUMMARY`,
  PENDING_APPROVAL: `${prefixQueryKey.TASK_QUERY}_PENDING_APPROVAL`,
  DELEGATED: `${prefixQueryKey.TASK_QUERY}_DELEGATED`,
  TASK_DROPDOWN_BY_CASE: `${prefixQueryKey.TASK_QUERY}_TASK_DROPDOWN_BY_CASE`,
};

export const statusDefinitionQueryKey = {
  LIST: `${prefixQueryKey.STATUS_DEFINITION}_LIST`,
};

export const caseRevisionQueryKey = {
  LIST: `${prefixQueryKey.CASE_REVISION}_LIST`,
  DETAIL: `${prefixQueryKey.CASE_REVISION}_DETAIL`,
};

export const testSetupQueryKey = {
  LIST: `${prefixQueryKey.TEST_SETUP}_LIST`,
  DETAIL: `${prefixQueryKey.TEST_SETUP}_DETAIL`,
};

export const caseStandardReferenceQueryKey = {
  LIST: `${prefixQueryKey.CASE_STANDARD_REFERENCE}_LIST`,
};

export const caseProductDetailQueryKey = {
  LIST: `${prefixQueryKey.CASE_PRODUCT_DETAIL}_LIST`,
};

export const organizationQueryKey = {
  LIST: `${prefixQueryKey.ORGANIZATION}_LIST`,
};

export const testSampleQueryKey = {
  LIST: `${prefixQueryKey.TEST_SAMPLE}_LIST`,
  DETAIL: `${prefixQueryKey.TEST_SAMPLE}_DETAIL`,
};

export const testResultEvaluationQueryKey = {
  LIST: `${prefixQueryKey.TEST_RESULT_EVALUATION}_LIST`,
  DETAIL: `${prefixQueryKey.TEST_RESULT_EVALUATION}_DETAIL`,
};

export const testReportQueryKey = {
  LIST: `${prefixQueryKey.TEST_REPORT}_LIST`,
  DETAIL: `${prefixQueryKey.TEST_REPORT}_DETAIL`,
};

export const ecabinetQueryKey = {
  LIST: `${prefixQueryKey.ECABINET}_LIST`,
  DETAIL: `${prefixQueryKey.ECABINET}_DETAIL`,
};

export const ecabinetTaskQueryKey = {
  LIST: `${prefixQueryKey.ECABINET_TASK}_LIST`,
  DETAIL: `${prefixQueryKey.ECABINET_TASK}_DETAIL`,
};

export const ecabinetMemberQueryKey = {
  LIST: `${prefixQueryKey.ECABINET_MEMBER}_LIST`,
  DETAIL: `${prefixQueryKey.ECABINET_MEMBER}_DETAIL`,
};

export const ecabinetDocumentQueryKey = {
  LIST: `${prefixQueryKey.ECABINET_DOCUMENT}_LIST`,
  DETAIL: `${prefixQueryKey.ECABINET_DOCUMENT}_DETAIL`,
};
