export const CASES_CONFIG = {
  created: {
    path: 'cases/mine',
    title: 'Hồ sơ tôi tạo',
  },
  processed: {
    path: 'cases/processed',
    title: 'Hồ sơ tôi xử lý',
  },
  involved: {
    path: 'cases/involved',
    title: 'Hồ sơ tôi tham gia',
  },
  watched: {
    path: 'cases/watched',
    title: 'Hồ sơ theo dõi',
  },
  'pending-assignment': {
    path: 'cases/pending-assignment',
    title: 'Hồ sơ chờ phân công',
  },
  returned: {
    path: 'cases/returned',
    title: 'Hồ sơ bị trả lại',
  },
  completed: {
    path: 'cases/completed',
    title: 'Hồ sơ hoàn thành',
  },
} as const;

export type CasesConfigKey = keyof typeof CASES_CONFIG;

export interface CaseNavInfo {
  basePath: string;
  title: string;
  configKey?: CasesConfigKey | 'cases' | 'quality';
}

export function getCaseNavInfo(pathname: string, caseId?: string | number): CaseNavInfo {
  const segments = pathname.split('/').filter(Boolean);

  if (pathname.startsWith('/quality/cert-standard')) {
    return {
      basePath: '/quality/cert-standard',
      title: 'Chứng nhận hợp chuẩn',
      configKey: 'quality',
    };
  }

  // Generic module & process path
  if (
    segments.length >= 2 &&
    !['cases', 'admin', 'tasks', 'dev', 'apps', 'users'].includes(segments[0])
  ) {
    return {
      basePath: `/${segments[0]}/${segments[1]}`,
      title: segments[1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      configKey: 'quality',
    };
  }

  if (pathname.startsWith('/cases/pending-assignment')) {
    return {
      basePath: caseId ? `/cases/pending-assignment/${caseId}/detail` : '/cases/pending-assignment',
      title: CASES_CONFIG['pending-assignment'].title,
      configKey: 'pending-assignment',
    };
  }

  for (const [key, config] of Object.entries(CASES_CONFIG)) {
    if (pathname.startsWith(`/${config.path}`)) {
      return {
        basePath: `/${config.path}`,
        title: config.title,
        configKey: key as CasesConfigKey,
      };
    }
  }

  return {
    basePath: '/cases',
    title: 'Hồ sơ',
    configKey: 'cases',
  };
}

export function getCaseDetailUrl(
  pageType: CasesConfigKey | 'cases',
  recordId: string | number,
): string {
  if (pageType === 'pending-assignment') {
    return `/cases/pending-assignment/${recordId}/detail`;
  }
  if (pageType === 'cases') {
    return `/cases/${recordId}`;
  }
  const config = CASES_CONFIG[pageType];
  const basePath = config?.path ? `/${config.path}` : '/cases/processed';
  return `${basePath}/${recordId}`;
}
