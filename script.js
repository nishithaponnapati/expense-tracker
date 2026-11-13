let sum = 0;
let editingRow = null;

const n = document.getElementById("n");
const a = document.getElementById("a");
const c = document.getElementById("c");
const d = document.getElementById("d");

const te = document.getElementById("te");
const tb = document.getElementById("tb");
const ae = document.getElementById("ae");

// Update Total
function updateTotal() {
    te.textContent = sum;
}

// Clear Form
function clearInputs() {
    n.value = "";
    a.value = "";
    c.selectedIndex = 0;
    d.value = "";

    editingRow = null;
    ae.textContent = "Add Expense";
}

// Add / Update Expense
ae.addEventListener("click", () => {

    const name = n.value.trim();
    const amount = Number(a.value);
    const category = c.value;
    const date = d.value;

    // Validation
    if (
        name === "" ||
        isNaN(amount) ||
        amount <= 0 ||
        date === ""
    ) {
        alert("Please fill all fields correctly.");
        return;
    }

    // ======================
    // UPDATE EXISTING ROW
    // ======================

    if (editingRow) {

        const oldAmount = Number(editingRow.children[1].textContent);

        sum -= oldAmount;
        sum += amount;

        editingRow.children[0].textContent = name;
        editingRow.children[1].textContent = amount;
        editingRow.children[2].textContent = category;
        editingRow.children[3].textContent = date;

        updateTotal();

        clearInputs();

        return;
    }

    // ======================
    // NEW ROW
    // ======================

    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.textContent = name;
    td2.textContent = amount;
    td3.textContent = category;
    td4.textContent = date;

    // Edit Button

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {

        n.value = td1.textContent;
        a.value = td2.textContent;
        c.value = td3.textContent;
        d.value = td4.textContent;

        editingRow = tr;

        ae.textContent = "Update Expense";
    });

    // Delete Button

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {

        if (!confirm("Delete this expense?")) {
            return;
        }

        sum -= Number(td2.textContent);

        updateTotal();

        if (editingRow === tr) {
            clearInputs();
        }

        tr.remove();

    });

    td5.appendChild(editBtn);
    td5.appendChild(deleteBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tb.appendChild(tr);

    sum += amount;

    updateTotal();

    clearInputs();

});