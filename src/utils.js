const menus = [
    {
        label: "Home",
        icon: "pi pi-home",
        command: () => {
            window.location.href = "/"
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
            window.location.href = "/projects";
        },
    },
]

export default {
    menus
}