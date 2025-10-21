
const STORAGE_KEYS = {
    TEAMS: 'tms_teams_v2',
    MEMBERS: 'tms_members_v2',
    ACTIVITIES: 'tms_activities',
    THEME: 'tms_theme',
    PRIMARY_COLOR: 'tms_primary_color',
    LANGUAGE: 'tms_language',
    TASKS: 'tms_tasks_v1', 
    TEAM_NOTES: 'tms_team_notes_v1' 
};

const DEFAULT_COLOR = '#00bcd4'; 
const XP_PER_ACTION = 10;
const XP_PER_LEVEL = 100;
const DEFAULT_LANGUAGE = 'en';
const TRANSLATIONS = {
    en: {
        'app.title': 'Cyber Pashto – Team Management System', 
        'admin.title': 'Admin Dashboard',
        'team.roster': 'Team Roster',
        'member.directory': 'Member Directory',
        'add.team': 'Add Team',
        'add.member': 'Add Member',
        'dashboard.intro': 'Welcome, Admin!',
        'language.toggle': 'پښتو',
        'health.meter': 'Team Health Meter',
        'suggestions': 'Smart Suggestions',
        'activity.timeline': 'Activity Timeline',
        'leaderboard': 'Leaderboard',
        'available': 'Available',
        'busy': 'Busy',
        'on.leave': 'On Leave',
        'unassigned': 'Unassigned',
        'export.pdf': 'Export PDF Report',
        'data.backup': 'Backup Data (JSON)',
        'data.restore': 'Restore Data (JSON)',
        'voice.input.start': 'Voice Input Mode ON',
        'voice.input.stop': 'Voice Input Mode OFF',
        'role.filter': 'Filter by Role (All)',
        'admin.home': 'Home',
        'team.view': 'Team View',
        'name': 'Name',
        'email': 'Email',
        'role': 'Role',
        'team': 'Team',
        'actions': 'Actions',
        'status': 'Current Status',
        'update.status': 'Update Status',
        'team.name': 'Team Name',
        'description': 'Description',
        'members': 'Members',
        'team.health.high': '🔥 Health: High (Excellent engagement)',
        'team.health.medium': '⚡ Health: Medium (Needs check-in)',
        'team.health.low': '💤 Health: Low (Redistribute tasks)',
        'member.info': 'Member Info',
        'level': 'Level',
        'xp': 'XP',
        'badges': 'Badges',
        'mood': 'Mood',
        'no.teams': 'No teams created yet.',
        'no.members.filter': 'No members match the current filter/search.'
    },
    ps: {
        'app.title': 'سائبر پشتو - د ټیم مدیریت سیسټم', // *** ADDED THIS LINE ***
        'admin.title': 'اداري ډېشبورډ', // Adari Dashboard
        'team.roster': 'د ټیم لیست', // Da Team List
        'member.directory': 'غړي ډایرکټرۍ', // Ghari Directory
        'add.team': 'نوی ټیم جوړ کړئ', // Naway Team Jod Kray
        'add.member': 'نوی غړی اضافه کړئ', // Naway Ghari Izala Kray
        'dashboard.intro': 'ښه راغلاست، ادمین!', // Khah Raghlast, Admin!
        'language.toggle': 'English',
        'health.meter': 'د ټیم روغتیا میټر', // Da Team Roghtia Meter
        'suggestions': 'هوښیار وړاندیزونه', // Hushyar Wrandzhoona
        'activity.timeline': 'فعالیت تاریخچه', // Fa'aliyat Tarikhcha
        'leaderboard': 'مخکښه لیست', // Makhkash Lista
        'available': 'شتون لري', // Shtoon Lari
        'busy': 'مصروف', // Masroof
        'on.leave': 'په رخصتۍ', // Pa Rokhstai
        'unassigned': 'نه سپارل شوی', // Na Sparal Shawai
        'export.pdf': 'د PDF راپور صادرول', // Da PDF Rapoor Sadorawal
        'data.backup': 'ډاټا بیک اپ', // Data Backup
        'data.restore': 'ډاټا بیا رغونه', // Data Bia Raghawana
        'voice.input.start': 'غږیزه اډخال فعال دی', // Ghagiza Adkhal Fa'al Di
        'voice.input.stop': 'غږیزه اډخال غیر فعال دی', // Ghagiza Adkhal Ghair Fa'al Di
        'role.filter': 'د رول له مخې فلټر (ټول)', // Da Role la Mokh Fltr (Tol)
        'admin.home': 'کورپاڼه', // Korpanah
        'team.view': 'د ټیم لید', // Da Team Led
        'name': 'نوم', // Num
        'email': 'برېښنالیک', // Breshenalik
        'role': 'رول', // Role
        'team': 'ټیم', // Team
        'actions': 'عملیات', // Amaliyat
        'status': 'اوسنی وضعیت', // Osani Waziyat
        'update.status': 'وضعیت تازه کړئ', // Waziyat Taza Kray
        'team.name': 'د ټیم نوم', // Da Team Num
        'description': 'تفصیل', // Tafsil
        'members': 'غړي', 
        'team.health.high': '🔥 روغتیا: لوړ (غوره ښکیلتیا)',
        'team.health.medium': '⚡ روغتیا: منځنی (چک-ان ته اړتیا)',
        'team.health.low': '💤 روغتیا: ټيټ (د کارونو بیا ویش)',
        'member.info': 'د غړي معلومات',
        'level': 'کچه',
        'xp': 'تجربه',
        'badges': 'نښانونه',
        'mood': 'مزاج',
        'no.teams': 'تر اوسه هیڅ ټیمونه ندي جوړ شوي.',
        'no.members.filter': 'هیڅ غړي د فلټر/لټون سره سمون نه خوري.'
    }
};


let teams = [];
let members = [];
let activities = []; 
let tasks = []; 
let teamNotes = {}; 

let currentTeamId = null;
let currentLanguage = DEFAULT_LANGUAGE;
let currentPrimaryColor = DEFAULT_COLOR;
let currentUser = null; 

let statusPieChart = null;
let teamBarChart = null;



const generateUniqueId = (prefix) => prefix + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

const loadData = () => {
    try {
    
        currentUser = JSON.parse(localStorage.getItem('tms_user')) || null;

        teams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS)) || [];
        members = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS)) || [];
        activities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) || [];
        tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS)) || [];
        teamNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAM_NOTES)) || {};
        currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE;
        currentPrimaryColor = localStorage.getItem(STORAGE_KEYS.PRIMARY_COLOR) || DEFAULT_COLOR;
    } catch (e) {
        console.error("Error loading data from LocalStorage:", e);

        teams = []; members = []; activities = []; tasks = []; teamNotes = {};
        currentLanguage = DEFAULT_LANGUAGE; currentPrimaryColor = DEFAULT_COLOR;
    }

    activities.sort((a, b) => b.timestamp - a.timestamp);
    activities = activities.slice(0, 50);
};

