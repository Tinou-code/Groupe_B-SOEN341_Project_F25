
### US.04 Claiming a ticket
### US.05 Receiving digital ticket with QR code 
### US.03 Save events to calendar

- Login as a student. You can login with the following info:
```
student id : S12345
password: 12345
``` 
- Click on ```Browse Events``` in the sidebar - this will show you a list of upcoming events. Each event is displayed as an event card with a button to claim a ticket
- Claim a ticket for an event by clicking ```Claim Ticket``` on an event card

#### Expected results
- Number of available tickets for event is reduced by 1
- On screen notification confirms that the ticket was claimed successfully
- Green ```Claim Ticket``` button changes to red ```Cancel Reservation``` button

- After claiming a ticket successfully, if you click on ```My Tickets```in the sidebar, it display a page where you can see a digital ticket with a QR Code for the event you just claimed

- After claiming a ticket successfully, if you click on ```My Calendar```in the sidebar, it display a page where you can see your personal calendar, and the event you just claimed appears on the calendar on the event date, and in "My Upcoming Events"

#### Additional feature
- In ```Browse Events```, you can cancel a ticket by clicking the red ```Cancel Reservation``` button

##### Expected result
- Number of available tickets for event is increased by 1
- On screen notification confirms that the ticket was cancelled successfully
- Red ```Cancel Reservation``` button changes to green ```Claim Ticket``` button

- After cancelling a ticket successfully, if you click on ```My Tickets```in the sidebar, the digital ticket for the event you cancelled no longer appears

- After cancelling a ticket successfully, if you click on ```My Calendar```in the sidebar, the digital ticket for the event you cancelled no longer appears on the calendar or in "My Upcoming Events"