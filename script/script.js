// Global variables 
let interviewArray = [], rejectedArray = [], currentStatus = "all";

// DOM Elements -All 
const totalCounter = document.getElementById("total-Count"),
      interviewCounter = document.getElementById("interview-Count"),
      rejectedCounter = document.getElementById("rejected-Count"),
      jobsCount = document.getElementById("jobs-Count"),
      allFilterBtn = document.getElementById("add-all-btn"),
      interviewFilterBtn = document.getElementById("add-interview-btn"),
      rejectedFilterBtn = document.getElementById("add-rejected-btn"),
      cardContainer = document.getElementById("card-container"),
      mainContainer = document.getElementById("main"),
      filterSection = document.getElementById("filtered-section");

// Initial count calculation
function calculateCount() {
    totalCounter.innerText = jobsCount.innerText = cardContainer.children.length;
    interviewCounter.innerText = interviewArray.length;
    rejectedCounter.innerText = rejectedArray.length;
    checkEmptyJobs();
}

function checkEmptyJobs() {
    if(cardContainer.children.length === 0) {
        cardContainer.innerHTML = `<div class="text-center py-26 px-8 bg-white rounded-2xl border-2 border-gray-200 mt-12"><i class="fa-solid fa-file-lines text-sky-300 text-7xl mb-6"></i><p class="text-black-500 text-3xl font-bold">No jobs available</p><p class="text-gray-400 text-lg mt-3">Check back soon for new job opportunities</p></div>`;
    }
}

calculateCount();

// Filter button style toggle
function toggleStyle(id) {
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(function(btn) {
        btn.classList.remove('bg-sky-500', 'text-white');
        btn.classList.add('bg-white', 'text-gray-500');
    });
    
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-500');
    selected.classList.add('bg-sky-500', 'text-white');
    currentStatus = id;

    if(id == 'add-all-btn') {
        cardContainer.classList.remove('hidden');
        filterSection.classList.add('hidden');
        checkEmptyJobs();
    } else {
        cardContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');

        if(id == 'add-interview-btn') {
            if(interviewArray.length == 0) {
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No interviews scheduled yet</p>';
            } else {
                renderFiltered(interviewArray);
            }
        } else {
            if(rejectedArray.length == 0) {
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No rejections</p>';
            } else {
                renderFiltered(rejectedArray);
            }
        }
    }
}

// Filter button event listeners
allFilterBtn.addEventListener('click', function() {
    toggleStyle('add-all-btn');
});

interviewFilterBtn.addEventListener('click', function() {
    toggleStyle('add-interview-btn');
});

rejectedFilterBtn.addEventListener('click', function() {
    toggleStyle('add-rejected-btn');
});

// Extract card data
function getCardData(parentDiv) {
    return {
        companyName: parentDiv.querySelector('.company-name').innerText,    
        PositionName: parentDiv.querySelector('.position-name').innerText,  
        location: parentDiv.querySelector('.location').innerText,         
        type: parentDiv.querySelector('.type').innerText,                   
        salary: parentDiv.querySelector('.salary').innerText,            
        note: parentDiv.querySelector('.notes').innerText       
    };
}

// Update card status badge
function updateStatus(parentDiv, status, bgClass) {
    const badge = parentDiv.querySelector('.not-applied');
    badge.innerText = status;
    badge.classList.remove('bg-blue-100', 'text-sky-900', 'bg-red-500', 'bg-green-500', 'text-white');
    badge.classList.add(bgClass, 'text-white');
}

