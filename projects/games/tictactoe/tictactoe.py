# tictactoe game

import time
import pygame
import sys
import random

pygame.init()

win_width = 600
win_height = 600

window = pygame.display.set_mode((win_width, win_height))
pygame.display.set_caption("TicTacToe")

font = pygame.font.Font("freesansbold.ttf", 30)
small_font = pygame.font.Font("freesansbold.ttf", 12)

c_darkBlue = (0, 30, 50)
c_lightBlue = (0, 30, 30)
c_lightGreen = (0, 50, 30)
c_white = (255, 255, 255)


class Draw(object):
    def __init__(self):
        self.startWidth = 250
        self.startHeight = 50
        self.startX = 175
        self.startY = 300
        self.tttX = 60
        self.tttY = 150
        self.radius = 50
        self.v_line_width = 5
        self.v_line_height = 450

    def start_button(self, colour):
        pygame.draw.rect(window, colour, (self.startX, self.startY, self.startWidth, self.startHeight))
        start_text = font.render("START GAME", True, c_white)
        window.blit(start_text, (self.startX + 28, self.startY + 12))

    def quit_button(self, colour):
        pygame.draw.rect(window, colour, (self.startX + 65, self.startY + self.startHeight + 10,
                                               self.startWidth - 130, self.startHeight))
        quit_text = font.render("QUIT", True, c_white)
        window.blit(quit_text, (self.startX + 85, self.startY + 72))

    def ttt(self): #comment this entire function if program crashes because it is unable to find the image
        ttt = pygame.image.load("lib/ttt.png")
        window.blit(ttt, (self.tttX, self.tttY))

    def lines(self):
        # boxes are 150px wide
        pygame.draw.rect(window, c_lightGreen, (225, 75, self.v_line_width, self.v_line_height))
        pygame.draw.rect(window, c_lightGreen, (375, 75, self.v_line_width, self.v_line_height))
        pygame.draw.rect(window, c_lightGreen, (75, 225, self.v_line_height, self.v_line_width))
        pygame.draw.rect(window, c_lightGreen, (75, 375, self.v_line_height, self.v_line_width))

    def circle(self, x, y):
        pygame.draw.circle(window, c_white, (x, y), self.radius)
        pygame.draw.circle(window, c_darkBlue, (x, y), self.radius - 2)

    def cross(self, a, b, c, d):
        pygame.draw.line(window, c_white, (a, b), (c, d))
        pygame.draw.line(window, c_white, (c, b), (a, d))

    def choices(self):
        if game.box1 != 0:
            if game.box1 == 1:
                draw.circle(150, 150)
            else:
                draw.cross(200, 100, 100, 200)
        if game.box2 != 0:
            if game.box2 == 1:
                draw.circle(300, 150)
            else:
                draw.cross(350, 100, 250, 200)
        if game.box3 != 0:
            if game.box3 == 1:
                draw.circle(450, 150)
            else:
                draw.cross(500, 100, 400, 200)
#
        if game.box4 != 0:
            if game.box4 == 1:
                draw.circle(150, 300)
            else:
                draw.cross(200, 250, 100, 350)
        if game.box5 != 0:
            if game.box5 == 1:
                draw.circle(300, 300)
            else:
                draw.cross(350, 250, 250, 350)
        if game.box6 != 0:
            if game.box6 == 1:
                draw.circle(450, 300)
            else:
                draw.cross(500, 250, 400, 350)
#
        if game.box7 != 0:
            if game.box7 == 1:
                draw.circle(150, 450)
            else:
                draw.cross(200, 400, 100, 500)
        if game.box8 != 0:
            if game.box8 == 1:
                draw.circle(300, 450)
            else:
                draw.cross(350, 400, 250, 500)
        if game.box9 != 0:
            if game.box9 == 1:
                draw.circle(450, 450)
            else:
                draw.cross(500, 400, 400, 500)

        pygame.display.update()


draw = Draw()