const saveData = () => {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    localStorage.setItem(STORAGE_KEYS.TEAM_NOTES, JSON.stringify(teamNotes));
};



const getTranslation = (key) => (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) ? TRANSLATIONS[currentLanguage][key] : key;

const renderTranslation = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translation = getTranslation(key);
       
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else if (el.tagName === 'OPTION' && el.parentElement.tagName === 'SELECT') {
          
            el.textContent = translation;
        }
         else {
            el.textContent = translation;
        }
    });


    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = getTranslation('language.toggle');
    }
};

const toggleLanguage = () => {
    currentLanguage = currentLanguage === 'en' ? 'ps' : 'en';
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ps' ? 'rtl' : 'ltr';
    renderTranslation();

    if (document.body.id === 'admin-page') {
        renderAdminDashboard();
    } else if (document.body.id === 'team-page') {
        renderTeamList();
        renderTeamDetails(currentTeamId);
    } else if (document.body.id === 'task-page') {
        renderTaskPage();
    }
};

const initColorTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    applyTheme(savedTheme);

  
    currentPrimaryColor = localStorage.getItem(STORAGE_KEYS.PRIMARY_COLOR) || DEFAULT_COLOR;
    document.documentElement.style.setProperty('--primary-color', currentPrimaryColor);
   
    document.documentElement.style.setProperty('--primary-glow', currentPrimaryColor + 'cc'); 

    const colorPicker = document.getElementById('theme-color-picker');
    if (colorPicker) {
        colorPicker.value = currentPrimaryColor;
        colorPicker.addEventListener('input', (e) => applyCustomColor(e.target.value));
    }

    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
};

const applyCustomColor = (color) => {
    currentPrimaryColor = color;
    localStorage.setItem(STORAGE_KEYS.PRIMARY_COLOR, color);
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-glow', color + 'cc');
    
    if (document.body.id === 'admin-page') {
         renderStatsDashboard();
         renderHealthMeter();
    }
};

const applyTheme = (theme) => {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    const isDark = theme === 'dark';

    body.classList.toggle('dark-mode', isDark);
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeIcon.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    if (document.body.id === 'admin-page') {
         renderStatsDashboard();
    }
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
};


const renderSkillTags = (skillsArray, container) => {
    if (!container) return;
    container.innerHTML = skillsArray.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
};

const setupMemberModal = (memberId = null) => {
    const form = document.getElementById('memberForm');
    const modalTitle = document.getElementById('memberModalLabel');
    const memberNameInput = document.getElementById('memberName');
    const memberEmailInput = document.getElementById('memberEmail');
    const memberRoleInput = document.getElementById('memberRole');
    const teamSelect = document.getElementById('memberTeamId');
    const memberBadges = document.getElementById('memberBadges');
    const memberLevel = document.getElementById('memberLevel');
    const memberXP = document.getElementById('memberXP');
    const memberMood = document.getElementById('memberMood'); // NEW
    const memberMoodDisplay = document.getElementById('memberMoodDisplay'); // NEW
    const memberSkills = document.getElementById('memberSkills'); // NEW
    const memberSkillsDisplay = document.getElementById('memberSkillsDisplay'); // NEW

    if (!form || !modalTitle || !teamSelect) return;

    teamSelect.innerHTML = `<option value="">-- ${getTranslation('unassigned')} --</option>`;
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    form.reset();
    form.dataset.mode = 'add';
    form.dataset.id = '';
    modalTitle.textContent = getTranslation('add.member');

    if (memberBadges) memberBadges.innerHTML = '';
    if (memberLevel) memberLevel.textContent = 'N/A';
    if (memberXP) memberXP.textContent = '0';
    if (memberMoodDisplay) memberMoodDisplay.textContent = 'N/A';
    if (memberSkillsDisplay) memberSkillsDisplay.innerHTML = '';


    if (memberId) {
        const member = members.find(m => m.id === memberId);
        if (member) {
            form.dataset.mode = 'edit';
            form.dataset.id = memberId;
            modalTitle.textContent = `${getTranslation('member.info')}: ${member.name}`;

            if (memberNameInput) memberNameInput.value = member.name;
            if (memberEmailInput) memberEmailInput.value = member.email;
            if (memberRoleInput) memberRoleInput.value = member.role;
            if (teamSelect) teamSelect.value = member.teamId || '';
            if (memberMood) memberMood.value = member.mood || '😃'; // NEW
            if (memberSkills) memberSkills.value = (member.skills || []).join(', '); // NEW
            
            if (memberBadges) memberBadges.innerHTML = (member.badges || []).map(b => `<span class="achievement-badge me-1">${b}</span>`).join('') || 'None';
            if (memberLevel) memberLevel.textContent = member.level;
            if (memberXP) memberXP.textContent = member.xp;
            if (memberMoodDisplay) memberMoodDisplay.textContent = member.mood || '😃'; // NEW
            if (memberSkillsDisplay) renderSkillTags(member.skills || [], memberSkillsDisplay); // NEW
        }
    }
    
    if (memberSkills) {
        memberSkills.oninput = (e) => {
            const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            renderSkillTags(skills, memberSkillsDisplay);
        };
    }
};


const logActivity = (type, description, memberId = null, teamId = null) => {
    const activity = {
        id: generateUniqueId('A'),
        timestamp: Date.now(),
        type: type, 
        description: description,
        memberId: memberId,
        teamId: teamId
    };
    activities.unshift(activity); 
    activities = activities.slice(0, 50); 
    saveData();
    if (document.body.id === 'admin-page') {
        renderActivityTimeline();
    }
};

const updateXP = (member, amount, activityType) => {
    if (!member) return;
    member.xp = (member.xp || 0) + amount;
    let newLevel = Math.floor(member.xp / XP_PER_LEVEL) + 1;

    if (newLevel > (member.level || 1)) {
        member.level = newLevel;
        showToast(`${member.name} leveled up to Level ${member.level}! 🌟`, 'success');
        logActivity('LEVEL_UP', `${member.name} reached Level ${member.level}!`, member.id);
    }
    
   
    if (member.xp >= 500 && !(member.badges || []).includes('Task Crusher')) {
        member.badges.push('Task Crusher');
        showToast(`${member.name} earned the 'Task Crusher' Badge! 💪`, 'success');
        logActivity('BADGE_EARNED', `${member.name} earned 'Task Crusher' badge.`, member.id);
    }
};

