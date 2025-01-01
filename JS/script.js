// تحميل الكتب المحفوظة من localStorage عند تحميل الصفحة
window.onload = function() {
    var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
    if (savedBooks) {
        savedBooks.forEach(function(book) {
            displaySavedBook(book);
        });
    }
}
function getPurposeName(purposeId) {
    switch (purposeId) {
        case "1":
            return "بيع";
        case "2":
            return "تبادل";
        case "3":
            return "استعارة";
        case "4":
            return "تبرع";
        default:
            return "";
    }
}

// دالة لتحويل رقم تصنيف الكتاب إلى كلمته المقابلة
function getCategoryName(categoryId) {
    switch (categoryId) {
        case "1":
            return "عام";
        case "2":
            return "فكر وفلسفة";
        case "3":
            return "أدب وروايات";
        case "4":
            return "إدارة وتطوير";
        case "5":
            return "صحة وطب";
        case "6":
            return "تاريخ وحضارة";
        default:
            return "";
    }
}
function displaySavedBook(book) {
    var container = document.createElement('div');
    container.className = 'col m-auto';
    container.innerHTML = `
        <div class="card w-50">
            <img src="${book.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.author}</p>
                <p class="card-text fs-6 fw-light">${getCategoryName(book.category)}</p>
                <br>
                <p class="card-text fs-6 fw-light">${getPurposeName(book.purpose)}</p>
            </div>
        </div>
    `;
    document.querySelector('.row-cols-1.row-cols-md-2.g-4.me-4').appendChild(container);
}

function saveAndAddAnotherBook() {
    var imageFile = document.getElementById('bookImage').files[0];
    var title = document.getElementById('bookTitle').value;
    var author = document.getElementById('bookAuthor').value;
    var description = document.getElementById('bookDescription').value;
    var purpose = document.getElementById('purposeSelect').value;
    var category = document.getElementById('categorySelect').value;

    var reader = new FileReader();
    reader.onload = function(event) {
        var imageURL = event.target.result;

        var savedBook = {
            image: imageURL,
            title: title,
            author: author,
            description: description,
            purpose: purpose,
            category: category
        };

        var savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
        savedBooks.push(savedBook);

        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));

        displaySavedBook(savedBook);

        clearInputFields();
        alert('تم حفظ الكتاب بنجاح!');
    };

    reader.readAsDataURL(imageFile);
}

function clearAllInputs() {
    clearInputFields();
    alert('تم مسح المدخلات بنجاح!');
}

function clearInputFields() {
    document.getElementById('bookImage').value = '';
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('purposeSelect').selectedIndex = -1; // reset to default
    document.getElementById('categorySelect').selectedIndex = -1; // reset to default
}


// حذف الكتب المحفوظة مؤقتاً من localStorage
// localStorage.removeItem('savedBooks');