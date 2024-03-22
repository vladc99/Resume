const menus = [
    {
        label: "Home",
        icon: "pi pi-home",
        command: () => {
            window.location.href = "https://vladc99.github.io/Resume"
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
        label: "TCM",
        icon: "pi pi-folder-open",
        command: () => {
            window.location.href = "https://vladc99.github.io/Resume/table", "_blank";
        }
    },
]

export default {
    menus
}