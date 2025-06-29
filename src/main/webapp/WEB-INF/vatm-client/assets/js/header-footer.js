 window.onload = function() {
        const loadComponent = async (url, elementId) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const html = await response.text();
                const placeholder = document.getElementById(elementId);
                if (!placeholder) {
                    console.error(`Error: Placeholder element with ID '${elementId}' not found.`);
                    return;
                }

                // Insert the HTML content into the placeholder
                placeholder.innerHTML = html;

                // --- FIX: Manually apply styles from data-attributes ---
                // After inserting the HTML, find elements with special data-attributes
                // inside the newly added content and apply the styles they need.

                // 1. Handle background colors
                const elementsWithBgColor = placeholder.querySelectorAll('[data-bg-color]');
                elementsWithBgColor.forEach(el => {
                    el.style.backgroundColor = el.getAttribute('data-bg-color');
                });

                // 2. Handle background images (this is another common one in themes)
                const elementsWithBgImage = placeholder.querySelectorAll('[data-background]');
                elementsWithBgImage.forEach(el => {
                    el.style.backgroundImage = `url(${el.getAttribute('data-background')})`;
                });
                // --- End of Fix ---

            } catch (error) {
                console.error(`Failed to load component for '${elementId}':`, error);
            }
        };

        // Load both components
        Promise.all([
            loadComponent('header.html', 'header-placeholder'),
            loadComponent('footer.html', 'footer-placeholder')
        ]);
    };