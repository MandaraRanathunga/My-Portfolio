// Skills Data
const skillsData = [
    {
        title: 'Software Skills',
        skills: [
            { name: 'HTML', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'CSS/Tailwind', level: 88 },
            { name: 'C++', level: 80 },
            { name: 'Python', level: 75 },
            { name: 'Git/GitHub', level: 82 },
            { name: 'VS Code', level: 85 },
            { name: 'UI/UX Design', level: 90 }
        ]
    },
    {
        title: 'Project Management Skills',
        skills: [
            { name: 'Project Management', level: 90 },
            { name: 'Jira', level: 85 },
            { name: 'Azure', level: 80 },
            { name: 'Leadership', level: 90 },
            { name: 'Teamwork', level: 95 },
            { name: 'Problem Solving', level: 90 }
        ]
    },
    {
        title: 'Language Skills',
        skills: [
            { name: 'English', level: 100 },
            { name: 'Sinhala', level: 100 }
        ]
    }
];

// Projects Data
const projectsData = [
    {
        title: 'E-Commerce Platform',
        description: 'Full-stack shopping platform with payment integration',
        tech: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'AI Chat Application',
        description: 'Real-time chat with AI-powered responses',
        tech: ['React', 'WebSocket', 'Python']
    },
    {
        title: 'Portfolio Dashboard',
        description: 'Analytics dashboard for tracking portfolio metrics',
        tech: ['React', 'D3.js', 'Firebase']
    }
];

// Experience Data
const experiencesData = [
    {
        role: 'Intern BA|PM',
        company: 'Citipark (Sydney) Pvt Ltd',
        period: 'February 2026 - Present',
        description: 'Contributing to business analysis and project management workflows.'
    },
    {
        role: 'Ticketing and Marketing Manager',
        company: 'DADS Entertainment Pvt Ltd',
        period: '2023 - Present',
        description: 'Overseeing event ticketing operations and marketing strategies.'
    }
];

// Volunteering Data
const volunteeringData = [
    {
        role: 'Treasurer',
        organization: 'BCS Student Chapter KDU',
        period: '2025 - 2026',
        description: 'Managed financial records and budget allocation for student chapter events and initiatives.'
    },
    {
        role: 'Finance Lead',
        organization: 'BCS Student Chapter',
        period: '2024 - 2025',
        description: 'Managed financial planning and budget allocation for student chapter initiatives.'
    },
    {
        role: 'Program Team Lead',
        organization: 'IEEE Student Branch',
        period: '2024 - 2025',
        description: 'Led the planning and execution of technical programs and student events.'
    },
    {
        role: 'PR Director',
        organization: 'Rotaract Club of KDU',
        period: '2023 - 2024',
        description: 'Led public relations campaigns, managed social media presence, and coordinated promotional activities.'
    }
];

// Education Data
const educationData = [
    {
        degree: 'BSc in Computer Engineering',
        institution: 'General Sir John Kotelawala Defence University',
        period: '2022 - 2026',
        description: 'Currently pursuing undergraduate degree specializing in computing systems.'
    },
    {
        degree: 'GCE Advanced Level',
        institution: 'High School',
        period: '2021',
        description: 'Physical Science Stream'
    }
];

// Certifications Data
const certificationsData = [
    {
        title: 'Project Management Professional (PMP)',
        issuer: 'Project Management Institute',
        date: '2025',
        description: 'Demonstrates ability to lead and direct projects and teams with agile methodologies.'
    },
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2024',
        description: 'Foundational understanding of AWS Cloud concepts, security, and services.'
    },
    {
        title: 'Google UX Design Certificate',
        issuer: 'Google',
        date: '2024',
        description: 'Completed rigorous training in the design process, from empathy to prototyping.'
    },
    {
        title: 'Oracle Certified Associate, Java SE',
        issuer: 'Oracle',
        date: '2023',
        description: 'Certification covering core Java programming language concepts and best practices.'
    },
    {
        title: 'Scrum Master Certified (SMC)',
        issuer: 'Scrum Alliance',
        date: '2023',
        description: 'Proficiency in Scrum methodology and Agile project management practices.'
    }
];

// Render Skills Dashboard
function renderSkills() {
    const skillsContainer = document.getElementById('skills-dashboard');
    
    skillsData.forEach((category, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'skill-card animate-slideInLeft';
        categoryCard.style.animationDelay = `${index * 0.1}s`;
        
        let skillsHTML = `<h3 class="skill-category-title">${category.title}</h3>`;
        
        category.skills.forEach(skill => {
            skillsHTML += `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: 0; background-color: #61dafb;"
                             data-width="${skill.level}"></div>
                    </div>
                </div>
            `;
        });
        
        categoryCard.innerHTML = skillsHTML;
        skillsContainer.appendChild(categoryCard);
    });

    // Animate progress bars when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(progressBar => {
                    const targetWidth = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
}

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects-grid');
    
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-fadeInUp';
        projectCard.style.animationDelay = `${index * 0.2}s`;
        
        const techTags = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Render Experience
function renderExperience() {
    const experienceContainer = document.getElementById('experience-list');
    
    experiencesData.forEach((exp, index) => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item animate-slideInRight';
        expItem.style.animationDelay = `${index * 0.2}s`;
        
        expItem.innerHTML = `
            <h3 class="experience-role">${exp.role}</h3>
            <div class="experience-meta">
                <span class="experience-company">${exp.company}</span>
                <span class="experience-period">${exp.period}</span>
            </div>
            <p class="experience-description">${exp.description}</p>
        `;
        
        experienceContainer.appendChild(expItem);
    });
}

// Render Volunteering
function renderVolunteering() {
    const container = document.getElementById('volunteering-grid');
    
    volunteeringData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'volunteering-card animate-fadeInUp';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <h3 class="project-title">${item.role}</h3>
            <div class="experience-meta" style="margin-bottom: 1rem;">
                <span class="experience-company">${item.organization}</span>
            </div>
            <p class="project-description">${item.description}</p>
            <span class="tech-tag">${item.period}</span>
        `;
        
        container.appendChild(card);
    });
}

// Render Education
function renderEducation() {
    const container = document.getElementById('education-grid');
    
    educationData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'education-card animate-fadeInUp';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <h3 class="project-title">${item.degree}</h3>
            <div class="experience-meta" style="margin-bottom: 1rem;">
                <span class="experience-company">${item.institution}</span>
            </div>
            <p class="project-description">${item.description}</p>
            <span class="tech-tag">${item.period}</span>
        `;
        
        container.appendChild(card);
    });
}

// Render Certifications
function renderCertifications() {
    const container = document.getElementById('certifications-grid');
    
    certificationsData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'education-card animate-fadeInUp';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <h3 class="project-title">${item.title}</h3>
            <div class="experience-meta" style="margin-bottom: 1rem;">
                <span class="experience-company">${item.issuer}</span>
            </div>
            <p class="project-description">${item.description}</p>
            <span class="tech-tag">${item.date}</span>
        `;
        
        container.appendChild(card);
    });
}

// Initialize all content
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    renderExperience();
    renderVolunteering();
    renderEducation();
    renderCertifications();
});