const getStatusBadge = (status) => {
    let colorClass, icon, translatedStatus;
    switch (status) {
        case 'Available':
            colorClass = 'success';
            icon = 'fas fa-check-circle';
            translatedStatus = getTranslation('available');
            break;
        case 'Busy':
            colorClass = 'warning';
            icon = 'fas fa-hourglass-half';
            translatedStatus = getTranslation('busy');
            break;
        case 'On Leave':
            colorClass = 'danger';
            icon = 'fas fa-bed';
            translatedStatus = getTranslation('on.leave');
            break;
        default:
            colorClass = 'secondary';
            icon = 'fas fa-question-circle';
            translatedStatus = getTranslation('unassigned');
    }
    return `<span class="badge text-bg-${colorClass} status-badge"><i class="${icon} me-1"></i>${translatedStatus}</span>`;
};



const addTeam = (name, description) => {
    if (!name || !description) return false;
    const newTeam = {
        id: generateUniqueId('T'),
        name: name,
        description: description
    };
    teams.push(newTeam);
    saveData();
    logActivity('TEAM_ADD', `Created new team: ${name}`, null, newTeam.id);
    showToast(`Team '${name}' added successfully!`, 'success');
    return true;
};

const updateTeam = (id, name, description) => {
     const teamIndex = teams.findIndex(t => t.id === id);
    if (teamIndex > -1) {
        teams[teamIndex].name = name;
        teams[teamIndex].description = description;
        saveData();
        logActivity('TEAM_UPDATE', `Updated team: ${name}`, null, id);
        showToast(`Team '${name}' updated.`, 'info');
        return true;
    }
    return false;
}

const deleteTeam = (id) => {
    const team = teams.find(t => t.id === id);
    if (!team) return false;

    members.forEach(member => {
        if (member.teamId === id) {
            member.teamId = null;
        }
    });

    teams = teams.filter(t => t.id !== id);
    saveData();
    logActivity('TEAM_DELETE', `Deleted team: ${team.name}`, null, id);
    showToast(`Team '${team.name}' deleted.`, 'info');
    return true;
};

const addMember = (name, email, role, teamId, mood, skills) => {
    if (!name || !email || !role) return false;

    const newMember = {
        id: generateUniqueId('M'),
        name: name,
        email: email,
        role: role,
        teamId: teamId || null,
        status: 'Available',
        xp: 0,
        level: 1,
        badges: [],
        lastActive: Date.now(),
        mood: mood || '😃', 
        skills: skills || [] 
    };
    members.push(newMember);
    saveData();
    logActivity('MEMBER_ADD', `Added new member: ${name} (${role})`, newMember.id, teamId);
    showToast(`Member '${name}' added successfully!`, 'success');
    return true;
};

const updateMember = (id, name, email, role, teamId, mood, skills) => {
    const memberIndex = members.findIndex(m => m.id === id);
    if (memberIndex > -1) {
        const oldMember = {...members[memberIndex]};
        
        members[memberIndex].name = name;
        members[memberIndex].email = email;
        members[memberIndex].role = role;
        members[memberIndex].teamId = teamId || null;
        members[memberIndex].mood = mood || '😃'; // Updated
        members[memberIndex].skills = skills || []; // Updated
        
        if (oldMember.teamId !== teamId) {
            const teamName = teams.find(t => t.id === teamId)?.name || getTranslation('unassigned');
            logActivity('MEMBER_UPDATE', `${name} moved to team: ${teamName}`, id, teamId);
        }

        saveData();
        showToast(`Member '${name}' updated.`, 'info');
        return true;
    }
    return false;
};

const deleteMember = (id) => {
    const member = members.find(m => m.id === id);
    if (!member) return false;
    
    tasks = tasks.filter(t => t.assigneeId !== id);
    
    members = members.filter(m => m.id !== id);
    saveData();
    logActivity('MEMBER_DELETE', `Deleted member: ${member.name}`, id);
    showToast(`Member '${member.name}' deleted.`, 'info');
    return true;
};

const updateMemberStatus = (memberId, newStatus) => {
    const member = members.find(m => m.id === memberId);
    if (member && member.status !== newStatus) {
        const oldStatus = member.status;
        member.status = newStatus;
        member.lastActive = Date.now();
        
        updateXP(member, XP_PER_ACTION, 'STATUS_UPDATE');

        saveData();
        logActivity('MEMBER_STATUS', `${member.name} changed status from ${oldStatus} to ${newStatus}.`, memberId, member.teamId);
        if (document.body.id === 'team-page') {
             renderTeamDetails(currentTeamId); 
        }
        if (document.body.id === 'admin-page') {
             renderStatsDashboard(); 
        }
    }
};

const updateMemberMood = (memberId, newMood) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
        member.mood = newMood;
        member.lastActive = Date.now();
        updateXP(member, XP_PER_ACTION / 2, 'MOOD_UPDATE'); 
        saveData();
        logActivity('MEMBER_MOOD', `${member.name} updated mood to ${newMood}.`, memberId, member.teamId);
        if (document.body.id === 'team-page') {
            renderTeamDetails(currentTeamId);
        }
    }
};



const calculateTeamHealth = (teamId) => {
    const teamMembers = members.filter(m => m.teamId === teamId);
    const totalMembers = teamMembers.length;
    if (totalMembers === 0) return 0;

    const available = teamMembers.filter(m => m.status === 'Available').length;
    const onLeave = teamMembers.filter(m => m.status === 'On Leave').length;
    
    const availableRatio = available / totalMembers;
    const healthScore = Math.max(0, (availableRatio * 100) - (onLeave * 10)); 

    return Math.round(healthScore);
};

