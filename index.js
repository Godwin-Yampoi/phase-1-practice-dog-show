window.onload = function() {
    // Step 1: Fetch all registered dogs
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => {
        // Step 2: Loop through dogs and create table rows
        const tableBody = document.querySelector('#dogs-table tbody');
        dogs.forEach(dog => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const breedCell = document.createElement('td');
          const sexCell = document.createElement('td');
          const editCell = document.createElement('td');
          const editButton = document.createElement('button');
  
          nameCell.textContent = dog.name;
          breedCell.textContent = dog.breed;
          sexCell.textContent = dog.sex;
          editButton.textContent = 'Edit';
  
          editButton.addEventListener('click', () => {
            // Step 3: Populate form with dog's information
            document.querySelector('#name').value = dog.name;
            document.querySelector('#breed').value = dog.breed;
            document.querySelector('#sex').value = dog.sex;
  
            // Store the dog's information in a global variable for later use
            window.currentDog = dog;
          });
  
          editCell.appendChild(editButton);
          row.appendChild(nameCell);
          row.appendChild(breedCell);
          row.appendChild(sexCell);
          row.appendChild(editCell);
          tableBody.appendChild(row);
        });
      });
    
    // Step 4: Handle form submission
    const form = document.querySelector('#dog-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.querySelector('#name').value;
      const breed = document.querySelector('#breed').value;
      const sex = document.querySelector('#sex').value;
  
      const currentDog = window.currentDog;
      const id = currentDog.id;
      const body = JSON.stringify({ name, breed, sex });
      const headers = { 'Content-Type': 'application/json' };
  
      // Make PATCH request to update dog's information
      fetch(`http://localhost:3000/dogs/${id}`, { method: 'PATCH', body, headers })
        .then(response => response.json())
        .then(() => {
          // Step 5: Fetch updated list of dogs and re-render table
          fetch('http://localhost:3000/dogs')
            .then(response => response.json())
            .then(dogs => {
              const tableBody = document.querySelector('#dogs-table tbody');
              tableBody.innerHTML = '';
              dogs.forEach(dog => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const breedCell = document.createElement('td');
                const sexCell = document.createElement('td');
                const editCell = document.createElement('td');
                const editButton = document.createElement('button');
  
                nameCell.textContent = dog.name;
                breedCell.textContent = dog.breed;
                sexCell.textContent = dog.sex;
                editButton.textContent = 'Edit';
  
                editButton.addEventListener('click', () => {
                  // Step 3: Populate form with dog's information
                  document.querySelector('#name').value = dog.name;
                  document.querySelector('#breed').value = dog.breed;
                  document.querySelector('#sex').value = dog.sex;
  
                  // Store the dog's information in a global variable for later use
                  window.currentDog = dog;
                });
  
                editCell.appendChild(editButton);
                row.appendChild(nameCell);
                row.appendChild(breedCell);
                row.appendChild(sexCell);
                row.appendChild(editCell);
                tableBody.appendChild(row);
              });
            });
        });
    });
  };
  