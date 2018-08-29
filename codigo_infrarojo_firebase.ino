#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Set these to run example.
#define FIREBASE_HOST "parqueaderouccali-8a09c.firebaseio.com"
#define FIREBASE_AUTH "hIe9XF9f70zszptiMzv5LnHY6BWFMhrOpsqsexZi"
#define WIFI_SSID "RODRIGUEZ"
#define WIFI_PASSWORD "Colombia1!"

const int SENSOR = 13;
int valor;

void setup() {
Serial.begin(115200);
pinMode(SENSOR,INPUT);

 // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}

void loop() {
  valor = digitalRead(SENSOR);
  Serial.println(valor);
  delay(100);

  if(valor == 0){
    Firebase.setInt("parqueaderos/-LKPqdXbQgPJcaMGOPWh/disponibilidad", 1);
  }else{
    Firebase.setInt("parqueaderos/-LKPqdXbQgPJcaMGOPWh/disponibilidad", 0);
  }

  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(200);
}