const generateSmartSuggestions = () => {
    const suggestions = [];
    const now = Date.now();
    const twoDaysAgo = now - (48 * 60 * 60 * 1000); 
    
    const suggestionPrefix = getTranslation('suggestions.prefix') || 'Suggestion:';

    teams.forEach(team => {
        const teamMembers = members.filter(m => m.teamId === team.id);
        const onLeaveCount = teamMembers.filter(m => m.status === 'On Leave').length;
        const lastActivity = activities.find(a => a.teamId === team.id);

        if (onLeaveCount >= 2) {
            suggestions.push({
                type: 'warning',
                text: `${suggestionPrefix} **${team.name}** has ${onLeaveCount} members on leave — **consider redistributing tasks.**`
            });
        }
        
        if (!lastActivity && teamMembers.length > 0) {
             suggestions.push({
                type: 'info',
                text: `${suggestionPrefix} Team **${team.name}** has no recorded activity — **check in with the team.**`
            });
        }
        else if (lastActivity && lastActivity.timestamp < twoDaysAgo) {
            suggestions.push({
                type: 'info',
                text: `${suggestionPrefix} Team **${team.name}** hasn't updated in 2 days — **send a reminder.**`
            });
        }
    });

    const highLevelUnassigned = members.filter(m => !m.teamId && m.level >= 3);
    if (highLevelUnassigned.length > 0) {
        suggestions.push({
            type: 'success',
            text: `${suggestionPrefix} ${highLevelUnassigned.length} high-level (${highLevelUnassigned.map(m => m.name).join(', ')}) members are **unassigned**. Assign them to boost team health!`
        });
    }
    
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    if (pendingTasks > 5) {
         suggestions.push({
            type: 'warning',
            text: `${suggestionPrefix} There are **${pendingTasks} pending tasks** in the system. **Review the task board.**`
        });
    }

    return suggestions;
};




const showToast = (message, type = 'info', duration = 3000) => {
    const container = document.getElementById('toast-container');
    if (!container) {
       
        const newContainer = document.createElement('div');
        newContainer.id = 'toast-container';
        document.body.appendChild(newContainer);
        return showToast(message, type, duration); 
    }

    const toast = document.createElement('div');
    toast.className = `tms-toast alert alert-dismissible fade show ${type}`;
    toast.role = 'alert';
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-fw me-2 ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span class="flex-grow-1">${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, duration);
};



const startVoiceInputListener = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const voiceButton = document.getElementById('voice-input-toggle');

    if (!SpeechRecognition) {
        showToast('Web Speech API is not supported in this browser.', 'error');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = currentLanguage === 'ps' ? 'ps-AF' : 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        voiceButton.classList.add('listening');
        showToast(getTranslation('voice.input.start'), 'info', 1500);
    };

    recognition.onend = () => {
        voiceButton.classList.remove('listening');
        showToast(getTranslation('voice.input.stop'), 'info', 1500);
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
        showToast(`Voice input error: ${event.error}`, 'error');
        voiceButton.classList.remove('listening');
    };

    if (voiceButton) {
        voiceButton.onclick = () => {
            if (voiceButton.classList.contains('listening')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        };
    }
};

const processVoiceCommand = (command) => {
    let result = false;
    let parts = command.split(/\s+/);

    if (command.includes('add team named')) {
        const name = command.split('add team named')[1]?.trim();
        if (name) {
          
            result = addTeam(name, `Team added via voice command: ${name}`);
        }
    } else if (command.includes('add member') && command.includes('as')) {
        
        const nameMatch = command.match(/add member\s+(.*?)\s+as/);
        const roleMatch = command.match(/as\s+(.*)/);

        const name = nameMatch ? nameMatch[1]?.trim() : null;
        const role = roleMatch ? roleMatch[1]?.trim().replace(/\./g, '') : null;
        
        if (name && role) {
            const defaultEmail = `${name.toLowerCase().replace(/\s/g, '.')}@voice.com`;
            result = addMember(name, defaultEmail, role.charAt(0).toUpperCase() + role.slice(1), '', '😃', []); 
        }
    }
    
    if (result) {
        showToast('Voice command executed successfully!', 'success');
        renderAdminDashboard();
    } else {
        showToast(`Could not understand command: "${command}". Try "Add team named Alpha" or "Add member Ali as Developer"`, 'error', 5000);
    }
};