class Computer(object):
    def __init__(self):
        pass

    def loser(self):
        time.sleep(1)
        while True:
            window.fill(c_darkBlue)
            close_text = font.render("You lose!", True, c_white)
            window.blit(close_text, (225, 300))
            notice_text = small_font.render("Click anywhere to go back to title screen", True, c_white)
            window.blit(notice_text, (170, 350))
            draw.ttt()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    game.start_game_window()

            pygame.display.update()
            game.box1, game.box2, game.box3, game.box4, game.box5, game.box6, game.box7, game.box8, game.box9 = \
                game.status, game.status, game.status, game.status, game.status, game.status, game.status, \
                game.status, game.status

    def draw(self):
        while True:
            window.fill(c_darkBlue)
            close_text = font.render("It's a draw!", True, c_white)
            window.blit(close_text, (215, 300))
            notice_text = small_font.render("Click anywhere to go back to title screen", True, c_white)
            window.blit(notice_text, (170, 350))
            draw.ttt()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    game.start_game_window()

            pygame.display.update()
            game.box1, game.box2, game.box3, game.box4, game.box5, game.box6, game.box7, game.box8, game.box9 = \
                game.status, game.status, game.status, game.status, game.status, game.status, game.status, \
                game.status, game.status

    def winner(self):
        while True:
            window.fill(c_darkBlue)
            close_text = font.render("You win!", True, c_white)
            window.blit(close_text, (225, 300))
            notice_text = small_font.render("Click anywhere to go back to title screen", True, c_white)
            window.blit(notice_text, (170, 350))
            draw.ttt()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    game.start_game_window()

            pygame.display.update()
            game.box1, game.box2, game.box3, game.box4, game.box5, game.box6, game.box7, game.box8, game.box9 = \
                game.status, game.status, game.status, game.status, game.status, game.status, game.status, \
                game.status, game.status

    def decision(self):
        # check if player won
        if game.box1 == 1 and game.box2 == 1 and game.box3 == 1:
            return "player wins"
        if game.box4 == 1 and game.box5 == 1 and game.box6 == 1:
            return "player wins"
        if game.box7 == 1 and game.box8 == 1 and game.box9 == 1:
            return "player wins"
        if game.box1 == 1 and game.box4 == 1 and game.box7 == 1:
            return "player wins"
        if game.box1 == 1 and game.box5 == 1 and game.box9 == 1:
            return "player wins"
        if game.box2 == 1 and game.box5 == 1 and game.box8 == 1:
            return "player wins"
        if game.box3 == 1 and game.box6 == 1 and game.box9 == 1:
            return "player wins"
        if game.box3 == 1 and game.box5 == 1 and game.box7 == 1:
            return "player wins"
        # defensive measures
        print("agg")
        if game.box1 == 2:
            print("box1")
            if game.box2 == 2:
                if game.box3 == 0:
                    game.box3 = 2
                    print("a3")
                    return "com wins"
            if game.box3 == 2:
                if game.box2 == 0:
                    game.box2 = 2
                    print("a2")
                    return "com wins"
                else:
                    pass
            if game.box5 == 2:
                if game.box9 == 0:
                    game.box9 = 2
                    print("a9")
                    return "com wins"
            if game.box9 == 2:
                if game.box5 == 0:
                    game.box5 = 2
                    print("a5")
                    return "com wins"
            if game.box4 == 2:
                if game.box7 == 0:
                    game.box7 = 2
                    print("a7")
                    return "com wins"
            if game.box7 == 2:
                if game.box4 == 0:
                    game.box4 = 2
                    print("a4")
                    return "com wins"
#
        if game.box2 == 2:
            print("box2")
            if game.box3 == 2:
                if game.box1 == 0:
                    game.box1 = 2
                    print("a1")
                    return "com wins"
            if game.box5 == 2:
                if game.box8 == 0:
                    game.box8 = 2
                    print("a8")
                    return "com wins"
            if game.box8 == 2:
                if game.box5 == 0:
                    game.box5 = 2
                    print("a5")
                    return "com wins"
#
        if game.box3 == 2:
            print("box3")
            if game.box6 == 2:
                if game.box9 == 0:
                    game.box9 = 2
                    print("a9")
                    return "com wins"
            if game.box9 == 2:
                if game.box6 == 0:
                    game.box6 = 2
                    print("a6")
                    return "com wins"
            if game.box5 == 2:
                if game.box7 == 0:
                    game.box7 = 2
                    print("a7")
                    return "com wins"
            if game.box7 == 2:
                if game.box5 == 0:
                    game.box5 = 2
                    print("a5")
                    return "com wins"
#
        if game.box4 == 2:
            print("box4")
            if game.box7 == 2:
                if game.box1 == 0:
                    game.box1 = 2
                    print("a1")
                    return "com wins"
            if game.box5 == 2:
                if game.box6 == 0:
                    game.box6 = 2
                    print("a6")
                    return "com wins"
            if game.box6 == 2:
                if game.box5 == 0:
                    game.box5 = 2
                    print("a5")
                    return "com wins"
