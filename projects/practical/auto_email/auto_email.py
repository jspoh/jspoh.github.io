# send emails from python. this will no longer be available for gmail after 30may2022 as they are blocking
# less secure app accesses

import smtplib
import time

email = input("Email address: ")
password = input("Password: ")

r_email = input("\nEmail address to send to: ")
subject = input("Email subject: ")
message = input("Your message here:\n")
delay_input = input("Send this email in(mins): ")
delay = int(delay_input)*60
print(f"Email will be sent in {int(delay_input)} minutes\n")
time.sleep(delay)
print("Sending mail..")

try:
    with smtplib.SMTP('smtp.gmail.com') as connection:  # simple mail transfer protocol info
        connection.starttls()  # start transport layer security (encrypts msg)
        connection.login(user=email, password=password)  # log in
        connection.sendmail(from_addr=email, to_addrs=r_email, msg=f"Subject:{subject}\n\n{message}")
except smtplib.SMTPAuthenticationError as error_msg:
    print(f"{error_msg}\nLess secure app access must be enabled for this program to work.\n")
    print("Email connection failed.")
else:
    print("Sent successfully!")
