
const AUTH_KEY = 'tms_user';
const USERS = {
    admin: { password: 'admin', role: 'admin' },
    member: { password: 'member', role: 'member' }
};

/**

 * @param {string} username
 * @param {string} password
 * @returns {boolean} 
 */
const handleLogin = (username, password) => {
    const user = USERS[username];
    if (user && user.password === password) {
        const userData = {
            username: username,
            role: user.role
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        return true;
    }
    return false;
};


const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'login.html';
};

/**
 
 * @returns {{username: string, role: string} | null}
 */
const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
    } catch (e) {
        return null;
    }
};


const protectRoute = () => {
    const user = getCurrentUser();
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'login.html') {
        if (user) {
        
            window.location.href = 'index.html';
        }
      
        return;
    }

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    if (currentPage === 'admin.html' && user.role !== 'admin') {
        
        alert('Access Denied: You do not have permission to view this page.');
        window.location.href = 'team.html';
        return;
    }
    
  
    if (currentPage === 'index.html' && user.role === 'member') {
         window.location.href = 'team.html';
         return;
    }
};


protectRoute();


document.addEventListener('DOMContentLoaded', () => {
    
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (handleLogin(username, password)) {
             
                if (typeof showToast === 'function') {
                    showToast('Login successful! Redirecting...', 'success');
                }
             
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
             
                if (typeof showToast === 'function') {
                    showToast('Invalid username or password.', 'error');
                } else {
                    alert('Invalid username or password.');
                }
            }
        });
    }

    const user = getCurrentUser();
    if (user) {
        const adminHeader = document.querySelector('#admin-page .dashboard-header .container');
        const teamHeader = document.querySelector('#team-page #team-sidebar');
        const indexHeader = document.querySelector('#index-page #index-header');
        const taskHeader = document.querySelector('#task-page #task-header');

        const logoutButtonHtml = `
            <button id="logoutBtn" class="btn btn-outline-danger ms-3" title="Logout">
                <i class="fas fa-sign-out-alt me-1"></i> Logout (${user.username})
            </button>
        `;

        const navHtml = `
            <a href="index.html" class="btn btn-outline-light me-2"><i class="fas fa-home me-2"></i> <span data-i18n="admin.home">Home</span></a>
            ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-outline-light me-2"><i class="fas fa-user-shield me-2"></i> Admin</a>' : ''}
            <a href="team.html" class="btn btn-outline-light me-2"><i class="fas fa-users me-2"></i> <span data-i18n="team.view">Team View</span></a>
            <a href="tasks.html" class="btn btn-outline-light me-2"><i class="fas fa-tasks me-2"></i> Tasks</a>
        `;

        if (adminHeader) {
           
            const buttonGroup = adminHeader.querySelector('.d-flex');
            if (buttonGroup) {
         
                buttonGroup.innerHTML = navHtml + 
                    '<button id="lang-toggle" class="btn btn-outline-light me-3 fw-bold" data-i18n="language.toggle">پښتو</button>' +
                    '<button id="theme-toggle" class="btn btn-outline-light me-3" title="Toggle Theme"><i id="theme-icon" class="fas fa-moon"></i></button>' +
                    logoutButtonHtml.replace('btn-outline-danger', 'btn-outline-light');
                
               
                document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
                document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
            }
        }
        
        if (teamHeader) {
 
             const buttonGroup = teamHeader.querySelector('.d-flex');
             if(buttonGroup) {
                buttonGroup.insertAdjacentHTML('beforeend', logoutButtonHtml.replace('ms-3', ''));
             }
        }

        if (indexHeader) {
            indexHeader.innerHTML = navHtml + logoutButtonHtml.replace('btn-outline-danger', 'btn-outline-light');
        }
        
        if (taskHeader) {
             taskHeader.innerHTML = navHtml + 
                '<button id="lang-toggle" class="btn btn-outline-light me-3 fw-bold" data-i18n="language.toggle">پښتو</button>' +
                '<button id="theme-toggle" class="btn btn-outline-light me-3" title="Toggle Theme"><i id="theme-icon" class="fas fa-moon"></i></button>' +
                logoutButtonHtml.replace('btn-outline-danger', 'btn-outline-light');

            document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
            document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    }
});