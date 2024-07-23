document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.close();
        } else if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    function performSearch(query) {
        console.log('Searching for:', query);
    }
});
