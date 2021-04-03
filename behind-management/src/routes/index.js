import Login from '../components/login/login'
import Check from '../pages/Check/Check'
import Person from '../pages/Person/Person'
import Project from '../pages/Project/Project'
import Stu from '../pages/Stu/Stu'
import Trouble from '../pages/Trouble/Trouble'
import Notice from '../pages/Notice/Notice'
import User from '../pages/Users/Users'
import { RocketTwoTone, CrownTwoTone,PieChartTwoTone,UserOutlined, LaptopOutlined, NotificationOutlined,MessageTwoTone} from '@ant-design/icons';

export const mainRoutes = [
    {
        path:"/login",
        component:Login
    }
];

export const adminRoutes = [
    {
        path:"/admin/check",
        component:Check,
        isShow: true,
        title: '查询',
        icon:<PieChartTwoTone />
    },
    {
        path:"/admin/person",
        component:Person,
        isShow: true,
        title: '个人管理',
        icon:<CrownTwoTone />
    },
    {
        path:"/admin/project",
        component:Project,
        isShow: true,
        title: '选题管理',
        icon:<NotificationOutlined />
    },
    {
        path:"/admin/stu",
        component:Stu,
        isShow: true,
        title: '学生管理',
        icon:<LaptopOutlined />
    },
    {
        path:"/admin/trouble",
        component:Trouble,
        isShow: true,
        title: '答疑管理',
        icon:<UserOutlined />
    },
    {
        path:"/admin/notice",
        component:Notice,
        isShow: true,
        title: '通告管理',
        icon:<MessageTwoTone />
    },
    {
        path:"/admin/user",
        component:User,
        isShow: true,
        title: '用户管理',
        icon:<RocketTwoTone />
    }
]