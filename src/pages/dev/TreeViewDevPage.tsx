import {
  Building,
  Building2,
  Edit,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  Lock,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import React, { useRef, useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { CodePreview } from '@/shared/components/ui/code-block';
import { notify } from '@/shared/components/ui/toast';
import {
  findNodeById,
  type TreeNode,
  TreeSelect,
  TreeView,
  type TreeViewRef,
  updateNodeChildrenInTree,
} from '@/shared/components/ui/tree-view';

// ── 1. Async Lazy Loading Mock Data & Handlers ──
const initialAsyncData: TreeNode[] = [
  { id: 'hn', label: 'Thành phố Hà Nội', isLeaf: false, badge: 'Đô thị loại đặc biệt' },
  { id: 'hcm', label: 'Thành phố Hồ Chí Minh', isLeaf: false, badge: 'Đô thị loại đặc biệt' },
  { id: 'dn', label: 'Thành phố Đà Nẵng', isLeaf: false, badge: 'Đô thị loại 1' },
  { id: 'hp', label: 'Thành phố Hải Phòng', isLeaf: false, badge: 'Đô thị loại 1' },
];

const mockChildrenApi: Record<string, TreeNode[]> = {
  hn: [
    { id: 'hn-bd', label: 'Quận Ba Đình', isLeaf: false, badge: '14 phường' },
    { id: 'hn-hk', label: 'Quận Hoàn Kiếm', isLeaf: false, badge: '18 phường' },
    { id: 'hn-cg', label: 'Quận Cầu Giấy', isLeaf: false, badge: '8 phường' },
    { id: 'hn-dd', label: 'Quận Đống Đa', isLeaf: false, badge: '21 phường' },
  ],
  'hn-hk': [
    { id: 'hn-hk-hb', label: 'Phường Hàng Bạc', isLeaf: true },
    { id: 'hn-hk-hd', label: 'Phường Hàng Đào', isLeaf: true },
    { id: 'hn-hk-tt', label: 'Phường Tràng Tiền', isLeaf: true },
    { id: 'hn-hk-lt', label: 'Phường Lý Thái Tổ', isLeaf: true },
  ],
  'hn-bd': [
    { id: 'hn-bd-qn', label: 'Phường Quán Thánh', isLeaf: true },
    { id: 'hn-bd-db', label: 'Phường Điện Biên', isLeaf: true },
    { id: 'hn-bd-dc', label: 'Phường Đội Cấn', isLeaf: true },
  ],
  hcm: [
    { id: 'hcm-q1', label: 'Quận 1', isLeaf: false, badge: '10 phường' },
    { id: 'hcm-q3', label: 'Quận 3', isLeaf: false, badge: '12 phường' },
    { id: 'hcm-td', label: 'TP. Thủ Đức', isLeaf: false, badge: '34 phường' },
  ],
  'hcm-q1': [
    { id: 'hcm-q1-bn', label: 'Phường Bến Nghé', isLeaf: true },
    { id: 'hcm-q1-bt', label: 'Phường Bến Thành', isLeaf: true },
    { id: 'hcm-q1-dk', label: 'Phường Đa Kao', isLeaf: true },
  ],
  dn: [
    { id: 'dn-hc', label: 'Quận Hải Châu', isLeaf: true },
    { id: 'dn-tk', label: 'Quận Thanh Khê', isLeaf: true },
    { id: 'dn-st', label: 'Quận Sơn Trà', isLeaf: true },
  ],
  hp: [
    { id: 'hp-hb', label: 'Quận Hồng Bàng', isLeaf: true },
    { id: 'hp-lc', label: 'Quận Lê Chân', isLeaf: true },
    { id: 'hp-nq', label: 'Quận Ngô Quyền', isLeaf: true },
  ],
};

// ── 2. Administrative Full Tree Data (Cascade Checkbox) ──
const adminHierarchyData: TreeNode[] = [
  {
    id: 'mb',
    label: 'Khu vực Miền Bắc',
    children: [
      {
        id: 'mb-hn',
        label: 'TP. Hà Nội',
        children: [
          {
            id: 'mb-hn-hk',
            label: 'Quận Hoàn Kiếm',
            children: [
              { id: 'mb-hn-hk-hb', label: 'Phường Hàng Bạc' },
              { id: 'mb-hn-hk-hd', label: 'Phường Hàng Đào' },
              { id: 'mb-hn-hk-tt', label: 'Phường Tràng Tiền' },
            ],
          },
          {
            id: 'mb-hn-bd',
            label: 'Quận Ba Đình',
            children: [
              { id: 'mb-hn-bd-qn', label: 'Phường Quán Thánh' },
              { id: 'mb-hn-bd-db', label: 'Phường Điện Biên' },
            ],
          },
          {
            id: 'mb-hn-cg',
            label: 'Quận Cầu Giấy',
            children: [
              { id: 'mb-hn-cg-dh', label: 'Phường Dịch Vọng Hậu' },
              { id: 'mb-hn-cg-yt', label: 'Phường Yên Hòa' },
            ],
          },
        ],
      },
      {
        id: 'mb-qn',
        label: 'Tỉnh Quảng Ninh',
        children: [
          { id: 'mb-qn-hl', label: 'TP. Hạ Long' },
          { id: 'mb-qn-cp', label: 'TP. Cẩm Phả' },
          { id: 'mb-qn-ub', label: 'TP. Uông Bí' },
        ],
      },
    ],
  },
  {
    id: 'mn',
    label: 'Khu vực Miền Nam',
    children: [
      {
        id: 'mn-hcm',
        label: 'TP. Hồ Chí Minh',
        children: [
          {
            id: 'mn-hcm-q1',
            label: 'Quận 1',
            children: [
              { id: 'mn-hcm-q1-bn', label: 'Phường Bến Nghé' },
              { id: 'mn-hcm-q1-bt', label: 'Phường Bến Thành' },
            ],
          },
          {
            id: 'mn-hcm-td',
            label: 'TP. Thủ Đức',
            children: [
              { id: 'mn-hcm-td-tc', label: 'Phường Thảo Điền' },
              { id: 'mn-hcm-td-ap', label: 'Phường An Phú' },
            ],
          },
        ],
      },
      {
        id: 'mn-bd',
        label: 'Tỉnh Bình Dương',
        children: [
          { id: 'mn-bd-tda', label: 'TP. Thủ Dầu Một' },
          { id: 'mn-bd-ta', label: 'TP. Thuận An' },
        ],
      },
    ],
  },
];

// ── 3. Enterprise Organization Tree Data ──
const organizationData: TreeNode[] = [
  {
    id: 'corp',
    label: 'Tập đoàn Công nghệ & Viễn thông',
    icon: <Building2 size={17} className="text-primary-600 dark:text-primary-400" />,
    badge: '180 nhân sự',
    children: [
      {
        id: 'bod',
        label: 'Ban Tổng Giám Đốc',
        icon: <UserCheck size={17} className="text-amber-500" />,
        badge: '5 thành viên',
      },
      {
        id: 'tech',
        label: 'Khối Công nghệ & Sản phẩm (Tech Hub)',
        icon: <Building size={17} className="text-blue-500" />,
        badge: '68 kỹ sư',
        children: [
          { id: 'tech-core', label: 'Trung tâm Phát triển Phần mềm Core', badge: '32 dev' },
          { id: 'tech-ai', label: 'Phòng Nghiên cứu AI & Dữ liệu lớn', badge: '16 dev' },
          { id: 'tech-devops', label: 'Đội Hạ tầng Cloud & DevOps', badge: '12 dev' },
          { id: 'tech-qa', label: 'Phòng Đảm bảo Chất lượng (QA/QC)', badge: '8 qa' },
        ],
      },
      {
        id: 'biz',
        label: 'Khối Kinh doanh & Tiếp thị (Growth)',
        icon: <Users size={17} className="text-emerald-500" />,
        badge: '45 nhân sự',
        children: [
          { id: 'biz-b2b', label: 'Phòng Khách hàng Doanh nghiệp B2B', badge: '20 nhân sự' },
          { id: 'biz-mkt', label: 'Phòng Digital Marketing & Thương hiệu', badge: '15 nhân sự' },
          { id: 'biz-cs', label: 'Trung tâm Chăm sóc Khách hàng (CS)', badge: '10 nhân sự' },
        ],
      },
      {
        id: 'ops',
        label: 'Khối Vận hành & Tài chính (Operations)',
        icon: <Shield size={17} className="text-purple-500" />,
        badge: '22 nhân sự',
        children: [
          { id: 'ops-hr', label: 'Phòng Nhân sự & Đào tạo (HR)', badge: '10 nhân sự' },
          { id: 'ops-acc', label: 'Phòng Kế toán & Kiểm toán nội bộ', badge: '12 nhân sự' },
        ],
      },
    ],
  },
];

// ── 4. File Explorer Tree Data ──
const fileExplorerData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'src-app',
        label: 'app',
        children: [
          { id: 'src-app-router', label: 'router.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
          { id: 'src-app-providers', label: 'providers.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
        ],
      },
      {
        id: 'src-shared',
        label: 'shared',
        children: [
          {
            id: 'src-shared-ui',
            label: 'components/ui',
            children: [
              { id: 'src-shared-ui-btn', label: 'button.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
              { id: 'src-shared-ui-tree', label: 'tree-view.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
              { id: 'src-shared-ui-dialog', label: 'modal-dialog.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
            ],
          },
          {
            id: 'src-shared-lib',
            label: 'lib',
            children: [
              { id: 'src-shared-lib-utils', label: 'utils.ts', icon: <FileCode size={16} className="text-amber-500" /> },
            ],
          },
        ],
      },
      { id: 'src-main', label: 'main.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
      { id: 'src-index-css', label: 'index.css', icon: <FileText size={16} className="text-emerald-500" /> },
    ],
  },
  { id: 'package-json', label: 'package.json', icon: <FileText size={16} className="text-purple-500" /> },
  { id: 'readme-md', label: 'README.md', icon: <FileText size={16} className="text-muted-foreground" /> },
];

// ── 5. Administrative & Personnel Mixed Tree Data (Phòng ban không chọn - Chỉ chọn Nhân sự) ──
const initialDeptAsyncData: TreeNode[] = [
  {
    id: 'dept-bod',
    label: 'Ban Giám Đốc Tập Đoàn',
    selectable: false, // ❌ Không cho chọn phòng ban
    isLeaf: false,
    icon: <Building2 size={17} className="text-primary-600 dark:text-primary-400" />,
    badge: 'Lãnh đạo',
  },
  {
    id: 'dept-tech',
    label: 'Khối Công Nghệ & Phần Mềm',
    selectable: false, // ❌ Không cho chọn khối
    isLeaf: false,
    icon: <Building size={17} className="text-blue-500" />,
    badge: 'Khối kỹ thuật',
  },
  {
    id: 'dept-growth',
    label: 'Khối Kinh Doanh & Tiếp Thị (Growth)',
    selectable: false,
    isLeaf: false,
    icon: <Users size={17} className="text-emerald-500" />,
    badge: 'Khối thương mại',
  },
  {
    id: 'dept-ops',
    label: 'Khối Vận Hành & Nhân Sự (Operations)',
    selectable: false,
    isLeaf: false,
    icon: <Shield size={17} className="text-purple-500" />,
    badge: 'Khối hỗ trợ',
  },
];

const mockDeptPersonnelApi: Record<string, TreeNode[]> = {
  // Khi mở Ban Giám Đốc: Vừa có 2 Lãnh đạo cấp cao, vừa có Ban Thư ký trực thuộc
  'dept-bod': [
    {
      id: 'emp-01',
      label: 'Nguyễn Văn An',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-amber-500" />,
      badge: 'Tổng Giám Đốc',
      data: { role: 'Tổng Giám Đốc', email: 'an.nguyen@company.vn' },
    },
    {
      id: 'emp-02',
      label: 'Trần Thị Mai',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-amber-500" />,
      badge: 'Phó Tổng Giám Đốc',
      data: { role: 'Phó Tổng Giám Đốc', email: 'mai.tran@company.vn' },
    },
    {
      id: 'dept-bod-sec',
      label: 'Văn phòng HĐQT & Ban Thư ký',
      selectable: false, // ❌ Phòng ban trực thuộc: không chọn được
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '2 nhân sự',
    },
  ],

  // Khi mở Văn phòng HĐQT: Trả về các chuyên viên
  'dept-bod-sec': [
    {
      id: 'emp-sec-01',
      label: 'Lê Bích Ngọc',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-amber-600" />,
      badge: 'Thư ký HĐQT',
      data: { role: 'Thư ký', email: 'ngoc.le@company.vn' },
    },
    {
      id: 'emp-sec-02',
      label: 'Vũ Đình Toàn',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-amber-600" />,
      badge: 'Chuyên viên Pháp chế',
      data: { role: 'Pháp chế', email: 'toan.vu@company.vn' },
    },
  ],

  // Khi mở Khối Công Nghệ: Vừa có 2 Nhân sự lãnh đạo Khối (CTO, Trợ lý), vừa có 3 Phòng ban trực thuộc
  'dept-tech': [
    {
      id: 'emp-tech-cto',
      label: 'Phạm Quang Hưng',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-600" />,
      badge: 'Giám đốc Công nghệ (CTO)',
      data: { role: 'CTO', email: 'hung.pham@company.vn' },
    },
    {
      id: 'emp-tech-pa',
      label: 'Nguyễn Thu Thủy',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'Trợ lý Kỹ thuật',
      data: { role: 'Technical Assistant', email: 'thuy.nguyen@company.vn' },
    },
    {
      id: 'dept-tech-core',
      label: 'Trung tâm Phát triển Phần mềm Core',
      selectable: false, // ❌ Phòng ban con không thể chọn
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '1 Trưởng phòng + 2 Tổ con',
    },
    {
      id: 'dept-tech-ai',
      label: 'Phòng Nghiên cứu AI & Dữ liệu lớn',
      selectable: false,
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '2 chuyên gia',
    },
    {
      id: 'dept-tech-qa',
      label: 'Phòng Đảm bảo Chất lượng (QA/QC)',
      selectable: false,
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '2 tester',
    },
  ],

  // Khi mở Trung tâm Phần mềm Core: Vừa có Trưởng phòng (Nhân sự), vừa có 2 Tổ nhóm nhỏ bên dưới
  'dept-tech-core': [
    {
      id: 'emp-03',
      label: 'Lê Hoàng Cường',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'Trưởng phòng (Lead Dev)',
      data: { role: 'Lead Dev', email: 'cuong.le@company.vn' },
    },
    {
      id: 'dept-tech-core-fe',
      label: 'Tổ Phát triển Web Frontend',
      selectable: false,
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '2 frontend dev',
    },
    {
      id: 'dept-tech-core-be',
      label: 'Tổ Phát triển Backend & DevOps',
      selectable: false,
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '2 backend dev',
    },
  ],

  // Khi mở Tổ Frontend: Trả về các Dev Frontend
  'dept-tech-core-fe': [
    {
      id: 'emp-05',
      label: 'Hoàng Thị Yến',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'Senior Frontend Dev',
      data: { role: 'Frontend Dev', email: 'yen.hoang@company.vn' },
    },
    {
      id: 'emp-05b',
      label: 'Trương Tuấn Anh',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'Frontend Developer',
      data: { role: 'Frontend Dev', email: 'anh.truong@company.vn' },
    },
  ],

  // Khi mở Tổ Backend: Trả về các Dev Backend & DevOps
  'dept-tech-core-be': [
    {
      id: 'emp-04',
      label: 'Phạm Minh Đức',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'Backend Senior',
      data: { role: 'Backend Dev', email: 'duc.pham@company.vn' },
    },
    {
      id: 'emp-04b',
      label: 'Đinh Văn Hậu',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'DevOps Engineer',
      data: { role: 'DevOps', email: 'hau.dinh@company.vn' },
    },
  ],

  'dept-tech-ai': [
    {
      id: 'emp-06',
      label: 'Trịnh Công Minh',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'AI Research Lead',
      data: { role: 'AI Lead', email: 'minh.trinh@company.vn' },
    },
    {
      id: 'emp-07',
      label: 'Nguyễn Hải Đăng',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-blue-500" />,
      badge: 'Data Scientist',
      data: { role: 'Data Scientist', email: 'dang.nguyen@company.vn' },
    },
  ],

  'dept-tech-qa': [
    {
      id: 'emp-08',
      label: 'Vũ Quốc Hùng',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-emerald-500" />,
      badge: 'QA Lead',
      data: { role: 'QA Lead', email: 'hung.vu@company.vn' },
    },
    {
      id: 'emp-09',
      label: 'Đỗ Thu Thảo',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-emerald-500" />,
      badge: 'Automation Tester',
      data: { role: 'Automation Tester', email: 'thao.do@company.vn' },
    },
  ],

  // Khi mở Khối Kinh Doanh: Vừa có Giám đốc Marketing, vừa có Phòng B2B Sales
  'dept-growth': [
    {
      id: 'emp-10',
      label: 'Phan Mỹ Linh',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-emerald-500" />,
      badge: 'Giám đốc Marketing (CMO)',
      data: { role: 'CMO', email: 'linh.phan@company.vn' },
    },
    {
      id: 'dept-growth-b2b',
      label: 'Phòng Khách hàng Doanh nghiệp B2B',
      selectable: false,
      isLeaf: false,
      icon: <Folder size={17} className="text-muted-foreground" />,
      badge: '2 nhân sự',
    },
  ],

  'dept-growth-b2b': [
    {
      id: 'emp-11',
      label: 'Đặng Hoàng Long',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-emerald-500" />,
      badge: 'Trưởng nhóm B2B Sales',
      data: { role: 'Sales Lead', email: 'long.dang@company.vn' },
    },
    {
      id: 'emp-11b',
      label: 'Cao Minh Trí',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-emerald-500" />,
      badge: 'Chuyên viên Tư vấn Giải pháp',
      data: { role: 'Solution Consultant', email: 'tri.cao@company.vn' },
    },
  ],

  // Khi mở Khối Vận Hành: Trả về HR & Tuyển dụng
  'dept-ops': [
    {
      id: 'emp-12',
      label: 'Ngô Thanh Hà',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-purple-500" />,
      badge: 'Trưởng phòng Nhân sự',
      data: { role: 'HR Manager', email: 'ha.ngo@company.vn' },
    },
    {
      id: 'emp-13',
      label: 'Bùi Tuấn Kiệt',
      isLeaf: true,
      icon: <UserCheck size={16} className="text-purple-500" />,
      badge: 'Chuyên viên Tuyển dụng',
      data: { role: 'HR Recruiter', email: 'kiet.bui@company.vn' },
    },
  ],
};

export const TreeViewDevPage = () => {
  // Demo 1 State (Async Tree)
  const [asyncTreeData, setAsyncTreeData] = useState<TreeNode[]>(initialAsyncData);
  const [selectedAsyncKey, setSelectedAsyncKey] = useState<string[]>(['hn']);

  const handleAsyncLoadData = async (node: TreeNode) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const children = mockChildrenApi[node.id] || [];
        setAsyncTreeData((prev) => updateNodeChildrenInTree(prev, node.id, children));
        notify.info(`Tải thành công danh sách con của "${node.label}" từ server`, {
          description: `Đã nạp ${children.length} đơn vị hành chính cấp dưới.`,
        });
        resolve();
      }, 1000);
    });
  };

  // Demo 2 State (Admin Cascade Tree)
  const [adminSelectedKeys, setAdminSelectedKeys] = useState<string[]>([
    'mb-hn-hk-hb',
    'mb-hn-hk-hd',
    'mn-hcm-q1',
  ]);

  // Demo 5 State (TreeSelect Form)
  const [selectedSingleDept, setSelectedSingleDept] = useState<string>('tech-core');
  const [selectedMultiUnits, setSelectedMultiUnits] = useState<string[]>([
    'mb-hn-hk-tt',
    'mn-hcm-td-tc',
  ]);

  // Demo 6 State (Custom Search & Toolbar Ref)
  const customTreeRef = useRef<TreeViewRef>(null);
  const [customKeyword, setCustomKeyword] = useState('');

  // Demo 7 State (Mixed Department & Personnel Selection with Async Backend Loading & Stale Cache)
  const deptTreeRef = useRef<TreeViewRef>(null);
  const [deptAsyncTreeData, setDeptAsyncTreeData] = useState<TreeNode[]>(initialDeptAsyncData);
  const [selectedPersonnelKeys, setSelectedPersonnelKeys] = useState<string[]>([
    'emp-01',
  ]);
  const [isStaleOnCollapse, setIsStaleOnCollapse] = useState<boolean>(true);

  const handleAsyncLoadDept = async (node: TreeNode) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const children = mockDeptPersonnelApi[node.id] || [];
        setDeptAsyncTreeData((prev) => updateNodeChildrenInTree(prev, node.id, children));
        notify.info(`Tải thành công từ server`, {
          description: `Đã nạp ${children.length} đơn vị/nhân sự thuộc "${node.label}".`,
        });
        resolve();
      }, 800);
    });
  };

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Tree View" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Tree View / Tree Select</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Component Cây Phân Cấp hỗ trợ tải dữ liệu động từ Backend (Async Lazy Load), Checkbox Cascade đa cấp (Tri-state Indeterminate), Tìm kiếm thời gian thực, Tùy biến thanh công cụ và Dropdown TreeSelect cho Form.
        </p>
      </div>

      {/* ── 1. Async Lazy Loading Tree ── */}
      <CodePreview
        title="1. Tải dữ liệu Bất đồng bộ từ Backend khi mở nhánh (Async Lazy Loading)"
        description="Khi bấm mở node cha (chưa có con), TreeView tự động hiển thị spinner loading tại nút đó và gọi API tải danh sách đơn vị cấp dưới."
        code={`import { useState } from 'react';
import { TreeView, updateNodeChildrenInTree, type TreeNode } from '@/shared/components/ui/tree-view';

// 1. Dữ liệu ban đầu (chỉ nạp cấp Tỉnh/Thành phố, gắn isLeaf: false để cho phép mở rộng)
const initialData: TreeNode[] = [
  { id: 'hn', label: 'Thành phố Hà Nội', isLeaf: false, badge: 'Đô thị loại đặc biệt' },
  { id: 'hcm', label: 'Thành phố Hồ Chí Minh', isLeaf: false, badge: 'Đô thị loại đặc biệt' },
  { id: 'dn', label: 'Thành phố Đà Nẵng', isLeaf: false, badge: 'Đô thị loại 1' },
];

export const AsyncTreeExample = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['hn']);

  // 2. Callback gọi API khi bấm mở nhánh
  const handleLoadData = async (node: TreeNode) => {
    // Giả lập gọi API Backend mất 1 giây
    const res = await fetch(\`/api/locations/\${node.id}/children\`);
    const children = await res.json();

    // 3. Cập nhật danh sách con vào cây
    setTreeData((prev) => updateNodeChildrenInTree(prev, node.id, children));
  };

  return (
    <TreeView
      data={treeData}
      loadData={handleLoadData}
      selectionMode="single"
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => setSelectedKeys(keys)}
      searchable
      searchPlaceholder="Tìm tỉnh, quận, phường..."
      showLines
    />
  );
};`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <TreeView
              data={asyncTreeData}
              loadData={handleAsyncLoadData}
              selectionMode="single"
              selectedKeys={selectedAsyncKey}
              onSelectionChange={(keys) => setSelectedAsyncKey(keys)}
              searchable
              searchPlaceholder="Tìm tỉnh, quận, phường..."
              showLines
            />
          </div>
          <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-muted/20 p-4">
            <div className="space-y-2">
              <span className="text-title-2 text-foreground font-semibold block">Thông tin Node đang chọn:</span>
              <p className="text-body-2-rg text-muted-foreground">
                Key đang chọn: <code className="font-mono text-primary font-semibold">{selectedAsyncKey[0] || '(Chưa chọn)'}</code>
              </p>
              <div className="rounded-lg bg-card p-3 border border-border text-caption-1-rg text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">💡 Cơ chế Lazy Loading:</p>
                <p>1. Bấm mở <strong>Thành phố Hà Nội</strong> → Spinner xoay 1s → Tải 4 Quận.</p>
                <p>2. Bấm mở tiếp <strong>Quận Hoàn Kiếm</strong> → Spinner xoay 1s → Tải 4 Phường.</p>
                <p>3. Đóng và mở lại sẽ không gọi API lại do đã được cache tự động.</p>
              </div>
            </div>
            <div className="pt-4 flex gap-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => {
                  setAsyncTreeData(initialAsyncData);
                  notify.info('Đã đặt lại dữ liệu cây về ban đầu.');
                }}
              >
                Đặt lại dữ liệu gốc
              </Button>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 2. Administrative Checkbox Cascade ── */}
      <CodePreview
        title="2. Cây Đơn vị Hành chính & Checkbox Cascade (Tri-state Indeterminate)"
        description="Chọn cấp cha sẽ tự động chọn tất cả cấp con; khi chỉ chọn 1 phần cấp con, cấp cha hiển thị dấu gạch ngang (Bán chọn)."
        code={`import { useState } from 'react';
import { TreeView } from '@/shared/components/ui/tree-view';

export const AdminCascadeExample = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    'mb-hn-hk-hb',
    'mb-hn-hk-hd',
    'mn-hcm-q1',
  ]);

  return (
    <TreeView
      data={adminHierarchyData}
      selectionMode="checkbox"
      selectedKeys={selectedKeys}
      onSelectionChange={(keys, nodes) => setSelectedKeys(keys)}
      defaultExpandedKeys={['mb', 'mb-hn', 'mb-hn-hk', 'mn', 'mn-hcm']}
      searchable
      searchPlaceholder="Tìm kiếm địa giới hành chính..."
      showLines
    />
  );
};`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <TreeView
              data={adminHierarchyData}
              selectionMode="checkbox"
              selectedKeys={adminSelectedKeys}
              onSelectionChange={(keys) => setAdminSelectedKeys(keys)}
              defaultExpandedKeys={['mb', 'mb-hn', 'mb-hn-hk', 'mn', 'mn-hcm']}
              searchable
              showLines
            />
          </div>
          <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
            <span className="text-title-2 text-foreground font-semibold block">
              Danh sách ID được chọn ({adminSelectedKeys.length}):
            </span>
            <div className="max-h-64 overflow-y-auto rounded-lg bg-card p-3 border border-border">
              <div className="flex flex-wrap gap-1.5">
                {adminSelectedKeys.length > 0 ? (
                  adminSelectedKeys.map((key) => (
                    <span
                      key={key}
                      className="rounded-md bg-primary-50 px-2 py-0.5 text-caption-1-sb text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 font-mono"
                    >
                      {key}
                    </span>
                  ))
                ) : (
                  <span className="text-body-3-rg text-muted-foreground">Chưa có mục nào được chọn.</span>
                )}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => setAdminSelectedKeys([])}
              >
                Bỏ chọn tất cả
              </Button>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 3. Enterprise Organization Tree ── */}
      <CodePreview
        title="3. Cây Sơ đồ Tổ chức Doanh nghiệp & Tùy biến Icon, Hành động (Node Actions)"
        description="Hiển thị số lượng nhân sự qua Badge và menu thao tác nhanh (Thêm, Sửa, Xóa) khi hover lên từng đơn vị."
        code={`import { TreeView, type TreeNode } from '@/shared/components/ui/tree-view';
import { Building2, Building, UserCheck, Users, Shield, Plus, Edit, Trash2 } from 'lucide-react';

// 1. Cấu hình icon và badge trực tiếp trên từng TreeNode
const organizationData: TreeNode[] = [
  {
    id: 'corp',
    label: 'Tập đoàn Công nghệ & Viễn thông',
    icon: <Building2 size={17} className="text-primary-600 dark:text-primary-400" />,
    badge: '180 nhân sự',
    children: [
      {
        id: 'bod',
        label: 'Ban Tổng Giám Đốc',
        icon: <UserCheck size={17} className="text-amber-500" />,
        badge: '5 thành viên',
      },
      {
        id: 'tech',
        label: 'Khối Công nghệ & Sản phẩm',
        icon: <Building size={17} className="text-blue-500" />,
        badge: '68 kỹ sư',
        children: [
          { id: 'tech-core', label: 'Trung tâm Phát triển Phần mềm Core', badge: '32 dev' },
          { id: 'tech-ai', label: 'Phòng Nghiên cứu AI', badge: '16 dev' },
        ],
      },
      {
        id: 'biz',
        label: 'Khối Kinh doanh & Tiếp thị',
        icon: <Users size={17} className="text-emerald-500" />,
        badge: '45 nhân sự',
      },
      {
        id: 'ops',
        label: 'Khối Vận hành & Tài chính',
        icon: <Shield size={17} className="text-purple-500" />,
        badge: '22 nhân sự',
      },
    ],
  },
];

// 2. Component TreeView tích hợp icon & nút thao tác nhanh (nodeActions)
export const OrgTreeExample = () => (
  <TreeView
    data={organizationData}
    selectionMode="single"
    defaultExpandedKeys={['corp', 'tech', 'biz']}
    searchable
    searchPlaceholder="Tìm phòng ban, khối đơn vị..."
    showLines
    nodeActions={(node) => (
      <div className="flex items-center gap-1">
        <button
          type="button"
          title="Thêm cấp con"
          onClick={() => console.log('Thêm con:', node.label)}
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <Plus size={14} />
        </button>
        <button
          type="button"
          title="Đổi tên"
          onClick={() => console.log('Sửa:', node.label)}
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <Edit size={14} />
        </button>
        <button
          type="button"
          title="Xóa đơn vị"
          onClick={() => console.log('Xóa:', node.label)}
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-destructive cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    )}
  />
);`}
      >
        <div className="max-w-2xl">
          <TreeView
            data={organizationData}
            selectionMode="single"
            defaultExpandedKeys={['corp', 'tech', 'biz']}
            searchable
            searchPlaceholder="Tìm phòng ban, khối đơn vị..."
            showLines
            nodeActions={(node) => (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Thêm cấp con"
                  onClick={() => notify.success(`Thêm đơn vị con cho "${node.label}"`)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <Plus size={14} />
                </button>
                <button
                  type="button"
                  title="Đổi tên"
                  onClick={() => notify.info(`Chỉnh sửa đơn vị "${node.label}"`)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  title="Xóa đơn vị"
                  onClick={() => notify.error(`Xóa đơn vị "${node.label}"`)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-destructive cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          />
        </div>
      </CodePreview>

      {/* ── 4. File Explorer with Line Guides ── */}
      <CodePreview
        title="4. Cây Thư mục & Tệp tin (File Explorer - Tùy biến File Icons & Line Guides)"
        description="Đường gióng phân cấp trực quan kết hợp gắn icon đại diện theo từng định dạng file (.tsx, .ts, .css, .json, .md)."
        code={`import { TreeView, type TreeNode } from '@/shared/components/ui/tree-view';
import { FileCode, FileText } from 'lucide-react';

// 1. Định nghĩa cấu trúc thư mục & gán icon cho từng file
const fileExplorerData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'src-app',
        label: 'app',
        children: [
          { id: 'src-app-router', label: 'router.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
          { id: 'src-app-providers', label: 'providers.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
        ],
      },
      {
        id: 'src-shared',
        label: 'shared',
        children: [
          {
            id: 'src-shared-ui',
            label: 'components/ui',
            children: [
              { id: 'src-shared-ui-btn', label: 'button.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
              { id: 'src-shared-ui-tree', label: 'tree-view.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
            ],
          },
          {
            id: 'src-shared-lib',
            label: 'lib',
            children: [
              { id: 'src-shared-lib-utils', label: 'utils.ts', icon: <FileCode size={16} className="text-amber-500" /> },
            ],
          },
        ],
      },
      { id: 'src-main', label: 'main.tsx', icon: <FileCode size={16} className="text-blue-500" /> },
      { id: 'src-index-css', label: 'index.css', icon: <FileText size={16} className="text-emerald-500" /> },
    ],
  },
  { id: 'package-json', label: 'package.json', icon: <FileText size={16} className="text-purple-500" /> },
  { id: 'readme-md', label: 'README.md', icon: <FileText size={16} className="text-muted-foreground" /> },
];

export const FileExplorerExample = () => (
  <TreeView
    data={fileExplorerData}
    selectionMode="single"
    defaultExpandedKeys={['src', 'src-app', 'src-shared', 'src-shared-ui']}
    showLines={true}
  />
);`}
      >
        <div className="max-w-md">
          <TreeView
            data={fileExplorerData}
            selectionMode="single"
            defaultExpandedKeys={['src', 'src-app', 'src-shared', 'src-shared-ui']}
            showLines={true}
          />
        </div>
      </CodePreview>

      {/* ── 5. TreeSelect in Form ── */}
      <CodePreview
        title="5. Component TreeSelect dạng Dropdown Popover cho Biểu mẫu (Form)"
        description="Tích hợp TreeView vào ô nhập liệu: Hỗ trợ chọn đơn lẻ (Single Select) và chọn nhiều mục gắn Tag (Multiple Select)."
        code={`import { useState } from 'react';
import { TreeSelect } from '@/shared/components/ui/tree-view';

export const FormTreeSelectExample = () => {
  const [singleDept, setSingleDept] = useState('tech-core');
  const [multiUnits, setMultiUnits] = useState(['mb-hn-hk-tt', 'mn-hcm-td-tc']);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 1. Chọn đơn lẻ (Single Select) */}
      <TreeSelect
        data={organizationData}
        value={singleDept}
        onChange={(val) => setSingleDept(val as string)}
        placeholder="Chọn phòng ban công tác..."
        defaultExpandedKeys={['corp', 'tech']}
      />

      {/* 2. Chọn nhiều (Multiple Tag Select) */}
      <TreeSelect
        data={adminHierarchyData}
        multiple
        value={multiUnits}
        onChange={(vals) => setMultiUnits(vals as string[])}
        placeholder="Chọn các phường/quận phụ trách..."
        defaultExpandedKeys={['mb', 'mb-hn', 'mn', 'mn-hcm']}
      />
    </div>
  );
};`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-w-3xl">
          <div className="space-y-2">
            <label className="text-caption-1-sb text-foreground block">
              Đơn vị công tác chính (Single TreeSelect):
            </label>
            <TreeSelect
              data={organizationData}
              value={selectedSingleDept}
              onChange={(val) => setSelectedSingleDept(val as string)}
              placeholder="Chọn phòng ban công tác..."
              defaultExpandedKeys={['corp', 'tech']}
            />
            <p className="text-caption-2-rg text-muted-foreground">
              Giá trị đã chọn: <code className="font-mono text-primary font-medium">{selectedSingleDept}</code>
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-caption-1-sb text-foreground block">
              Địa bàn quản lý phụ trách (Multiple TreeSelect):
            </label>
            <TreeSelect
              data={adminHierarchyData}
              multiple
              value={selectedMultiUnits}
              onChange={(vals) => setSelectedMultiUnits(vals as string[])}
              placeholder="Chọn các phường/quận phụ trách..."
              defaultExpandedKeys={['mb', 'mb-hn', 'mn', 'mn-hcm']}
            />
            <p className="text-caption-2-rg text-muted-foreground">
              Đã chọn: <span className="font-medium text-foreground">{selectedMultiUnits.length} địa bàn</span>
            </p>
          </div>
        </div>
      </CodePreview>

      {/* ── 6. Custom Search, Toolbar & Ref Controls ── */}
      <CodePreview
        title="6. Tùy biến Thanh Tìm kiếm & Nút Mở rộng / Thu gọn (Custom Search & Toolbar Controls)"
        description="Hỗ trợ chèn thêm nút chức năng (headerExtra), thay thế hoàn toàn thanh công cụ (renderHeader) hoặc điều khiển đóng/mở qua TreeViewRef."
        code={`import { useRef, useState } from 'react';
import { TreeView, type TreeViewRef } from '@/shared/components/ui/tree-view';
import { Button } from '@/shared/components/ui/button';
import { RefreshCw, Search } from 'lucide-react';

export const CustomSearchToolbarExample = () => {
  const treeRef = useRef<TreeViewRef>(null);
  const [keyword, setKeyword] = useState('');

  return (
    <div className="space-y-4 max-w-xl">
      {/* 1. Tùy biến thanh công cụ thông qua prop renderHeader */}
      <TreeView
        ref={treeRef}
        data={organizationData}
        searchKeyword={keyword}
        onSearchKeywordChange={setKeyword}
        renderHeader={({ searchKeyword, setSearchKeyword, expandAll, collapseAll }) => (
          <div className="flex items-center gap-2 rounded-lg bg-muted/30 p-1.5 border border-border">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-body-3-rg focus:border-primary focus:outline-none"
              />
            </div>
            <Button size="small" variant="secondPrimary" tone="blue" onClick={expandAll}>
              Mở hết
            </Button>
            <Button size="small" variant="secondary" onClick={collapseAll}>
              Thu hết
            </Button>
          </div>
        )}
      />

      {/* 2. Điều khiển cây từ các nút bấm độc lập bên ngoài qua treeRef */}
      <div className="flex gap-2">
        <Button size="small" onClick={() => treeRef.current?.expandNode('tech')}>
          Mở riêng nhánh Tech
        </Button>
        <Button size="small" variant="outline" onClick={() => treeRef.current?.collapseNode('tech')}>
          Đóng nhánh Tech
        </Button>
      </div>
    </div>
  );
};`}
      >
        <div className="max-w-xl space-y-4">
          <TreeView
            ref={customTreeRef}
            data={organizationData}
            searchKeyword={customKeyword}
            onSearchKeywordChange={setCustomKeyword}
            defaultExpandedKeys={['corp', 'tech']}
            renderHeader={({ searchKeyword, setSearchKeyword, expandAll, collapseAll }) => (
              <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted/40 p-2 border border-border">
                <div className="relative flex-1 min-w-[200px]">
                  <Search
                    size={15}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Tìm nhanh đơn vị (Custom Toolbar)..."
                    className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-body-3-rg placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <Button
                  size="small"
                  variant="secondPrimary"
                  tone="blue"
                  onClick={() => {
                    expandAll();
                    notify.info('Đã mở rộng tất cả các nhánh');
                  }}
                >
                  Mở hết
                </Button>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => {
                    collapseAll();
                    notify.info('Đã thu gọn tất cả các nhánh');
                  }}
                >
                  Thu hết
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => {
                    setSearchKeyword('');
                    collapseAll();
                    notify.success('Đã làm mới cây phân cấp!');
                  }}
                >
                  <RefreshCw size={13} className="mr-1.5" />
                  Reset
                </Button>
              </div>
            )}
          />

          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted/20 p-3 border border-border text-caption-1-rg">
            <span className="font-semibold text-foreground">Điều khiển từ bên ngoài (qua ref):</span>
            <Button
              size="small"
              variant="outlinePrimary"
              tone="green"
              onClick={() => customTreeRef.current?.expandNode('tech')}
            >
              Mở nhánh Tech Hub
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => customTreeRef.current?.collapseNode('tech')}
            >
              Đóng nhánh Tech Hub
            </Button>
          </div>
        </div>
      </CodePreview>

      {/* ── 7. Mixed Department & Personnel Tree with Backend Calling & Stale Cache ── */}
      <CodePreview
        title="7. Cây Cơ cấu Đơn vị Tải Backend Động, Chọn Nhân sự & Cơ chế Stale Cache khi Thu gọn"
        description="Hỗ trợ tùy chọn staleOnCollapse (hoặc gọi collapseNode/invalidateNode với option markStale) để khi thu gọn nhánh, hệ thống đánh dấu dữ liệu đã cũ và tự động gọi API fetch lại dữ liệu mới nhất khi mở lại."
        code={`import { useRef, useState } from 'react';
import { TreeView, updateNodeChildrenInTree, type TreeNode, type TreeViewRef } from '@/shared/components/ui/tree-view';
import { Building2, Building } from 'lucide-react';

export const AsyncPersonnelStaleTreeExample = () => {
  const treeRef = useRef<TreeViewRef>(null);
  const [treeData, setTreeData] = useState<TreeNode[]>(initialDeptData);
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>(['emp-01']);
  const [staleOnCollapse, setStaleOnCollapse] = useState(true);

  // 1. Callback gọi Backend khi người dùng mở rộng từng Khối hoặc Phòng ban
  const handleLoadDeptData = async (node: TreeNode) => {
    const res = await fetch(\`/api/departments/\${node.id}/members\`);
    const children: TreeNode[] = await res.json();
    setTreeData((prev) => updateNodeChildrenInTree(prev, node.id, children));
  };

  return (
    <div className="space-y-3">
      {/* Cấu hình staleOnCollapse={true} để tự động fetch lại khi mở lại nhánh đã thu gọn */}
      <TreeView
        ref={treeRef}
        data={treeData}
        loadData={handleLoadDeptData}
        staleOnCollapse={staleOnCollapse}
        selectionMode="checkbox"
        selectedKeys={selectedPersonnel}
        onSelectionChange={(keys) => setSelectedPersonnel(keys)}
        searchable
        searchPlaceholder="Tìm kiếm nhân sự hoặc phòng ban..."
        showLines
      />

      {/* Điều khiển stale cache thủ công qua treeRef */}
      <div className="flex gap-2">
        <button onClick={() => treeRef.current?.collapseNode('dept-tech', { markStale: true })}>
          Thu gọn & Đánh dấu Stale Khối Tech
        </button>
        <button onClick={() => treeRef.current?.invalidateNode('dept-tech')}>
          Invalidate Cache Khối Tech (Fetch lại khi mở)
        </button>
      </div>
    </div>
  );
};`}
      >
        <div className="space-y-4">
          {/* Toggle Stale Option Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 p-3 border border-border">
            <label className="flex items-center gap-2.5 cursor-pointer text-body-2-rg text-foreground select-none">
              <Checkbox
                size="medium"
                checked={isStaleOnCollapse}
                onCheckedChange={(checked) => setIsStaleOnCollapse(Boolean(checked))}
              />
              <span className="font-medium">
                Bật tùy chọn <code className="font-mono text-primary font-semibold">staleOnCollapse</code>: Tự động đánh dấu dữ liệu cũ khi thu gọn (Fetch lại từ server khi mở lại)
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <TreeView
                ref={deptTreeRef}
                data={deptAsyncTreeData}
                loadData={handleAsyncLoadDept}
                staleOnCollapse={isStaleOnCollapse}
                selectionMode="checkbox"
                selectedKeys={selectedPersonnelKeys}
                onSelectionChange={(keys) => setSelectedPersonnelKeys(keys)}
                searchable
                searchPlaceholder="Tìm kiếm nhân sự hoặc phòng ban..."
                showLines
              />
            </div>
            <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-title-2 text-foreground font-semibold">
                    Nhân sự được chọn ({selectedPersonnelKeys.length}):
                  </span>
                  {selectedPersonnelKeys.length > 0 && (
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => setSelectedPersonnelKeys([])}
                    >
                      Xóa tất cả
                    </Button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto rounded-lg bg-card p-3 border border-border space-y-2">
                  {selectedPersonnelKeys.length > 0 ? (
                    selectedPersonnelKeys.map((key) => {
                      const foundEmp = findNodeById(deptAsyncTreeData, key);

                      return (
                        <div
                          key={key}
                          className="group flex items-center justify-between rounded-lg bg-muted/40 p-2.5 border border-border/60 transition-colors hover:bg-muted/70 hover:border-border"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                              <UserCheck size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-body-2-sb text-foreground truncate">{foundEmp?.label ?? key}</p>
                              <p className="text-caption-2-rg text-muted-foreground truncate">
                                {foundEmp?.data?.email ?? 'ID: ' + key}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-caption-2-sb text-primary-700 dark:bg-primary-950/70 dark:text-primary-300">
                              {foundEmp?.badge ?? 'Nhân sự'}
                            </span>
                            <button
                              type="button"
                              aria-label={`Xóa nhân sự ${foundEmp?.label ?? key}`}
                              title="Xóa khỏi danh sách chọn"
                              onClick={() => {
                                setSelectedPersonnelKeys((prev) => prev.filter((k) => k !== key));
                                notify.info(`Đã bỏ chọn "${foundEmp?.label ?? key}"`);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-6 text-center text-body-2-rg text-muted-foreground">
                      Chưa có nhân sự nào được chọn. Hãy mở các phòng ban (spinner nạp từ server) và tick chọn nhân sự.
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-card p-2.5 border border-border text-caption-2-rg text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">💡 Cơ chế Stale Cache & Refetch:</p>
                  <p>1. Khi <code className="font-mono text-primary">staleOnCollapse = true</code>, mỗi khi bạn đóng một phòng ban lại, node đó được đánh dấu là stale.</p>
                  <p>2. Khi bấm mở lại phòng ban đó, cây sẽ <strong>kích hoạt lại spinner và gọi lại API</strong> để lấy dữ liệu mới nhất.</p>
                  <p>3. Khi <code className="font-mono text-primary">staleOnCollapse = false</code>, cây giữ nguyên bộ nhớ cache cục bộ và mở lại tức thì.</p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    deptTreeRef.current?.collapseNode('dept-tech', { markStale: true });
                    notify.info('Đã thu gọn & đánh dấu Stale Khối Tech. Hãy mở lại để thấy API được gọi lại!');
                  }}
                >
                  Thu gọn & Đánh dấu Stale Khối Tech
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    deptTreeRef.current?.invalidateNode('dept-tech');
                    notify.info('Đã Invalidate Cache Khối Tech. Khi mở lại nhánh này sẽ fetch dữ liệu mới.');
                  }}
                >
                  Invalidate Cache Khối Tech
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    setDeptAsyncTreeData(initialDeptAsyncData);
                    setSelectedPersonnelKeys([]);
                    deptTreeRef.current?.invalidateAll();
                    notify.info('Đã đặt lại dữ liệu cây Cơ cấu Phòng ban.');
                  }}
                >
                  Đặt lại dữ liệu gốc
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CodePreview>
    </div>
  );
};

export default TreeViewDevPage;


