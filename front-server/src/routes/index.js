export const mainRoutes = [
    {
        path:"/login",
        component:Login
    }
];

export const adminRoutes = [
    {
        path:"/admin/dashboard",
        component:Index
    },
    {
        path:"/admin/products",
        component:List,
        exact: true
    },
    {
        path:"/admin/product/edit/:id",
        component:Edit
    }
]