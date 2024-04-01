export const menuItems = [
    {
        id:1,
        title:"Cirugías",
        path:"/triaje/cirugias",
        cName: "nav-item",
    },
    {
        id:2,
        title:"Endodoncias",
        cName: "nav-item",
    },
    {
        id:3,
        title:"Periodoncia",
        cName: "nav-item",
    },
    {
        id:4,
        title:"Restauraciones",
        path:"/triaje/restauraciones",
        cName: "nav-item",
    },
    {
        id:5,
        title:"Prótesis",
        cName: "nav-item",
        
    },
    {
        id:6,
        title:"Odontopediatría",
        cName: "nav-item",
    },
    {
        id:7,
        title:"Ortodoncia",
        cName: "nav-item",
    },
];

export const endodonciaDropdown = [
    {
        id: 1,
        title:"Anterior",
        path:"/triaje/endodoncias/anterior",
        cName: "submenu-item"
    },{
        id: 2,
        title:"Premolar",
        path:"/triaje/endodoncias/pre-molar",
        cName: "submenu-item",
    },{
        id: 3,
        title:"Molar",
        path:"/triaje/endodoncias/molar",
        cName: "submenu-item",
    }
];

export const periodonciaDropdown =[
    {
        id: 1,
        title:"Paciente no quirúrgico",
        path:"/triaje/periodoncia/no-quirurgico",
        cName: "submenu-item",
    },{
        id: 2,
        title:"Paciente quirúrgico",
        path:"/triaje/periodoncia/quirurgico",
        cName: "submenu-item",
    },{
        id: 3,
        title:"Fase de Mantenimiento",
        path:"/triaje/periodoncia/fase-mantenimiento",
        cName: "submenu-item",
    },
];

export const protesisDropdown = [

    {
        id: 1,
        title:"Total",
        path:"/triaje/protesis/total",
        cName: "submenu-item",
    },{
        id: 2,
        title:"Removible",
        path:"/triaje/protesis/removible",
        cName: "submenu-item",
    },{
        id: 3,
        title:"Fija",
        path:"/triaje/protesis/fija",
        cName: "submenu-item",
    }

];

export const odontopediatriaDropdown = [

    {
        id: 1,
        title:"No operatorio",
        path:"/triaje/odontopediatria/no-operatorio",
        cName: "submenu-item",
    },{
        id: 2,
        title:"Operatorio",
        path:"/triaje/odontopediatria/operatorio",
        cName: "submenu-item",
    },{
        id: 3,
        title:"Control",
        path:"/triaje/odontopediatria/control",
        cName: "submenu-item",
    }
];

export const ortodonciaDropdown = [

    {
        id: 1,
        title:"Aparato",
        path:"/triaje/ortodoncia/aparato",
        cName: "submenu-item",
    },{
        id: 2,
        title:"Control",
        path:"/triaje/ortodoncia/control",
        cName: "submenu-item",
    },
];