const exportToCSV = () => {
    let csv = "Teams Data\n";
    csv += "Team Name,Description,Members Count\n";

    teams.forEach(team => {
        const memberCount = members.filter(m => m.teamId === team.id).length;
        csv += `"${team.name}","${team.description}",${memberCount}\n`;
    });

    csv += "\n\nMembers Data\n";
    csv += "Name,Email,Role,Team,Status,Level,XP,Mood,Skills\n";

    members.forEach(member => {
        const teamName = teams.find(t => t.id === member.teamId)?.name || "Unassigned";
        csv += `"${member.name}","${member.email}","${member.role}","${teamName}","${member.status}",${member.level},${member.xp},"${member.mood}","${(member.skills || []).join(', ')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberPashto_Report_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('CSV file exported successfully!', 'success');
};


const backupData = () => {
    const data = {
        teams: teams,
        members: members,
        activities: activities,
        tasks: tasks,
        teamNotes: teamNotes,
        theme: localStorage.getItem(STORAGE_KEYS.THEME),
        primaryColor: localStorage.getItem(STORAGE_KEYS.PRIMARY_COLOR),
        language: localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberpashto_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data backup downloaded!', 'success');
};

const restoreData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.teams && data.members) {
                localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(data.teams));
                localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(data.members));
                localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(data.activities || []));
                localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(data.tasks || []));
                localStorage.setItem(STORAGE_KEYS.TEAM_NOTES, JSON.stringify(data.teamNotes || {}));
                
                if (data.theme) localStorage.setItem(STORAGE_KEYS.THEME, data.theme);
                if (data.primaryColor) localStorage.setItem(STORAGE_KEYS.PRIMARY_COLOR, data.primaryColor);
                if (data.language) localStorage.setItem(STORAGE_KEYS.LANGUAGE, data.language);

                showToast('Data successfully restored! App is refreshing.', 'success', 2000);
                
                setTimeout(() => window.location.reload(), 2000);

            } else {
                throw new Error('Invalid backup file structure.');
            }
        } catch (error) {
            showToast(`Error restoring data: ${error.message}`, 'error', 5000);
        }
        
        event.target.value = null;
    };
    reader.readAsText(file);
};



const renderStatsDashboard = () => {
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#f0f8ff' : '#333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const pieCtx = document.getElementById('statusPieChart')?.getContext('2d');
    if (pieCtx) {
        const available = members.filter(m => m.status === 'Available').length;
        const busy = members.filter(m => m.status === 'Busy').length;
        const onLeave = members.filter(m => m.status === 'On Leave').length;

        const pieData = {
            labels: [getTranslation('available'), getTranslation('busy'), getTranslation('on.leave')],
            datasets: [{
                data: [available, busy, onLeave],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderColor: isDark ? '#1f2937' : '#fff',
            }]
        };
        
        if(statusPieChart) statusPieChart.destroy();
        statusPieChart = new Chart(pieCtx, {
            type: 'pie',
            data: pieData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: textColor }
                    }
                }
            }
        });
    }

    const barCtx = document.getElementById('teamBarChart')?.getContext('2d');
    if (barCtx) {
        const teamLabels = teams.map(t => t.name);
        const memberCounts = teams.map(team => members.filter(m => m.teamId === team.id).length);

        const barData = {
            labels: teamLabels,
            datasets: [{
                label: 'Members per Team',
                data: memberCounts,
                backgroundColor: currentPrimaryColor,
                borderColor: currentPrimaryColor,
                borderWidth: 1
            }]
        };

        if(teamBarChart) teamBarChart.destroy();
        teamBarChart = new Chart(barCtx, {
            type: 'bar',
            data: barData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: textColor, stepSize: 1 },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: textColor },
                        grid: { color: 'transparent' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
};

const renderHealthMeter = () => {
    const container = document.getElementById('healthMeterContainer');
    const suggestionsList = document.getElementById('smartSuggestionsList');
    if (!container || !suggestionsList) return;

    
    const totalHealth = teams.reduce((sum, team) => sum + calculateTeamHealth(team.id), 0);
    const overallHealth = teams.length > 0 ? Math.round(totalHealth / teams.length) : (members.length > 0 ? 100 : 0);

    container.innerHTML = `
        <div class="health-meter">
            <canvas id="healthCanvas" width="150" height="150"></canvas>
            <div class="health-meter-text">${overallHealth}%</div>
        </div>
    `;

    const canvas = document.getElementById('healthCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radius = 70; 
    const center = 75;
    const lineWidth = 15;

  
    ctx.beginPath();
    ctx.arc(center, center, radius - lineWidth / 2, 0, 2 * Math.PI);
    ctx.strokeStyle = document.body.classList.contains('dark-mode') ? '#374151' : '#e5e7eb';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

   
    if (overallHealth > 0) {
        ctx.beginPath();
        const endAngle = (overallHealth / 100) * 2 * Math.PI;
        ctx.arc(center, center, radius - lineWidth / 2, -Math.PI / 2, endAngle - Math.PI / 2); 
        ctx.strokeStyle = currentPrimaryColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    

    const suggestions = generateSmartSuggestions();
    suggestionsList.innerHTML = suggestions.map(s => `
        <li class="list-group-item d-flex align-items-center ${s.type === 'warning' ? 'text-danger' : s.type === 'success' ? 'text-success' : ''}" style="background-color: transparent; border: none;">
            <i class="fas fa-sm me-2 ${s.type === 'warning' ? 'fa-exclamation-triangle' : s.type === 'success' ? 'fa-lightbulb' : 'fa-info-circle'}"></i>
            ${s.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
        </li>
    `).join('') || `<li class="list-group-item text-muted" style="background-color: transparent;">No critical suggestions right now.</li>`;

    const healthStatusEl = document.getElementById('healthStatus');
    if (healthStatusEl) {
        if (overallHealth >= 80) {
            healthStatusEl.innerHTML = getTranslation('team.health.high');
            healthStatusEl.className = 'fw-bold text-success';
        } else if (overallHealth >= 50) {
            healthStatusEl.innerHTML = getTranslation('team.health.medium');
            healthStatusEl.className = 'fw-bold text-warning';
        } else {
            healthStatusEl.innerHTML = getTranslation('team.health.low');
            healthStatusEl.className = 'fw-bold text-danger';
        }
    }
};

const renderActivityTimeline = () => {
    const timelineBody = document.getElementById('activityTimelineBody');
    if (!timelineBody) return;

    const html = activities.map(activity => {
        const time = new Date(activity.timestamp).toLocaleTimeString(currentLanguage, { hour: '2-digit', minute: '2-digit' });
        const date = new Date(activity.timestamp).toLocaleDateString(currentLanguage, { month: 'short', day: 'numeric' });
        
        let icon = 'fas fa-info-circle text-muted';
        if (activity.type.includes('ADD')) icon = 'fas fa-plus-circle text-success';
        if (activity.type.includes('DELETE')) icon = 'fas fa-trash-alt text-danger';
        if (activity.type.includes('STATUS')) icon = 'fas fa-sync-alt text-info';
        if (activity.type.includes('LEVEL')) icon = 'fas fa-star text-warning';
        if (activity.type.includes('TASK')) icon = 'fas fa-tasks text-primary';

        return `
            <div class="d-flex mb-3">
                <div class="me-3">
                    <i class="${icon} fa-fw"></i>
                </div>
                <div>
                    <div class="small">${activity.description}</div>
                    <div class="text-muted small">${date} at ${time}</div>
                </div>
            </div>
        `;
    }).join('');

    timelineBody.innerHTML = html || '<div class="text-center text-muted p-3">No recent activities.</div>';
};

const renderLeaderboard = () => {
    const leaderboardBody = document.getElementById('leaderboardBody');
    if (!leaderboardBody) return;

    const rankedMembers = [...members].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 5);

    const html = rankedMembers.map((member, index) => {
        const rank = index + 1;
        let rankIcon = '';
        if (rank === 1) rankIcon = '🥇';
        else if (rank === 2) rankIcon = '🥈';
        else if (rank === 3) rankIcon = '🥉';
        else rankIcon = `<span class="fw-bold me-1">${rank}.</span>`;

        return `
            <li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: transparent;">
                <div class="fw-bold">${rankIcon} ${member.name}</div>
                <small class="text-muted">${getTranslation('level')} ${member.level} | ${member.xp} ${getTranslation('xp')}</small>
            </li>
        `;
    }).join('');

    leaderboardBody.innerHTML = html || '<div class="text-center text-muted p-3">Not enough data for leaderboard.</div>';
};



const renderTeamTable = () => {
    const tableBody = document.getElementById('teamsTableBody');
    if (!tableBody) return;

    let html = '';
    teams.forEach(team => {
        const memberCount = members.filter(m => m.teamId === team.id).length;
        html += `
            <tr>
                <td class="align-middle fw-bold">${team.name}</td>
                <td class="align-middle text-muted">${team.description}</td>
                <td class="align-middle"><span class="badge" style="background-color: var(--primary-color); color: var(--bg-dark);">${memberCount}</span></td>
                <td class="align-middle text-end">
                    <button class="btn btn-sm btn-outline-info me-2 edit-team-btn" data-id="${team.id}" data-bs-toggle="modal" data-bs-target="#teamModal" title="Edit Team">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-team-btn" data-id="${team.id}" title="Delete Team">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html || `<tr><td colspan="4" class="text-center text-muted p-4">${getTranslation('no.teams')}</td></tr>`;

   
    document.querySelectorAll('.edit-team-btn').forEach(btn => btn.addEventListener('click', (e) => setupTeamForm(e.currentTarget.dataset.id)));


    document.querySelectorAll('.delete-team-btn').forEach(btn => btn.addEventListener('click', (e) => {
        const teamId = e.currentTarget.dataset.id;
        const teamName = teams.find(t => t.id === teamId)?.name || 'Team';
        
        document.getElementById('confirmationModalTitle').textContent = `Delete ${teamName}`;
        document.getElementById('confirmationModalBody').innerHTML = `Are you sure you want to delete **${teamName}**? This action cannot be undone, and all assigned members will become unassigned.`;
        document.getElementById('confirmActionButton').className = 'btn btn-danger';
        document.getElementById('confirmActionButton').textContent = 'Yes, Delete';
        
    
        document.getElementById('confirmActionButton').onclick = () => {
            if (deleteTeam(teamId)) {
                bootstrap.Modal.getInstance(document.getElementById('confirmationModal')).hide();
                renderAdminDashboard();
            }
        };

        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();
    }));
};

const renderMemberTable = () => {
    const tableBody = document.getElementById('membersTableBody');
    const searchInput = document.getElementById('memberSearch');
    const roleFilter = document.getElementById('memberRoleFilter');
    const statusFilter = document.getElementById('memberStatusFilter'); // NEW

    if (!tableBody || !searchInput || !roleFilter || !statusFilter) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const filterRole = roleFilter.value;
    const filterStatus = statusFilter.value; // NEW

    const filteredMembers = members.filter(member => {
        const matchesName = member.name.toLowerCase().includes(searchTerm);
        const matchesRole = !filterRole || member.role === filterRole;
        const matchesStatus = !filterStatus || member.status === filterStatus; // NEW
        return matchesName && matchesRole && matchesStatus;
    });

    let html = '';
    filteredMembers.forEach(member => {
        const team = teams.find(t => t.id === member.teamId);
        const teamName = team ? `<span class="badge text-bg-secondary">${team.name}</span>` : `<span class="badge text-bg-light text-dark">${getTranslation('unassigned')}</span>`;

        html += `
            <tr class="member-row" data-id="${member.id}">
                <td class="align-middle fw-medium">${member.name} ${member.mood || ''}</td>
                <td class="align-middle">${member.email}</td>
                <td class="align-middle">${member.role} (Lvl ${member.level})</td>
                <td class="align-middle">${teamName}</td>
                <td class="align-middle text-end">
                    <button class="btn btn-sm btn-outline-info me-2 edit-member-btn" data-id="${member.id}" data-bs-toggle="modal" data-bs-target="#memberModal" title="Edit Member">
                        <i class="fas fa-user-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-member-btn" data-id="${member.id}" title="Delete Member">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html || `<tr><td colspan="5" class="text-center text-muted p-4">${getTranslation('no.members.filter')}</td></tr>`;

    
    document.querySelectorAll('.edit-member-btn').forEach(btn => btn.addEventListener('click', (e) => setupMemberModal(e.currentTarget.dataset.id)));

   
    document.querySelectorAll('.delete-member-btn').forEach(btn => btn.addEventListener('click', (e) => {
        const memberId = e.currentTarget.dataset.id;
        const memberName = members.find(m => m.id === memberId)?.name || 'Member';
        
        document.getElementById('confirmationModalTitle').textContent = `Delete ${memberName}`;
        document.getElementById('confirmationModalBody').innerHTML = `Are you sure you want to delete **${memberName}**? This member's data, XP, and assigned tasks will be lost.`;
        document.getElementById('confirmActionButton').className = 'btn btn-danger';
        document.getElementById('confirmActionButton').textContent = 'Yes, Delete';

 
        document.getElementById('confirmActionButton').onclick = () => {
            if (deleteMember(memberId)) {
                bootstrap.Modal.getInstance(document.getElementById('confirmationModal')).hide();
                renderAdminDashboard();
            }
        };

        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();
    }));
};

const setupAdminEventListeners = () => {

    document.getElementById('teamForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.teamName.value;
        const description = form.teamDescription.value;
        const id = form.dataset.id;
        const mode = form.dataset.mode;

        let success = false;
        if (mode === 'add') {
            success = addTeam(name, description);
        } else if (mode === 'edit') {
            success = updateTeam(id, name, description);
        }

        if (success) {
            bootstrap.Modal.getInstance(document.getElementById('teamModal')).hide();
            renderAdminDashboard();
        }
    });

    document.getElementById('memberForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.memberName.value;
        const email = form.memberEmail.value;
        const role = form.memberRole.value;
        const teamId = form.memberTeamId.value;
        const mood = form.memberMood.value; 
        const skills = form.memberSkills.value.split(',').map(s => s.trim()).filter(Boolean); 
        const id = form.dataset.id;
        const mode = form.dataset.mode;

        let success = false;
        if (mode === 'add') {
            success = addMember(name, email, role, teamId, mood, skills);
        } else if (mode === 'edit') {
            success = updateMember(id, name, email, role, teamId, mood, skills);
        }

        if (success) {
            bootstrap.Modal.getInstance(document.getElementById('memberModal')).hide();
            renderAdminDashboard();
        }
    });

    document.getElementById('addTeamBtn')?.addEventListener('click', () => setupTeamForm());
    document.getElementById('addMemberBtn')?.addEventListener('click', () => setupMemberModal()); 

    document.getElementById('memberSearch')?.addEventListener('input', renderMemberTable);
    document.getElementById('memberRoleFilter')?.addEventListener('change', renderMemberTable);
    document.getElementById('memberStatusFilter')?.addEventListener('change', renderMemberTable); 


    document.getElementById('exportCsvBtn')?.addEventListener('click', exportToCSV);

    document.getElementById('backupDataBtn')?.addEventListener('click', backupData);
    document.getElementById('restoreDataBtn')?.addEventListener('click', () => document.getElementById('restoreFileInput').click());
    document.getElementById('restoreFileInput')?.addEventListener('change', restoreData);
};


