var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Function to generate and display the resume
function generateResume(event) {
    var _this = this;
    event.preventDefault();
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var about = document.getElementById('about').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
    var experience = document.getElementById('experience').value.split(',').map(function (exp) { return exp.trim(); });
    var linkedin = document.getElementById('linkedin').value;
    var hobbies = document.getElementById('hobbies').value.split(',').map(function (hobby) { return hobby.trim(); });
    var resumeContent = "\n        <h3 class=\"editable\" onclick=\"editSection('name')\">".concat(name, "</h3>\n        <p><strong>Email:</strong> <span class=\"editable\" onclick=\"editSection('email')\">").concat(email, "</span></p>\n        <p><strong>Contact:</strong> <span class=\"editable\" onclick=\"editSection('contact')\">").concat(contact, "</span></p>\n        <p><strong>About:</strong> <span class=\"editable\" onclick=\"editSection('about')\">").concat(about, "</span></p>\n        <h4>Education</h4>\n        <p class=\"editable\" onclick=\"editSection('education')\">").concat(education, "</p>\n        <h4>Skills</h4>\n        <ul>").concat(skills.map(function (skill) { return "<li class=\"editable\" onclick=\"editSection('skills')\">".concat(skill, "</li>"); }).join(''), "</ul>\n        <h4>Experience</h4>\n        <ul>").concat(experience.map(function (exp) { return "<li class=\"editable\" onclick=\"editSection('experience')\">".concat(exp, "</li>"); }).join(''), "</ul>\n        <p><strong>LinkedIn:</strong> <a href=\"").concat(linkedin, "\" target=\"_blank\" class=\"editable\" onclick=\"editSection('linkedin')\">").concat(linkedin, "</a></p>\n        <h4>Hobbies</h4>\n        <p class=\"editable\" onclick=\"editSection('hobbies')\">").concat(hobbies.join(', '), "</p>\n    ");
    document.getElementById('resume').innerHTML = resumeContent;
    document.getElementById('resume-output').classList.remove('hidden');
    // Generate a unique URL based on username
    var uniqueUrl = "".concat(window.location.origin, "/resume/").concat(username);
    document.getElementById('resume-url').innerText = "Your Resume URL: ".concat(uniqueUrl);
    document.getElementById('resume-url').classList.remove('hidden');
    // Show share and download buttons
    document.getElementById('share-link').classList.remove('hidden');
    document.getElementById('download-pdf').classList.remove('hidden');
    // Set up share link event
    document.getElementById('share-link').onclick = function () {
        navigator.clipboard.writeText(uniqueUrl);
        alert('Resume link copied to clipboard!');
    };
    // Set up PDF download event
    document.getElementById('download-pdf').onclick = function () { return __awaiter(_this, void 0, void 0, function () {
        var pdfDoc, page, _a, width, height, pdfBytes, blob, url, a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, PDFLib.PDFDocument.create()];
                case 1:
                    pdfDoc = _b.sent();
                    page = pdfDoc.addPage([600, 800]);
                    _a = page.getSize(), width = _a.width, height = _a.height;
                    page.drawText(resumeContent.replace(/<[^>]+>/g, ''), {
                        x: 50,
                        y: height - 50,
                        size: 12,
                        color: PDFLib.rgb(0, 0, 0),
                    });
                    return [4 /*yield*/, pdfDoc.save()];
                case 2:
                    pdfBytes = _b.sent();
                    blob = new Blob([pdfBytes], { type: 'application/pdf' });
                    url = URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.href = url;
                    a.download = "".concat(username, "-resume.pdf");
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    return [2 /*return*/];
            }
        });
    }); };
}
// Function to handle inline editing
function editSection(section) {
    var currentContent = document.querySelector(".".concat(section)).innerText;
    var inputField = document.createElement('input');
    inputField.value = currentContent;
    inputField.style.width = '100%';
    inputField.style.padding = '10px';
    inputField.style.borderRadius = '5px';
    inputField.style.border = '1px solid #ced4da';
    var parentElement = document.querySelector(".".concat(section)).parentElement;
    parentElement.replaceChild(inputField, document.querySelector(".".concat(section)));
    inputField.focus();
    inputField.addEventListener('blur', function () {
        var newValue = inputField.value;
        var newSpan = document.createElement('span');
        newSpan.className = 'editable';
        newSpan.innerText = newValue;
        newSpan.onclick = function () { return editSection(section); };
        parentElement.replaceChild(newSpan, inputField);
    });
}
// Event listener for form submission
document.getElementById('resume-form').addEventListener('submit', generateResume);
