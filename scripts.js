let training = [], totalHours = 0;
const recommendations = {
    it: ['Introduction to Programming', 'Data Structures', 'Network Security'],
    office: ['Database Fundamentals', 'Web Development Basics', 'Security Policies'],
    dev: ['Object-Oriented Programming', 'Machine Learning Basics', 'Blockchain Fundamentals'],
    secureDev: ['Secure Coding Practices', 'Advanced Security Testing', 'Secure Software Development Lifecycle']
};

function addToTraining(module, hours, id) {
    if (!training.some(item => item.module === module)) {
        training.push({ module, hours, id });
        totalHours += hours;
        document.getElementById(id).style.display = 'none';
        displayTraining();
        updateCostInfo();
    }
}

function removeFromTraining(module, hours, id) {
    training = training.filter(item => item.module !== module);
    totalHours -= hours;
    document.getElementById(id).style.display = 'table-row';
    displayTraining();
    updateCostInfo();
}

function displayTraining() {
    const customTrainingDiv = document.getElementById('customTraining');
    customTrainingDiv.innerHTML = '';
    let day = 1, dayHours = 0, dayDiv = document.createElement('div');
    dayDiv.innerHTML = `<h3>Day ${day}</h3>`;
    customTrainingDiv.appendChild(dayDiv);

    training.forEach(item => {
        if (dayHours + item.hours > 8) {
            const remainingHours = 8 - dayHours, overflowHours = item.hours - remainingHours;
            dayDiv.innerHTML += `<div class="module">${item.module} - ${remainingHours} hours <button class="btn btn-danger btn-sm" onclick="removeFromTraining('${item.module}', ${item.hours}, '${item.id}')">Remove</button></div>`;
            day++;
            dayHours = overflowHours;
            dayDiv = document.createElement('div');
            dayDiv.innerHTML = `<h3>Day ${day}</h3><div class="module">${item.module} - ${overflowHours} hours <button class="btn btn-danger btn-sm" onclick="removeFromTraining('${item.module}', ${overflowHours}, '${item.id}')">Remove</button></div>`;
            customTrainingDiv.appendChild(dayDiv);
        } else {
            dayDiv.innerHTML += `<div class="module">${item.module} - ${item.hours} hours <button class="btn btn-danger btn-sm" onclick="removeFromTraining('${item.module}', ${item.hours}, '${item.id}')">Remove</button></div>`;
            dayHours += item.hours;
        }
    });
}

function calculateCost() {
    const days = Math.ceil(totalHours / 8);
    const costPerDay = days === 1 ? 800 : days <= 2 ? 700 : days >= 5 ? 650 : 700;
    return days * costPerDay * (document.getElementById('bigGroupTraining').checked ? 2 : 1);
}

function updateCostInfo() {
    const costInfoDiv = document.getElementById('costInfo');
    const days = Math.ceil(totalHours / 8);
    const totalCost = calculateCost();
    costInfoDiv.innerHTML = `Total cost for ${days} training day(s): €${totalCost} (calculated per training day, not per type of training)`;
}

function confirmOrder(event) {
    event.preventDefault();
    if (totalHours < 8 && !confirm('Your training is shorter than 8 hours. Would you like to add more modules to reach at least 8 hours?')) {
        alert('We will contact you for further details.');
        return;
    }

    const participants = document.getElementById('participants').value;
    const customer = document.getElementById('customer').value;
    const email = document.getElementById('email').value;
    const contactName = document.getElementById('contactName').value;
    const location = document.getElementById('location').value;
    const preferredDay = document.getElementById('preferredDayType').value === 'exact' ? document.getElementById('preferredDate').value : 'Flexible';
    const totalCost = calculateCost();

    console.log(`Order Summary:
    Number of Participants: ${participants}
    Customer: ${customer}
    Email: ${email}
    Contact Name: ${contactName}
    Training Location: ${location}
    Preferred Day or Flexible: ${preferredDay}
    Total Hours: ${totalHours}
    Total Cost: €${totalCost}`);
}

function populateTable(tableId, modules) {
    const table = document.getElementById(tableId);
    table.innerHTML = '<tr><th>Module</th><th>Time (hours)</th></tr>';
    modules.forEach(module => {
        const row = document.createElement('tr');
        row.id = module.id;
        row.innerHTML = `<td onclick="addToTraining('${module.name}', ${module.hours}, '${module.id}')">${module.name} <input type="checkbox" class="checkbox" disabled></td><td>${module.hours}</td>`;
        table.appendChild(row);
    });
}

