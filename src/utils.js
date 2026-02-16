const menus = [
    {
        label: "Home",
        icon: "pi pi-home",
        description: "Navigate to the home page",
        command: () => {
            window.location.href = "/"
        }
    },
    {
        label: "Projects",
        icon: "pi pi-warehouse",
        description: "View my portfolio projects",
        command: () => {
            window.location.href = "/projects";
        },
    },
    {
        label: "LinkedIn",
        icon: "pi pi-linkedin",
        description: "Visit my LinkedIn profile",
        command: () => {
            window.open("https://www.linkedin.com/in/vladcrihan/", "_blank");
        },
    },
    {
        label: "GitHub",
        icon: "pi pi-github",
        description: "Check out my GitHub repositories",
        command: () => {
            window.open("https://github.com/vladc99", "_blank");
        },
    },
]

export default {
    menus
}