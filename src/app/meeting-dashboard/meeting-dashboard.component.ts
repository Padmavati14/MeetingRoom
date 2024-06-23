import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var jQuery: any;

interface Meeting {
  userName: string;
  agenda: string;
  date: string;
  time: string;
  room: string;
}

@Component({
  selector: 'app-meeting-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './meeting-dashboard.component.html',
  styleUrl: './meeting-dashboard.component.scss'
})


export class MeetingDashboardComponent {
  errorMessage!: string;
  isError: boolean = false;
  roomsDetails: boolean = false;
  userName = 'Infrd Test';
  selectedRoom : any;
  meetingDate = '';
  startTime = '';
  endTime = '';
  isBookMeetingModalOpen = false;
  agenda :any;
  selectedMeetingRoom : any;
  rooms = [{value:'Meeting Room #1',key:'1'},{value:'Meeting Room #2',key:'2'},{value:'Meeting Room #3',key:'3'}];
  userMeetings: Meeting[] = [];
  roomMeetings: Meeting[] = [];
  minMeetingDate :string;

  constructor(private router:Router){
    const today = new Date();
    this.minMeetingDate = today.toISOString().split('T')[0];
  }

  meetings: Meeting[] = [
    { userName: 'Alice', agenda: 'Project Planning', date: '2024-06-23', time: '10:00', room: 'Meeting Room #1' },
    { userName: 'Bob', agenda: 'Design Review', date: '2024-06-24', time: '11:00', room: 'Meeting Room #2' },
    { userName: 'Charlie', agenda: 'Sprint Retrospective', date: '2024-06-25', time: '14:00', room: 'Meeting Room #1' },
    { userName: 'Texa', agenda: 'Design Review', date: '2024-06-24', time: '11:00', room: 'Meeting Room #3' },
    { userName: 'Alice', agenda: 'Sprint Retrospective', date: '2024-06-25', time: '14:00', room: 'Meeting Room #2' }
  ];

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  bookMeeting() {
    debugger
    const start = new Date(`${this.meetingDate}T${this.startTime}`);
    const end = new Date(`${this.meetingDate}T${this.endTime}`);

    const openingTime = new Date(`${this.meetingDate}T09:00:00`);
    const closingTime = new Date(`${this.meetingDate}T18:00:00`);

    if (start >= openingTime && end <= closingTime) {
      const duration = (end.getTime() - start.getTime()) / (1000 * 60); // duration in minutes
      if (duration >= 30) {
        this.errorMessage = '';
        this.isError = false;
        this.roomsDetails = true;
      } else if (end <= start) {
        this.isError = true;
        this.errorMessage = 'End time must be after start time';
        return; // Exit function early if validation fails
      } 
      else {
        this.isError = true;
        this.errorMessage = 'Meeting should be of at least 30 minutes';
      }
    } else {
      this.isError = true;
      this.errorMessage = 'Time should be between 09:00 AM and 06:00 PM';
    }
  }

  onRoomChange() {
    this.roomMeetings =[]

    this.roomMeetings = this.meetings.filter(meeting => meeting.room === (this.selectedRoom || this.selectedMeetingRoom));
  }

  getUserMeetings(): Meeting[] {
    return this.meetings;
  }

  openBookMeetingModal() {
    this.isBookMeetingModalOpen = true;
  }

  closeBookMeetingModal() {
    this.isBookMeetingModalOpen = false;
    this.startTime = '';
    this.endTime = '';
    this.agenda = '';
    this.meetingDate = '';
    this.selectedMeetingRoom = '';
    this.isError = false;
    this.roomsDetails = false;

    if(this.userMeetings?.length > 0){
      for(let i=0;i<this.userMeetings?.length;i++){
        this.meetings.push(this.userMeetings[i])
      }
    }
  }

  bookedMeeting() {
   debugger
    let userData = {userName:this.userName,agenda:this.agenda,date:this.meetingDate,time:this.startTime,room:this.selectedMeetingRoom}
    this.userMeetings.push(userData)
    this.closeBookMeetingModal();
  }

  deleteMeeting(index: number) {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.userMeetings.splice(index, 1);
    }
  }
}