const renderAdminDashboard = () => {
    if (!currentUser || currentUser.role !== 'admin') return; 

    setupTeamForm();
    setupMemberModal(); 

    renderTeamTable();
    renderMemberTable();
    renderHealthMeter();
    renderActivityTimeline();
    renderLeaderboard();
    renderStatsDashboard(); 
};



const renderTeamList = () => {
    const teamListContainer = document.getElementById('teamList');
    if (!teamListContainer) return;

    let html = '';
    if (teams.length === 0) {
         html = `<p class="text-center text-muted p-3">${getTranslation('no.teams')}</p>`;
    } else {
        teams.forEach(team => {
            const isActive = team.id === currentTeamId ? 'active bg-primary text-white' : '';
            html += `
                <a href="#" class="list-group-item list-group-item-action ${isActive} team-item" data-id="${team.id}">
                    <i class="fas fa-users me-2"></i> ${team.name}
                </a>
            `;
        });
    }

    teamListContainer.innerHTML = html;

    document.querySelectorAll('.team-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const teamId = e.currentTarget.dataset.id;
            currentTeamId = teamId;
            renderTeamList(); 
            renderTeamDetails(teamId); 
        });
    });

    if (!currentTeamId && teams.length > 0) {
        currentTeamId = teams[0].id;
        renderTeamList();
        renderTeamDetails(currentTeamId);
    } else if (teams.length === 0) {
        const detailsHeader = document.getElementById('teamDetailsHeader');
        if (detailsHeader) detailsHeader.innerHTML = `<h1 class="display-6 text-muted">${getTranslation('team.view')}</h1><p class="lead">${getTranslation('no.teams')}</p>`;
        const tableBody = document.getElementById('teamMembersTableBody');
        if (tableBody) tableBody.innerHTML = '';
    }
};

