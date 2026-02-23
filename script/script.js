let interviewArray = [];
let rejectedArray = [];
let currentStatus = "all";

//get the id all counters 
let totalCounter = document.getElementById("total-Count");
let interviewCounter = document.getElementById("interview-Count");
let rejectedCounter = document.getElementById("rejected-Count");

let jobsCount = document.getElementById("jobs-Count");


const allFilterBtn = document.getElementById("add-all-btn")
const interviewFilterBtn = document.getElementById("add-interview-btn")
const rejectedFilterBtn = document.getElementById("add-rejected-btn")


// get card container children

const cardContainer = document.getElementById("card-container");

const mainContainer = document.getElementById("main")

const filterSection = document.getElementById("filtered-section")

// create function 

function calculateCount() {
    totalCounter.innerText = cardContainer.children.length;
    jobsCount.innerText = cardContainer.children.length;
    interviewCounter.innerText = interviewArray.length;
    rejectedCounter.innerText = rejectedArray.length;
    checkEmptyJobs();
}

function checkEmptyJobs() {
    if(cardContainer.children.length === 0) {
        cardContainer.innerHTML = '<div class="text-center py-16"><i class="fa-solid fa-file-lines text-sky-300 text-6xl mb-4"></i><p class="text-black-500 text-2xl font-bold">No jobs available</p><p class="text-gray-400 mt-2">Check back soon for new job opportunities</p></div>';
    }
}

calculateCount();

function toggleStyle(id) {
    // remove active styles from all buttons
    allFilterBtn.classList.remove('bg-sky-500', 'text-white');
    allFilterBtn.classList.add('bg-white', 'text-gray-500');
    
    interviewFilterBtn.classList.remove('bg-sky-500', 'text-white');
    interviewFilterBtn.classList.add('bg-white', 'text-gray-500');
    
    rejectedFilterBtn.classList.remove('bg-sky-500', 'text-white');
    rejectedFilterBtn.classList.add('bg-white', 'text-gray-500');

    // add active style to selected button
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-500');
    selected.classList.add('bg-sky-500', 'text-white');
    
    currentStatus = id;

    if(id == 'add-all-btn') {
        cardContainer.classList.remove('hidden');
        filterSection.classList.add('hidden');
        checkEmptyJobs();
    } else if(id == 'add-interview-btn') {
        cardContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
        if(interviewArray.length == 0){
            filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No interviews scheduled yet</p>';
        }else{
            renderInterview();
        }
    } else if(id == 'add-rejected-btn') {
        cardContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
        if(rejectedArray.length == 0){
            filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No rejections</p>';
        }else{
            renderRejected();
        }
    }
}

// Add event listeners for filter buttons
allFilterBtn.addEventListener('click', function() {
    toggleStyle('add-all-btn');
});

interviewFilterBtn.addEventListener('click', function() {
    toggleStyle('add-interview-btn');
});

rejectedFilterBtn.addEventListener('click', function() {
    toggleStyle('add-rejected-btn');
});