#
        if game.box5 == 2:
            print("box5")
            if game.box6 == 2:
                if game.box4 == 0:
                    game.box4 = 2
                    print("a4")
                    return "com wins"
            if game.box7 == 2:
                if game.box3 == 0:
                    game.box3 = 2
                    print("a3")
                    return "com wins"
            if game.box8 == 2:
                if game.box2 == 0:
                    game.box2 = 2
                    print("a2")
                    return "com wins"
                else:
                    pass
            if game.box9 == 2:
                if game.box1 == 0:
                    game.box1 = 2
                    print("a1")
                    return "com wins"
                elif game.box3 == 0:
                    game.box3 = 2
                    print("a3")
                    return "com wins"
#
        if game.box6 == 2:
            print("box6")
            if game.box9 == 2:
                if game.box3 == 0:
                    game.box3 = 2
                    print("a3")
                    return "com wins"
#
        if game.box7 == 2:
            print("box7")
            if game.box8 == 2:
                if game.box9 == 0:
                    game.box9 = 2
                    print("a9")
                    return "com wins"
            if game.box9 == 2:
                if game.box8 == 0:
                    game.box8 = 2
                    print("a9")
                    return "com wins"
#
        if game.box8 == 2:
            print("box8")
            if game.box9 == 2:
                if game.box7 == 0:
                    game.box7 = 2
                    print("a7")
                    return "com wins"
# defensive
        print("defensive")
        if game.box1 == 1:
            print("box1")
            if game.box2 == 1:
                if game.box3 == 0:
                    game.box3 = 2
                    print("d3")
                    return
            if game.box3 == 1:
                if game.box2 == 0:
                    game.box2 = 2
                    print("d2")
                    return
            if game.box5 == 1:
                if game.box9 == 0:
                    game.box9 = 2
                    print("d9")
                    return
            if game.box9 == 1:
                if game.box5 == 0:
                    game.box5 = 2
                    print("d5")
                    return
            if game.box4 == 1:
                if game.box7 == 0:
                    game.box7 = 2
                    print("d7")
                    return
            if game.box7 == 1:
                if game.box4 == 0:
                    game.box4 = 2
                    print("d4")
                    return
#
        if game.box2 == 1:
            print("box2")
            if game.box3 == 1:
                if game.box1 == 0:
                    game.box1 = 2
                    print("d1")
                    return
            if game.box5 == 1:
                if game.box8 == 0:
                    game.box8 = 2
                    print("d8")
                    return
            if game.box8 == 1:
                if game.box5 == 0:
                    game.box5 = 2
                    print("d5")
                    return
#
        if game.box3 == 1:
            print("box3")
            if game.box6 == 1:
                if game.box9 == 0:
                    game.box9 = 2
                    print("d9")
                    return
            if game.box9 == 1:
                if game.box6 == 0:
                    game.box6 = 2
                    print("d6")
                    return
            if game.box5 == 1:
                if game.box7 == 0:
                    game.box7 = 2
                    print("d7")
                    return
#
        if game.box4 == 1:
            print("box4")
            if game.box7 == 1:
                if game.box1 == 0:
                    game.box1 = 2
                    print("d1")
                    return
            if game.box5 == 1:
                if game.box6 == 0:
                    game.box6 = 2
                    print("d6")
                    return
            if game.box6 == 1:
                if game.box5 == 0:
                    game.box5 = 2
                    print("d5")
                    return
#
        if game.box5 == 1:
            print("box5")
            if game.box6 == 1:
                if game.box4 == 0:
                    game.box4 = 2
                    print("d4")
                    return
            if game.box7 == 1:
                if game.box3 == 0:
                    game.box3 = 2
                    print("d3")
                    return
            if game.box8 == 1:
                if game.box2 == 0:
                    game.box2 = 2
                    print("d2")
                    return
            if game.box9 == 1:
                if game.box1 == 0:
                    game.box1 = 2
                    print("d1")
                    return
                elif game.box1 == 0:
                    game.box1 = 2
                    print("d1")
                    return
#
        if game.box6 == 1:
            print("box6")
            if game.box9 == 1:
                if game.box3 == 0:
                    game.box3 = 2
                    print("d3")
                    return
#
        if game.box7 == 1:
            print("box7")
            if game.box8 == 1:
                if game.box9 == 0:
                    game.box9 = 2
                    print("d2")
                    return
            if game.box9 == 1:
                if game.box8 == 0:
                    game.box8 = 2
                    print("d8")
                    return
