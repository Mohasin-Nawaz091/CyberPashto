
const STORAGE_KEYS = {
    TEAMS: 'tms_teams',
    MEMBERS: 'tms_members',
    THEME: 'tms_theme'
};

let teams = [];
let members = [];
let currentTeamId = null; 

const generateUniqueId = (prefix) => prefix + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

const loadData = () => {
    try {
        teams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS)) || [];
        members = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS)) || [];
    } catch (e) {
        console.error("Error loading data from LocalStorage:", e);
        teams = [];
        members = [];
    }
};

const saveData = () => {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
};


const THEME_ICONS = {
    LIGHT: 'fas fa-sun',
    DARK: 'fas fa-moon'
};

// const applyTheme = (theme) => {
//     const body = document.body;
//     const themeIcon = document.getElementById('theme-icon');
//     if (!body || !themeIcon) return;
  
//     const isDark = theme === 'dark';
//     const { DARK, LIGHT } = THEME_ICONS;
//     const { THEME } = STORAGE_KEYS;
//     body.classList.toggle('dark-mode', isDark);
//     themeIcon.className = isDark ? LIGHT : DARK;
//     themeIcon.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
//     localStorage.setItem(THEME, theme);
//   };
  
const applyTheme = (theme) => {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (!body || !themeIcon) return;

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.className = THEME_ICONS.LIGHT; 
        themeIcon.title = 'Switch to Light Mode';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.className = THEME_ICONS.DARK;
        themeIcon.title = 'Switch to Dark Mode';
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
};

const initTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    applyTheme(savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
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
    return true;
};

const updateTeam = (id, name, description) => {
    const teamIndex = teams.findIndex(t => t.id === id);
    if (teamIndex > -1) {
        teams[teamIndex].name = name;
        teams[teamIndex].description = description;
        saveData();
        return true;
    }
    return false;
};

const deleteTeam = (id) => {
    members.forEach(member => {
        if (member.teamId === id) {
            member.teamId = null;
        }
    });

    teams = teams.filter(t => t.id !== id);
    saveData();
    return true;
};


const addMember = (name, email, role, teamId) => {
    if (!name || !email || !role) return false;

    const newMember = {
        id: generateUniqueId('M'),
        name: name,
        email: email,
        role: role,
        teamId: teamId || null,
        status: 'Available'
    };
    members.push(newMember);
    saveData();
    return true;
};

const updateMember = (id, name, email, role, teamId) => {
    const memberIndex = members.findIndex(m => m.id === id);
    if (memberIndex > -1) {
        members[memberIndex].name = name;
        members[memberIndex].email = email;
        members[memberIndex].role = role;
        members[memberIndex].teamId = teamId || null;
        saveData();
        return true;
    }
    return false;
};

const deleteMember = (id) => {
    members = members.filter(m => m.id !== id);
    saveData();
    return true;
};


const updateMemberStatus = (memberId, newStatus) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
        member.status = newStatus;
        saveData();
        renderTeamDetails(currentTeamId); 
    }
};

