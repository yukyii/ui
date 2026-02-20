$(document).ready(function() {
    const projects = [
        {
            title: "Cards by Hand",
            date: "Spring 2026",
            article: "CREATIVE",
            excerpt: "Website that simulates the physical experience of handmaking cards. Actions include doodling, sticking, flipping. Includes a link to share.",
            imageSrc: "static/imgs/cardsbyhand.png",
            link: "https://cardsbyhand.vercel.app/"
        },
        {
            title: "Inside a Commuter's Eye: Daily Health Ads in the Manhattan Subway",
            date: "Spring 2025",
            article: "INTERACTIVE FEATURE ARTICLE",
            excerpt: "Built an interactive feature article inspired by New York Times' data journalism.",
            imageSrc: "static/imgs/commuters_eye_page.png",
            link: "https://wwoc-2025.github.io/wwoc-health/"
        },
        {
            title: "Examining the impact of haptics on user agency",
            date: "Summer 2024",
            article: "SIMULATION",
            excerpt: "In this simulation, the player is tasked to find a specific object inside a house. I designed the map and object interactions.",
            imageSrc: "static/imgs/hci-d1-map.png",
            link: "https://github.com/aryapsinha/mazehouse"
        },
        {
            title: "UI Design",
            date: "Spring 2025",
            article: "SEARCH SITE",
            excerpt: "A website to find and add cafes near campus.",
            imageSrc: "static/imgs/cafes_near_me.png"
        },
        {
            title: "UI Design",
            date: "Spring 2025",
            article: "EDUCATIONAL SITE",
            excerpt: "A website to learn about birds in NYC. I designed the learning page, which includes dynamic hover and audio interactions.",
            imageSrc: "static/imgs/birds_in_nyc.png"
        },
        {
            title: "Innovation and Design Lab",
            date: "Fall 2024",
            article: "WIREFRAMES",
            excerpt: "Did customer journey mapping and created wireframes for a social app that connects people who want to co-work together.",
            imageSrc: "static/imgs/work_along_wireframe.png"
        },
        {
            title: "Emergent Narrative/PCG Game Design",
            date: "Spring 2024",
            article: "GAME DESIGN",
            excerpt: "Wrote our game design document, structured the game mechanics, and wrote the script for a narrative roleplaying dungeon game that uses procedural content generation (PCG). The premise of the game is that the protagonist wakes up, trapped, in his home/lab, and must find clues to piece together a meaningful explanation for his invention and the state of his world. Each run is different, and the clues the protagonist finds will affect the explanation he pieces together. This is made possible using procedurally generated mazes which bring different challenges, as well as the player's choices on what to interact with.",
            imageSrc: "static/imgs/eidos_game.png"
        }
    ];

    const $grid = $('#projects-grid');

    projects.forEach((project, index) => {
        let contentHtml = '';
        
        if (project.contentType === 'pdf') {
            contentHtml = `<div class="pdf-viewer-container"><iframe src="${project.content}" width="100%" height="600px" title="PDF Document"></iframe></div>`;
        } else if (project.contentType === 'link') {
            contentHtml = `<a href="${project.content}" target="_blank" rel="noopener noreferrer" class="project-link">${project.content}</a>`;
        } else if (project.contentType === 'video' && project.videoSrc) {
            contentHtml = `
                <div class="video-container">
                    <iframe src="${project.videoSrc}" title="${project.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
            if (project.link) {
                contentHtml += `<div class="text-center mt-4 mb-4"><a href="${project.link}" target="_blank" class="project-link">Play ↗</a></div>`;
            }
        } else if (project.contentType === 'text') {
            contentHtml = `<p class="project-text">${project.content || ''}</p>`;
        }

        let mediaHtml = '';
        if (project.imageSrc) {
            mediaHtml += `
                <div class="image-container">
                    <img src="${project.imageSrc}" alt="${project.title}">
                </div>`;
            if (project.link) {
                mediaHtml += `<div class="text-center mt-4 mb-4"><a href="${project.link}" target="_blank" class="project-link">View ↗</a></div>`;
            }
        }

        const hasExpandableContent = project.content || project.imageSrc || project.videoSrc;

        // Build the card HTML
        const card = $(`
            <article class="project-card">
                <div class="project-header">
                    <h2>${project.title}</h2>
                    <div class="project-meta">
                        <time>${project.date}</time>
                        <span class="dot"></span>
                        <span>${project.article}</span>
                    </div>
                </div>
                
                <p class="project-excerpt">${project.excerpt}</p>
                
                <div class="project-content-expanded" style="display: none;">
                    ${mediaHtml}
                    ${contentHtml}
                </div>
                
                ${hasExpandableContent ? 
                    `<button class="toggle-btn" data-index="${index}">Expand <span>+</span></button>` 
                    : ''}
            </article>
        `);

        $grid.append(card);
    });

    // Handle Expand/Collapse Clicks
    $(document).on('click', '.toggle-btn', function() {
        const $btn = $(this);
        const $content = $btn.siblings('.project-content-expanded');
        
        $content.slideToggle(300, function() {
            if ($content.is(':visible')) {
                $btn.html('Collapse <span>−</span>');
            } else {
                $btn.html('Expand <span>+</span>');
            }
        });
    });
});
