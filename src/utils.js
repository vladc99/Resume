const menus = [
    {
        label: "Home",
        icon: "pi pi-home",
        command: () => {
            window.location.href = "/Resume"
        }
    },
    {
        label: "LinkedIn",
        icon: "pi pi-linkedin",
        command: () => {
            window.open("https://www.linkedin.com/in/vladcrihan/", "_blank");
        },
    },
    {
        label: "GitHub",
        icon: "pi pi-github",
        command: () => {
            window.open("https://github.com/vladc99", "_blank");
        },
    },
    {
        label: "Projects",
        icon: "pi pi-folder",
        command: () => {
            window.location.href = "/Resume/project";
        },
    },
    {
        label: "Projects (All)",
        icon: "pi pi-cog",
        command: () => {
            window.location.href = "/Resume/projects";
        },
    },
]

export default {
    menus
}