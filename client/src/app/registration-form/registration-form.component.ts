import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  name: string = '';
  dob: string = ''; // Initialize dob as a string

  constructor(private http: HttpClient) {}

  createStudent() {
    // Parse the dob string and create a Date object
    const [year, month, day] = this.dob.split('/');
    const dobDate = new Date(Number(year), Number(month) - 1, Number(day));

    const data = { name: this.name, dob: dobDate }; // Use the Date object for dob
    this.http.post('http://localhost:3000/insert', data).subscribe(
      (response) => {
        console.log('Data inserted successfully', response);
        window.alert('Data inserted successfully');
      },
      (error) => {
        console.error('Error inserting data', error);
        window.alert('Error inserting data');
      }
    );
  }
}