const getStatusBadge = (status) => {
    let colorClass;
    switch (status) {
        case 'Available':
            colorClass = 'success';
            break;
        case 'Busy':
            colorClass = 'warning';
            break;
        case 'On Leave':
            colorClass = 'danger';
            break;
        default:
            colorClass = 'secondary';
    }
    return `<span class="badge text-bg-${colorClass} status-badge"><i class="fas fa-circle me-1"></i>${status}</span>`;
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
    modalTitle.textContent = 'Add New Team';

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

const setupMemberForm = (memberId = null) => {
    const form = document.getElementById('memberForm');
    const modalTitle = document.getElementById('memberModalLabel');
    const memberNameInput = document.getElementById('memberName');
    const memberEmailInput = document.getElementById('memberEmail');
    const memberRoleInput = document.getElementById('memberRole');
    const teamSelect = document.getElementById('memberTeamId');

    if (!form || !modalTitle || !teamSelect) return;

    teamSelect.innerHTML = `<option value="">-- Unassigned --</option>`;
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    form.reset();
    form.dataset.mode = 'add';
    form.dataset.id = '';
    modalTitle.textContent = 'Add New Member';

    if (memberId) {
        const member = members.find(m => m.id === memberId);
        if (member) {
            form.dataset.mode = 'edit';
            form.dataset.id = memberId;
            modalTitle.textContent = `Edit Member: ${member.name}`;
            memberNameInput.value = member.name;
            memberEmailInput.value = member.email;
            memberRoleInput.value = member.role;
            teamSelect.value = member.teamId || '';
        }
    }
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
                <td class="align-middle"><span class="badge text-bg-primary">${memberCount}</span></td>
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
    tableBody.innerHTML = html || '<tr><td colspan="4" class="text-center text-muted p-4">No teams created yet.</td></tr>';

    document.querySelectorAll('.edit-team-btn').forEach(btn => btn.addEventListener('click', (e) => setupTeamForm(e.currentTarget.dataset.id)));
    document.querySelectorAll('.delete-team-btn').forEach(btn => btn.addEventListener('click', (e) => {
        if (window.confirm('Are you sure you want to delete this team? All assigned members will become unassigned.')) {
            deleteTeam(e.currentTarget.dataset.id);
            renderAdminDashboard();
        }
    }));
};

const renderMemberTable = () => {
    const tableBody = document.getElementById('membersTableBody');
    const searchInput = document.getElementById('memberSearch');
    const roleFilter = document.getElementById('memberRoleFilter');

    if (!tableBody || !searchInput || !roleFilter) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const filterRole = roleFilter.value;

    const filteredMembers = members.filter(member => {
        const matchesName = member.name.toLowerCase().includes(searchTerm);
        const matchesRole = !filterRole || member.role === filterRole;
        return matchesName && matchesRole;
    });

    let html = '';
    filteredMembers.forEach(member => {
        const team = teams.find(t => t.id === member.teamId);
        const teamName = team ? `<span class="badge text-bg-secondary">${team.name}</span>` : 'Unassigned';

        html += `
            <tr>
                <td class="align-middle fw-medium">${member.name}</td>
                <td class="align-middle">${member.email}</td>
                <td class="align-middle">${member.role}</td>
                <td class="align-middle">${teamName}</td>
                <td class="align-middle text-end">
                    <button class="btn btn-sm btn-outline-info me-2 edit-member-btn" data-id="${member.id}" data-bs-toggle="modal" data-bs-target="#memberModal" title="Edit Member">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-member-btn" data-id="${member.id}" title="Delete Member">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html || '<tr><td colspan="5" class="text-center text-muted p-4">No members match the current filter/search.</td></tr>';

    document.querySelectorAll('.edit-member-btn').forEach(btn => btn.addEventListener('click', (e) => setupMemberForm(e.currentTarget.dataset.id)));
    document.querySelectorAll('.delete-member-btn').forEach(btn => btn.addEventListener('click', (e) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            deleteMember(e.currentTarget.dataset.id);
            renderAdminDashboard();
        }
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
        const id = form.dataset.id;
        const mode = form.dataset.mode;

        let success = false;
        if (mode === 'add') {
            success = addMember(name, email, role, teamId);
        } else if (mode === 'edit') {
            success = updateMember(id, name, email, role, teamId);
        }

        if (success) {
            bootstrap.Modal.getInstance(document.getElementById('memberModal')).hide();
            renderAdminDashboard();
        }
    });

    document.getElementById('addTeamBtn')?.addEventListener('click', () => setupTeamForm());
    document.getElementById('addMemberBtn')?.addEventListener('click', () => setupMemberForm());

    document.getElementById('memberSearch')?.addEventListener('input', renderMemberTable);
    document.getElementById('memberRoleFilter')?.addEventListener('change', renderMemberTable);

    document.getElementById('exportTeamsBtn')?.addEventListener('click', () => exportToCSV(teams, 'tms_teams_export.csv'));
    document.getElementById('exportMembersBtn')?.addEventListener('click', () => exportToCSV(members.map(m => {
        const teamName = teams.find(t => t.id === m.teamId)?.name || 'Unassigned';
        return {
            Name: m.name,
            Email: m.email,
            Role: m.role,
            Team: teamName,
            Status: m.status
        };
    }), 'tms_members_export.csv'));
};


const renderAdminDashboard = () => {
    
    setupTeamForm();
    setupMemberForm();

    renderTeamTable();
    renderMemberTable();
};


const renderTeamList = () => {
    const teamListContainer = document.getElementById('teamList');
    if (!teamListContainer) return;

    let html = '';
    if (teams.length === 0) {
         html = '<p class="text-center text-muted p-3">No teams available.</p>';
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
// teamListContainer.innerHTML = html;

// 
// document.querySelectorAll('.team-item').forEach(item => {
//   item.addEventListener('click', event => {
//     event.preventDefault();
//     const teamId = item.dataset.id;
//     currentTeamId = teamId;
//     renderTeamList();
//     renderTeamDetails(teamId);
//   });
// });


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
       
        document.getElementById('teamDetailsHeader').innerHTML = `<h1 class="display-6 text-muted">Select a Team</h1><p class="lead">No teams have been created yet by the admin.</p>`;
        document.getElementById('teamMembersTableBody').innerHTML = '';
    }
};

const renderTeamDetails = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    const detailsHeader = document.getElementById('teamDetailsHeader');
    const tableBody = document.getElementById('teamMembersTableBody');

    if (!team || !detailsHeader || !tableBody) {
        detailsHeader.innerHTML = `<h1 class="display-6 text-muted">Select a Team</h1><p class="lead">Please select a team from the list on the left to view details.</p>`;
        tableBody.innerHTML = '';
        return;
    }

    detailsHeader.innerHTML = `
        <h1 class="display-6 fw-bold text-primary">${team.name}</h1>
        <p class="lead text-muted">${team.description}</p>
        <hr>
    `;

    const teamMembers = members.filter(m => m.teamId === teamId);
    let html = '';

    teamMembers.forEach(member => {
        html += `
            <tr>
                <td class="align-middle fw-medium">${member.name}</td>
                <td class="align-middle">${member.email}</td>
                <td class="align-middle">${member.role}</td>
                <td class="align-middle">
                    <select class="form-select status-select" data-member-id="${member.id}">
                        <option value="Available" ${member.status === 'Available' ? 'selected' : ''}>Available</option>
                        <option value="Busy" ${member.status === 'Busy' ? 'selected' : ''}>Busy</option>
                        <option value="On Leave" ${member.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                    </select>
                </td>
                <td class="align-middle text-center">${getStatusBadge(member.status)}</td>
            </tr>
        `;
    });
    // teamMembers.forEach(member => {
    //     html += `
    //       <tr>
    //         <td class="align-middle fw-medium">${member.name}</td>
    //         <td class="align-middle">${member.email}</td>
    //         <td class="align-middle">${member.role}</td>
    //         <td class="align-middle">
    //           <select class="form-select status-select" data-member-id="${member.id}">
    //             ${['Available', 'Busy', 'On Leave']
    //               .map(status => `
    //                 <option value="${status}" ${member.status === status ? 'selected' : ''}>
    //                   ${status}
    //                 </option>
    //               `)
    //               .join('')}
    //           </select>
    //         </td>
    //         <td class="align-middle text-center">
    //           ${getStatusBadge(member.status)}
    //         </td>
    //       </tr>
    //     `;
    //   });
      
    tableBody.innerHTML = html || '<tr><td colspan="5" class="text-center text-muted p-4">This team currently has no assigned members.</td></tr>';

    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const memberId = e.target.dataset.memberId;
            const newStatus = e.target.value;
            updateMemberStatus(memberId, newStatus);
        });
    });
};


const exportToCSV = (dataArray, filename) => {
    if (!dataArray || dataArray.length === 0) {
        alert('No data to export!');
        return;
    }

    const headers = Object.keys(dataArray[0]).join(',');
    const rows = dataArray.map(obj => Object.values(obj).map(val => (typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val)).join(',')).join('\n');

    const csvContent = headers + '\n' + rows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Exported ${filename}`);
};


window.onload = () => {
    loadData();
    initTheme(); 

    if (document.body.id === 'admin-page') {
        setupAdminEventListeners();
        renderAdminDashboard();
    } else if (document.body.id === 'team-page') {
        renderTeamList();
    }
};

window.tms = {
    addTeam, updateTeam, deleteTeam,
    addMember, updateMember, deleteMember,
    teams, members, saveData, loadData
};
