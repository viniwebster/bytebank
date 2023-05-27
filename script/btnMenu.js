const btnMenu = document.getElementById('btnMenu');

export default btnMenu.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');

    if (sidebar.style.display == "none") {
        sidebar.style.display = "flex"
    } else {
        sidebar.style.display = "none"      
    }
}) 