mainContainer.addEventListener('click', function(event){
    if (event.target.classList.contains('interview-btn')) {
        const parentDiv = event.target.parentNode.parentNode;

        const companyName = parentDiv.querySelector('.company-name').innerText
        const PositionName = parentDiv.querySelector('.position-name').innerText
        const location = parentDiv.querySelector('.location').innerText
        const type = parentDiv.querySelector('.type').innerText
        const salary = parentDiv.querySelector('.salary').innerText
        const status = parentDiv.querySelector('.not-applied').innerText
        const note = parentDiv.querySelector('.notes').innerText

        parentDiv.querySelector('.not-applied').innerText = 'Interview'

        const cardInfo = {
            companyName,
            PositionName,
            location,
            type,
            salary,
            status: 'Interview',
            note
        }

        const companyExist = interviewArray.find(item => item.companyName == cardInfo.companyName)
        parentDiv.querySelector('.not-applied').classList.remove('bg-blue-100', 'text-sky-900', 'bg-red-500', 'text-white');
        parentDiv.querySelector('.not-applied').classList.add('bg-green-500', 'text-white')

        if (!companyExist) {
            interviewArray.push(cardInfo)
        }

        rejectedArray = rejectedArray.filter(item => item.companyName != cardInfo.companyName)

        if(currentStatus == 'add-rejected-btn'){
            if(rejectedArray.length == 0){
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No rejections</p>';
            }
            else{
                renderRejected()
            }
        } else if(currentStatus == 'add-interview-btn'){
            renderInterview()
        }
        calculateCount()
    }
    
    if (event.target.classList.contains('rejected-btn')) {
        const parentDiv = event.target.parentNode.parentNode;

        const companyName = parentDiv.querySelector('.company-name').innerText
        const PositionName = parentDiv.querySelector('.position-name').innerText
        const location = parentDiv.querySelector('.location').innerText
        const type = parentDiv.querySelector('.type').innerText
        const salary = parentDiv.querySelector('.salary').innerText
        const status = parentDiv.querySelector('.not-applied').innerText
        const note = parentDiv.querySelector('.notes').innerText

        parentDiv.querySelector('.not-applied').innerText = 'Rejected'

        const cardInfo = {
            companyName,
            PositionName,
            location,
            type,
            salary,
            status: 'Rejected',
            note
        }

        const companyExist = rejectedArray.find(item => item.companyName == cardInfo.companyName)
        parentDiv.querySelector('.not-applied').classList.remove('bg-blue-100', 'text-sky-900', 'bg-green-500', 'text-white');
        parentDiv.querySelector('.not-applied').classList.add('bg-red-500', 'text-white')

        if (!companyExist) {
            rejectedArray.push(cardInfo)
        }

        interviewArray = interviewArray.filter(item => item.companyName != cardInfo.companyName)

        if(currentStatus == 'add-interview-btn'){
            if(interviewArray.length == 0){
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No interviews scheduled yet</p>';
            }
            else{
                renderInterview()
            }
        } else if(currentStatus == 'add-rejected-btn'){
            renderRejected()
        }
        calculateCount()
    }
    
    if (event.target.classList.contains('fa-trash-can') || event.target.classList.contains('btn-delete')) {
        const card = event.target.closest('.card');
        const companyName = card.querySelector('.company-name').innerText;
        
        // Remove from arrays
        interviewArray = interviewArray.filter(item => item.companyName != companyName);
        rejectedArray = rejectedArray.filter(item => item.companyName != companyName);
        
        // Remove card from DOM
        card.remove();
        
        // Update counts
        calculateCount();
        
        // Update filtered view if active
        if(currentStatus == 'add-interview-btn'){
            if(interviewArray.length == 0){
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No interviews scheduled yet</p>';
            } else {
                renderInterview();
            }
        } else if(currentStatus == 'add-rejected-btn'){
            if(rejectedArray.length == 0){
                filterSection.innerHTML = '<p class="text-center text-gray-500 mt-10">No rejections</p>';
            } else {
                renderRejected();
            }
        } else if(currentStatus == 'add-all-btn'){
            checkEmptyJobs();
        }
    }
})


// interview fuucntion

function renderInterview() {
    filterSection.innerHTML = ''

    for (let interview of interviewArray) {
        let div = document.createElement('div')
        div.className = 'card flex justify-between shadow-md bg-white p-8 rounded-xl'
        div.innerHTML = `
                <div class="left space-y-3">
                    <p class="company-name text-sky-900 text-3xl font-bold">${interview.companyName}</p>
                    <p class="position-name text-gray-500 text-xl">${interview.PositionName}</p>
                    <ul class="work-time list-inside list-disc lg:flex gap-3 text-gray-500">
                        <p class="location">${interview.location}</p>
                        <li class="type">${interview.type}</li>
                        <li class="salary">${interview.salary}</li>
                    </ul>


                    <span class="not-applied bg-green-500 text-white font-bold px-5 py-2 rounded-xl">${interview.status}</span>

                    <p class="notes text-gray-500 mt-3">${interview.note}</p>

                    <div class="flex gap-5">
                        <button
                            class="interview-btn border-2 border-green-500 text-green-500 font-bold px-4 py-2 rounded-xl">INTERVIEW</button>
                        <button
                            class="rejected-btn border-2 border-red-500 font-bold text-red-500 px-4 py-2 rounded-xl">REJECTED</button>
                    </div>
                </div>

                <div class="right">
                    <button class="btn-delete border-2 border-gray-300 text-gray-400 p-3  rounded-full"><i
                            class="fa-solid fa-trash-can"></i></button>
                </div>
        `
        filterSection.appendChild(div)

    }
}