function updateRecommendations() {
    const selectedRecommendation = document.getElementById('recommendationDropdown').value;
    const allModules = document.querySelectorAll('td');
    allModules.forEach(td => td.classList.remove('highlight'));
    if (selectedRecommendation) highlightModules(recommendations[selectedRecommendation]);
}

function highlightModules(modules) {
    modules.forEach(module => {
        const td = Array.from(document.querySelectorAll('td')).find(td => td.textContent.includes(module));
        if (td) td.classList.add('highlight');
    });
}

function addRecommendationToLearning() {
    const selectedRecommendation = document.getElementById('recommendationDropdown').value;
    if (selectedRecommendation) {
        training = [];
        totalHours = 0;
        displayTraining();
        recommendations[selectedRecommendation].forEach(module => {
            const moduleElement = Array.from(document.querySelectorAll('td')).find(td => td.textContent.includes(module));
            if (moduleElement) {
                const moduleId = moduleElement.parentElement.id;
                const moduleHours = parseInt(moduleElement.nextElementSibling.textContent);
                addToTraining(module, moduleHours, moduleId);
            }
        });
    }
}

function eraseTraining() {
    training = [];
    totalHours = 0;
    document.querySelectorAll('tr').forEach(row => row.style.display = 'table-row');
    displayTraining();
    updateCostInfo();
}

function toggleBigGroup() {
    const participantsInput = document.getElementById('participants');
    const bigGroupCheckbox = document.getElementById('bigGroupTraining');
    const hint = document.getElementById('bigGroupHint');

    if (bigGroupCheckbox.checked) {
        participantsInput.max = 24;
        hint.textContent = 'Price is doubled, max 24 participants.';
    } else {
        participantsInput.max = 8;
        hint.textContent = '';
    }
    updateCostInfo();
}

document.getElementById('participants').addEventListener('input', function() {
    const participantsInput = document.getElementById('participants');
    const bigGroupCheckbox = document.getElementById('bigGroupTraining');
    if (participantsInput.value > 8) {
        bigGroupCheckbox.checked = true;
        toggleBigGroup();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addRecommendationButton').addEventListener('click', addRecommendationToLearning);
    document.getElementById('eraseTrainingButton').addEventListener('click', eraseTraining);
    document.getElementById('preferredDayType').addEventListener('change', function() {
        const datePicker = document.getElementById('preferredDate');
        datePicker.style.display = this.value === 'exact' ? 'block' : 'none';
    });
    populateTables();
});

function populateTables() {
    const fundamentals = [
        { name: 'Introduction to Programming', hours: 2, id: 'fund1' },
        { name: 'Data Structures', hours: 3, id: 'fund2' },
        { name: 'Algorithms Basics', hours: 1, id: 'fund3' },
        { name: 'Object-Oriented Programming', hours: 4, id: 'fund4' },
        { name: 'Database Fundamentals', hours: 2, id: 'fund5' },
        { name: 'Web Development Basics', hours: 3, id: 'fund6' },
        { name: 'Software Engineering Principles', hours: 1, id: 'fund7' }
    ];

    const cybersecurity = [
        { name: 'Introduction to Cybersecurity', hours: 2, id: 'cyber1' },
        { name: 'Network Security', hours: 3, id: 'cyber2' },
        { name: 'Cryptography Basics', hours: 1, id: 'cyber3' },
        { name: 'Ethical Hacking', hours: 4, id: 'cyber4' },
        { name: 'Security Policies', hours: 2, id: 'cyber5' },
        { name: 'Incident Response', hours: 3, id: 'cyber6' },
        { name: 'Risk Management', hours: 1, id: 'cyber7' }
    ];

    const emergingTech = [
        { name: 'Introduction to AI', hours: 2, id: 'emerg1' },
        { name: 'Machine Learning Basics', hours: 3, id: 'emerg2' },
          { name: 'Blockchain Fundamentals', hours: 1, id: 'emerg3' },
        { name: 'IoT Overview', hours: 4, id: 'emerg4' },
        { name: 'Quantum Computing', hours: 2, id: 'emerg5' },
        { name: '5G Technology', hours: 3, id: 'emerg6' },
        { name: 'Edge Computing', hours: 1, id: 'emerg7' }
    ];

    populateTable('fundamentalsTable', fundamentals);
    populateTable('cybersecurityTable', cybersecurity);
    populateTable('emergingTechTable', emergingTech);
}