const renderTeamDetails = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    const detailsHeader = document.getElementById('teamDetailsHeader');
    const tableBody = document.getElementById('teamMembersTableBody');
    const notesArea = document.getElementById('teamNotes'); 
    const saveNotesBtn = document.getElementById('saveNotesBtn'); 

    if (!team || !detailsHeader || !tableBody) {
      
        return;
    }

    detailsHeader.innerHTML = `
        <h1 class="display-6 fw-bold" style="color: var(--primary-color)">${team.name}</h1>
        <p class="lead text-muted">${team.description}</p>
        <p class="small text-info">${getTranslation('health.meter')}: <strong>${calculateTeamHealth(teamId)}%</strong></p>
        <hr>
    `;

    const teamMembers = members.filter(m => m.teamId === teamId);
    let html = '';

    teamMembers.forEach(member => {
        const memberMood = member.mood || '😃'; 
        const isCurrentUser = currentUser && member.name === currentUser.username; 
        
        html += `
            <tr ${isCurrentUser ? 'class="table-info"' : ''}>
                <td class="align-middle fw-medium">${member.name} ${isCurrentUser ? '(You)' : ''}</td>
                <td class="align-middle">${member.role} / Lvl ${member.level}</td>
                <td class="align-middle">
                     <select class="form-select mood-select" data-member-id="${member.id}" aria-label="Update Mood" ${!isCurrentUser && currentUser.role !== 'admin' ? 'disabled' : ''}>
                        <option value="😃" ${memberMood === '😃' ? 'selected' : ''}>😃 Happy</option>
                        <option value="😊" ${memberMood === '😊' ? 'selected' : ''}>😊 Content</option>
                        <option value="😐" ${memberMood === '😐' ? 'selected' : ''}>😐 Neutral</option>
                        <option value="😕" ${memberMood === '😕' ? 'selected' : ''}>😕 Confused</option>
                        <option value="😫" ${memberMood === '😫' ? 'selected' : ''}>😫 Stressed</option>
                        <option value="🚀" ${memberMood === '🚀' ? 'selected' : ''}>🚀 Productive</option>
                    </select>
                </td>
                <td class="align-middle">
                    <select class="form-select status-select" data-member-id="${member.id}" aria-label="${getTranslation('update.status')}" ${!isCurrentUser && currentUser.role !== 'admin' ? 'disabled' : ''}>
                        <option value="Available" ${member.status === 'Available' ? 'selected' : ''}>${getTranslation('available')}</option>
                        <option value="Busy" ${member.status === 'Busy' ? 'selected' : ''}>${getTranslation('busy')}</option>
                        <option value="On Leave" ${member.status === 'On Leave' ? 'selected' : ''}>${getTranslation('on.leave')}</option>
                    </select>
                </td>
                <td class="align-middle text-center">${getStatusBadge(member.status)}</td>
            </tr>
        `;
    });
      
    tableBody.innerHTML = html || `<tr><td colspan="5" class="text-center text-muted p-4">This team currently has no assigned members.</td></tr>`;

   
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const memberId = e.target.dataset.memberId;
            const newStatus = e.target.value;
            updateMemberStatus(memberId, newStatus);
        });
    });

    document.querySelectorAll('.mood-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const memberId = e.target.dataset.memberId;
            const newMood = e.target.value;
            updateMemberMood(memberId, newMood);
        });
    });
    
   
    if (notesArea) {
        notesArea.value = teamNotes[teamId] || '';
   
        if (currentUser.role !== 'admin') {
            notesArea.disabled = true;
            if(saveNotesBtn) saveNotesBtn.style.display = 'none';
        } else {
             notesArea.disabled = false;
             if(saveNotesBtn) saveNotesBtn.style.display = 'block';
        }
    }
    if (saveNotesBtn) {
        saveNotesBtn.onclick = () => {
            teamNotes[teamId] = notesArea.value;
            saveData();
            logActivity('TEAM_NOTES', `Updated notes for team: ${team.name}`, null, teamId);
            showToast('Team notes saved!', 'success');
        };
    }
};




const getMemberName = (memberId) => members.find(m => m.id === memberId)?.name || 'Unknown';

const renderTaskCard = (task) => {
    const memberName = getMemberName(task.assigneeId);
    const canUpdate = currentUser.role === 'admin' || (currentUser && getMemberName(task.assigneeId) === currentUser.username);

    return `
        <div class="task-card" data-id="${task.id}">
            <div class="d-flex justify-content-between align-items-start">
                 <h6 class="task-title">${task.title}</h6>
                 ${currentUser.role === 'admin' ? `<button class="btn btn-sm btn-outline-danger delete-task-btn" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>` : ''}
            </div>
            <div class="task-meta">Assigned to: <strong>${memberName}</strong></div>
            <p class="task-description">${task.description || 'No description.'}</p>
            
            ${canUpdate ? `
            <div class="task-actions text-end">
                ${task.status !== 'Pending' ? `<button class="btn btn-outline-secondary me-1 move-task-btn" data-status="Pending"><i class="fas fa-arrow-left"></i></button>` : ''}
                ${task.status !== 'InProgress' ? `<button class="btn btn-outline-info me-1 move-task-btn" data-status="InProgress"><i class="fas ${task.status === 'Pending' ? 'fa-arrow-right' : 'fa-arrow-left'}"></i></button>` : ''}
                ${task.status !== 'Done' ? `<button class="btn btn-outline-success move-task-btn" data-status="Done"><i class="fas fa-check"></i></button>` : ''}
            </div>
            ` : ''}
        </div>
    `;
};

