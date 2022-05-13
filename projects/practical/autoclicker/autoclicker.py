# autoclicker with pyautogui instead of mouse

import sys
import keyboard
import pyautogui
import time

pyautogui.PAUSE = 0.0001

start_stop_key = "F8"


def click1():
    pyautogui.click(button='left')


def click2():
    pyautogui.doubleClick(button='left')


def click3():
    pyautogui.tripleClick(button='left')


c_speed = ""


def click_speed():
    global c_speed
    c_speed = input("Choose your speed mode from 1-3 with 1 being the slowest and 3 being the fastest\n")
    if c_speed not in ["1", "2", "3"]:
        print("Please only input values [1, 2, 3]")
        click_speed()
    else:
        print(f"You have selected speed mode: {c_speed}")


print("Initializing program..")
click_speed()

if c_speed == "1":
    print('''
    _________________________________
    |Start/stop key              F8  |
    |CPS                        ~64  |
    |--------------------------------|
    |Quit                        F7  |
    |________________________________|           
    ''')
else:
    print('''
    _________________________________
    |Start/stop key              F8  |
    |--------------------------------|
    |Quit                        F7  |
    |________________________________|           
    ''')

running = True
mouse_click1 = False
mouse_click2 = False
mouse_click3 = False

while running:
    if keyboard.is_pressed(start_stop_key):
        time.sleep(0.5)
        print("autoclick started!")
        if c_speed == "1":
            mouse_click1 = True
        elif c_speed == "2":
            mouse_click2 = True
        elif c_speed == "3":
            mouse_click3 = True

        while mouse_click1:
            click1()
            if keyboard.is_pressed(start_stop_key):
                mouse_click1 = False
                print("autoclick stopped!")
                time.sleep(0.5)
        while mouse_click2:
            click2()
            if keyboard.is_pressed(start_stop_key):
                mouse_click2 = False
                print("autoclick stopped!")
                time.sleep(0.5)
        while mouse_click3:
            click3()
            if keyboard.is_pressed(start_stop_key):
                mouse_click3 = False
                print("autoclick stopped!")
                time.sleep(0.5)
    elif keyboard.is_pressed("f7"):
        sys.exit()
