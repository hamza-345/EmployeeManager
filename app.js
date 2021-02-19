class Employee {
    constructor(name, role, employeeNumber) {
        this.name = name;
        this.role = role;
        this.employeeNumber = employeeNumber;
    }
}

class Storage {
    static getEmployees() {
        let employees;
        if(localStorage.getItem('employees') == null) {
            employees = [];
        }
        else {
            employees = JSON.parse(localStorage.getItem('employees'));
        }
        return employees;
    }
    static addIntoStorage(employee) {
        const employees = Storage.getEmployees();
        
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        
        }
    static removeItem(number) {
        const employees = Storage.getEmployees();
        employees.forEach(function(employee, index) {
            console.log(employee.employeeNumber);
            if(employee.employeeNumber == number) {
                employees.splice(index, 1);
            }
        });
        localStorage.setItem('employees', JSON.stringify(employees));
        }
}


class UI {
    static displayPastEmployees() {
        const employees = Storage.getEmployees();
        employees.forEach(function(employee){
            UI.showEmployees(employee);
        })
    }
    static showEmployees(employee) {
        const table = document.querySelector(".listadd");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.employeeNumber}</td>
            <td> <a class = "btn btn-danger btn-sm delete" type= "button">X</a>
        `;
        table.appendChild(row);
    }
    static addItemtoList(e) {
        e.preventDefault();
        const name = document.querySelector(".name");
        const role = document.querySelector(".role");
        const number = document.querySelector(".number");
        if(name.value == '' || role.value == '' || number.value ==''){
            alert('Please fill the fields!');
        }
        else {
            const table = document.querySelector(".listadd");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td> ${name.value} </td>
                <td> ${role.value} </td>
                <td> ${number.value} </td>
                <td> <a class = "btn btn-danger btn-sm delete" type= "button">X</a>
            `;
            table.appendChild(row);
            const employee = new Employee(name.value, role.value, number.value);
            Storage.addIntoStorage(employee);
            document.querySelector('table').reset();
        } 
    }
    static removeItem(e) {
        if(e.target.classList.contains('delete')) {
            Storage.removeItem(e.target.parentElement.previousElementSibling.textContent);
            e.target.parentElement.parentElement.remove()
            
                }
        
        
    }
}
document.addEventListener('DOMContentLoaded', UI.displayPastEmployees)
document.querySelector(".submit").addEventListener("click", UI.addItemtoList);
document.querySelector(".listadd").addEventListener("click", UI.removeItem);