#
        if game.box8 == 1:
            print("box8")
            if game.box9 == 1:
                print("box8+")
                if game.box7 == 0:
                    game.box7 = 2
                    print("d7")
                    return

        # first and no clue moves
        box = random.randint(1, 9)
        print(f"random number: {box}")
        if box == 1 and game.box1 == 0:
            game.box1 = 2
            print("r1")
        elif box == 2 and game.box2 == 0:
            game.box2 = 2
            print("r2")
        elif box == 3 and game.box3 == 0:
            game.box3 = 2
            print("r3")
        elif box == 4 and game.box4 == 0:
            game.box4 = 2
            print("r4")
        elif box == 5 and game.box5 == 0:
            game.box5 = 2
            print("r5")
        elif box == 6 and game.box6 == 0:
            game.box6 = 2
            print("r6")
        elif box == 7 and game.box7 == 0:
            game.box7 = 2
            print("r7")
        elif box == 8 and game.box8 == 0:
            game.box8 = 2
            print("r8")
        elif box == 9 and game.box9 == 0:
            game.box9 = 2
            print("r9")
        elif game.box1 != 0 and game.box2 != 0 and game.box3 != 0 and game.box4 != 0 and game.box5 != 0 and \
                game.box6 != 0 and game.box7 != 0 and game.box8 != 0 and game.box9 != 0:
            return "draw"
        else:
            print("re-rolling")
            com.decision()


com = Computer()


class Game(object):
    def __init__(self):
        self.status = 0
        self.running = True
        self.mouseX, self.mouseY = 0, 0
# 0 = none, 1 = player, 2 = computer
        self.box1, self.box2, self.box3, self.box4, self.box5, self.box6, self.box7, self.box8, self.box9 = \
            self.status, self.status, self.status, self.status, self.status, self.status, self.status, self.status, \
            self.status

    def start_game_window(self):
        while self.running:
            window.fill(c_darkBlue)
            self.mouseX, self.mouseY = pygame.mouse.get_pos()
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    print(self.mouseX, self.mouseY)
                    if self.mouseX in range(175, 426) and self.mouseY in range(300, 351):
                        self.game_window()
                    elif self.mouseX in range(240, 361) and self.mouseY in range(360, 411):
                        self.close_game()

            draw.ttt()

            if self.mouseX in range(175, 425) and self.mouseY in range(300, 351):
                draw.start_button(c_lightBlue)
            else:
                draw.start_button(c_lightGreen)

            if self.mouseX in range(237, 361) and self.mouseY in range(360, 411):
                draw.quit_button(c_lightBlue)
            else:
                draw.quit_button(c_lightGreen)
            pygame.display.update()

    def game_window(self):
        delay = 0.5
        win = ""
        while self.running:
            window.fill(c_darkBlue)
            draw.lines()
            self.mouseX, self.mouseY = pygame.mouse.get_pos()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    if self.mouseX in range(75, 226) and self.mouseY in range(75, 226):
                        if self.box1 == 0:
                            self.box1 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
                    elif self.mouseX in range(225, 376) and self.mouseY in range(75, 226):
                        if self.box2 == 0:
                            self.box2 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
                    elif self.mouseX in range(375, 526) and self.mouseY in range(75, 226):
                        if self.box3 == 0:
                            self.box3 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
#
                    elif self.mouseX in range(75, 226) and self.mouseY in range(225, 376):
                        if self.box4 == 0:
                            self.box4 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
                    elif self.mouseX in range(225, 376) and self.mouseY in range(225, 376):
                        if self.box5 == 0:
                            self.box5 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
                    elif self.mouseX in range(375, 526) and self.mouseY in range(225, 376):
                        if self.box6 == 0:
                            self.box6 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
#
                    elif self.mouseX in range(75, 226) and self.mouseY in range(375, 526):
                        if self.box7 == 0:
                            self.box7 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
                    elif self.mouseX in range(225, 376) and self.mouseY in range(375, 526):
                        if self.box8 == 0:
                            self.box8 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)
                    elif self.mouseX in range(375, 526) and self.mouseY in range(375, 526):
                        if self.box9 == 0:
                            self.box9 = 1
                            draw.choices()
                            win = com.decision()
                            time.sleep(delay)

            draw.choices()
            pygame.display.update()

            if win == "player wins":
                print(win)
                com.winner()
            elif win == "com wins":
                print(win)
                com.loser()
            elif self.box1 != 0 and self.box2 != 0 and self.box3 != 0 and self.box4 != 0 and self.box5 != 0 and \
                    self.box6 != 0 and self.box7 != 0 and self.box8 != 0 and self.box9 != 0:
                print("draw")
                com.draw()
            elif win == "draw":
                com.draw()

    def close_game(self):
        window.fill(c_darkBlue)
        close_text = font.render("Thanks for playing!", True, c_white)
        window.blit(close_text, (150, 300))
        draw.ttt()
        pygame.display.update()
        time.sleep(1)
        sys.exit()


game = Game()
game.start_game_window()
