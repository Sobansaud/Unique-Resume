// Function to generate and display the resume
function generateResume(event: Event) {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const about = (document.getElementById('about') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim());
    const experience = (document.getElementById('experience') as HTMLInputElement).value.split(',').map(exp => exp.trim());
    const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;
    const hobbies = (document.getElementById('hobbies') as HTMLInputElement).value.split(',').map(hobby => hobby.trim());

    const resumeContent = `
        <h3 class="editable" onclick="editSection('name')">${name}</h3>
        <p><strong>Email:</strong> <span class="editable" onclick="editSection('email')">${email}</span></p>
        <p><strong>Contact:</strong> <span class="editable" onclick="editSection('contact')">${contact}</span></p>
        <p><strong>About:</strong> <span class="editable" onclick="editSection('about')">${about}</span></p>
        <h4>Education</h4>
        <p class="editable" onclick="editSection('education')">${education}</p>
        <h4>Skills</h4>
        <ul>${skills.map(skill => `<li class="editable" onclick="editSection('skills')">${skill}</li>`).join('')}</ul>
        <h4>Experience</h4>
        <ul>${experience.map(exp => `<li class="editable" onclick="editSection('experience')">${exp}</li>`).join('')}</ul>
        <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="editable" onclick="editSection('linkedin')">${linkedin}</a></p>
        <h4>Hobbies</h4>
        <p class="editable" onclick="editSection('hobbies')">${hobbies.join(', ')}</p>
    `;

    document.getElementById('resume').innerHTML = resumeContent;
    document.getElementById('resume-output')!.classList.remove('hidden');
    
    // Generate a unique URL based on username
    const uniqueUrl = `${window.location.origin}/resume/${username}`;
    document.getElementById('resume-url')!.innerText = `Your Resume URL: ${uniqueUrl}`;
    document.getElementById('resume-url')!.classList.remove('hidden');

    // Show share and download buttons
    document.getElementById('share-link')!.classList.remove('hidden');
    document.getElementById('download-pdf')!.classList.remove('hidden');
    
    // Set up share link event
    document.getElementById('share-link')!.onclick = () => {
        navigator.clipboard.writeText(uniqueUrl);
        alert('Resume link copied to clipboard!');
    };

    // Set up PDF download event
    document.getElementById('download-pdf')!.onclick = async () => {
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();

        page.drawText(resumeContent.replace(/<[^>]+>/g, ''), {
            x: 50,
            y: height - 50,
            size: 12,
            color: PDFLib.rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${username}-resume.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
}

// Function to handle inline editing
function editSection(section: string) {
    const currentContent = (document.querySelector(`.${section}`) as HTMLElement).innerText;
    const inputField = document.createElement('input');
    inputField.value = currentContent;
    inputField.style.width = '100%';
    inputField.style.padding = '10px';
    inputField.style.borderRadius = '5px';
    inputField.style.border = '1px solid #ced4da';

    const parentElement = document.querySelector(`.${section}`)!.parentElement!;
    parentElement.replaceChild(inputField, document.querySelector(`.${section}`) as HTMLElement);

    inputField.focus();

    inputField.addEventListener('blur', () => {
        const newValue = inputField.value;
        const newSpan = document.createElement('span');
        newSpan.className = 'editable';
        newSpan.innerText = newValue;
        newSpan.onclick = () => editSection(section);
        
        parentElement.replaceChild(newSpan, inputField);
    });
}

// Event listener for form submission
document.getElementById('resume-form')!.addEventListener('submit', generateResume);