// rejected function
function renderRejected() {
    filterSection.innerHTML = ''

    for (let rejected of rejectedArray) {
        let div = document.createElement('div')
        div.className = 'card flex justify-between shadow-md bg-white p-8 rounded-xl'
        div.innerHTML = `
                <div class="left space-y-3">
                    <p class="company-name text-sky-900 text-3xl font-bold">${rejected.companyName}</p>
                    <p class="position-name text-gray-500 text-xl">${rejected.PositionName}</p>
                    <ul class="work-time list-inside list-disc lg:flex gap-3 text-gray-500">
                        <p class="location">${rejected.location}</p>
                        <li class="type">${rejected.type}</li>
                        <li class="salary">${rejected.salary}</li>
                    </ul>


                    <span class="not-applied bg-red-500 text-white font-bold px-5 py-2 rounded-xl">${rejected.status}</span>

                    <p class="notes text-gray-500 mt-3">${rejected.note}</p>

                    <div class="flex gap-5">
                        <button
                            class="interview-btn border-2 border-green-500 text-green-500 font-bold px-4 py-2 rounded-xl">INTERVIEW</button>
                        <button
                            class="rejected-btn border-2 border-red-500 font-bold text-red-500 px-4 py-2 rounded-xl">REJECTED</button>
                    </div>
                </div>

                <div class="right">
                    <button class="btn-delete border-2 border-gray-300 text-gray-400 p-3  rounded-full"><i
                            class="fa-solid fa-trash-can"></i></button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

const jobs = [
    {
        companyName: "Mobile First Corp",
        position: "React Native Developer",
        location: "Remote",
        type: "Full Time",
        salary: "$130,000 - $175,000",
        status: "NOT APPLIED",
        notes: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide."
    },
    {
        companyName: "WebFlow Agency",
        position: "Web Designer & Developer",
        location: "Los Angeles, CA",
        type: "Part Time",
        salary: "$60,000 - $80,000",
        status: "NOT APPLIED",
        notes: "Create stunning websites for high-profile clients. Must have portfolio with modern web design trends."
    },
    {
        companyName: "DataViz Solutions",
        position: "Data Visualization Specialist",
        location: "Denver, CO",
        type: "Full Time",
        salary: "$95,000 - $105,000",
        status: "NOT APPLIED",
        notes: "Transform complex data into compelling visual stories. Experience with D3.js, Power BI, and strong analytical thinking."
    },
    {
        companyName: "CloudFirst Inc",
        position: "Backend Developer",
        location: "Austin, TX",
        type: "Full Time",
        salary: "$110,000 - $150,000",
        status: "NOT APPLIED",
        notes: "Design and maintain scalable backend services using Python and AWS. Work with modern DevOps practices."
    },
    {
        companyName: "Innovation Labs",
        position: "UI/UX Engineer",
        location: "Seattle, WA",
        type: "Hybrid",
        salary: "$90,000 - $120,000",
        status: "NOT APPLIED",
        notes: "Create beautiful and intuitive user interfaces for web products. Strong design skills and frontend experience required."
    },
    {
        companyName: "MegaCorp Solutions",
        position: "JavaScript Developer",
        location: "New York, NY",
        type: "Full Time",
        salary: "$100,000 - $135,000",
        status: "NOT APPLIED",
        notes: "Build enterprise applications using React and Node.js. Work on large-scale e-commerce systems."
    },
    {
        companyName: "StartUpXYZ",
        position: "Full Stack Engineer",
        location: "Remote",
        type: "Full Time",
        salary: "$85,000 - $120,000",
        status: "NOT APPLIED",
        notes: "Join a fast-growing startup and work on core platform features. Experience with MERN stack required."
    },
    {
        companyName: "TechCorp Industries",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        type: "Full Time",
        salary: "$115,000 - $175,000",
        status: "NOT APPLIED",
        notes: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript."
    }
];