const renderTaskPage = () => {
    if (!currentUser) return;

    const isAdmin = currentUser.role === 'admin';
    const currentMember = members.find(m => m.name === currentUser.username);
    const myMemberId = currentMember ? currentMember.id : null;
    
   
    const addTaskFormContainer = document.getElementById('addTaskFormContainer');
    const allTasksSection = document.getElementById('allTasksSection');
    if (isAdmin) {
        if(addTaskFormContainer) addTaskFormContainer.style.display = 'block';
        if(allTasksSection) allTasksSection.style.display = 'block';


        const assigneeSelect = document.getElementById('taskAssignee');
        if (assigneeSelect) {
            assigneeSelect.innerHTML = '<option value="">-- Select Member --</option>';
            members.forEach(m => {
                assigneeSelect.innerHTML += `<option value="${m.id}">${m.name}</option>`;
            });
        }
    }

    
    const lists = {
        'my-tasks-Pending': document.getElementById('my-tasks-Pending'),
        'my-tasks-InProgress': document.getElementById('my-tasks-InProgress'),
        'my-tasks-Done': document.getElementById('my-tasks-Done'),
        'all-tasks-Pending': document.getElementById('all-tasks-Pending'),
        'all-tasks-InProgress': document.getElementById('all-tasks-InProgress'),
        'all-tasks-Done': document.getElementById('all-tasks-Done')
    };
    
   
    Object.values(lists).forEach(list => { if(list) list.innerHTML = ''; });

    tasks.forEach(task => {
        const cardHtml = renderTaskCard(task);
        
        
        if (task.assigneeId === myMemberId) {
            const myList = lists[`my-tasks-${task.status}`];
            if (myList) myList.innerHTML += cardHtml;
        }

      
        if (isAdmin) {
            const allList = lists[`all-tasks-${task.status}`];
            if (allList) allList.innerHTML += cardHtml;
        }
    });

   
    setupTaskEventListeners();
};

const addTask = (title, description, assigneeId) => {
    if (!title || !assigneeId) return false;
    const newTask = {
        id: generateUniqueId('K'),
        title,
        description,
        assigneeId,
        status: 'Pending',
        createdBy: currentUser.username,
        createdAt: Date.now()
    };
    tasks.push(newTask);
    saveData();
    const memberName = getMemberName(assigneeId);
    logActivity('TASK_ADD', `Task "${title}" assigned to ${memberName}`, assigneeId);
    showToast('Task added successfully!', 'success');
    return true;
};

const updateTaskStatus = (taskId, newStatus) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
        const oldStatus = tasks[taskIndex].status;
        tasks[taskIndex].status = newStatus;
        
       
        if (newStatus === 'Done' && oldStatus !== 'Done') {
            const member = members.find(m => m.id === tasks[taskIndex].assigneeId);
            updateXP(member, XP_PER_ACTION * 2, 'TASK_COMPLETE'); 
        }
        
        saveData();
        logActivity('TASK_UPDATE', `Task "${tasks[taskIndex].title}" moved to ${newStatus}`, tasks[taskIndex].assigneeId);
        showToast(`Task status updated to ${newStatus}`, 'info');
        renderTaskPage();
    }
};

const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return false;
    
    tasks = tasks.filter(t => t.id !== taskId);
    saveData();
    logActivity('TASK_DELETE', `Task "${task.title}" deleted`, task.assigneeId);
    showToast('Task deleted.', 'info');
    renderTaskPage();
};

const setupTaskEventListeners = () => {
    
    document.getElementById('taskForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const assigneeId = document.getElementById('taskAssignee').value;
        
        if (addTask(title, description, assigneeId)) {
            e.target.reset();
            renderTaskPage();
        } else {
            showToast('Please provide a title and assignee.', 'error');
        }
    });

    document.querySelectorAll('.move-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = e.currentTarget.closest('.task-card').dataset.id;
            const newStatus = e.currentTarget.dataset.status;
            updateTaskStatus(taskId, newStatus);
        });
    });

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = e.currentTarget.dataset.id;
            
             document.getElementById('confirmationModalTitle').textContent = 'Delete Task';
            document.getElementById('confirmationModalBody').innerHTML = `Are you sure you want to delete this task? This cannot be undone.`;
            document.getElementById('confirmActionButton').className = 'btn btn-danger';
            document.getElementById('confirmActionButton').textContent = 'Yes, Delete';
            
            document.getElementById('confirmActionButton').onclick = () => {
                deleteTask(taskId);
                 bootstrap.Modal.getInstance(document.getElementById('confirmationModal')).hide();
            };

            const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
            modal.show();
        });
    });
};



window.onload = () => {
  
    loadData(); 
    initColorTheme();
    renderTranslation();
    
    if (document.body.id === 'admin-page') {
     
        const overlay = document.getElementById('intro-overlay');
        setTimeout(() => {
            if (overlay) {
                overlay.classList.add('hidden');
           
                document.querySelectorAll('#main-content-row .animated-card').forEach((card, index) => {
                    card.style.animationDelay = `${3 + index * 0.2}s`;
                });
            }
        }, 3000); 

       
        setupAdminEventListeners();
 
        renderAdminDashboard();
       
        startVoiceInputListener();
    
    } else if (document.body.id === 'team-page') {
        renderTeamList();
    
    } else if (document.body.id === 'task-page') {
        renderTaskPage();
    }
    
   
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
};

window.tms = {
    addTeam, updateTeam, deleteTeam,
    addMember, updateMember, deleteMember,
    updateMemberStatus, updateMemberMood,
    addTask, updateTaskStatus, deleteTask,
    teams, members, activities, tasks,
    saveData, loadData,
    showToast
};


const setupTeamForm = (teamId = null) => {
    const form = document.getElementById('teamForm');
    const modalTitle = document.getElementById('teamModalLabel');
    const teamNameInput = document.getElementById('teamName');
    const teamDescriptionInput = document.getElementById('teamDescription');

    if (!form || !modalTitle || !teamNameInput || !teamDescriptionInput) return;

    form.reset();
    form.dataset.mode = 'add';
    form.dataset.id = '';
    modalTitle.textContent = getTranslation('add.team');

    if (teamId) {
        const team = teams.find(t => t.id === teamId);
        if (team) {
            form.dataset.mode = 'edit';
            form.dataset.id = teamId;
            modalTitle.textContent = `Edit Team: ${team.name}`;
            teamNameInput.value = team.name;
            teamDescriptionInput.value = team.description;
        }
    }
};