// Main event listener - Handle Interview, Rejected, Delete buttons
mainContainer.addEventListener('click', function(event){
    
    if (event.target.classList.contains('interview-btn')) {
        const parentDiv = event.target.parentNode.parentNode;
        const cardInfo = {...getCardData(parentDiv), status: 'Interview'}; 
        
        updateStatus(parentDiv, 'Interview', 'bg-green-500'); 
        
        // Prevent duplicates
        let alreadyExists = null;
        for(let i = 0; i < interviewArray.length; i++) {
            if(interviewArray[i].companyName == cardInfo.companyName) {
                alreadyExists = interviewArray[i];
                break;
            }
        }
        
        if (!alreadyExists) {
            interviewArray.push(cardInfo);
        }
        
        let newRejectedArray = [];
        for(let i = 0; i < rejectedArray.length; i++) {
            if(rejectedArray[i].companyName != cardInfo.companyName) {
                newRejectedArray.push(rejectedArray[i]);
            }
        }
        rejectedArray = newRejectedArray;
        
        if(currentStatus == 'add-rejected-btn') {
            if(rejectedArray.length == 0) {
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No rejections</p>';
            } else {
                renderFiltered(rejectedArray);
            }
        } else if(currentStatus == 'add-interview-btn') {
            renderFiltered(interviewArray);
        }
        calculateCount();
    }
    
    if (event.target.classList.contains('rejected-btn')) {
        const parentDiv = event.target.parentNode.parentNode;
        const cardInfo = {...getCardData(parentDiv), status: 'Rejected'};
        
        updateStatus(parentDiv, 'Rejected', 'bg-red-500');
        
        // Prevent duplicates
        let alreadyExists = null;
        for(let i = 0; i < rejectedArray.length; i++) {
            if(rejectedArray[i].companyName == cardInfo.companyName) {
                alreadyExists = rejectedArray[i];
                break;
            }
        }
        
        if (!alreadyExists) {
            rejectedArray.push(cardInfo);
        }
        
        let newInterviewArray = [];
        for(let i = 0; i < interviewArray.length; i++) {
            if(interviewArray[i].companyName != cardInfo.companyName) {
                newInterviewArray.push(interviewArray[i]);
            }
        }
        interviewArray = newInterviewArray;
        
        if(currentStatus == 'add-interview-btn') {
            if(interviewArray.length == 0) {
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No interviews scheduled yet</p>';
            } else {
                renderFiltered(interviewArray);
            }
        } else if(currentStatus == 'add-rejected-btn') {
            renderFiltered(rejectedArray);
        }
        calculateCount();
    }
    
    if (event.target.classList.contains('fa-trash-can') || event.target.classList.contains('btn-delete')) {
        const card = event.target.closest('.card');
        const companyName = card.querySelector('.company-name').innerText;
        
        let newInterviewArray = [];
        for(let i = 0; i < interviewArray.length; i++) {
            if(interviewArray[i].companyName != companyName) {
                newInterviewArray.push(interviewArray[i]);
            }
        }
        interviewArray = newInterviewArray;
        
        let newRejectedArray = [];
        for(let i = 0; i < rejectedArray.length; i++) {
            if(rejectedArray[i].companyName != companyName) {
                newRejectedArray.push(rejectedArray[i]);
            }
        }
        rejectedArray = newRejectedArray;
        
        card.remove();
        calculateCount();
        
        if(currentStatus == 'add-interview-btn') {
            if(interviewArray.length == 0) {
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No interviews scheduled yet</p>';
            } else {
                renderFiltered(interviewArray);
            }
        } else if(currentStatus == 'add-rejected-btn') {
            if(rejectedArray.length == 0) {
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No rejections</p>';
            } else {
                renderFiltered(rejectedArray);
            }
        } else if(currentStatus == 'add-all-btn') {
            checkEmptyJobs();
        }
    }
})

// Render filtered cards/Render mane holo screen e display kora.
function renderFiltered(arr) {
    filterSection.innerHTML = '';
    arr.forEach(function(item) {
        // Set badge color based on status
        let bgColor;
        if(item.status === 'Interview') {
            bgColor = 'bg-green-500';
        } else {
            bgColor = 'bg-red-500';
        }
        
        const div = document.createElement('div');
        div.className = 'card flex justify-between shadow-md bg-white p-8 rounded-xl';
        div.innerHTML = `
            <div class="left space-y-3">
                <p class="company-name text-sky-900 text-3xl font-bold">${item.companyName}</p>
                <p class="position-name text-gray-500 text-xl">${item.PositionName}</p>
                <ul class="work-time list-inside list-disc lg:flex gap-3 text-gray-500">
                    <p class="location">${item.location}</p>
                    <li class="type">${item.type}</li>
                    <li class="salary">${item.salary}</li>
                </ul>
                <span class="not-applied ${bgColor} text-white font-bold px-5 py-2 rounded-xl">${item.status}</span>
                <p class="notes text-gray-500 mt-3">${item.note}</p>
                <div class="flex gap-5">
                    <button class="interview-btn border-2 border-green-500 text-green-500 font-bold px-4 py-2 rounded-xl">INTERVIEW</button>
                    <button class="rejected-btn border-2 border-red-500 font-bold text-red-500 px-4 py-2 rounded-xl">REJECTED</button>
                </div>
            </div>
            <div class="right">
                <button class="btn-delete border-2 border-gray-300 text-gray-400 p-3 rounded-full"><i class="fa-solid fa-trash-can"></i></button>
            </div>`;
        filterSection.appendChild(div);
    });
}


